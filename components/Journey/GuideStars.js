import * as THREE from "three";

// Chapter 2 — "Manoj sir and Pradeep sir." Two lights that emerge as the two
// teachers do, then stay faintly present through every chapter after, because
// "everything after that is downstream of it." Not decoration — the copy.
const vertex = /* glsl */ `
  attribute float aPhase;
  attribute float aScale;
  uniform float uTime;
  uniform float uSize;
  uniform float uAttenuation;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vTwinkle = 0.72 + 0.28 * sin(uTime * 0.8 + aPhase * 3.1);
    gl_PointSize = uSize * aScale * uAttenuation * vTwinkle / max(-mv.z, 0.001);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uBrightness;
  uniform vec3 uColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    float core = pow(glow, 5.0);
    // Bright core + soft halo so the pair reads even over the busy field.
    float a = (glow * 0.7 + core * 1.4) * uBrightness * vTwinkle;
    gl_FragColor = vec4(uColor, a);
  }
`;

const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;

export default class GuideStars {
  constructor({ scene, center, width, attenuation }) {
    this.scene = scene;
    this.build(center, width, attenuation);
  }

  build(center, width, attenuation) {
    // Two stars flanking the upper Δ — a little apart, a little uneven, so they
    // read as two people and not a symmetrical ornament.
    const h = width / 0.95;
    const a = new THREE.Vector3(-width * 0.36, h * 0.5, 0.8).add(center);
    const b = new THREE.Vector3(width * 0.34, h * 0.64, 0.4).add(center);

    const positions = new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]);
    const scales = new Float32Array([1.15, 1.0]);
    const phases = new Float32Array([0.0, 1.7]);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.4 },
        uAttenuation: { value: attenuation },
        uBrightness: { value: 0 },
        // Warm starlight, distinct from the cold Δ — it warms nobody, it guides.
        uColor: { value: new THREE.Color(0xffe9c4) },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  // p is global scroll progress (0..1). Chapter 2 spans p ∈ [0.125, 0.25].
  update(time, p) {
    const u = this.material.uniforms;
    u.uTime.value = time;
    // Emerge across early ch2, then settle to a faint, permanent presence.
    const rise = smoothstep(0.1, 0.2, p);
    const settle = smoothstep(0.22, 0.34, p);
    u.uBrightness.value = rise * lerp(1.0, 0.42, settle);
  }

  setAttenuation(aten) {
    this.material.uniforms.uAttenuation.value = aten;
  }

  dispose() {
    this.scene.remove(this.points);
    this.geometry.dispose();
    this.material.dispose();
  }
}
