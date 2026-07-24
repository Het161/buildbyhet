import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FinalShader } from "./shaders/post";

// Shared post chain: RenderPass → half-res bloom (rims/particles only) →
// chromatic aberration + vignette + grain. Bloom/post gated by the tier config.
// When post is disabled the caller falls back to a plain renderer.render().
export default class PostFX {
  constructor({ renderer, scene, camera, cfg, width, height, bloom }) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.active = !!cfg.post;
    if (!this.active) return;

    this.composer = new EffectComposer(renderer);
    this.composer.setPixelRatio(renderer.getPixelRatio());
    this.composer.setSize(width, height);
    this.composer.addPass(new RenderPass(scene, camera));

    if (cfg.bloom) {
      // Half resolution. Defaults (strength .42 / radius .55 / threshold .78)
      // suit the homepage's dark screenshots; callers with light textures pass
      // a gentler, higher-threshold bloom so bright images don't blow out.
      const b = bloom || { strength: 0.42, radius: 0.55, threshold: 0.78 };
      this.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width / 2, height / 2),
        b.strength,
        b.radius,
        b.threshold
      );
      this.composer.addPass(this.bloomPass);
    }

    this.finalPass = new ShaderPass(FinalShader);
    this.composer.addPass(this.finalPass);
  }

  setSize(width, height) {
    this.composer?.setSize(width, height);
    this.bloomPass?.setSize(width / 2, height / 2);
  }

  // velocity: unclamped motion signal; nudges chromatic aberration up while
  // the scene moves fast. Returns true if it rendered, false to fall back.
  render(time, velocity = 0) {
    if (!this.composer) return false;
    if (this.finalPass) {
      const u = this.finalPass.uniforms;
      u.uTime.value = time;
      u.uAberration.value = 0.0032 + Math.min(Math.abs(velocity) * 0.004, 0.004);
    }
    this.composer.render();
    return true;
  }

  dispose() {
    this.bloomPass?.dispose?.();
    this.finalPass?.dispose?.();
    this.composer?.dispose?.();
  }
}
