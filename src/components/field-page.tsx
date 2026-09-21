import { Header } from "./header";
import { Footer } from "./footer";
import { asset, localePath, type Locale } from "@/lib/content";
import { fieldCopy, fieldPath, fieldSlugs, type FieldSlug } from "@/lib/fields";
import { stockPhotos, stockLabel } from "@/lib/stock-photos";
import { breadcrumbSchema } from "@/lib/metadata";

export function FieldPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: FieldSlug;
}) {
  const c = fieldCopy[locale][slug];
  const relatedFields = fieldSlugs.filter(
    (relatedSlug): relatedSlug is FieldSlug => relatedSlug !== slug,
  );
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(locale, [
              {
                name:
                  locale === "ja"
                    ? "ホーム"
                    : locale === "zh"
                      ? "首页"
                      : "Home",
                path: "",
              },
              { name: c.title },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
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
          <section
            className="field-related"
            aria-labelledby="field-related-title"
          >
            <div>
              <p className="eyebrow">
                {locale === "ja"
                  ? "RELATED CARE"
                  : locale === "zh"
                    ? "相关诊疗"
                    : "RELATED CARE"}
              </p>
              <h2 id="field-related-title">
                {locale === "ja"
                  ? "ほかの診療を見る"
                  : locale === "zh"
                    ? "了解其他诊疗领域"
                    : "Explore other areas of care"}
              </h2>
            </div>
            <div className="field-related-links">
              {relatedFields.map((relatedSlug) => {
                const related = fieldCopy[locale][relatedSlug];
                return (
                  <a
                    className="field-related-link"
                    href={fieldPath(locale, relatedSlug)}
                    key={relatedSlug}
                  >
                    <span className="field-related-eyebrow">
                      {related.eyebrow}
                    </span>
                    <span className="field-related-title">{related.title}</span>
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
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
