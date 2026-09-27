import type { Metadata } from "next";
import { asset, clinicReserveUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "ページが見つかりません / Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "トップページ", lang: "ja" },
  { href: "/fields/rejuvenation/", label: "美容医療", lang: "ja" },
  { href: "/fields/regenerate/", label: "再生医療", lang: "ja" },
  { href: "/fields/urology/", label: "泌尿器科", lang: "ja" },
  { href: "/dialogues/", label: "人間交差点", lang: "ja" },
  { href: "/en/", label: "English", lang: "en" },
  { href: "/zh/", label: "中文", lang: "zh-Hans" },
];

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <style
        precedence="not-found"
        href="not-found"
        dangerouslySetInnerHTML={{
          __html: `body{margin:0;background:#f3f2ed;color:#242621;font-family:"DM Sans Variable","Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic Medium",Meiryo,"Noto Sans JP",sans-serif;font-size:15px}
.not-found{min-height:80vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:18px;padding:60px 7%;max-width:820px}
.not-found .eyebrow{font-size:12px;letter-spacing:2px;color:#ad3e2a;margin:0}
.not-found h1{font-size:clamp(28px,5vw,54px);font-weight:500;letter-spacing:-0.02em;margin:0;line-height:1.3}
.not-found p{color:#5e6058;line-height:1.9;margin:0}
.not-found ul{list-style:none;padding:0;margin:14px 0 0;display:flex;flex-wrap:wrap;gap:10px}
.not-found li a{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border:1px solid #d8d8cd;border-radius:30px;color:inherit;text-decoration:none}
.not-found li a:hover{border-color:#ad3e2a;color:#ad3e2a}
.not-found .reserve{margin-top:10px;color:#ad3e2a;text-decoration:underline;text-underline-offset:4px;display:inline-flex;align-items:center;min-height:44px}`,
        }}
      />
      <p className="eyebrow">404 — NOT FOUND</p>
      <h1>お探しのページは見つかりませんでした。</h1>
      <p>
        URLが変更された、または削除された可能性があります。下のリンクから目的のページへお進みください。
        <br />
        The page you are looking for does not exist or may have been moved.
        <br />
        您访问的页面不存在，或已被移动。
      </p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={asset(link.href)} hrefLang={link.lang} lang={link.lang}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        className="reserve"
        href={clinicReserveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        診療のご予約はノリス美容クリニックへ（WEB予約） ↗
      </a>
    </main>
  );
}
