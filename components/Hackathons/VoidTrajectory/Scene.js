import * as THREE from "three";
import GlassSlab from "../../webgl/GlassSlab";
import Monolith from "../../webgl/Monolith";
import ParticleBloom from "../../webgl/ParticleBloom";
import PostFX from "../../webgl/PostFX";
import { detectTier, getTierConfig } from "../../webgl/tiers";
import { BRAND, FOG, towardBrand } from "../../webgl/colors";

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const now = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

// Path layout (world units).
const STEP_Z = 14; // depth between stations
const RISE_Y = 3.0; // vertical climb per station
const SPREAD_X = 7; // how far stations sit off the centre line
const CAM_BACK = 16; // camera distance behind each station
const CAM_UP = 1.8; // camera lift above the station line
const CAM_X = 5.5; // camera lateral offset (opposite the slab side)
const SLAB_W = 7.4;
const SLAB_H = SLAB_W / 1.5; // 3:2
const LOOK_EASE = 0.12;

// Scroll-driven fly-through: a CatmullRom camera path through station anchors,
// scrubbed by native page scroll (progress set externally on this.scroll.p).
export default class Scene {
  constructor(container, { items }) {
    this.container = container;
    this.items = items || [];
    this.tier = detectTier();
    this.cfg = getTierConfig(this.tier);

    this.scroll = { p: 0, last: 0 }; // p driven by the ScrollTrigger scrub
    this.t = 0;
    this.velocity = 0;
    this.raf = null;
    this.running = false;
    this.startTime = now();
    this.pointer = { x: 0, y: 0 };
    this.lookTarget = new THREE.Vector3();
    this._v = new THREE.Vector3();
    this._p = new THREE.Vector3();
    this.activeIndex = -1;
    this.onIndex = null;
    this.onFrame = null;
    this.onContextLost = null;

    this.update = this.update.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onContextLostEvent = this.onContextLostEvent.bind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.buildPath();
    this.createStations();
    this.createEnvironment();
    this.createPost();
    this.addEvents();
  }

  createPost() {
    this.post = new PostFX({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      cfg: this.cfg,
      width: this.screen.width,
      height: this.screen.height,
    });
  }

  // canvasHeightPx / (2·tan(fov/2)) — world-unit sprite size → device pixels.
  getAttenuation() {
    const fov = (this.camera.fov * Math.PI) / 180;
    return this.renderer.domElement.height / (2 * Math.tan(fov / 2));
  }

  createEnvironment() {
    const attenuation = this.getAttenuation();
    const n = this.items.length;
    const first = this.anchors[0];
    const last = this.anchors[n - 1];

    // Δ at the start of the journey (intro) and beyond the end (outro).
    this.introMonolith = new Monolith({
      scene: this.scene,
      count: Math.floor(this.cfg.heroParticles * 0.7),
      fog: FOG,
      attenuation,
      width: 13,
      position: new THREE.Vector3(0, first.y + 1, first.z - 9),
      opacity: 0,
      uSize: 0.08,
    });
    this.outroMonolith = new Monolith({
      scene: this.scene,
      count: this.cfg.heroParticles,
      fog: FOG,
      attenuation,
      width: 20,
      position: this.outroDeltaPos.clone(),
      opacity: 0,
      uSize: 0.1,
    });

    // Per-station accent blooms (skipped on Tier 2 to save fill).
    this.blooms = [];
    if (this.cfg.bloom) {
      this.blooms = this.items.map(
        (item, i) =>
          new ParticleBloom({
            scene: this.scene,
            center: this.anchors[i],
            color: item.accent || 0x8b31ff,
            count: 420,
            radius: SLAB_W * 0.9,
            fog: FOG,
            attenuation,
          })
      );
    }

    this.moodColor = new THREE.Color(FOG.color);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: this.tier === 1,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, this.cfg.dpr)
    );
    this.renderer.setClearColor(0x000000, 0);
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const canvas = this.renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    this.container.appendChild(canvas);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 400);
    this.camera.position.set(0, 0, CAM_BACK);
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(FOG.color, FOG.density);
  }

  buildPath() {
    const n = this.items.length;

    // Station anchors: alternating sides, gently ascending, marching into -z.
    // Tier 2 straightens the S-curve (no lateral spread) for cheaper motion.
    const spread = this.cfg.parallax ? SPREAD_X : 0;
    this.anchors = this.items.map(
      (_, i) =>
        new THREE.Vector3(
          (i % 2 === 0 ? 1 : -1) *
            spread *
            (0.55 + 0.45 * Math.abs(Math.sin(i * 1.3))),
          i * RISE_Y,
          -i * STEP_Z
        )
    );

    const last = this.anchors[n - 1] || new THREE.Vector3();
    // The outro Δ sits well beyond the final station in open void.
    this.outroDeltaPos = new THREE.Vector3(0, last.y + 3, last.z - STEP_Z * 2.6);

    // Camera waypoints: an intro point, one behind each station (offset to the
    // opposite side so it looks across at the slab), then an outro point that
    // flies past the last slab into the open space before the Δ.
    const pts = [new THREE.Vector3(0, -1.5, CAM_BACK)];
    this.anchors.forEach((a, i) => {
      const side = i % 2 === 0 ? 1 : -1;
      pts.push(new THREE.Vector3(a.x - side * CAM_X, a.y + CAM_UP, a.z + CAM_BACK));
    });
    pts.push(new THREE.Vector3(0, last.y + 3, last.z - STEP_Z * 1.15));

    this.curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
    // Station i is active near this scroll progress (intro=0, outro=1).
    this.stationT = this.items.map((_, i) => (i + 1) / (n + 1));
    // Look targets extend one past the last station to the outro Δ, so the
    // camera turns to face it as the journey ends.
    this.lookAnchors = [...this.anchors, this.outroDeltaPos];
  }

  createStations() {
    this.stations = this.items.map((project, i) => {
      const slab = new GlassSlab({
        scene: this.scene,
        // Placeholder gradient comes from the station accent (entries carry
        // `accent`, not `gradient`) so missing screenshots read on-brand. Image
        // is stripped here and loaded lazily (see update) when the camera nears.
        project: {
          ...project,
          image: undefined,
          gradient: project.gradient || [project.accent || "#8b31ff", "#120e16"],
        },
        colors: BRAND,
        maxAnisotropy: this.maxAnisotropy,
      });
      slab.setPlaneSizes(SLAB_W, SLAB_H);
      // Deterministic static tilt so slabs read as placed, not on rails.
      const r = Math.sin((i + 1) * 91.7);
      return {
        slab,
        image: project.image,
        anchor: this.anchors[i],
        tiltZ: r * 0.08,
        floatPhase: (r + 1) * Math.PI,
        floatSpeed: 0.4 + Math.abs(r) * 0.4,
      };
    });
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth || 1,
      height: this.container.clientHeight || 1,
    };
    this.renderer.setSize(this.screen.width, this.screen.height, false);
    this.camera.aspect = this.screen.width / this.screen.height;
    this.camera.updateProjectionMatrix();

    const a = this.getAttenuation?.();
    if (a != null && this.introMonolith) {
      this.introMonolith.material.uniforms.uAttenuation.value = a;
      this.outroMonolith.material.uniforms.uAttenuation.value = a;
      this.blooms?.forEach((b) => b.setAttenuation(a));
    }
    this.post?.setSize(this.screen.width, this.screen.height);
  }

  addEvents() {
    if (this.cfg.parallax)
      window.addEventListener("pointermove", this.onPointerMove);
    this.renderer.domElement.addEventListener(
      "webglcontextlost",
      this.onContextLostEvent,
      false
    );
  }

  removeEvents() {
    window.removeEventListener("pointermove", this.onPointerMove);
    this.renderer.domElement.removeEventListener(
      "webglcontextlost",
      this.onContextLostEvent,
      false
    );
  }

  onPointerMove(e) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }

  onContextLostEvent(e) {
    e.preventDefault();
    this.pause();
    this.onContextLost?.();
  }

  update() {
    if (!this.running) return;
    const time = (now() - this.startTime) / 1000;

    // Scrubbed progress → camera position along the path.
    this.velocity = this.scroll.p - this.scroll.last;
    this.scroll.last = this.scroll.p;
    const t = clamp(this.scroll.p, 0, 1);
    this.t = t;
    this.curve.getPointAt(t, this.camera.position);

    // LookAt: a continuous point interpolated between adjacent station anchors
    // (with a slight lead), eased so the camera banks gently into each approach.
    const n = this.items.length;
    const f = clamp(t * (n + 1) - 1 + 0.15, 0, n); // +lead, extends to the Δ
    const i0 = Math.floor(f);
    const i1 = Math.min(i0 + 1, n);
    this._v.copy(this.lookAnchors[i0]).lerp(this.lookAnchors[i1], f - i0);
    if (this.cfg.parallax) {
      // Subtle mouse 3DOF on top of the path motion.
      this._v.x += this.pointer.x * 1.4;
      this._v.y += -this.pointer.y * 0.9;
    }
    this.lookTarget.lerp(this._v, LOOK_EASE);
    this.camera.lookAt(this.lookTarget);

    // Active station with hysteresis — won't flip until we're clearly past the
    // current one, so it never flickers between two stations.
    const activeF = t * (n + 1) - 1;
    const nearest = clamp(Math.round(activeF), 0, n - 1);
    if (this.activeIndex < 0) {
      this.activeIndex = nearest;
      this.onIndex?.(nearest);
    } else if (
      nearest !== this.activeIndex &&
      Math.abs(activeF - this.activeIndex) >= 0.62
    ) {
      this.activeIndex = nearest;
      this.onIndex?.(nearest);
    }

    // Stations: billboard to camera, idle float, proximity grading.
    const halfW = this.screen.width / 2;
    const halfH = this.screen.height / 2;
    const titles = [];
    this.stations.forEach((s, i) => {
      const d = Math.abs(t - this.stationT[i]) * (n + 1);
      const centered = clamp(1 - d, 0, 1);
      const float =
        Math.sin(time * s.floatSpeed + s.floatPhase) * 0.12 * SLAB_H;

      // Lazy-load the real screenshot only when the camera is within 2 stations.
      if (Math.abs(i - this.activeIndex) <= 2) s.slab.loadImage(s.image);

      s.slab.mesh.position.set(s.anchor.x, s.anchor.y + float, s.anchor.z);
      s.slab.mesh.lookAt(this.camera.position);
      s.slab.mesh.rotateZ(s.tiltZ);
      s.slab.tick(time, this.velocity * 6);
      s.slab.grade(centered);

      // Project the slab's upper anchor to screen for the DOM tracked title.
      if (Math.abs(i - this.activeIndex) <= 1) {
        this._p.set(s.anchor.x, s.anchor.y + float + SLAB_H * 0.66, s.anchor.z);
        this._p.project(this.camera);
        const behind = this._p.z > 1;
        titles.push({
          index: i,
          x: this._p.x * halfW,
          y: -this._p.y * halfH,
          opacity: behind ? 0 : centered,
        });
      }
    });

    // Mood: fog + glows lerp toward the approaching station's accent, biased to
    // brand purple so accents season the void rather than replacing it.
    const approach = clamp(Math.round(activeF + 0.35), 0, n - 1);
    const accent = this.items[approach]?.accent || 0x8b31ff;
    this._moodTarget = towardBrand(accent, 0.62);
    this.moodColor.lerp(this._moodTarget, 0.03);
    this.scene.fog.color.copy(this.moodColor).multiplyScalar(0.5);

    // Δ intro fades out as we enter; outro resolves near the end.
    this.introMonolith?.setOpacity(smoothstep(0.12, 0.015, t) * 0.85);
    this.introMonolith?.update(time);
    this.outroMonolith?.setOpacity(smoothstep(0.83, 0.97, t) * 0.9);
    this.outroMonolith?.update(time);
    this.blooms?.forEach((b) => b.update(time));

    this.onFrame?.({
      titles,
      activeIndex: this.activeIndex,
      velocity: this.velocity,
      p: t,
      mood: [
        Math.round(this.moodColor.r * 255),
        Math.round(this.moodColor.g * 255),
        Math.round(this.moodColor.b * 255),
      ],
    });

    // Velocity signal (progress delta) drives chromatic aberration; scaled to
    // match the post pass's expected magnitude.
    if (!this.post.render(time, this.velocity * 60)) {
      this.renderer.render(this.scene, this.camera);
    }
    this.raf = requestAnimationFrame(this.update);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.update);
  }

  pause() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  destroy() {
    this.pause();
    this.removeEvents();
    this.stations?.forEach((s) => s.slab.dispose());
    this.stations = [];
    this.introMonolith?.dispose();
    this.outroMonolith?.dispose();
    this.blooms?.forEach((b) => b.dispose());
    this.blooms = [];
    this.post?.dispose();
    this.scene?.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    const canvas = this.renderer.domElement;
    if (canvas.parentNode === this.container) this.container.removeChild(canvas);
  }
}
