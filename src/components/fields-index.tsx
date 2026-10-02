import "@/app/care.css";
import { Header } from "./header";
import { Footer } from "./footer";
import { JsonLd } from "./json-ld";
import { localePath, type Locale } from "@/lib/content";
import { fieldCopy, fieldPath, fieldSlugs, fieldsHub } from "@/lib/fields";
import { careUi } from "@/lib/care-support";
import { CareByline } from "./care-byline";
import { breadcrumbSchema, entityNodes, fieldsHubSchema } from "@/lib/metadata";

export function FieldsIndex({ locale }: { locale: Locale }) {
  const c = fieldsHub[locale];
  return (
    <div className={`site locale-${locale} field-site`} id="top">
      <JsonLd
        nodes={[
          ...entityNodes(locale),
          breadcrumbSchema(locale, [
            { name: careUi.home[locale], path: "" },
            { name: c.title, path: "fields/" },
          ]),
          fieldsHubSchema(locale),
        ]}
      />
      <Header locale={locale} section="fields/" />
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
            <a href={localePath(locale)}>{careUi.home[locale]}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.title}</span>
          </nav>
          <header className="field-heading">
            <p className="eyebrow">
              <span className="status-dot" /> {c.eyebrow}
            </p>
            <h1>{c.title}</h1>
            <p className="field-lead">{c.lead}</p>
            <CareByline locale={locale} />
          </header>
          <ul className="fields-hub-list">
            {fieldSlugs.map((slug) => {
              const field = fieldCopy[locale][slug];
              return (
                <li key={slug}>
                  <a className="fields-hub-card" href={fieldPath(locale, slug)}>
                    <span className="field-related-eyebrow">
                      {field.eyebrow}
                    </span>
                    <h2 className="field-related-title">{field.title}</h2>
                    <p>{field.lead}</p>
                    <span className="fields-hub-more">
                      {c.view}
                      <span className="arrow" aria-hidden="true">
                        {" "}
                        →
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
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
