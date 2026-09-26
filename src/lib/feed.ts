import type { Locale } from "./content";
import { publishedDialogues, dialogueCopy } from "./dialogues";
import { siteLastModified, siteTitle, siteUrl } from "./metadata";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function rssFeed(locale: Locale): string {
  const copy = dialogueCopy[locale];
  const prefix = locale === "ja" ? "" : `${locale}/`;
  const channelUrl = `${siteUrl}/${prefix}dialogues/`;
  const articles = publishedDialogues();
  const lastBuild =
    articles[0]?.updatedAt ?? articles[0]?.publishedAt ?? siteLastModified;
  const items = articles
    .map((article) => {
      const t = article.translations[locale];
      const link = `${channelUrl}${article.slug}/`;
      return `    <item>
      <title>${esc(t.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${article.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(t.introduction)}</description>
      <category>${esc(t.category)}</category>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${copy.label} | ${siteTitle(locale)}`)}</title>
    <link>${channelUrl}</link>
    <atom:link href="${siteUrl}/${prefix}feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(copy.intro)}</description>
    <language>${locale === "zh" ? "zh-cn" : locale}</language>
    <lastBuildDate>${new Date(`${lastBuild}T00:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
