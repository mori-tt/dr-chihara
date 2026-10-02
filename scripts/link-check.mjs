import { readdir, readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Link checker for the exported site in out/.
 *
 * - Every href/src in every HTML file is collected.
 * - Internal links (starting with "/") must resolve to a file or a directory
 *   containing index.html inside out/. Fragment (#id) targets are checked
 *   against `id="..."` in the destination file.
 * - External http(s) links are only probed with `--external` (or --strict);
 *   failures fail the run only with --strict.
 *
 * Usage: node scripts/link-check.mjs [--external] [--strict]
 */
const external = process.argv.includes("--external");
const strict = process.argv.includes("--strict");
const root = resolve("out");

const htmlFiles = [];
const walk = async (dir) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".html")) htmlFiles.push(path);
  }
};
await walk(root);

// Detect the deployment basePath (e.g. "/dr-chihara") from asset URLs so the
// same script works for both `npm run build` and `npm run build:pages` output.
let basePath = "";
for (const file of htmlFiles) {
  const match = (await readFile(file, "utf8")).match(
    /["'](\/[^"']*?)\/_next\//,
  );
  if (match) {
    basePath = match[1];
    break;
  }
}
if (basePath) console.log(`Detected base path: ${basePath}`);

const attrPattern = /(?:href|src)="([^"]+)"/g;
const idCache = new Map();
const idsIn = async (file) => {
  if (!idCache.has(file))
    idCache.set(
      file,
      new Set(
        [...(await readFile(file, "utf8")).matchAll(/ id="([^"]+)"/g)].map(
          (m) => decodeURIComponent(m[1]),
        ),
      ),
    );
  return idCache.get(file);
};

const resolveInternal = (raw) => {
  if (!raw.startsWith("/") || raw.startsWith("//")) return null;
  let path = raw;
  if (basePath && (path === basePath || path.startsWith(`${basePath}/`)))
    path = path.slice(basePath.length) || "/";
  const file = resolve(root, `.${decodeURIComponent(path)}`);
  if (!file.startsWith(root)) return { bad: "escapes out/" };
  return { file };
};

const problems = [];
const internalLinks = new Set();
const externalLinks = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const dir = file;
  for (const match of html.matchAll(attrPattern)) {
    const raw = match[1];
    if (
      !raw ||
      raw.startsWith("data:") ||
      raw.startsWith("mailto:") ||
      raw.startsWith("tel:") ||
      raw.startsWith("javascript:")
    )
      continue;
    const [pathPart, fragment] = raw.split("#");
    if (raw.startsWith("#")) {
      if (!(await idsIn(dir)).has(decodeURIComponent(fragment)))
        problems.push(`${file}: missing anchor ${raw}`);
      continue;
    }
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      externalLinks.add(raw);
      continue;
    }
    const resolved = resolveInternal(pathPart);
    if (!resolved) continue; // protocol-relative etc.
    if (resolved.bad) {
      problems.push(`${file}: ${raw} ${resolved.bad}`);
      continue;
    }
    internalLinks.add(pathPart);
    let target = resolved.file;
    let exists = existsSync(target);
    if (!exists && !target.includes(".")) {
      target = join(target, "index.html");
      exists = existsSync(target);
    } else if (exists && statSync(target).isDirectory()) {
      target = join(target, "index.html");
      exists = existsSync(target);
    }
    if (!exists) {
      problems.push(`${file}: broken link ${raw}`);
      continue;
    }
    if (fragment && target.endsWith(".html"))
      if (!(await idsIn(target)).has(decodeURIComponent(fragment)))
        problems.push(`${file}: ${raw} — anchor not found in target`);
  }
}

console.log(
  `Checked ${internalLinks.size} unique internal links across ${htmlFiles.length} HTML files`,
);

if (external) {
  console.log(`Probing ${externalLinks.size} external links…`);
  const pending = [...externalLinks];
  const results = [];
  const probe = async (url) => {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "Mozilla/5.0 link-check" },
    }).catch(async (error) => {
      if (error.name === "TimeoutError") throw error;
      // Some servers reject HEAD; retry once with GET.
      return fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: { "user-agent": "Mozilla/5.0 link-check" },
      });
    });
    if (response.status >= 400) results.push(`${response.status} ${url}`);
  };
  const workers = Array.from({ length: 8 }, async () => {
    while (pending.length) {
      const url = pending.pop();
      try {
        await probe(url);
      } catch (error) {
        results.push(`${error.name} ${url}`);
      }
    }
  });
  await Promise.all(workers);
  for (const result of results.sort()) console.log(`  external: ${result}`);
  if (strict) problems.push(...results.map((r) => `external: ${r}`));
  else results.forEach((r) => console.warn(`WARN external link: ${r}`));
}

if (problems.length) {
  console.error(`\n${problems.length} broken link(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log("PASS no broken internal links");
