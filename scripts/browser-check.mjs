import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const base = (
  process.env.TEST_URL || "http://127.0.0.1:4173/dr-chihara"
).replace(/\/$/, "");
const browser = await chromium.launch({ headless: true });
await mkdir("test-results", { recursive: true });
const errors = [];
for (const width of [1440, 768, 390, 320]) {
  for (const [locale, path, lang] of [
    ["ja", "/", "ja"],
    ["en", "/en/", "en"],
    ["zh", "/zh/", "zh-Hans"],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height: 960 },
      deviceScaleFactor: 1,
    });
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400 && r.url().startsWith(base))
        errors.push(`${r.status()} ${r.url()}`);
    });
    const response = await page.goto(`${base}${path}`, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("html").getAttribute("lang"), lang);
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(await page.locator('link[rel="canonical"]').getAttribute("href"));
    assert.equal(
      await page.locator('link[rel="alternate"][hreflang]').count(),
      4,
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow ${locale} ${width}`,
    );
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el) => el.decode());
    }
    assert.equal(
      await page
        .locator("img")
        .evaluateAll(
          (imgs) =>
            imgs.filter((img) => !img.complete || !img.naturalWidth).length,
        ),
      0,
      `Broken images ${locale} ${width}`,
    );
    const internalAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    for (const id of internalAnchors)
      assert.ok(await page.locator(id).count(), `Missing anchor ${id}`);
    const before = await page.locator(".career-row").count();
    await page.locator(".career-toggle").click();
    assert.equal(await page.locator(".career-row").count(), 11);
    await page.locator(".career-toggle").click();
    assert.equal(await page.locator(".career-row").count(), before);
    await page.locator(".menu-button").click();
    assert.equal(await page.locator('[role="dialog"]').count(), 1);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('[role="dialog"]').count(), 0);
    await page.locator(".menu-button").click();
    await page.locator('.menu-inner>a[href="#clinic"]').click();
    assert.equal(await page.locator('[role="dialog"]').count(), 0);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(100);
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `test-results/${locale}-${width}.png`,
        fullPage: true,
      });
    const language = page
      .locator(".header .languages a")
      .filter({ hasText: locale === "en" ? "中文" : "EN" });
    await language.click();
    await page.waitForLoadState("networkidle");
    assert.equal(
      await page.locator("html").getAttribute("lang"),
      locale === "en" ? "zh-Hans" : "en",
    );
    console.log(
      `PASS ${locale} ${width}px: language, layout, images, anchors, menu, career, metadata`,
    );
    await page.close();
  }
}
const nojs = await browser.newPage({ javaScriptEnabled: false });
await nojs.goto(base + "/en/");
assert.ok(
  (await nojs.locator("body").innerText()).includes("A scientific mind."),
);
console.log("PASS static HTML readable with JavaScript disabled");
await browser.close();
assert.deepEqual(errors, [], "Browser or asset errors");
