import type { MetadataRoute } from "next";
import { asset } from "@/lib/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yoshitomo Chihara — 千原良友",
    short_name: "千原良友",
    description:
      "千原良友（医師・医学博士）の個人サイト。美容医療・再生医療・泌尿器科の案内と対談記事。",
    lang: "ja",
    start_url: asset("/"),
    display: "browser",
    background_color: "#f3f2ed",
    theme_color: "#f3f2ed",
    icons: [
      { src: asset("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: asset("/icon.png"), sizes: "512x512", type: "image/png" },
      {
        src: asset("/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
