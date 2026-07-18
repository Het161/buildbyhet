import * as THREE from "three";
import { particleVertex, particleFragment } from "./shaders/particles";

// The Δ mark — the site's triangle logo (outline + crossbar) rebuilt from
// particles, standing behind the ring so cards sweep in front of it.
// Generated procedurally; no model file.
export default class HeroMonolith {
  constructor({ scene, count, sizes, fog, attenuation }) {
    this.scene = scene;
    this.count = count;
    this.build(sizes, fog, attenuation);
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

    const base = new THREE.Color(0x7000ff);
    const tip = new THREE.Color(0xb985ff);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      let x;
      let y;

      if (Math.random() < 0.72) {
        // Outline / crossbar
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
        // Sparse interior (uniform barycentric sample)
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

      // Vertical gradient: deep indigo at the base → light purple at the apex.
      tmp.copy(base).lerp(tip, (y + h / 2) / h);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;

      scales[i] = 0.5 + Math.random() * 0.9;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, scales, phases };
  }

  build(sizes, fog, attenuation) {
    // Large enough that the mark's edges read around the cards rather than
    // hiding behind the centred one.
    // Clamp to the viewport width too — vpHeight is constant regardless of
    // screen, so a height-only size overflows and dominates on portrait phones.
    const w = Math.min(sizes.viewport.height * 1.09, sizes.viewport.width * 0.92);
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
        uSize: { value: 0.09 },
        uBreath: { value: w * 0.012 },
        uOpacity: { value: 0.8 },
        uAttenuation: { value: attenuation },
        uFogColor: { value: new THREE.Color(fog.color) },
        uFogDensity: { value: fog.density },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    // Behind the card band, lifted so the apex peeks above the centred card.
    this.points.position.set(0, sizes.viewport.height * 0.12, -6);
    this.scene.add(this.points);
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
    // Gentle sway rather than a full spin: a flat mark rotated 90° would go
    // edge-on and vanish, and this is the brand logo — it should stay legible.
    this.points.rotation.y = Math.sin(time * 0.16) * 0.35;
  }

  onResize(sizes, nextAttenuation) {
    // Rebuild at the new scale so the mark keeps its proportion to the stage.
    const attenuation =
      nextAttenuation ?? this.material.uniforms.uAttenuation.value;
    const fog = {
      color: this.material.uniforms.uFogColor.value.getHex(),
      density: this.material.uniforms.uFogDensity.value,
    };
    this.dispose();
    this.build(sizes, fog, attenuation);
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
