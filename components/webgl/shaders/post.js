// Final composite pass: chromatic aberration that scales toward the frame
// edges (and with ring speed), a vignette, and animated film grain.
// Tuned to be felt rather than seen.
export const FinalShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAberration: { value: 0.0032 },
    uGrain: { value: 0.03 },
    uVignette: { value: 0.55 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAberration;
    uniform float uGrain;
    uniform float uVignette;

    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 centered = uv - 0.5;
      float dist = length(centered);

      // Chromatic aberration — zero at centre, strongest at the corners.
      vec2 offset = centered * dist * uAberration;
      vec4 base = texture2D(tDiffuse, uv);
      float r = texture2D(tDiffuse, uv - offset).r;
      float b = texture2D(tDiffuse, uv + offset).b;
      vec3 color = vec3(r, base.g, b);

      // Vignette.
      float vig = smoothstep(1.05, 0.3, dist);
      color *= mix(1.0, vig, uVignette);

      // Animated grain.
      float n = rand(uv * 1.7 + fract(uTime) * 13.0);
      color += (n - 0.5) * uGrain;

      gl_FragColor = vec4(color, base.a);
    }
  `,
};
