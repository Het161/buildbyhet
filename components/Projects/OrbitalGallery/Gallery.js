import { Renderer, Camera, Transform } from "ogl";
import gsap from "gsap";
import Media from "./Media";

// Normalized brand colours for the shader duotone.
const hexToVec3 = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const now = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

// Motion tuning.
const IDLE_DRIFT = -0.01; // constant leftward drift (world units / frame)
const EASE = 0.1; // velocity lerp factor
const SCROLL_MAP = 0.045; // world units of ring travel per scrolled pixel
const SCROLL_SMOOTH = 0.5; // scroll-velocity smoothing toward the target
const SCROLL_CLAMP = 3; // max scroll-driven velocity (world units / frame)
const IDLE_HOLD_MS = 2600; // pause idle drift this long after interaction
const TAP_THRESHOLD = 8; // px of movement below which a pointer up is a "tap"

export default class Gallery {
  constructor(container, { items, onIndex, onActivate, onContextLost } = {}) {
    this.container = container;
    this.items = items || [];
    this.onIndex = onIndex || (() => {});
    this.onActivate = onActivate || (() => {});
    this.onContextLost = onContextLost || (() => {});
    this.colors = { a: hexToVec3("#8b31ff"), b: hexToVec3("#7000ff") };

    this.pos = 0; // absolute ring offset (world units)
    this._lastPos = 0;
    this.vel = 0; // eased baseline velocity (idle drift)
    this.scrollVel = 0; // page-scroll contribution
    this.lastScrollY = 0;
    this.idleHoldUntil = 0;
    this.snapping = false;
    this.centeredIndex = -1;
    this.raf = null;
    this.running = false;

    this.drag = { active: false, lastX: 0, lastDX: 0, downX: 0, downY: 0 };

    this.update = this.update.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onContextLostEvent = this.onContextLostEvent.bind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createMedias();
    this.addEvents();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.display = "block";
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  computeSizes() {
    const { width, height } = this.screen;
    const fov = (this.camera.fov * Math.PI) / 180;
    const vpHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const vpWidth = vpHeight * (width / height);
    const viewport = { width: vpWidth, height: vpHeight };

    const planeWidth = vpWidth * 0.34;
    const planeHeight = planeWidth / 1.5; // 3:2
    const spacing = planeWidth * 1.18;
    const arcRadius = spacing * this.items.length * 0.72;
    const arcLift = vpHeight * 0.06;

    return { viewport, planeWidth, planeHeight, spacing, arcRadius, arcLift };
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth || 1,
      height: this.container.clientHeight || 1,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    this.sizes = this.computeSizes();
    // world units per screen pixel — makes drag feel 1:1 with the pointer.
    this.dragFactor = this.sizes.viewport.width / this.screen.width;
    if (this.medias) this.medias.forEach((m) => m.onResize(this.sizes));
  }

  createMedias() {
    this.medias = this.items.map(
      (project, index) =>
        new Media({
          gl: this.gl,
          scene: this.scene,
          project,
          index,
          length: this.items.length,
          sizes: this.sizes,
          colors: this.colors,
        })
    );
  }

  holdIdle(ms = IDLE_HOLD_MS) {
    this.idleHoldUntil = now() + ms;
  }

  /* --------------------------------- Input -------------------------------- */

  addEvents() {
    this.gl.canvas.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
    this.gl.canvas.addEventListener(
      "webglcontextlost",
      this.onContextLostEvent,
      false
    );
  }

  removeEvents() {
    this.gl.canvas.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    this.gl.canvas.removeEventListener(
      "webglcontextlost",
      this.onContextLostEvent,
      false
    );
  }

  // Context lost with no automatic restore → hand off to the DOM fallback.
  onContextLostEvent(e) {
    e.preventDefault();
    this.pause();
    this.onContextLost();
  }

  onPointerDown(e) {
    gsap.killTweensOf(this); // cancel any in-flight snap
    this.snapping = false;
    this.drag.active = true;
    this.drag.lastX = e.clientX;
    this.drag.lastDX = 0;
    this.drag.downX = e.clientX;
    this.drag.downY = e.clientY;
    this.holdIdle();
  }

  onPointerMove(e) {
    if (!this.drag.active) return;
    const dx = e.clientX - this.drag.lastX;
    this.drag.lastX = e.clientX;
    this.drag.lastDX = dx * this.dragFactor;
    this.pos += this.drag.lastDX; // 1:1 grab
    this.vel = this.drag.lastDX; // carried as inertia on release
  }

  onPointerUp(e) {
    if (!this.drag.active) return;
    this.drag.active = false;
    this.vel = this.drag.lastDX; // fling; eases back to idle drift
    this.holdIdle();

    const moved = Math.hypot(
      e.clientX - this.drag.downX,
      e.clientY - this.drag.downY
    );
    if (moved < TAP_THRESHOLD) this.hitTest(e);
  }

  // A tap within the centred plane's horizontal band activates it.
  hitTest(e) {
    const rect = this.gl.canvas.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const tapY = e.clientY - rect.top;
    if (tapY < 0 || tapY > rect.height) return;

    const centerX = rect.width / 2;
    const planeScreenW =
      (this.sizes.planeWidth / this.sizes.viewport.width) * rect.width;
    if (Math.abs(tapX - centerX) < planeScreenW * 0.6) {
      this.onActivate(this.centeredIndex);
    }
  }

  // Snap the ring one project in a direction. dir = +1 brings the right-side
  // project to centre (content moves left); dir = -1 brings the left-side one.
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

    // Page scroll drives the ring: scrolling down (delta > 0) moves content
    // right → left. Read scrollY directly each frame — deterministic and ties
    // spin amount to how far you actually scrolled.
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

    // Shader bow follows the actual per-frame motion (drag, scroll, or snap).
    const delta = this.pos - this._lastPos;
    this._lastPos = this.pos;
    const shaderSpeed = clamp(delta * 0.06, -1, 1);

    let best = { index: -1, centered: -Infinity };
    this.medias.forEach((m, i) => {
      m.update(this.pos, shaderSpeed);
      if (m.centered > best.centered) best = { index: i, centered: m.centered };
    });

    if (best.index !== this.centeredIndex) {
      this.centeredIndex = best.index;
      this.onIndex(best.index);
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.raf = requestAnimationFrame(this.update);
  }

  start() {
    if (this.running) return;
    this.running = true;
    // Sync scroll baseline so resuming after a pause doesn't jump the ring.
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
    if (this.medias) this.medias.forEach((m) => m.destroy());
    this.medias = [];
    const ext = this.gl.getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();
    if (this.gl.canvas.parentNode === this.container) {
      this.container.removeChild(this.gl.canvas);
    }
  }
}
