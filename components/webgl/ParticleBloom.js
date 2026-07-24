import * as THREE from "three";
import { particleVertex, particleFragment } from "./shaders/particles";

// A small localized additive particle cluster in a single colour, placed at a
// world position. Used for per-station accent blooms on the hackathons path.
export default class ParticleBloom {
  constructor({
    scene,
    center,
    color,
    count = 500,
    radius = 5,
    size = 0.05,
    opacity = 0.5,
    fog,
    attenuation,
  }) {
    this.scene = scene;
    this.opacity = opacity;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const c = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      // Gaussian-ish falloff toward the centre.
      const r = Math.pow(Math.random(), 0.7) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      scales[i] = 0.3 + Math.random() * 0.7;
      phases[i] = Math.random() * Math.PI * 2;
    }

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
        uSize: { value: size },
        uBreath: { value: radius * 0.03 },
        uOpacity: { value: opacity },
        uAttenuation: { value: attenuation },
        uFogColor: { value: new THREE.Color(fog.color) },
        uFogDensity: { value: fog.density },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.points.position.copy(center);
    scene.add(this.points);
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
    this.points.rotation.y = time * 0.05;
  }

  setAttenuation(a) {
    this.material.uniforms.uAttenuation.value = a;
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
