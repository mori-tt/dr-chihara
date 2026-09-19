import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const base = (
  process.env.TEST_URL || "http://127.0.0.1:4173/dr-chihara"
).replace(/\/$/, "");
const browser = await chromium.launch({ headless: true });
const failures = [];
await mkdir("test-results", { recursive: true });
try {
  for (const width of [1440, 768, 390, 320]) {
    for (const [lang, prefix] of [
      ["ja", ""],
      ["en", "en/"],
      ["zh-Hans", "zh/"],
    ]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.emulateMedia({ reducedMotion: "reduce" });
      page.on("pageerror", (error) => failures.push(error.message));
      page.on("response", (r) => {
        if (r.status() >= 400 && r.url().startsWith(base))
          failures.push(`${r.status()} ${r.url()}`);
      });
      for (const suffix of ["dialogues/", "dialogues/sample/"]) {
        const response = await page.goto(`${base}/${prefix}${suffix}`, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200);
        assert.equal(await page.locator("html").getAttribute("lang"), lang);
        assert.equal(await page.locator("h1").count(), 1);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `Overflow ${lang} ${width} ${suffix}`,
        );
        assert.equal(
          await page.locator('link[rel="alternate"][hreflang]').count(),
          4,
        );
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        assert.ok(canonical.endsWith(`/${prefix}${suffix}`));
        for (const img of await page.locator("img").all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate((el) => el.decode());
        }
        for (const href of await page
          .locator('a[href^="#"]')
          .evaluateAll((links) => links.map((a) => a.getAttribute("href"))))
          assert.ok(await page.locator(href).count(), `Missing anchor ${href}`);
        if (suffix.includes("sample")) {
          assert.ok(
            (
              await page.locator('meta[name="robots"]').getAttribute("content")
            ).includes("noindex"),
          );
          assert.equal(
            await page.locator(".dialogue-sample-notice").count(),
            1,
          );
          await page.locator('.dialogue-toc a[href="#values"]').click();
          await page.waitForTimeout(300);
          assert.equal(new URL(page.url()).hash, "#values");
          assert.equal(await page.locator(".dialogue-exchange").count(), 6);
          assert.equal(await page.locator(".dialogue-references a").count(), 3);
          assert.ok(
            (await page.locator(".dialogue-sample-notice").innerText()).match(
              /フィクション|fiction|虚构/,
            ),
          );
          assert.equal(
            await page.locator('img[src*="/images/stock/"]').count(),
            3,
          );
          assert.ok(
            !(await page.locator("article").innerText()).match(
              /［|\[Insert|placeholder|在此填写/,
            ),
          );
        } else {
          assert.equal(await page.locator(".dialogue-coming").count(), 1);
          assert.equal(await page.locator(".dialogue-card").count(), 1);
        }
        if (width === 1440 || width === 390) {
          await page.evaluate(() => {
            document.documentElement.style.scrollBehavior = "auto";
            scrollTo(0, 0);
          });
          await page.waitForFunction(() => window.scrollY === 0);
          await page.screenshot({
            path: `test-results/dialogues-${lang}-${suffix.includes("sample") ? "article" : "index"}-${width}.png`,
            fullPage: true,
          });
        }
        await page.locator('.header .languages a[hreflang="en"]').click();
        await page.waitForLoadState("networkidle");
        assert.equal(
          new URL(page.url()).pathname,
          new URL(`${base}/en/${suffix}`).pathname,
        );
        await page.locator(".menu-button").click();
        const about = page
          .locator(".menu-inner>a")
          .filter({ hasText: "About" });
        assert.ok((await about.getAttribute("href")).endsWith("/en/#about"));
        await page.keyboard.press("Escape");
        assert.equal(await page.locator('[role="dialog"]').count(), 0);
      }
      await page.goto(`${base}/${prefix}`, { waitUntil: "networkidle" });
      assert.equal(await page.locator(".credentials li").count(), 8);
      assert.ok(
        !(await page.locator("body").innerText()).match(
          /私の哲学|My Philosophy|我的哲学/,
        ),
      );
      await page.locator(".dialogue-teaser .text-link").click();
      await page.waitForLoadState("networkidle");
      await page.locator(".dialogue-card").click();
      await page.waitForLoadState("networkidle");
      assert.ok(new URL(page.url()).pathname.endsWith("/dialogues/sample/"));
      await page.locator(".dialogue-next .text-link").click();
      await page.waitForLoadState("networkidle");
      assert.ok(new URL(page.url()).pathname.endsWith("/dialogues/"));
      console.log(
        `PASS dialogues ${lang} ${width}px: listing, article, navigation, translations, sample metadata, images and layout`,
      );
      await page.close();
    }
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(`${base}/dialogues/sample/`);
  assert.equal(await page.locator(".dialogue-chapter").count(), 3);
  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes("/en/dialogues/"));
  assert.ok(!sitemap.includes("/sample/"));
  console.log(
    "PASS static article without JavaScript; sample excluded from sitemap",
  );
  assert.deepEqual(failures, []);
} finally {
  await browser.close();
}
