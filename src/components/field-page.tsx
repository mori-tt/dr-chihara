import "@/app/care.css";
import { Header } from "./header";
import { Footer } from "./footer";
import { JsonLd } from "./json-ld";
import { Picture } from "./picture";
import {
  clinicReserveUrl,
  content,
  localePath,
  type Locale,
} from "@/lib/content";
import {
  fieldCopy,
  fieldPath,
  fieldSlugs,
  fieldsHub,
  fieldsHubPath,
  type FieldSlug,
} from "@/lib/fields";
import { stockPhotos, stockLabel, variantWidths } from "@/lib/stock-photos";
import {
  breadcrumbSchema,
  entityNodes,
  faqSchema,
  medicalWebPageSchema,
} from "@/lib/metadata";
import { CareGuide } from "./care-guide";
import { careUi } from "@/lib/care-support";

const fieldPhoto = (locale: Locale, slug: FieldSlug) => {
  if (slug === "rejuvenation")
    return {
      src: "/images/consultation.webp",
      width: 767,
      height: 511,
      widths: [480],
      alt: content[locale].consultAlt,
      caption: "Norris Beauty Clinic / Osaka",
    };
  const photo =
    slug === "regenerate" ? stockPhotos.laboratory : stockPhotos.stethoscope;
  return {
    ...photo,
    widths: variantWidths(photo.width),
    alt: photo.alt[locale],
    caption: `${stockLabel[locale]} · ${photo.credit}`,
  };
};

export function FieldPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: FieldSlug;
}) {
  const c = fieldCopy[locale][slug];
  const ui = careUi;
  const relatedFields = fieldSlugs.filter(
    (relatedSlug): relatedSlug is FieldSlug => relatedSlug !== slug,
  );
  const photo = fieldPhoto(locale, slug);
  return (
    <div className={`site locale-${locale} field-site`} id="top">
      <JsonLd
        nodes={[
          ...entityNodes(locale),
          breadcrumbSchema(locale, [
            { name: ui.home[locale], path: "" },
            { name: fieldsHub[locale].title, path: "fields/" },
            { name: c.title, path: `fields/${slug}/` },
          ]),
          medicalWebPageSchema(locale, slug),
          faqSchema(locale, slug),
        ]}
      />
      <Header locale={locale} section={`fields/${slug}/`} />
      <main id="main" className="field-main">
        <div className="field-wrap">
          <nav
            className="field-breadcrumb"
            aria-label={
              locale === "ja"
                ? "パンくずリスト"
                : locale === "zh"
                  ? "面包屑导航"
                  : "Breadcrumb"
            }
          >
            <a href={localePath(locale)}>{ui.home[locale]}</a>
            <span aria-hidden="true">/</span>
            <a href={fieldsHubPath(locale)}>{fieldsHub[locale].title}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.title}</span>
          </nav>
          <nav className="care-field-switch" aria-label={ui.related[locale]}>
            {fieldSlugs.map((field) => (
              <a
                key={field}
                href={fieldPath(locale, field)}
                aria-current={field === slug ? "page" : undefined}
              >
                {fieldCopy[locale][field].title}
              </a>
            ))}
          </nav>
          <header className="field-heading">
            <p className="eyebrow">
              <span className="status-dot" /> {c.eyebrow}
            </p>
            <h1>{c.title}</h1>
            <p className="field-lead">{c.lead}</p>
            <p className="care-hero-intro">{c.sections[0].body}</p>
          </header>
          <figure className="field-hero">
            <Picture
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              widths={photo.widths}
              sizes="(max-width: 700px) 86vw, (max-width: 1400px) 88vw, 1160px"
              priority
            />
            <figcaption>{photo.caption}</figcaption>
          </figure>
          <CareGuide locale={locale} slug={slug} />
          {c.moreOfficial && (
            <section className="field-more" aria-labelledby="field-more-title">
              <h2 id="field-more-title">
                {locale === "ja"
                  ? "公式サイトのその他のメニュー"
                  : locale === "zh"
                    ? "官方网站的其他项目"
                    : "Other menus on the official site"}
              </h2>
              <p>{c.moreOfficial.intro}</p>
              <ul>
                {c.moreOfficial.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener">
                      {link.label}
                      <span className="visually-hidden">
                        {content[locale].newTab}
                      </span>
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
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
              href={clinicReserveUrl}
              target="_blank"
              rel="noopener"
            >
              {content[locale].reserve}
              <span className="visually-hidden">{content[locale].newTab}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href={c.officialUrl}
              target="_blank"
              rel="noopener"
            >
              {c.official}
              <span className="visually-hidden">{content[locale].newTab}</span>
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <section
            className="field-related"
            aria-labelledby="field-related-title"
          >
            <div>
              <p className="eyebrow">
                {locale === "zh" ? "相关诊疗" : "RELATED CARE"}
              </p>
              <h2 id="field-related-title">{ui.related[locale]}</h2>
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
