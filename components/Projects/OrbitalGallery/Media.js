import { Mesh, Plane, Program, Texture } from "ogl";
import gsap from "gsap";
import { vertex, fragment } from "./shaders";
import { createPlaceholder } from "./placeholder";

// One textured plane on the orbital ring. Owns its geometry, program, texture
// (placeholder → real, async) and computes its position/rotation along the
// circular arc every frame.
export default class Media {
  constructor({ gl, scene, project, index, length, sizes, colors }) {
    this.gl = gl;
    this.scene = scene;
    this.project = project;
    this.index = index;
    this.length = length;
    this.colors = colors;
    this.appear = 0; // 0 → 1 on texture load, for a subtle pop-in

    this.createProgram();
    this.createMesh();
    this.createTexture();
    this.onResize(sizes);
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      transparent: true,
      // Depth-tested so the centred plane (nudged toward the camera in
      // update()) stacks on top of its neighbours where they overlap.
      depthTest: true,
      depthWrite: true,
      uniforms: {
        tMap: { value: new Texture(this.gl) },
        uImageSizes: { value: [1200, 800] },
        uPlaneSizes: { value: [1, 1] },
        uBorderRadius: { value: 0.4 },
        uDuotone: { value: 0 },
        uColorA: { value: this.colors.a },
        uColorB: { value: this.colors.b },
        uOpacity: { value: 0 },
        uBrightness: { value: 1 },
        uSpeed: { value: 0 },
      },
    });
  }

  createMesh() {
    this.geometry = new Plane(this.gl, {
      widthSegments: 24,
      heightSegments: 24,
    });
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
  }

  createTexture() {
    const texture = this.program.uniforms.tMap.value;
    texture.generateMipmaps = true;

    // Immediate placeholder so nothing is ever blank.
    const placeholder = createPlaceholder(this.project);
    texture.image = placeholder;
    this.program.uniforms.uImageSizes.value = [
      placeholder.width,
      placeholder.height,
    ];

    if (!this.project.image) {
      this.fadeIn();
      return;
    }

    const img = new Image();
    img.decoding = "async";
    img.src = this.project.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
      this.fadeIn();
    };
    // Missing screenshot → keep the gradient placeholder, still fade it in.
    img.onerror = () => this.fadeIn();
  }

  fadeIn() {
    gsap.to(this.program.uniforms.uOpacity, {
      value: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    // Subtle scale pop-in alongside the opacity fade.
    gsap.to(this, { appear: 1, duration: 0.9, ease: "power3.out" });
  }

  // Position the plane along the arc for the current scroll offset.
  // y = -(R - sqrt(R² - x²)) puts the centred plane at the top of the arc and
  // curves the rest down toward the horizon; rotation follows the tangent.
  update(scroll, speed) {
    this.program.uniforms.uSpeed.value = speed;

    const total = this.widthTotal;
    let x = this.baseX + scroll;
    x = ((x % total) + total) % total; // 0 .. total
    if (x > total / 2) x -= total; // -total/2 .. total/2
    this.x = x;

    const R = this.arcRadius;
    const ax = Math.min(Math.abs(x), R * 0.999);
    const root = Math.sqrt(R * R - ax * ax);
    const y = -(R - root);
    const tilt = Math.atan(ax / root) * Math.sign(x) * -1;

    // Centre grading: the plane crossing the top of the arc is full colour and
    // slightly larger; planes toward the edges dim and blend to purple.
    const centered = 1 - Math.min(Math.abs(x) / (this.planeWidth * 1.15), 1);
    this.centered = centered;

    this.mesh.position.x = x;
    this.mesh.position.y = y + this.arcLift;
    this.mesh.position.z = centered * this.planeWidth * 0.15; // pop toward camera
    this.mesh.rotation.z = tilt;
    this.program.uniforms.uDuotone.value = (1 - centered) * 0.65;
    this.program.uniforms.uBrightness.value = 0.5 + centered * 0.5;

    const appear = 0.9 + 0.1 * this.appear;
    const scale = (1 + centered * 0.08) * appear;
    this.mesh.scale.set(this.planeWidth * scale, this.planeHeight * scale, 1);
  }

  onResize(sizes) {
    const { viewport, planeWidth, planeHeight, spacing, arcRadius, arcLift } =
      sizes;
    this.viewport = viewport;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.spacing = spacing;
    this.arcRadius = arcRadius;
    this.arcLift = arcLift;

    this.widthTotal = spacing * this.length;
    this.baseX = this.index * spacing;

    this.mesh.scale.set(planeWidth, planeHeight, 1);
    this.program.uniforms.uPlaneSizes.value = [planeWidth, planeHeight];
    this.program.uniforms.uBorderRadius.value = Math.min(planeWidth, planeHeight) * 0.06;
  }

  destroy() {
    this.mesh.setParent(null);
    const tex = this.program.uniforms.tMap.value;
    if (tex?.texture) this.gl.deleteTexture(tex.texture);
    if (this.geometry?.attributes) {
      Object.values(this.geometry.attributes).forEach((attr) => {
        if (attr.buffer) this.gl.deleteBuffer(attr.buffer);
      });
    }
    if (this.program?.program) this.gl.deleteProgram(this.program.program);
  }
}
