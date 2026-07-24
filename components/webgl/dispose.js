// Recursively free every geometry, material and texture under a scene/object.
// Belt-and-braces cleanup for page-level teardown — individual systems already
// dispose their own resources, but SPA route changes must leak nothing.
export function disposeObject3D(root) {
  if (!root) return;
  root.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    const materials = Array.isArray(obj.material)
      ? obj.material
      : obj.material
      ? [obj.material]
      : [];
    materials.forEach((mat) => {
      Object.values(mat).forEach((val) => {
        if (val && val.isTexture) val.dispose();
      });
      mat.dispose();
    });
  });
}
