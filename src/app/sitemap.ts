import type { MetadataRoute } from "next";
import { siteLastModified, siteUrl } from "@/lib/metadata";
import { publishedDialogues } from "@/lib/dialogues";
import { careCheckedAt } from "@/lib/care-guide";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "dialogues/",
    "fields/rejuvenation/",
    "fields/regenerate/",
    "fields/urology/",
    ...publishedDialogues().map((article) => `dialogues/${article.slug}/`),
  ];
  return paths.flatMap((path) =>
    ["", "en/", "zh/"].map((prefix) => ({
      url: `${siteUrl}/${prefix}${path}`,
      lastModified: path.startsWith("fields/")
        ? careCheckedAt
        : siteLastModified,
      alternates: {
        languages: {
          ja: `${siteUrl}/${path}`,
          en: `${siteUrl}/en/${path}`,
          "zh-Hans": `${siteUrl}/zh/${path}`,
          "x-default": `${siteUrl}/${path}`,
        },
      },
    })),
  );
}
