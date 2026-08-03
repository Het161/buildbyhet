import * as THREE from "three";

// The Δ that ASSEMBLES. Each particle has a scattered start (aScatter) and its
// final Δ target (position); uProgress ∈ [0,1] lerps between them, scrubbed by
// scroll. uSaturation drives the desaturated→brand-purple arc. Isolated from
// the shared Monolith so the shared particle shader stays untouched.
const vertex = /* glsl */ `
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aPhase;

  uniform float uTime;
  uniform float uSize;
  uniform float uAttenuation;
  uniform float uProgress;   // 0 = scattered, 1 = assembled
  uniform float uBreath;
  uniform float uChapter;    // continuous chapter, p*8 ∈ [0,8]
  uniform float uSpan;       // Δ width, the unit for motion amplitudes

  varying vec3 vColor;
  varying float vFogDepth;
  varying float vTwinkle;

  // Triangular window peaking at a chapter's centre — how strongly that
  // chapter's motion character applies right now.
  float win(float c, float halfw) {
    return 1.0 - smoothstep(0.0, halfw, abs(uChapter - c));
  }

  void main() {
    vColor = aColor;

    // Per-particle stagger so the Δ assembles organically, not all at once.
    float stagger = fract(aPhase * 0.159);
    float lp = clamp((uProgress - stagger * 0.18) / 0.82, 0.0, 1.0);
    lp = lp * lp * (3.0 - 2.0 * lp); // smoothstep

    vec3 p = mix(aScatter, position, lp);

    // Drift is large while scattered, settles as it assembles.
    float drift = uBreath * (0.35 + 1.15 * (1.0 - lp));
    p += vec3(
      sin(aPhase + uTime * 0.45 + aScatter.y * 0.4),
      cos(aPhase * 1.3 + uTime * 0.38 + aScatter.x * 0.4),
      sin(aPhase * 0.7 + uTime * 0.33 + aScatter.z * 0.4)
    ) * drift * aScale;

    // ---- Per-chapter motion character -----------------------------------
    // Layered onto the scattered cloud and faded out by assembly (amp), so it
    // is felt in the early chapters and never fights the final Δ lock. Each is
    // the chapter's story, not ornament.
    float amp = 1.0 - lp;

    // ch1 — aimless drift. The directionless early years: a slow, purposeless
    // wander with no shared heading.
    float w1 = win(0.5, 1.1);
    p += vec3(
      sin(uTime * 0.18 + aPhase * 1.1),
      sin(uTime * 0.15 + aPhase * 1.7 + 1.3),
      cos(uTime * 0.12 + aPhase * 0.9)
    ) * (w1 * amp * uSpan * 0.05);

    // ch3 — self-organizing lattice. No tuition, teaching himself: the cloud
    // pulls toward a loose grid, order emerging from nothing.
    float w3 = win(2.5, 0.9);
    float L = uSpan * 0.17;
    vec3 node = floor(aScatter / L + 0.5) * L;
    p += (node - aScatter) * (0.55 * w3 * amp);

    // ch4 — two exchanging streams. School in the morning, the shop floor in
    // the afternoon: two flows biased left/right, trading places over time.
    float w4 = win(3.5, 0.85);
    float side = sign(aScatter.x + 0.0001);
    float swap = sin(uTime * 0.22 + aPhase * 0.15);
    p += vec3(
      side * uSpan * 0.42 - aScatter.x,
      swap * uSpan * 0.16,
      0.0
    ) * (0.35 * w4 * amp);

    // ch5 — redirect and curl. The plan changed; he turned toward code. The
    // whole field rotates and swirls onto a new heading.
    float w5 = win(4.5, 0.85);
    float ang = 0.55 * w5 * amp + sin(uTime * 0.25) * 0.08 * w5;
    float cs = cos(ang), sn = sin(ang);
    vec2 rot = vec2(p.x * cs - p.y * sn, p.x * sn + p.y * cs);
    p.xy = mix(p.xy, rot, w5 * amp);

    // ch6 — fast orbit, no formation, a downward sag. The honest low: motion
    // without progress, and a quiet loss of altitude.
    float w6 = win(5.5, 0.85);
    float oa = uTime * 0.85 + aPhase * 2.0;
    p.xy += vec2(cos(oa), sin(oa)) * (uSpan * 0.045 * w6 * amp);
    p.y -= uSpan * 0.13 * w6 * amp;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vFogDepth = -mvPosition.z;
    vTwinkle = 0.55 + 0.45 * sin(uTime * 0.9 + aPhase * 2.7);

    gl_PointSize = uSize * aScale * uAttenuation / max(-mvPosition.z, 0.001);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  uniform float uSaturation;  // 0 = grey, 1 = full colour
  uniform vec3 uFogColor;
  uniform float uFogDensity;

  varying vec3 vColor;
  varying float vFogDepth;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);

    // Desaturate toward luminance for the cold opening.
    float grey = dot(vColor, vec3(0.299, 0.587, 0.114));
    vec3 color = mix(vec3(grey), vColor, uSaturation);

    float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
    gl_FragColor = vec4(color * (1.0 - fogFactor), a * uOpacity * vTwinkle);
  }
`;

export default class JourneyMonolith {
  constructor({ scene, count, width, position, fog, attenuation }) {
    this.scene = scene;
    this.count = count;
    this.build(width, position, fog, attenuation);
  }

  build(width, position, fog, attenuation) {
    const n = this.count;
    const w = width;
    const h = w / 0.95;
    const depth = w * 0.22;

    const positions = new Float32Array(n * 3); // Δ targets
    const scatter = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const scales = new Float32Array(n);
    const phases = new Float32Array(n);

    const apex = [0, h / 2];
    const bl = [-w / 2, -h / 2];
    const br = [w / 2, -h / 2];
    const barY = -h / 2 + h * 0.22;
    const barHalf = w * 0.28;
    const base = new THREE.Color(0x7000ff);
    const tip = new THREE.Color(0xb985ff);
    const tmp = new THREE.Color();
    const scatterR = w * 1.6;

    for (let i = 0; i < n; i++) {
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

      // Scattered start — a loose cloud filling the void.
      scatter[i * 3] = (Math.random() - 0.5) * scatterR * 2;
      scatter[i * 3 + 1] = (Math.random() - 0.5) * scatterR * 1.4;
      scatter[i * 3 + 2] = (Math.random() - 0.5) * scatterR;

      tmp.copy(base).lerp(tip, (y + h / 2) / h);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;

      scales[i] = 0.5 + Math.random() * 0.9;
      phases[i] = Math.random() * Math.PI * 2;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
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
        uSize: { value: 0.085 },
        uAttenuation: { value: attenuation },
        uProgress: { value: 0 },
        uSaturation: { value: 0.1 },
        uBreath: { value: w * 0.02 },
        uChapter: { value: 0 },
        uSpan: { value: w },
        uOpacity: { value: 0.9 },
        uFogColor: { value: new THREE.Color(fog.color) },
        uFogDensity: { value: fog.density },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.points.position.copy(position);
    this.scene.add(this.points);
  }

  update(time, { progress, saturation, fogDensity, chapter, rotation = 0 }) {
    const u = this.material.uniforms;
    u.uTime.value = time;
    if (progress != null) u.uProgress.value = progress;
    if (saturation != null) u.uSaturation.value = saturation;
    if (fogDensity != null) u.uFogDensity.value = fogDensity;
    if (chapter != null) u.uChapter.value = chapter;
    // Barely rotates once assembled; still while scattered.
    this.points.rotation.y = Math.sin(time * 0.12) * 0.18 * (progress ?? 0);
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
