import * as THREE from "three";
import gsap from "gsap";
import Card from "./Card";
import HeroMonolith from "./HeroMonolith";
import Particles from "./Particles";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FinalShader } from "./shaders/post";
import { detectTier, getTierConfig } from "./tiers";

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const now = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

// Motion tuning (carried over from v1 — this system is renderer-agnostic).
const IDLE_DRIFT = -0.01; // constant leftward drift (world units / frame)
const EASE = 0.1; // velocity lerp factor
const SCROLL_MAP = 0.045; // world units of ring travel per scrolled pixel
const SCROLL_SMOOTH = 0.5; // scroll-velocity smoothing toward the target
const SCROLL_CLAMP = 3; // max scroll-driven velocity (world units / frame)
const IDLE_HOLD_MS = 2600; // pause idle drift this long after interaction
const TAP_THRESHOLD = 8; // px of movement below which a pointer up is a "tap"

const COLORS = { a: 0x8b31ff, b: 0x7000ff, rim: 0xb985ff };
const FOG_COLOR = 0x0a0611;
const FOG_DENSITY = 0.021;

export default class Gallery {
  constructor(container, { items, onIndex, onActivate, onContextLost } = {}) {
    this.container = container;
    this.items = items || [];
    this.onIndex = onIndex || (() => {});
    this.onActivate = onActivate || (() => {});
    this.onContextLost = onContextLost || (() => {});

    this.tier = detectTier();
    this.cfg = getTierConfig(this.tier);

    // --- motion state (preserved from v1) ---
    this.pos = 0;
    this._lastPos = 0;
    this.vel = 0;
    this.scrollVel = 0;
    this.lastScrollY = 0;
    this.idleHoldUntil = 0;
    this.snapping = false;
    this.centeredIndex = -1;
    this.raf = null;
    this.running = false;
    this.startTime = now();
    this.drag = { active: false, lastX: 0, lastDX: 0, downX: 0, downY: 0 };
    this.pointer = { x: 0, y: 0, insideX: 0, insideY: 0, over: false };

    this.update = this.update.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onContextLostEvent = this.onContextLostEvent.bind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createCards();
    this.createEnvironment();
    this.createComposer();
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
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    const canvas = this.renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    this.container.appendChild(canvas);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    this.camera.position.set(0, 0, 20);
    this.cameraBaseZ = 20;
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(FOG_COLOR, FOG_DENSITY);
  }

  computeSizes() {
    const { width, height } = this.screen;
    const fov = (this.camera.fov * Math.PI) / 180;
    const vpHeight = 2 * Math.tan(fov / 2) * this.cameraBaseZ;
    const vpWidth = vpHeight * (width / height);
    const viewport = { width: vpWidth, height: vpHeight };

    // Responsive card sizing constrained by BOTH viewport dimensions: lands
    // at ~30% of a wide desktop stage and ~65% of a narrow phone stage, so the
    // card stays the hero on mobile instead of shrinking into the void.
    const planeHeight = Math.min(vpHeight * 0.52, (vpWidth * 0.66) / 1.5);
    const planeWidth = planeHeight * 1.5; // 3:2
    const spacing = planeWidth * 1.18;
    const arcRadius = spacing * this.items.length * 0.72;
    // Card band sits slightly below centre, leaving headroom for the Δ mark.
    const arcLift = -vpHeight * 0.03;

    return { viewport, planeWidth, planeHeight, spacing, arcRadius, arcLift };
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth || 1,
      height: this.container.clientHeight || 1,
    };
    this.renderer.setSize(this.screen.width, this.screen.height, false);
    this.camera.aspect = this.screen.width / this.screen.height;
    this.camera.updateProjectionMatrix();

    this.sizes = this.computeSizes();
    this.dragFactor = this.sizes.viewport.width / this.screen.width;
    if (this.cards) this.cards.forEach((c) => c.onResize(this.sizes));
    const attenuation = this.getAttenuation();
    this.monolith?.onResize(this.sizes, attenuation);
    this.particles?.onResize(this.sizes, attenuation);
    this.composer?.setSize(this.screen.width, this.screen.height);
    this.bloomPass?.setSize(this.screen.width / 2, this.screen.height / 2);
  }

  createCards() {
    this.cards = this.items.map(
      (project, index) =>
        new Card({
          scene: this.scene,
          project,
          index,
          length: this.items.length,
          sizes: this.sizes,
          colors: COLORS,
          maxAnisotropy: this.maxAnisotropy,
        })
    );
  }

  // canvasHeightPx / (2·tan(fov/2)) — converts a world-unit sprite size into
  // device pixels at a given depth, so particles scale correctly with DPR.
  getAttenuation() {
    const fov = (this.camera.fov * Math.PI) / 180;
    return this.renderer.domElement.height / (2 * Math.tan(fov / 2));
  }

  createEnvironment() {
    const fog = { color: FOG_COLOR, density: FOG_DENSITY };
    const attenuation = this.getAttenuation();

    this.monolith = new HeroMonolith({
      scene: this.scene,
      count: this.cfg.heroParticles,
      sizes: this.sizes,
      fog,
      attenuation,
    });

    this.particles = new Particles({
      scene: this.scene,
      clusterCount: this.cfg.clusterCount,
      clusterSize: this.cfg.clusterSize,
      sizes: this.sizes,
      fog,
      attenuation,
    });
  }

  // RenderPass → half-res bloom (rims/particles only) → CA + vignette + grain.
  createComposer() {
    if (!this.cfg.post) return;
    const { width, height } = this.screen;

    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(width, height);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    if (this.cfg.bloom) {
      // Half resolution, high threshold, low strength — only the brightest
      // fresnel rims and particle highlights bloom. No frame-wide haze.
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width / 2, height / 2),
        0.42,
        0.55,
        0.78
      );
      this.composer.addPass(this.bloomPass);
    }

    this.finalPass = new ShaderPass(FinalShader);
    this.composer.addPass(this.finalPass);
  }

  holdIdle(ms = IDLE_HOLD_MS) {
    this.idleHoldUntil = now() + ms;
  }

  /* --------------------------------- Input -------------------------------- */

  addEvents() {
    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.addEventListener(
      "webglcontextlost",
      this.onContextLostEvent,
      false
    );
  }

  removeEvents() {
    this.renderer.domElement.removeEventListener(
      "pointerdown",
      this.onPointerDown
    );
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    this.renderer.domElement.removeEventListener(
      "webglcontextlost",
      this.onContextLostEvent,
      false
    );
  }

  onContextLostEvent(e) {
    e.preventDefault();
    this.pause();
    this.onContextLost();
  }

  onPointerDown(e) {
    gsap.killTweensOf(this);
    this.snapping = false;
    this.drag.active = true;
    this.drag.lastX = e.clientX;
    this.drag.lastDX = 0;
    this.drag.downX = e.clientX;
    this.drag.downY = e.clientY;
    this.holdIdle();
  }

  onPointerMove(e) {
    // Camera parallax + hover tracking run whether or not we're dragging.
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    this.pointer.x = clamp(nx, -1, 1);
    this.pointer.y = clamp(ny, -1, 1);
    this.pointer.over =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!this.drag.active) return;
    const dx = e.clientX - this.drag.lastX;
    this.drag.lastX = e.clientX;
    this.drag.lastDX = dx * this.dragFactor;
    this.pos += this.drag.lastDX; // 1:1 grab
    this.vel = this.drag.lastDX;
  }

  onPointerUp(e) {
    if (!this.drag.active) return;
    this.drag.active = false;
    this.vel = this.drag.lastDX; // fling
    this.holdIdle();

    const moved = Math.hypot(
      e.clientX - this.drag.downX,
      e.clientY - this.drag.downY
    );
    if (moved < TAP_THRESHOLD) this.hitTest(e);
  }

  // A tap within the centred card's horizontal band activates it.
  hitTest(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const tapY = e.clientY - rect.top;
    if (tapY < 0 || tapY > rect.height) return;

    if (Math.abs(tapX - rect.width / 2) < this.centerBandPx() * 0.6) {
      this.onActivate(this.centeredIndex);
    }
  }

  centerBandPx() {
    return (
      (this.sizes.planeWidth / this.sizes.viewport.width) * this.screen.width
    );
  }

  // Snap one project along the ring. dir = +1 brings the right-side card to
  // centre (content moves left); dir = -1 brings the left-side one.
  snap(dir) {
    if (!this.sizes) return;
    const step = this.sizes.spacing;
    const snapped = Math.round(this.pos / step) * step;
    const target = snapped - dir * step;

    this.snapping = true;
    this.scrollVel = 0;
    this.holdIdle(3200);
    gsap.killTweensOf(this);
    gsap.to(this, {
      pos: target,
      duration: 0.7,
      ease: "power3.out",
      onComplete: () => {
        this.snapping = false;
        this.vel = 0;
      },
    });
  }

  /* --------------------------------- Loop --------------------------------- */

  update() {
    if (!this.running) return;
    const time = (now() - this.startTime) / 1000;

    // Page scroll drives the ring: scrolling down moves content right → left.
    const sy = window.scrollY || window.pageYOffset || 0;
    const dScroll = sy - this.lastScrollY;
    this.lastScrollY = sy;
    if (Math.abs(dScroll) > 0.5) this.holdIdle();
    const targetScrollVel = clamp(
      -dScroll * SCROLL_MAP,
      -SCROLL_CLAMP,
      SCROLL_CLAMP
    );
    this.scrollVel += (targetScrollVel - this.scrollVel) * SCROLL_SMOOTH;

    if (!this.drag.active && !this.snapping) {
      const idle = now() < this.idleHoldUntil ? 0 : IDLE_DRIFT;
      this.vel += (idle - this.vel) * EASE;
      this.pos += this.vel + this.scrollVel;
    }

    const delta = this.pos - this._lastPos;
    this._lastPos = this.pos;
    const shaderSpeed = clamp(delta * 0.06, -1, 1);

    // Hover: only the centred card, and only when the pointer is over it.
    const overCentre =
      this.pointer.over &&
      !this.drag.active &&
      Math.abs(this.pointer.x) < 0.18;

    let best = { index: -1, centered: -Infinity };
    this.cards.forEach((card, i) => {
      card.update(this.pos, shaderSpeed, time);
      if (card.centered > best.centered)
        best = { index: i, centered: card.centered };
    });
    this.cards.forEach((card, i) => {
      card.hoverTarget = overCentre && i === best.index ? 1 : 0;
    });

    if (best.index !== this.centeredIndex) {
      this.centeredIndex = best.index;
      this.onIndex(best.index);
    }

    this.monolith?.update(time);
    this.particles?.update(time);

    // Subtle camera parallax (desktop only).
    if (this.cfg.parallax) {
      this.camera.position.x +=
        (this.pointer.x * 0.6 - this.camera.position.x) * 0.05;
      this.camera.position.y +=
        (-this.pointer.y * 0.35 - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, 0);
    }

    if (this.finalPass) {
      const u = this.finalPass.uniforms;
      u.uTime.value = time;
      // Aberration leans up a touch while the ring is moving fast.
      u.uAberration.value = 0.0032 + Math.min(Math.abs(delta) * 0.004, 0.004);
    }

    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);

    this.raf = requestAnimationFrame(this.update);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastScrollY = window.scrollY || window.pageYOffset || 0;
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
    gsap.killTweensOf(this);
    if (this.cards) this.cards.forEach((c) => c.dispose());
    this.cards = [];
    this.monolith?.dispose();
    this.particles?.dispose();
    this.bloomPass?.dispose?.();
    this.finalPass?.dispose?.();
    this.composer?.dispose?.();
    this.scene?.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss?.();
    const canvas = this.renderer.domElement;
    if (canvas.parentNode === this.container) this.container.removeChild(canvas);
  }
}
