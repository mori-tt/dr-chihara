import sharp from "sharp";
// Originals downloaded from the source URLs recorded in docs/image-sources.md.
for (const name of ["laboratory", "microscope", "stethoscope"]) {
  await sharp(`/tmp/chihara-stock-${name}.jpg`)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/images/stock/${name}.webp`);
  console.log(`Optimized ${name}.webp`);
}
