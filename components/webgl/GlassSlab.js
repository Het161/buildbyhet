import * as THREE from "three";
import gsap from "gsap";
import { slabVertex, slabFragment } from "./shaders/slab";
import { createPlaceholder } from "./placeholder";

// Shared glass-slab primitive: a textured, fresnel-rimmed, rounded-corner plane
// with the runtime placeholder pipeline. Owns geometry, material, textures and
// their disposal. Placement (arc, path, grid…) is the consumer's job — call
// grade()/tick() each frame and set mesh.position/rotation yourself.
export default class GlassSlab {
  constructor({ scene, project, colors, maxAnisotropy = 1 }) {
    this.scene = scene;
    this.project = project;
    this.colors = colors;
    this.maxAnisotropy = maxAnisotropy;

    this.appear = 0; // 0 → 1 pop-in on texture load
    this.planeWidth = 1;
    this.planeHeight = 1;

    this.createMesh();
    this.createTextures();
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 24, 24);
    this.material = new THREE.ShaderMaterial({
      vertexShader: slabVertex,
      fragmentShader: slabFragment,
      transparent: true,
      depthTest: true,
      depthWrite: true,
      fog: true,
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
        tMap: { value: null },
        uImageSizes: { value: new THREE.Vector2(1200, 800) },
        uPlaneSizes: { value: new THREE.Vector2(1, 1) },
        uBorderRadius: { value: 0.4 },
        uDuotone: { value: 0 },
        uColorA: { value: new THREE.Color(this.colors.a) },
        uColorB: { value: new THREE.Color(this.colors.b) },
        uRimColor: { value: new THREE.Color(this.colors.rim) },
        uOpacity: { value: 0 },
        uBrightness: { value: 1 },
        uCentered: { value: 0 },
        uTime: { value: 0 },
        uRim: { value: 1 },
        uSpeed: { value: 0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false; // positions change every frame
    this.scene.add(this.mesh);
  }

  configureTexture(texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = Math.min(4, this.maxAnisotropy);
    texture.needsUpdate = true;
    return texture;
  }

  createTextures() {
    // Immediate gradient placeholder so a slab is never blank.
    const canvas = createPlaceholder(this.project);
    this.placeholderTexture = this.configureTexture(
      new THREE.CanvasTexture(canvas)
    );
    this.material.uniforms.tMap.value = this.placeholderTexture;
    this.material.uniforms.uImageSizes.value.set(canvas.width, canvas.height);

    if (!this.project.image) {
      this.fadeIn();
      return;
    }

    new THREE.TextureLoader().load(
      this.project.image,
      (texture) => {
        this.configureTexture(texture);
        this.imageTexture = texture;
        this.material.uniforms.tMap.value = texture;
        this.material.uniforms.uImageSizes.value.set(
          texture.image.naturalWidth || texture.image.width,
          texture.image.naturalHeight || texture.image.height
        );
        this.fadeIn();
      },
      undefined,
      // Missing screenshot → keep the gradient placeholder.
      () => this.fadeIn()
    );
  }

  fadeIn() {
    gsap.to(this.material.uniforms.uOpacity, {
      value: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(this, { appear: 1, duration: 0.9, ease: "power3.out" });
  }

  // Deferred texture load (used by the hackathons path to only fetch a
  // station's screenshot when the camera is near it). Idempotent.
  loadImage(src) {
    if (!src || this._imgRequested) return;
    this._imgRequested = true;
    new THREE.TextureLoader().load(
      src,
      (texture) => {
        this.configureTexture(texture);
        this.imageTexture = texture;
        this.material.uniforms.tMap.value = texture;
        this.material.uniforms.uImageSizes.value.set(
          texture.image.naturalWidth || texture.image.width,
          texture.image.naturalHeight || texture.image.height
        );
      },
      undefined,
      () => {} // keep the placeholder on error
    );
  }

  // World size of the slab; also drives corner radius (in the same units).
  setPlaneSizes(w, h) {
    this.planeWidth = w;
    this.planeHeight = h;
    this.mesh.scale.set(w, h, 1);
    this.material.uniforms.uPlaneSizes.value.set(w, h);
    this.material.uniforms.uBorderRadius.value = Math.min(w, h) * 0.06;
  }

  tick(time, speed = 0) {
    this.material.uniforms.uTime.value = time;
    this.material.uniforms.uSpeed.value = speed;
  }

  // centered ∈ [0,1]: 1 = focused (full colour, slight scale-up), 0 = edge
  // (duotone toward brand purple, dimmer). Returns the applied scale.
  grade(centered, hover = 0) {
    const u = this.material.uniforms;
    u.uDuotone.value = (1 - centered) * 0.65;
    u.uBrightness.value = 0.5 + centered * 0.5;
    u.uCentered.value = centered;
    u.uRim.value = 0.75 + centered * 0.35 + hover * 0.5;

    const appear = 0.9 + 0.1 * this.appear;
    const scale = (1 + centered * 0.08 + hover * 0.04) * appear;
    this.mesh.scale.set(this.planeWidth * scale, this.planeHeight * scale, 1);
    return scale;
  }

  dispose() {
    gsap.killTweensOf(this);
    gsap.killTweensOf(this.material.uniforms.uOpacity);
    this.scene.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
    this.placeholderTexture?.dispose();
    this.imageTexture?.dispose();
  }
}
