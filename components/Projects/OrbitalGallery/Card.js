import GlassSlab from "../../webgl/GlassSlab";

// Deterministic pseudo-random so the cluster layout is stable across reloads.
const rand = (seed) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const DEG = Math.PI / 180;

// A glass slab placed on the Void Orbit ring. Extends the shared slab with the
// homepage's arc placement, jitter and idle float; the ring motion (scroll →
// position) lives in Gallery.
export default class Card extends GlassSlab {
  constructor({ scene, project, index, length, sizes, colors, maxAnisotropy }) {
    super({ scene, project, colors, maxAnisotropy });

    this.index = index;
    this.length = length;

    this.hover = 0; // eased hover amount
    this.hoverTarget = 0;
    this.centered = 0;

    const r1 = rand(index + 1);
    const r2 = rand(index + 7.3);
    const r3 = rand(index + 13.7);
    const r4 = rand(index + 21.1);

    // Jitter turns the carousel into a floating cluster.
    this.jitter = {
      radius: 1 + (r1 - 0.5) * 0.16, // ±8% arc radius
      z: (r2 - 0.5) * 0.55, // depth variation → parallax + fog
      y: (r3 - 0.5) * 0.12, // small vertical offset
      tiltZ: (r4 - 0.5) * 10 * DEG, // ±5°
      tiltY: (r1 - 0.5) * 16 * DEG, // ±8°
      floatPhase: r2 * Math.PI * 2,
      floatSpeed: 0.45 + r3 * 0.5,
      floatAmp: 0.02 + r4 * 0.025,
    };

    this.onResize(sizes);
  }

  // Arc placement: y = -(R - √(R² - x²)) puts the centred card at the top of
  // the arc, the rest curving down toward the horizon; rotation follows the
  // tangent. Jitter + float lift it off the rails into a floating cluster.
  update(scroll, speed, time) {
    this.tick(time, speed);

    const total = this.widthTotal;
    let x = this.baseX + scroll;
    x = ((x % total) + total) % total;
    if (x > total / 2) x -= total;
    this.x = x;

    const R = this.arcRadius * this.jitter.radius;
    const ax = Math.min(Math.abs(x), R * 0.999);
    const root = Math.sqrt(R * R - ax * ax);
    const y = -(R - root);
    const tilt = Math.atan(ax / root) * Math.sign(x) * -1;

    const centered = 1 - Math.min(Math.abs(x) / (this.planeWidth * 1.15), 1);
    this.centered = centered;
    this.hover += (this.hoverTarget - this.hover) * 0.12;

    const float =
      Math.sin(time * this.jitter.floatSpeed + this.jitter.floatPhase) *
      this.jitter.floatAmp *
      this.planeHeight;

    this.mesh.position.set(
      x,
      y + this.arcLift + this.jitter.y * this.planeHeight + float,
      this.jitter.z * this.planeWidth * 0.5 + centered * this.planeWidth * 0.15
    );
    this.mesh.rotation.set(0, this.jitter.tiltY, tilt + this.jitter.tiltZ);

    this.grade(centered, this.hover);
  }

  onResize(sizes) {
    const { planeWidth, planeHeight, spacing, arcRadius, arcLift } = sizes;
    this.spacing = spacing;
    this.arcRadius = arcRadius;
    this.arcLift = arcLift;

    this.widthTotal = spacing * this.length;
    this.baseX = this.index * spacing;

    this.setPlaneSizes(planeWidth, planeHeight);
  }
}
