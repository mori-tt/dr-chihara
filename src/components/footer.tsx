import { content, type Locale } from "@/lib/content";
export function Footer({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <footer className="footer">
      <div className="footer-brand">
        YOSHITOMO
        <br />
        CHIHARA<span>✳︎</span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Yoshitomo Chihara</span>
        <a className="back-top" href="#top">
          {c.backTop} ↑
        </a>
      </div>
    </footer>
  );
}
