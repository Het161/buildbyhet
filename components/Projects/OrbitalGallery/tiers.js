// Device capability tiers, detected once at init.
//   1 = desktop: full scene
//   2 = mobile / low-memory: reduced particles, no bloom, lower DPR, no parallax
//   3 = handled upstream in Projects.js (reduced-motion / no WebGL / context lost)
export function detectTier() {
  if (typeof window === "undefined") return 2;

  const coarse =
    window.matchMedia?.("(pointer: coarse)")?.matches ||
    "ontouchstart" in window;
  const memory = navigator.deviceMemory || 4;
  const small = Math.min(window.innerWidth, window.innerHeight) < 768;

  if (coarse || small || memory <= 4) return 2;
  return 1;
}

export const TIER_CONFIG = {
  1: {
    dpr: 2,
    heroParticles: 12000,
    clusterCount: 4,
    clusterSize: 3000,
    bloom: true,
    post: true,
    parallax: true,
  },
  2: {
    dpr: 1.5,
    heroParticles: 6000,
    clusterCount: 2,
    clusterSize: 1400,
    bloom: false,
    post: true,
    parallax: false,
  },
};

export const getTierConfig = (tier) => TIER_CONFIG[tier] || TIER_CONFIG[2];
