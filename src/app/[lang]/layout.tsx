import type { Metadata, Viewport } from "next";
import { content, type Locale } from "@/lib/content";
import { colorTheme } from "@/lib/site-config";
import "../globals.css";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = lang === "zh" ? "zh" : "en";
  return {
    title: {
      default: content[locale].title,
      template: "%s | Yoshitomo Chihara",
    },
  };
}
export const viewport: Viewport = {
  themeColor: "#f3f2ed",
  colorScheme: "light",
};
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const themeClass = colorTheme === "green" ? "theme-green" : colorTheme === "orange" ? "theme-orange" : "";
  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"} className={themeClass}>
      <body>{children}</body>
    </html>
  );
}
