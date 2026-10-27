import type { Metadata, Viewport } from "next";
import { content } from "@/lib/content";
import { colorTheme } from "@/lib/site-config";
import "../globals.css";
export const metadata: Metadata = {
  title: { default: content.ja.title, template: "%s | 千原良友" },
};
export const viewport: Viewport = {
  themeColor: "#f3f2ed",
  colorScheme: "light",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const themeClass = colorTheme === "green" ? "theme-green" : colorTheme === "orange" ? "theme-orange" : "";
  return (
    <html lang="ja" className={themeClass}>
      <body>{children}</body>
    </html>
  );
}
