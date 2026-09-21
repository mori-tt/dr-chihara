import { Header } from "./header";
import { Footer } from "./footer";
import { asset, localePath, type Locale } from "@/lib/content";
import { fieldCopy, fieldPath, type FieldSlug } from "@/lib/fields";
import { stockPhotos, stockLabel } from "@/lib/stock-photos";

export function FieldPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: FieldSlug;
}) {
  const c = fieldCopy[locale][slug];
  const photo =
    slug === "rejuvenation"
      ? "/images/consultation.webp"
      : slug === "regenerate"
        ? stockPhotos.laboratory.src
        : stockPhotos.stethoscope.src;
  const alt =
    slug === "rejuvenation"
      ? "相談を受けるクリニックのカウンセリングルーム"
      : stockPhotos[slug === "regenerate" ? "laboratory" : "stethoscope"].alt[
          locale
        ];
  return (
    <div className={`site locale-${locale} field-site`} id="top">
      <Header locale={locale} section={`fields/${slug}/`} />
      <main id="main" className="field-main">
        <div className="field-wrap">
          <nav className="field-breadcrumb" aria-label="Breadcrumb">
            <a href={localePath(locale)}>Home</a>
            <span>/</span>
            <span aria-current="page">{c.title}</span>
          </nav>
          <header className="field-heading">
            <p className="eyebrow">
              <span className="status-dot" /> {c.eyebrow}
            </p>
            <h1>{c.title}</h1>
            <p className="field-lead">{c.lead}</p>
          </header>
          <figure className="field-hero">
            <img src={asset(photo)} alt={alt} width="1600" height="1067" />
            <figcaption>
              {stockLabel[locale]} ·{" "}
              {slug === "rejuvenation"
                ? "Norris Beauty Clinic / Osaka"
                : slug === "regenerate"
                  ? stockPhotos.laboratory.credit
                  : stockPhotos.stethoscope.credit}
            </figcaption>
          </figure>
          <div className="field-content">
            <div className="field-sections">
              {c.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                  {section.items && (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            <aside className="field-process">
              <p className="eyebrow">
                {locale === "ja"
                  ? "診療の流れ"
                  : locale === "zh"
                    ? "咨询流程"
                    : "A CONSULTATION"}
              </p>
              <ol>
                {c.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </aside>
          </div>
          <aside className="field-note">
            <strong>
              {locale === "ja"
                ? "大切なお知らせ"
                : locale === "zh"
                  ? "重要提示"
                  : "Important note"}
            </strong>
            <p>{c.note}</p>
          </aside>
          <div className="field-actions">
            <a
              className="contact-button"
              href={`${localePath(locale)}#contact`}
            >
              {locale === "ja"
                ? "相談について"
                : locale === "zh"
                  ? "咨询与预约"
                  : "Discuss your concerns"}
              <span>↗</span>
            </a>
            <a
              className="text-link"
              href={c.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.official}
              <span className="arrow">↗</span>
            </a>
          </div>
          <a className="field-back text-link" href={localePath(locale)}>
            ←{" "}
            {locale === "ja"
              ? "トップへ戻る"
              : locale === "zh"
                ? "返回首页"
                : "Back to home"}
          </a>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
