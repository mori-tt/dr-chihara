import sharp from "sharp";
const images = [
  ["/tmp/chihara-doctor.jpg", "portrait"],
  ["/tmp/chihara-reception.jpg", "reception"],
  ["/tmp/chihara-lounge.jpg", "lounge"],
  ["/tmp/chihara-consultation.jpg", "consultation"],
];
for (const [input, name] of images) {
  await sharp(input).webp({ quality: 76 }).toFile(`public/images/${name}.webp`);
}
console.log("Four clinic photographs optimized as WebP.");
