import { content, localePath, type Locale } from "@/lib/content";
import { dialogueCopy, dialoguePath } from "@/lib/dialogues";
import { fieldCopy, fieldPath, fieldSlugs } from "@/lib/fields";
const anchors = ["about", "philosophy", "journey"];
export function Footer({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <footer className="footer">
      <div className="footer-brand">
        YOSHITOMO
        <br />
        CHIHARA<span>✳︎</span>
      </div>
      <nav
        className="footer-nav"
        aria-label={
          locale === "ja"
            ? "フッターナビゲーション"
            : locale === "zh"
              ? "页脚导航"
              : "Footer navigation"
        }
      >
        {c.nav.slice(0, 3).map((n, i) => (
          <a key={n} href={`${localePath(locale)}#${anchors[i]}`}>
            {n}
          </a>
        ))}
        {fieldSlugs.map((slug) => (
          <a key={slug} href={fieldPath(locale, slug)}>
            {fieldCopy[locale][slug].title}
          </a>
        ))}
        <a href={dialoguePath(locale)}>{dialogueCopy[locale].label}</a>
        <a href={`${localePath(locale)}#contact`}>{c.contact}</a>
      </nav>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Yoshitomo Chihara</span>
        <a className="back-top" href="#top">
          {c.backTop} ↑
        </a>
      </div>
    </footer>
  );
}
