import sharp from "sharp";
import { stat } from "node:fs/promises";
// Generates the `name-{width}.webp` variants referenced by <Picture> (src/components/picture.tsx)
// and crops the two portrait stock photos to the landscape framing the layout actually shows.
// Idempotent: masters that are already landscape are left as they are.
const images = [
  { file: "public/images/portrait.webp", widths: [480] },
  { file: "public/images/consultation.webp", widths: [480, 960] },
  { file: "public/images/reception.webp", widths: [480] },
  { file: "public/images/lounge.webp", widths: [480] },
  { file: "public/images/stock/laboratory.webp", widths: [480, 800, 1200] },
  { file: "public/images/stock/stethoscope.webp", widths: [480, 800, 1200] },
  { file: "public/images/stock/microscope.webp", widths: [480, 800, 1200] },
  {
    file: "public/images/stock/conversation.webp",
    // 1.39:1 crop centred slightly above the middle: laptop, both cups and the hand stay in frame.
    crop: { aspect: 1.39, focus: 0.45 },
    widths: [480, 800, 1200],
  },
  {
    file: "public/images/stock/wellbeing.webp",
    // Wide banner; object-position in CSS is 50% 43%, so keep the focal band there.
    crop: { aspect: 2.2, focus: 0.43 },
    widths: [480, 800, 1200, 1600],
  },
];
const quality = 80;
for (const { file, crop, widths } of images) {
  let image = sharp(file);
  const meta = await image.metadata();
  if (crop && meta.height > meta.width) {
    const height = Math.round(meta.width / crop.aspect);
    const top = Math.min(
      meta.height - height,
      Math.max(0, Math.round(meta.height * crop.focus - height / 2)),
    );
    const cropped = await image
      .extract({ left: 0, top, width: meta.width, height })
      .webp({ quality })
      .toBuffer();
    await sharp(cropped).toFile(file);
    image = sharp(cropped);
    console.log(`Cropped ${file} → ${meta.width}x${height}`);
  }
  const { width } = await image.metadata();
  for (const w of widths.filter((w) => w < width)) {
    const out = file.replace(/\.webp$/, `-${w}.webp`);
    await image.clone().resize({ width: w }).webp({ quality }).toFile(out);
    console.log(
      `Wrote ${out} (${((await stat(out)).size / 1024).toFixed(0)} KB)`,
    );
  }
}
