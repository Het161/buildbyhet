// Runtime texture generator for projects whose screenshot is missing or 404s.
// Draws the project's own brand gradient plus its name in the site's mono font
// onto an offscreen canvas, so a plane never renders blank while real shots
// are pending. Aspect matches the gallery planes (3:2) to avoid distortion.
const WIDTH = 1200;
const HEIGHT = 800;

export function createPlaceholder(project) {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");

  const [c0, c1] = project.gradient || ["#1e1b20", "#120e16"];

  // Diagonal brand gradient background.
  const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  grad.addColorStop(0, c0);
  grad.addColorStop(1, c1);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle vignette so the type stays legible on light gradients.
  const vign = ctx.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.2,
    WIDTH / 2,
    HEIGHT / 2,
    HEIGHT * 0.8
  );
  vign.addColorStop(0, "rgba(0,0,0,0)");
  vign.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = vign;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Eyebrow label.
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font =
    "600 34px 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PROJECT", WIDTH / 2, HEIGHT / 2 - 90);

  // Project name, wrapped to fit.
  ctx.fillStyle = "#ffffff";
  ctx.font =
    "600 76px 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";
  wrapText(ctx, project.name || "", WIDTH / 2, HEIGHT / 2 + 10, WIDTH * 0.82, 84);

  return canvas;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}
