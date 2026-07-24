import * as THREE from "three";
import { particleVertex, particleFragment } from "./shaders/particles";

// Ambient dust clusters at varied depths around the orbit. Deep clusters
// dissolve into the fog — atmosphere, never confetti.
const PALETTE = [0x8b31ff, 0x7000ff, 0xb985ff, 0xc94fd6, 0x4f6dff];

export default class ParticleField {
  constructor({ scene, clusterCount, clusterSize, sizes, fog, attenuation }) {
    this.scene = scene;
    this.clusterCount = clusterCount;
    this.clusterSize = clusterSize;
    this.clusters = [];
    this.build(sizes, fog, attenuation);
  }

  build(sizes, fog, attenuation) {
    this.fog = fog;
    this.attenuation = attenuation;

    const { width: vw, height: vh } = sizes.viewport;
    const tmp = new THREE.Color();

    for (let c = 0; c < this.clusterCount; c++) {
      const count = this.clusterSize;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const phases = new Float32Array(count);

      // Cloud extent — wide and flat-ish so it reads as drifting dust.
      const radius = vw * (0.28 + Math.random() * 0.22);

      for (let i = 0; i < count; i++) {
        // Gaussian-ish falloff toward the cluster centre.
        const r = Math.pow(Math.random(), 0.6) * radius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
        positions[i * 3 + 2] = r * Math.cos(phi) * 0.7;

        tmp.set(PALETTE[(Math.random() * PALETTE.length) | 0]);
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;

        scales[i] = 0.25 + Math.random() * 0.6;
        phases[i] = Math.random() * Math.PI * 2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
      geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 0.055 },
          uBreath: { value: radius * 0.02 },
          uOpacity: { value: 0.5 },
          uAttenuation: { value: attenuation },
          uFogColor: { value: new THREE.Color(fog.color) },
          uFogDensity: { value: fog.density },
        },
      });

      const points = new THREE.Points(geometry, material);
      points.frustumCulled = false;
      points.position.set(
        (Math.random() - 0.5) * vw * 1.4,
        (Math.random() - 0.5) * vh * 0.7,
        -6 - Math.random() * 22 // spread through depth, far ones fog out
      );

      this.scene.add(points);
      this.clusters.push({
        points,
        geometry,
        material,
        drift: (Math.random() - 0.5) * 0.02,
      });
    }
  }

  update(time) {
    this.clusters.forEach(({ points, material, drift }) => {
      material.uniforms.uTime.value = time;
      points.rotation.y = time * drift;
      points.rotation.z = time * drift * 0.4;
    });
  }

  onResize(sizes, nextAttenuation) {
    const { fog } = this;
    const attenuation = nextAttenuation ?? this.attenuation;
    this.dispose();
    this.clusters = [];
    this.build(sizes, fog, attenuation);
  }

  dispose() {
    this.clusters.forEach(({ points, geometry, material }) => {
      this.scene.remove(points);
      geometry.dispose();
      material.dispose();
    });
    this.clusters = [];
  }
}
