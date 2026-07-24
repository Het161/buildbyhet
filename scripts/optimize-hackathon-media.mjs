// Optimize raw hackathon media into web-ready WebP.
//
//   npm run media:hackathon
//
// Reads originals from  public/hackathon/<FOLDER>/
// Emits optimized WebP  public/hackathon/_opt/<folder-lowercase>/<slug>-<size>.webp
//   - <slug>-800.webp   (cover:   800px long edge, q80)
//   - <slug>-1600.webp  (gallery: 1600px long edge, q80)
//
// Idempotent (skips when the output is newer than the input). HEIC inputs are
// transcoded to JPEG via macOS `sips` first (sharp lacks HEIC on most setups).
// Only the _opt/ paths should be referenced from constants.js.

import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "public", "hackathon");
const OUT_ROOT = path.join(ROOT, "_opt");

const SIZES = [
  { suffix: "800", edge: 800 },
  { suffix: "1600", edge: 1600 },
];
const RASTER = /\.(jpe?g|png|webp)$/i;
const HEIC = /\.(heic|heif)$/i;

const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "_opt") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function newer(src, dest) {
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dest)]);
    return d.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

// HEIC → temp JPEG via macOS sips.
function heicToJpeg(src) {
  const tmp = path.join(os.tmpdir(), `${slugify(path.basename(src))}-${Date.now()}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", src, "--out", tmp], {
    stdio: "ignore",
  });
  return tmp;
}

async function run() {
  let originals = 0;
  let optimized = 0;
  let written = 0;
  let skipped = 0;
  const big = [];

  let files;
  try {
    files = await walk(ROOT);
  } catch {
    console.error(`No media folder at ${ROOT}`);
    process.exit(1);
  }

  for (const src of files) {
    const isHeic = HEIC.test(src);
    if (!RASTER.test(src) && !isHeic) continue; // skip pdf/pptx/etc

    const stat = await fs.stat(src);
    originals += stat.size;
    if (stat.size > 8 * 1024 * 1024) big.push([src, stat.size]);

    const rel = path.relative(ROOT, src);
    const folder = rel.split(path.sep)[0].toLowerCase();
    const slug = slugify(path.basename(src));
    const outDir = path.join(OUT_ROOT, folder);
    await fs.mkdir(outDir, { recursive: true });

    let input = src;
    let tmp = null;
    for (const { suffix, edge } of SIZES) {
      const dest = path.join(outDir, `${slug}-${suffix}.webp`);
      if (await newer(src, dest)) {
        optimized += (await fs.stat(dest)).size;
        skipped += 1;
        continue;
      }
      if (isHeic && !tmp) {
        tmp = heicToJpeg(src);
        input = tmp;
      }
      await sharp(input)
        .rotate() // honour EXIF orientation
        .resize(edge, edge, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest);
      optimized += (await fs.stat(dest)).size;
      written += 1;
    }
    if (tmp) await fs.rm(tmp, { force: true });
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(`\nHackathon media optimized → ${path.relative(process.cwd(), OUT_ROOT)}`);
  console.log(`  written: ${written}  skipped(up-to-date): ${skipped}`);
  console.log(`  originals: ${mb(originals)} MB  →  optimized: ${mb(optimized)} MB`);
  if (big.length) {
    console.log(`\n  ⚠ originals > 8MB (consider removing from the repo later):`);
    big.forEach(([f, s]) => console.log(`     ${mb(s)} MB  ${path.relative(ROOT, f)}`));
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
