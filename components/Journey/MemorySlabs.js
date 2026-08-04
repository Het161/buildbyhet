import * as THREE from "three";
import gsap from "gsap";
import GlassSlab from "../webgl/GlassSlab";
import { BRAND } from "../webgl/colors";

const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Memory objects — the artifacts of the story as glass slabs floating right of
// centre, one per chapter that has one. They fade in with their chapter and
// warm with the arc via the slab's own shader duotone (never a CSS filter).
// A chapter with no artifact makes no slab — absence leaves no gap. Click a
// slab to open it (raycast handled by the scene; lightbox is the wrapper's).
export default class MemorySlabs {
  constructor({ scene, chapters, center, viewportHeight, maxAnisotropy = 1 }) {
    this.n = chapters.length;
    this.items = [];
    const w = viewportHeight * 0.3;
    const h = w * 0.66;

    chapters.forEach((ch, i) => {
      if (!ch.artifact?.src) return;
      const slab = new GlassSlab({
        scene,
        project: { name: ch.title, image: null, gradient: ["#251a35", "#130e1b"] },
        colors: BRAND,
        maxAnisotropy,
      });
      slab.setPlaneSizes(w, h);
      // We drive opacity per-chapter, so cancel the slab's own load fade.
      gsap.killTweensOf(slab.material.uniforms.uOpacity);
      slab.material.uniforms.uOpacity.value = 0;
      slab.loadImage(ch.artifact.src);
      const base = new THREE.Vector3(
        center.x + w * 1.35,
        center.y + h * 0.2,
        center.z + w * 0.9
      );
      slab.mesh.position.copy(base);
      slab.mesh.visible = false;
      this.items.push({ slab, i, base, artifact: ch.artifact, h });
    });
  }

  hasAny() {
    return this.items.length > 0;
  }

  visibleMeshes() {
    return this.items.filter((it) => it.slab.mesh.visible).map((it) => it.slab.mesh);
  }

  artifactForMesh(mesh) {
    return this.items.find((it) => it.slab.mesh === mesh)?.artifact || null;
  }

  update(time, { p, saturation, camera }) {
    for (const it of this.items) {
      const local = p * this.n - it.i;
      const vis =
        smoothstep(0.06, 0.28, local) * (1 - smoothstep(0.72, 0.96, local));
      const u = it.slab.material.uniforms;
      if (vis < 0.01) {
        it.slab.mesh.visible = false;
        continue;
      }
      it.slab.mesh.visible = true;
      it.slab.tick(time);
      it.slab.grade(1); // focused whenever shown
      u.uOpacity.value = vis;
      // Warm with the arc — shader duotone. Cold/tinted early, true colour late.
      u.uDuotone.value = (1 - saturation) * 0.7;
      it.slab.mesh.position.set(
        it.base.x,
        it.base.y + Math.sin(time * 0.5 + it.i) * it.h * 0.03,
        it.base.z
      );
      if (camera) it.slab.mesh.lookAt(camera.position);
    }
  }

  dispose() {
    this.items.forEach((it) => it.slab.dispose());
    this.items = [];
  }
}
