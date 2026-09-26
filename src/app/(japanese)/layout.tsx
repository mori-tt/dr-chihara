import type { Metadata, Viewport } from "next";
import { content } from "@/lib/content";
import "../globals.css";
import "../dialogues.css";
import "../care.css";
export const metadata: Metadata = {
  title: { default: content.ja.title, template: "%s | 千原良友" },
};
export const viewport: Viewport = {
  themeColor: "#f3f2ed",
  colorScheme: "light",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
