import {
  clinicContactUrl,
  clinicLineUrl,
  clinicMapUrl,
  clinicPhone,
  clinicPhoneHref,
  clinicReserveUrl,
  clinicUrl,
  content,
  localePath,
  type Locale,
} from "@/lib/content";
import { dialogueCopy, dialoguePath } from "@/lib/dialogues";
import { fieldCopy, fieldPath, fieldSlugs } from "@/lib/fields";
const anchors = ["about", "philosophy", "journey"];
export function Footer({ locale }: { locale: Locale }) {
  const c = content[locale];
  const external = (
    <>
      <span className="visually-hidden">{c.newTab}</span>
      <span aria-hidden="true"> ↗</span>
    </>
  );
  return (
    <footer className="footer">
      <div className="footer-brand">
        YOSHITOMO
        <br />
        CHIHARA<span>✳︎</span>
      </div>
      <div className="footer-grid">
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
        <section
          className="footer-clinic"
          aria-labelledby="footer-clinic-title"
        >
          <h2 id="footer-clinic-title" className="eyebrow">
            {c.footerClinicLabel}
          </h2>
          <p className="footer-clinic-name">{c.clinicName}</p>
          <address>
            {c.address}
            <br />
            {c.access}
          </address>
          <p>{c.hours}</p>
          <p className="footer-clinic-links">
            <a href={clinicPhoneHref}>{clinicPhone}</a>
            <a href={clinicReserveUrl} target="_blank" rel="noopener">
              {c.reserve}
              {external}
            </a>
            <a href={clinicContactUrl} target="_blank" rel="noopener">
              {c.contactButton}
              {external}
            </a>
            <a href={clinicLineUrl} target="_blank" rel="noopener">
              {c.line}
              {external}
            </a>
            <a href={clinicMapUrl} target="_blank" rel="noopener">
              {c.map}
              {external}
            </a>
            <a href={clinicUrl} target="_blank" rel="noopener">
              {c.official}
              {external}
            </a>
          </p>
          <p className="footer-note">{c.footerNote}</p>
        </section>
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
