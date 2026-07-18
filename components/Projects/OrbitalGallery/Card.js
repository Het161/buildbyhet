import * as THREE from "three";
import gsap from "gsap";
import { cardVertex, cardFragment } from "./shaders/card";
import { createPlaceholder } from "./placeholder";

// Deterministic pseudo-random so the cluster layout is stable across reloads.
const rand = (seed) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const DEG = Math.PI / 180;

// One glass slab on the orbital ring. Owns geometry, material, textures, and
// its own arc placement + float. The ring motion itself lives in Gallery.
export default class Card {
  constructor({ scene, project, index, length, sizes, colors, maxAnisotropy }) {
    this.scene = scene;
    this.project = project;
    this.index = index;
    this.length = length;
    this.colors = colors;
    this.maxAnisotropy = maxAnisotropy || 1;

    this.appear = 0; // 0 → 1 pop-in on texture load
    this.hover = 0; // eased hover amount
    this.hoverTarget = 0;
    this.centered = 0;

    const r1 = rand(index + 1);
    const r2 = rand(index + 7.3);
    const r3 = rand(index + 13.7);
    const r4 = rand(index + 21.1);

    // Jitter turns the carousel into a floating cluster.
    this.jitter = {
      radius: 1 + (r1 - 0.5) * 0.16, // ±8% arc radius
      z: (r2 - 0.5) * 0.55, // depth variation → parallax + fog
      y: (r3 - 0.5) * 0.12, // small vertical offset
      tiltZ: (r4 - 0.5) * 10 * DEG, // ±5°
      tiltY: (r1 - 0.5) * 16 * DEG, // ±8°
      floatPhase: r2 * Math.PI * 2,
      floatSpeed: 0.45 + r3 * 0.5,
      floatAmp: 0.02 + r4 * 0.025,
    };

    this.createMesh();
    this.createTextures();
    this.onResize(sizes);
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 24, 24);
    this.material = new THREE.ShaderMaterial({
      vertexShader: cardVertex,
      fragmentShader: cardFragment,
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
    // Immediate gradient placeholder so a card is never blank.
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

  // Arc placement: y = -(R - √(R² - x²)) puts the centred card at the top of
  // the arc, the rest curving down toward the horizon; rotation follows the
  // tangent. Jitter + float lift it off the rails into a floating cluster.
  update(scroll, speed, time) {
    const u = this.material.uniforms;
    u.uSpeed.value = speed;
    u.uTime.value = time;

    const total = this.widthTotal;
    let x = this.baseX + scroll;
    x = ((x % total) + total) % total;
    if (x > total / 2) x -= total;
    this.x = x;

    const R = this.arcRadius * this.jitter.radius;
    const ax = Math.min(Math.abs(x), R * 0.999);
    const root = Math.sqrt(R * R - ax * ax);
    const y = -(R - root);
    const tilt = Math.atan(ax / root) * Math.sign(x) * -1;

    const centered = 1 - Math.min(Math.abs(x) / (this.planeWidth * 1.15), 1);
    this.centered = centered;

    this.hover += (this.hoverTarget - this.hover) * 0.12;

    const float =
      Math.sin(time * this.jitter.floatSpeed + this.jitter.floatPhase) *
      this.jitter.floatAmp *
      this.planeHeight;

    this.mesh.position.set(
      x,
      y + this.arcLift + this.jitter.y * this.planeHeight + float,
      this.jitter.z * this.planeWidth * 0.5 + centered * this.planeWidth * 0.15
    );
    this.mesh.rotation.set(0, this.jitter.tiltY, tilt + this.jitter.tiltZ);

    u.uDuotone.value = (1 - centered) * 0.65;
    u.uBrightness.value = 0.5 + centered * 0.5;
    u.uCentered.value = centered;
    u.uRim.value = 0.75 + centered * 0.35 + this.hover * 0.5;

    const appear = 0.9 + 0.1 * this.appear;
    const scale = (1 + centered * 0.08 + this.hover * 0.04) * appear;
    this.mesh.scale.set(this.planeWidth * scale, this.planeHeight * scale, 1);
  }

  onResize(sizes) {
    const { planeWidth, planeHeight, spacing, arcRadius, arcLift } = sizes;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.spacing = spacing;
    this.arcRadius = arcRadius;
    this.arcLift = arcLift;

    this.widthTotal = spacing * this.length;
    this.baseX = this.index * spacing;

    this.mesh.scale.set(planeWidth, planeHeight, 1);
    this.material.uniforms.uPlaneSizes.value.set(planeWidth, planeHeight);
    this.material.uniforms.uBorderRadius.value =
      Math.min(planeWidth, planeHeight) * 0.06;
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
