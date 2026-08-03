import * as THREE from "three";
import JourneyMonolith from "./JourneyMonolith";
import PostFX from "../webgl/PostFX";
import { detectTier, getTierConfig } from "../webgl/tiers";
import { FOG } from "../webgl/colors";
import { JOURNEY_STATE } from "../../constants";

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp = (a, b, t) => a + (b - a) * t;
const now = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

const CHAPTERS = JOURNEY_STATE.length; // 8

// Interpolate the per-chapter visual state continuously (never stepped).
function stateAt(p) {
  const f = clamp(p, 0, 1) * (JOURNEY_STATE.length - 1);
  const i0 = Math.floor(f);
  const i1 = Math.min(i0 + 1, JOURNEY_STATE.length - 1);
  const k = f - i0;
  const a = JOURNEY_STATE[i0];
  const b = JOURNEY_STATE[i1];
  return {
    fog: lerp(a.fog, b.fog, k),
    saturation: lerp(a.saturation, b.saturation, k),
    convergence: lerp(a.convergence, b.convergence, k),
    accent: new THREE.Color(a.accent).lerp(new THREE.Color(b.accent), k),
  };
}

// Scroll-scrubbed ascent through the void as the Δ assembles. scene.scroll.p is
// driven externally (ScrollTrigger scrub in the wrapper).
export default class JourneyScene {
  constructor(container) {
    this.container = container;
    this.tier = detectTier();
    this.cfg = getTierConfig(this.tier);

    this.scroll = { p: 0, last: 0 };
    this.velocity = 0;
    this.chapter = -1;
    this.raf = null;
    this.running = false;
    this.startTime = now();
    this.pointer = { x: 0, y: 0 };
    this.lookTarget = new THREE.Vector3(0, 0, -6);
    this._look = new THREE.Vector3();
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
    this.createMonolith();
    this.createPost();
    this.addEvents();
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
    const c = this.renderer.domElement;
    c.style.width = "100%";
    c.style.height = "100%";
    c.style.display = "block";
    this.container.appendChild(c);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 400);
    this.camera.position.set(0, -6, 12);
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(FOG.color, JOURNEY_STATE[0].fog);
    this.deltaCenter = new THREE.Vector3(0, 0, -6);
  }

  getAttenuation() {
    const fov = (this.camera.fov * Math.PI) / 180;
    return this.renderer.domElement.height / (2 * Math.tan(fov / 2));
  }

  buildPath() {
    // A steady ascent: rise in Y, ease back in Z so the assembling Δ stays
    // framed. Tier 2 keeps X dead-straight (no lateral drift).
    const drift = this.cfg.parallax ? 1.2 : 0;
    this.curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, -6, 12),
        new THREE.Vector3(drift, -1.5, 13.5),
        new THREE.Vector3(-drift, 2.5, 15.5),
        new THREE.Vector3(drift * 0.6, 6, 18),
        new THREE.Vector3(0, 9, 21),
      ],
      false,
      "catmullrom",
      0.5
    );
  }

  createMonolith() {
    const vpH = this.viewport.height;
    this.monolith = new JourneyMonolith({
      scene: this.scene,
      count: this.cfg.heroParticles,
      width: vpH * 0.7,
      position: this.deltaCenter.clone(),
      fog: FOG,
      attenuation: this.getAttenuation(),
    });
  }

  createPost() {
    this.post = new PostFX({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      cfg: this.cfg,
      width: this.screen.width,
      height: this.screen.height,
      bloom: { strength: 0.5, radius: 0.6, threshold: 0.6 },
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
    const fov = (this.camera.fov * Math.PI) / 180;
    const h = 2 * Math.tan(fov / 2) * 14;
    this.viewport = { height: h, width: h * this.camera.aspect };
    this.monolith?.setAttenuation(this.getAttenuation());
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
    const p = clamp(this.scroll.p, 0, 1);
    this.velocity = p - this.scroll.last;
    this.scroll.last = p;

    const s = stateAt(p);

    // Camera ascent + gentle mouse parallax, always looking at the Δ.
    this.curve.getPointAt(p, this.camera.position);
    this._look.copy(this.deltaCenter);
    if (this.cfg.parallax) {
      this.camera.position.x += this.pointer.x * 0.8;
      this.camera.position.y += -this.pointer.y * 0.5;
      this._look.x += this.pointer.x * 0.6;
    }
    this.lookTarget.lerp(this._look, 0.1);
    this.camera.lookAt(this.lookTarget);

    // Atmosphere arc: fog thins + tints toward the accent; Δ converges & warms.
    this.scene.fog.density = s.fog;
    this.scene.fog.color.copy(s.accent).multiplyScalar(0.14);
    this.monolith.update(time, {
      progress: s.convergence,
      saturation: s.saturation,
      fogDensity: s.fog,
    });

    const chapter = clamp(Math.floor(p * CHAPTERS), 0, CHAPTERS - 1);
    if (chapter !== this.chapter) this.chapter = chapter;
    this.onFrame?.({ p, chapter, velocity: this.velocity });

    if (!this.post.render(time, this.velocity * 40)) {
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
    this.monolith?.dispose();
    this.post?.dispose();
    this.scene?.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    const c = this.renderer.domElement;
    if (c.parentNode === this.container) this.container.removeChild(c);
  }
}
