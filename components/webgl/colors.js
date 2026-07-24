import * as THREE from "three";

// Brand tokens shared across every WebGL scene on the site.
export const BRAND = {
  a: 0x8b31ff, // purple
  b: 0x7000ff, // indigo-dark
  rim: 0xb985ff, // purple-light (glass rim / fresnel)
};

export const FOG = {
  color: 0x0a0611, // near-black with a purple bias
  density: 0.021,
};

// Normalized [r,g,b] for shader uniforms.
export const hexToVec3 = (hex) => {
  const n = typeof hex === "string" ? parseInt(hex.replace("#", ""), 16) : hex;
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

// Lerp a hex color toward the brand purple, so per-station accents *season*
// the void rather than replacing it. bias 0 = pure accent, 1 = pure brand.
export const towardBrand = (accentHex, bias = 0.45) => {
  const a = new THREE.Color(accentHex);
  const brand = new THREE.Color(BRAND.b);
  return a.lerp(brand, bias);
};
