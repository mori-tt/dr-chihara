import assert from "node:assert/strict";

/**
 * Post-deploy smoke test against a live URL.
 *
 *   node scripts/smoke-check.mjs https://example.jp             # production
 *   node scripts/smoke-check.mjs https://mori-tt.github.io/dr-chihara --staging
 *
 * Production must be indexable, redirect HTTP to HTTPS, return a real 404 and
 * must not expose the sample dialogue. Staging must be noindex and show the sample.
 */
const args = process.argv.slice(2);
const staging = args.includes("--staging");
const base = args.find((a) => !a.startsWith("--"))?.replace(/\/$/, "");
if (!base)
  throw new Error("Usage: node scripts/smoke-check.mjs <url> [--staging]");

const get = (path, init) =>
  fetch(`${base}${path}`, {
    headers: { "user-agent": "smoke-check" },
    ...init,
  });
const failures = [];
const check = async (name, fn) => {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(name);
    console.error(`FAIL ${name}: ${error.message}`);
  }
};

await check("home pages respond 200 in three languages", async () => {
  for (const path of [
    "/",
    "/en/",
    "/zh/",
    "/fields/",
    "/fields/rejuvenation/hifu/",
  ]) {
    assert.equal((await get(path)).status, 200, path);
  }
});
await check(`robots meta is ${staging ? "noindex" : "index"}`, async () => {
  const html = await (await get("/")).text();
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  assert.equal(robots.startsWith("noindex"), staging, robots);
});
await check("canonical and hreflang are present", async () => {
  const html = await (await get("/")).text();
  assert.match(html, /<link rel="canonical" href="https?:\/\//);
  assert.match(html, /hrefLang="zh-Hans"|hreflang="zh-Hans"/);
});
await check("sitemap.xml lists URLs", async () => {
  const response = await get("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<loc>https?:\/\//);
});
await check("unknown URL returns a real 404", async () => {
  assert.equal((await get("/__smoke-check-404__/")).status, 404);
});
await check(
  staging
    ? "sample dialogue is published on staging"
    : "sample dialogue is not exposed in production",
  async () => {
    assert.equal((await get("/dialogues/sample/")).status, staging ? 200 : 404);
    if (!staging) assert.equal((await get("/dialogues/")).status, 404);
  },
);
if (!staging && base.startsWith("https://")) {
  await check("HTTP redirects to HTTPS", async () => {
    const response = await fetch(base.replace("https://", "http://") + "/", {
      redirect: "manual",
    });
    assert.ok([301, 308].includes(response.status), String(response.status));
    assert.ok(response.headers.get("location")?.startsWith("https://"));
  });
}
if (failures.length) {
  console.error(`\n${failures.length} smoke check(s) failed`);
  process.exit(1);
}
