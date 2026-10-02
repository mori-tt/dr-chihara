import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Next.js injects <link rel="preconnect" href="/"> into every exported page.
 * A same-origin preconnect saves nothing (the origin is already connected)
 * and was flagged in the SEO/performance audit, so we strip it post-build.
 * External preconnects (href="//..." or absolute URLs) are kept.
 */
const root = new URL("../out", import.meta.url).pathname;
const pattern = /<link\b[^>]*rel="preconnect"[^>]*>/g;

const walk = async (dir) => {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path)));
    else if (entry.name.endsWith(".html")) found.push(path);
  }
  return found;
};

let files = 0;
let removed = 0;
for (const file of await walk(root)) {
  const html = await readFile(file, "utf8");
  let changed = false;
  const next = html.replace(pattern, (tag) => {
    // Only strip same-origin preconnects: href="/" or href="/<path>" (not "//").
    const href = tag.match(/href="([^"]*)"/)?.[1];
    if (href?.startsWith("/") && !href.startsWith("//")) {
      changed = true;
      removed += 1;
      return "";
    }
    return tag;
  });
  if (changed) {
    files += 1;
    await writeFile(file, next);
  }
}
console.log(
  `Removed same-origin preconnect from ${files} HTML files (${removed} tags)`,
);
