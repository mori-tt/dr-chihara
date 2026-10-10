import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";

/**
 * "output: export" requires at least one generated route, so when no dialogue
 * exists (production build without the sample) the dialogue routes are built
 * with a "_" placeholder that 404s. Remove those soft-404 pages and the empty
 * RSS feeds so the deployed site has no dialogue URLs at all.
 */
const root = new URL("../out", import.meta.url).pathname;
if (existsSync(`${root}/dialogues/_`)) {
  for (const prefix of ["", "en/", "zh/"]) {
    await rm(`${root}/${prefix}dialogues`, { recursive: true, force: true });
    await rm(`${root}/${prefix}feed.xml`, { force: true });
  }
  console.log("Removed placeholder dialogue pages and empty feeds");
}
