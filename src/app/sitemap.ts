import type { MetadataRoute } from "next";
import { siteLastModified, siteUrl } from "@/lib/metadata";
import { publishedDialogues } from "@/lib/dialogues";
import { fieldSlugs, type FieldSlug } from "@/lib/fields";
import { careCheckedAt } from "@/lib/care-guide";
export const dynamic = "force-static";
const fieldImages: Record<FieldSlug, string> = {
  rejuvenation: "/images/consultation.webp",
  regenerate: "/images/stock/laboratory.webp",
  urology: "/images/stock/stethoscope.webp",
};
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = publishedDialogues();
  const paths = [
    {
      path: "",
      lastModified: siteLastModified,
      images: [
        "/images/portrait.webp",
        "/images/consultation.webp",
        "/images/reception.webp",
        "/images/lounge.webp",
      ],
    },
    {
      path: "dialogues/",
      lastModified:
        articles[0]?.updatedAt ?? articles[0]?.publishedAt ?? siteLastModified,
      images: ["/images/stock/conversation.webp"],
    },
    ...fieldSlugs.map((slug) => ({
      path: `fields/${slug}/`,
      lastModified: careCheckedAt,
      images: [fieldImages[slug]],
    })),
    ...articles.map((article) => ({
      path: `dialogues/${article.slug}/`,
      lastModified: article.updatedAt ?? article.publishedAt,
      images: [article.cover],
    })),
  ];
  return paths.flatMap(({ path, lastModified, images }) =>
    ["", "en/", "zh/"].map((prefix) => ({
      url: `${siteUrl}/${prefix}${path}`,
      lastModified,
      images: images.map((image) => `${siteUrl}${image}`),
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
