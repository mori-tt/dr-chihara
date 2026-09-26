import sharp from "sharp";
import { readFile } from "node:fs/promises";

// Rasterize the SVG favicon into PNG fallbacks used by browsers and platforms
// without SVG icon support (older Safari, iOS home screen, some crawlers).
const svg = await readFile("public/icon.svg");
const background = "#efeee9";
for (const [size, file] of [
  [512, "icon.png"],
  [180, "apple-touch-icon.png"],
]) {
  await sharp(svg, { density: 600 })
    .resize(size, size, { fit: "contain", background })
    .flatten({ background })
    .png()
    .toFile(`public/${file}`);
  console.log(`Generated ${file} (${size}x${size})`);
}
