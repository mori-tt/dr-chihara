import { chromium, webkit, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = (
  process.env.TEST_URL || "http://127.0.0.1:4173/dr-chihara"
).replace(/\/$/, "");
const engine = process.env.TEST_ENGINE === "webkit" ? webkit : chromium;
const browser = await engine.launch();
const errors = [];
const counts = { rejuvenation: 11, regenerate: 3, urology: 6 };
await mkdir("test-results", { recursive: true });
try {
  for (const width of [1440, 768, 390, 320]) {
    for (const locale of ["ja", "en", "zh"]) {
      const prefix = locale === "ja" ? "" : `${locale}/`;
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("response", (r) => {
        if (r.status() >= 400 && r.url().startsWith(base))
          errors.push(`${r.status()} ${r.url()}`);
      });
      for (const slug of Object.keys(counts)) {
        const url = `${base}/${prefix}fields/${slug}/`;
        assert.equal((await page.goto(url)).status(), 200);
        await page.locator(".care-topic").first().waitFor();
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(await page.locator(".care-topic").count(), counts[slug]);
        assert.equal(await page.locator(".care-faq-list article").count(), 3);
        assert.equal(
          await page
            .locator(".care-field-switch [aria-current=page]")
            .getAttribute("href"),
          `/dr-chihara/${prefix}fields/${slug}/`,
        );
        const brokenAnchors = await page
          .locator('main a[href^="#"]')
          .evaluateAll((links) =>
            links
              .map((a) => a.getAttribute("href"))
              .filter((href) => !document.getElementById(href.slice(1))),
          );
        assert.deepEqual(brokenAnchors, []);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `${locale}/${slug}/${width} overflow`,
        );
        assert.ok(
          await page
            .locator(".field-hero img")
            .evaluate((img) => img.complete && img.naturalWidth > 0),
        );
        // Follow a concern card, then navigate from the long article to fees.
        await page.locator(".care-explorer-card").first().click();
        let firstY = (await page.locator(".care-topic").first().boundingBox())
          .y;
        assert.ok(firstY >= 70 && firstY < 300, `Topic obscured: ${firstY}`);
        await page.locator('.care-toc a[href="#care-fees"]').click();
        const feesY = (await page.locator("#care-fees").boundingBox()).y;
        assert.ok(feesY >= 70 && feesY < 300, `Fees obscured: ${feesY}`);
        await expect(
          page.locator('.care-toc a[href="#care-fees"]'),
        ).toHaveAttribute("aria-current", "location");
        if (slug !== "urology") {
          const table = await page.locator(".care-fee-table").boundingBox();
          assert.ok(table.x >= 0 && table.x + table.width <= width + 1);
          assert.ok(
            (await page.locator(".care-fee-table tbody tr").count()) >= 7,
          );
        }
        // Related-care links must remain in the chosen language and really load.
        const related = await page
          .locator(".field-related-link")
          .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
        assert.equal(related.length, 2);
        for (const href of related) {
          assert.ok(
            href.startsWith(`/dr-chihara/${prefix}fields/`) &&
              !href.endsWith(`/${slug}/`),
          );
          assert.equal(
            (await page.request.get(new URL(href, base).href)).status(),
            200,
          );
        }
        const schema = await page
          .locator('script[type="application/ld+json"]')
          .first()
          .textContent();
        assert.ok(
          JSON.parse(schema).itemListElement[0].item.endsWith(`/${prefix}`),
        );
        if (locale === "ja" && [1440, 390].includes(width)) {
          await page.locator('.care-toc a[href="#care-explore"]').click();
          await expect(
            page.locator('.care-toc a[href="#care-explore"]'),
          ).toHaveAttribute("aria-current", "location");
          await page.screenshot({
            path: `test-results/care-${slug}-${width}.png`,
          });
          await page.locator(".care-explorer-card").first().click();
          await page.screenshot({
            path: `test-results/care-detail-${slug}-${width}.png`,
          });
          if (slug === "regenerate") {
            await page.locator('.care-toc a[href="#care-fees"]').click();
            await page.screenshot({
              path: `test-results/care-fees-${width}.png`,
            });
          }
        }
      }
      console.log(
        `PASS care ${locale} ${width}px: all fields, anchors, readable fees, related links`,
      );
      await page.close();
    }
  }
  const noJs = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  for (const slug of Object.keys(counts)) {
    await noJs.goto(`${base}/fields/${slug}/`);
    assert.equal(await noJs.locator(".care-topic").count(), counts[slug]);
    await noJs.locator('.care-toc a[href="#care-faq"]').click();
    assert.ok((await noJs.locator("#care-faq").boundingBox()).y > 0);
  }
  await noJs.close();
  assert.deepEqual(errors, []);
  console.log("PASS care with JavaScript disabled; no runtime or asset errors");
} finally {
  await browser.close();
}
