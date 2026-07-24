import * as THREE from "three";
import { particleVertex, particleFragment } from "./shaders/particles";

// The Δ mark — the site's triangle logo (outline + crossbar) rebuilt from
// particles. Generated procedurally; no model file. Placement (world width +
// position + opacity) is passed in, so the homepage ring and the hackathons
// intro/outro can size and position it independently.
export default class Monolith {
  constructor({
    scene,
    count,
    fog,
    attenuation,
    width,
    position = new THREE.Vector3(0, 0, -6),
    opacity = 0.8,
    uSize = 0.09,
    sway = 0.35,
    swaySpeed = 0.16,
    colorBase = 0x7000ff,
    colorTip = 0xb985ff,
  }) {
    this.scene = scene;
    this.count = count;
    this.fog = fog;
    this.attenuation = attenuation;
    this.opacity = opacity;
    this.uSize = uSize;
    this.sway = sway;
    this.swaySpeed = swaySpeed;
    this.colorBase = colorBase;
    this.colorTip = colorTip;
    this.build(width, position);
  }

  // Samples the logo silhouette: 72% along the outline + crossbar, the rest
  // sparsely through the interior, with depth so it reads as a solid form.
  sampleShape(count, w, h, depth) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);

    const apex = [0, h / 2];
    const bl = [-w / 2, -h / 2];
    const br = [w / 2, -h / 2];
    const barY = -h / 2 + h * 0.22;
    const barHalf = w * 0.28;

    const base = new THREE.Color(this.colorBase);
    const tip = new THREE.Color(this.colorTip);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      let x;
      let y;

      if (Math.random() < 0.72) {
        const e = Math.random();
        let a;
        let b;
        if (e < 0.3) [a, b] = [apex, bl];
        else if (e < 0.6) [a, b] = [apex, br];
        else if (e < 0.82) [a, b] = [bl, br];
        else [a, b] = [[-barHalf, barY], [barHalf, barY]];

        const t = Math.random();
        x = a[0] + (b[0] - a[0]) * t + (Math.random() - 0.5) * w * 0.014;
        y = a[1] + (b[1] - a[1]) * t + (Math.random() - 0.5) * h * 0.014;
      } else {
        let u = Math.random();
        let v = Math.random();
        if (u + v > 1) {
          u = 1 - u;
          v = 1 - v;
        }
        x = apex[0] + u * (bl[0] - apex[0]) + v * (br[0] - apex[0]);
        y = apex[1] + u * (bl[1] - apex[1]) + v * (br[1] - apex[1]);
      }

      const z = (Math.random() - 0.5) * depth;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      tmp.copy(base).lerp(tip, (y + h / 2) / h);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;

      scales[i] = 0.5 + Math.random() * 0.9;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, scales, phases };
  }

  build(width, position) {
    this.width = width;
    this.currentPosition = position.clone();
    const w = width;
    const h = w / 0.95;
    const depth = w * 0.22;

    const { positions, colors, scales, phases } = this.sampleShape(
      this.count,
      w,
      h,
      depth
    );

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: this.uSize },
        uBreath: { value: w * 0.012 },
        uOpacity: { value: this.opacity },
        uAttenuation: { value: this.attenuation },
        uFogColor: { value: new THREE.Color(this.fog.color) },
        uFogDensity: { value: this.fog.density },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.points.position.copy(position);
    this.scene.add(this.points);
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
    // Gentle sway rather than a full spin: a flat mark rotated 90° goes
    // edge-on and vanishes, and this is the brand logo — keep it legible.
    this.points.rotation.y = Math.sin(time * this.swaySpeed) * this.sway;
  }

  setOpacity(v) {
    this.opacity = v;
    if (this.material) this.material.uniforms.uOpacity.value = v;
  }

  // Re-layout at a new world width/position (resize, or intro→outro growth).
  setLayout(width, position, attenuation) {
    if (attenuation != null) this.attenuation = attenuation;
    this.dispose();
    this.build(width, position);
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
