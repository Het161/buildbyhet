// Vertex: passes UVs through and applies a velocity-driven parabolic "bow"
// along the plane's width. At rest (uSpeed → 0) planes are perfectly flat;
// as the ring spins, planes curve like they're being dragged around the arc.
export const vertex = /* glsl */ `
  precision highp float;

  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uSpeed;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 p = position;
    // Geometry is a unit plane (local x ∈ [-0.5, 0.5]); nx ∈ [-1, 1].
    float nx = p.x * 2.0;
    p.z += (1.0 - nx * nx) * uSpeed; // parabolic bow, scaled by ring speed

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// Fragment: cover-fits the texture, rounds the corners with an SDF, blends
// off-centre planes toward the brand purple duotone, and honours a per-plane
// fade-in opacity so textures never pop in.
export const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;
  uniform vec2 uImageSizes;
  uniform vec2 uPlaneSizes;
  uniform float uBorderRadius; // in plane-local world units
  uniform float uDuotone;      // 0 = full colour, 1 = full purple duotone
  uniform vec3 uColorA;        // lighter purple
  uniform vec3 uColorB;        // deeper indigo
  uniform float uOpacity;      // fade-in
  uniform float uBrightness;   // edge dimming

  varying vec2 vUv;

  // Signed distance to a rounded box centred at the origin.
  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    // object-fit: cover
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec3 color = texture2D(tMap, uv).rgb;

    // Duotone grade toward the brand purple for off-centre planes.
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 duo = mix(uColorB, uColorA, lum);
    color = mix(color, duo, uDuotone);
    color *= uBrightness;

    // Rounded corners via SDF in plane-local world units. AA band is a small
    // fraction of the plane size (derivative-free — fwidth needs an extension
    // under GLSL ES 1.00, which OGL compiles by default).
    vec2 halfSize = uPlaneSizes * 0.5;
    vec2 p = (vUv - 0.5) * uPlaneSizes;
    float dist = roundedBoxSDF(p, halfSize, uBorderRadius);
    float aa = min(uPlaneSizes.x, uPlaneSizes.y) * 0.006;
    float alpha = 1.0 - smoothstep(-aa, aa, dist);

    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`;
