import sharp from "sharp";
// Originals downloaded from the source URLs recorded in docs/image-sources.md.
const names = process.argv.slice(2);
for (const name of names.length
  ? names
  : ["laboratory", "microscope", "stethoscope", "conversation", "wellbeing"]) {
  await sharp(`/tmp/chihara-stock-${name}.jpg`)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/images/stock/${name}.webp`);
  console.log(`Optimized ${name}.webp`);
}
