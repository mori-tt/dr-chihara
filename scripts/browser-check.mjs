import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const base = (
  process.env.TEST_URL || "http://127.0.0.1:4173/dr-chihara"
).replace(/\/$/, "");
const browser = await chromium.launch({ headless: true });
await mkdir("test-results", { recursive: true });
const errors = [];
for (const width of (process.env.TEST_WIDTHS || "1440,768,390,320")
  .split(",")
  .map(Number)) {
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
    await page.emulateMedia({ reducedMotion: "reduce" });
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
    assert.equal(await page.locator(".credential-group").count(), 3);
    assert.equal(await page.locator(".credentials li").count(), 5);
    assert.equal(await page.locator("#editorial-contact").count(), 1);
    assert.equal(
      await page.locator("#editorial-contact a").getAttribute("href"),
      "https://www.norris-beauty-clinic.com/contact/",
    );
    assert.ok(
      (await page.locator("#editorial-contact .external-note").innerText())
        .length > 20,
    );
    assert.ok(
      (
        await page.locator(".dialogue-teaser-image img").getAttribute("src")
      ).endsWith("/stock/conversation.webp"),
    );
    assert.ok(
      (
        await page
          .locator(".practice-card")
          .nth(2)
          .locator("img")
          .getAttribute("src")
      ).endsWith("/stock/stethoscope.webp"),
    );
    assert.equal(await page.locator(".everyday-image img").count(), 1);
    if (width <= 600) {
      assert.ok(
        await page
          .locator(".about-copy > p")
          .first()
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize) >= 16),
      );
      assert.ok(
        await page
          .locator(".credentials li")
          .first()
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize) >= 15),
      );
    }
    const og = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    assert.ok(og.endsWith(`/images/og/profile-${locale}.png`));
    const social = await page.request.get(
      `${base}/images/og/profile-${locale}.png`,
    );
    assert.equal(social.status(), 200);
    const dimensions = await sharp(await social.body()).metadata();
    assert.deepEqual([dimensions.width, dimensions.height], [1200, 630]);
    assert.ok(await page.locator('link[rel="canonical"]').getAttribute("href"));
    assert.equal(
      await page.locator('link[rel="alternate"][hreflang]').count(),
      4,
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow ${locale} ${width}: ${JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("body *")].filter((el) => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).position !== "fixed").map((el) => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right }))))}`,
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
    assert.equal(before, 11);
    assert.equal(await page.locator(".career-toggle").count(), 0);
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
    if (width === 390) {
      for (const section of ["about", "contact"])
        await page
          .locator(`#${section}`)
          .screenshot({ path: `test-results/${locale}-${section}-390.png` });
    }
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
