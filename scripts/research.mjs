import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
for (const [name, url] of [
  ["reference", "https://daisukesugiyama.jp/"],
  ["doctor", "https://www.norris-beauty-clinic.com/doctor/"],
]) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `/tmp/chihara-${name}.png`, fullPage: false });
  console.log(name, await page.title());
  console.log(
    await page
      .locator("body")
      .evaluate((el) => ({
        font: getComputedStyle(el).fontFamily,
        background: getComputedStyle(el).backgroundColor,
        headings: [...el.querySelectorAll("h1,h2")]
          .map((e) => e.textContent.trim())
          .slice(0, 12),
      })),
  );
}
await browser.close();
