import type { Metadata } from "next";
import { asset } from "@/lib/content";

export const metadata: Metadata = {
  title: "ページが見つかりません / Page not found",
};

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <style
        precedence="not-found"
        href="not-found"
        dangerouslySetInnerHTML={{
          __html: `body{margin:0;background:#f3f2ed;color:#242621;font-family:"DM Sans Variable","Noto Sans JP Variable","Hiragino Kaku Gothic ProN","Microsoft YaHei",sans-serif}
.not-found{min-height:70vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:18px;padding:60px 7%}
.not-found .eyebrow{font-size:13px;letter-spacing:2px;color:#b7432d;margin:0}
.not-found h1{font-size:clamp(28px,5vw,54px);font-weight:500;letter-spacing:-0.02em;margin:0}
.not-found p{color:#696b62;line-height:1.9;margin:0}
.not-found a{color:inherit;text-decoration:none;margin-top:12px;border-bottom:1px solid #b7432d;padding-bottom:2px}
.not-found a span{margin-left:6px;color:#b7432d}`,
        }}
      />
      <p className="eyebrow">404 — NOT FOUND</p>
      <h1>お探しのページは見つかりませんでした。</h1>
      <p>
        The page you are looking for does not exist or may have been moved.
        <br />
        您访问的页面不存在，或已被移动。
      </p>
      <a href={asset("/")}>
        トップページへ戻る / Back to home<span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
