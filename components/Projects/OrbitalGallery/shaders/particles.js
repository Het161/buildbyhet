// Shared point-sprite shaders for the Δ monolith and the ambient clusters.
// Fog is applied manually (additive sprites should fade toward nothing, not
// blend toward the fog colour, which is what the built-in fog chunk does).

export const particleVertex = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uSize;       // particle size in WORLD units
  uniform float uBreath;
  uniform float uAttenuation; // canvasHeightPx / (2 * tan(fov/2))

  varying vec3 vColor;
  varying float vFogDepth;
  varying float vTwinkle;

  void main() {
    vColor = aColor;

    // Pseudo-curl breathing: particles drift around their target and return.
    vec3 p = position;
    p += vec3(
      sin(aPhase + uTime * 0.50 + position.y * 0.6),
      cos(aPhase * 1.3 + uTime * 0.42 + position.x * 0.6),
      sin(aPhase * 0.7 + uTime * 0.37 + position.z * 0.6)
    ) * uBreath * aScale;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vFogDepth = -mvPosition.z;

    // Slow opacity twinkle.
    vTwinkle = 0.55 + 0.45 * sin(uTime * 0.9 + aPhase * 2.7);

    // Perspective size attenuation: a world-sized sprite in device pixels.
    gl_PointSize = uSize * aScale * uAttenuation / max(-mvPosition.z, 0.001);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFragment = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uFogColor;
  uniform float uFogDensity;

  varying vec3 vColor;
  varying float vFogDepth;
  varying float vTwinkle;

  void main() {
    // Soft circular sprite.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);

    // Additive particles dissolve into the void rather than tint toward fog.
    float fogFactor = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);

    gl_FragColor = vec4(vColor * (1.0 - fogFactor), a * uOpacity * vTwinkle);
  }
`;
