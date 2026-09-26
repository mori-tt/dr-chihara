import type { Metadata, Viewport } from "next";
import { content, type Locale } from "@/lib/content";
import "../globals.css";
import "../dialogues.css";
import "../care.css";
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
  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"}>
      <body>{children}</body>
    </html>
  );
}
