import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

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

// Pack PNG frames into a .ico container for /favicon.ico. Browsers and some
// crawlers request it directly even when <link> icons exist.
const icoSizes = [32, 48];
const frames = [];
for (const size of icoSizes) {
  const data = await sharp(svg, { density: 600 })
    .resize(size, size, { fit: "contain", background })
    .flatten({ background })
    .png()
    .toBuffer();
  frames.push({ size, data });
}
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(frames.length, 4);
const entries = Buffer.alloc(16 * frames.length);
let offset = 6 + 16 * frames.length;
frames.forEach(({ size, data }, i) => {
  const at = i * 16;
  entries.writeUInt8(size === 256 ? 0 : size, at);
  entries.writeUInt8(size === 256 ? 0 : size, at + 1);
  entries.writeUInt8(0, at + 2); // palette
  entries.writeUInt8(0, at + 3); // reserved
  entries.writeUInt16LE(1, at + 4); // color planes
  entries.writeUInt16LE(32, at + 6); // bits per pixel
  entries.writeUInt32LE(data.length, at + 8);
  entries.writeUInt32LE(offset, at + 12);
  offset += data.length;
});
await writeFile(
  "public/favicon.ico",
  Buffer.concat([header, entries, ...frames.map((f) => f.data)]),
);
console.log(`Generated favicon.ico (${icoSizes.join("+")}px frames)`);
