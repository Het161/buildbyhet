// Card shaders for three's ShaderMaterial. three injects position/uv/normal
// and the matrix uniforms automatically, so they're never redeclared here.
// Fog chunks are included so distant cards dissolve into the void.

export const slabVertex = /* glsl */ `
  #include <common>
  #include <fog_pars_vertex>

  uniform float uSpeed;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDirW;

  void main() {
    vUv = uv;

    vec3 p = position;
    // Velocity bow: geometry is a unit plane (local x ∈ [-0.5, 0.5]).
    float nx = p.x * 2.0;
    p.z += (1.0 - nx * nx) * uSpeed;

    vec4 worldPos = modelMatrix * vec4(p, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDirW = normalize(cameraPosition - worldPos.xyz);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    #include <fog_vertex>
  }
`;

export const slabFragment = /* glsl */ `
  #include <common>
  #include <fog_pars_fragment>

  uniform sampler2D tMap;
  uniform vec2 uImageSizes;
  uniform vec2 uPlaneSizes;
  uniform float uBorderRadius;
  uniform float uDuotone;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uRimColor;
  uniform float uOpacity;
  uniform float uBrightness;
  uniform float uCentered;
  uniform float uTime;
  uniform float uRim;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewDirW;

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

    // Duotone grade toward brand purple for off-centre cards.
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 duo = mix(uColorB, uColorA, lum);
    color = mix(color, duo, uDuotone);
    color *= uBrightness;

    // Rounded-corner mask (plane-local units, derivative-free AA).
    vec2 halfSize = uPlaneSizes * 0.5;
    vec2 p = (vUv - 0.5) * uPlaneSizes;
    float dist = roundedBoxSDF(p, halfSize, uBorderRadius);
    float aa = min(uPlaneSizes.x, uPlaneSizes.y) * 0.006;
    float alpha = 1.0 - smoothstep(-aa, aa, dist);

    // --- Glass treatment -------------------------------------------------
    // Edge-proximity rim: a bright inner border that reads as a glass edge.
    // dist is negative inside the box and 0 at the border, so this ramps up
    // only as we approach the edge (deep interior stays untinted).
    float edgeBand = min(uPlaneSizes.x, uPlaneSizes.y) * 0.045;
    float rimMask = smoothstep(-edgeBand, 0.0, dist);

    // Fresnel: brighter where the surface grazes the view direction.
    float fres = pow(1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDirW)), 0.0, 1.0), 2.5);

    float rim = clamp(rimMask * (0.45 + fres * 1.4), 0.0, 1.0) * uRim;
    color = mix(color, uRimColor, rim * 0.62);

    // Slow sheen sweep across the surface.
    float sheen = smoothstep(0.35, 0.5, sin((vUv.x + vUv.y) * 2.2 - uTime * 0.35) * 0.5 + 0.5);
    color += uRimColor * sheen * 0.05 * (0.4 + fres);

    // Off-centre cards are slightly translucent.
    float bodyAlpha = mix(0.88, 1.0, uCentered);
    float outAlpha = alpha * uOpacity * max(bodyAlpha, rim);

    gl_FragColor = vec4(color, outAlpha);

    #include <fog_fragment>
  }
`;
