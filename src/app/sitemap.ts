import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "en/", "zh/"].map((path) => ({
    url: `${siteUrl}/${path}`,
    alternates: {
      languages: {
        ja: `${siteUrl}/`,
        en: `${siteUrl}/en/`,
        "zh-Hans": `${siteUrl}/zh/`,
      },
    },
  }));
}
