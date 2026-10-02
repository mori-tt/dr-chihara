import "@/app/care.css";
import { Header } from "./header";
import { Footer } from "./footer";
import { JsonLd } from "./json-ld";
import {
  clinicReserveUrl,
  clinicUrl,
  content,
  localePath,
  type Locale,
} from "@/lib/content";
import { careCheckedAt, careTopics, tr } from "@/lib/care-guide";
import { careUi as ui, costExtra } from "@/lib/care-support";
import { feesForTopic, topicPath } from "@/lib/care-topics";
import { topicFaqs } from "@/lib/care-topic-faq";
import {
  fieldCopy,
  fieldPath,
  fieldsHub,
  fieldsHubPath,
  type FieldSlug,
} from "@/lib/fields";
import {
  breadcrumbSchema,
  entityNodes,
  topicFaqSchema,
  topicSchema,
} from "@/lib/metadata";
import { CareByline } from "./care-byline";

export function TopicPage({
  locale,
  slug,
  id,
}: {
  locale: Locale;
  slug: FieldSlug;
  id: string;
}) {
  const field = fieldCopy[locale][slug];
  const topics = careTopics[slug];
  const topic = topics.find((item) => item.id === id)!;
  const others = topics.filter((item) => item.id !== id);
  const fees = feesForTopic(id);
  const faq = topicFaqs[id];
  const faqNode = topicFaqSchema(locale, slug, topic);
  const isUrology = slug === "urology";
  const newTab = <span className="visually-hidden">{ui.newTab[locale]}</span>;
  return (
    <div className={`site locale-${locale} field-site`} id="top">
      <JsonLd
        nodes={[
          ...entityNodes(locale),
          breadcrumbSchema(locale, [
            { name: ui.home[locale], path: "" },
            { name: fieldsHub[locale].title, path: "fields/" },
            { name: field.title, path: `fields/${slug}/` },
            { name: topic.title[locale], path: `fields/${slug}/${id}/` },
          ]),
          topicSchema(locale, slug, topic),
          ...(faqNode ? [faqNode] : []),
        ]}
      />
      <Header locale={locale} section={`fields/${slug}/${id}/`} />
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
            <a href={fieldPath(locale, slug)}>{field.title}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{topic.title[locale]}</span>
          </nav>
          <header className="field-heading topic-heading">
            <p className="eyebrow">
              <span className="status-dot" /> {field.eyebrow}
            </p>
            <h1>{topic.title[locale]}</h1>
            <p className="field-lead">{topic.concern[locale]}</p>
            <p className="care-hero-intro">{topic.description[locale]}</p>
            <CareByline locale={locale} />
          </header>
          <div className="care-reading topic-reading">
            <section className="care-section" aria-labelledby="topic-method">
              <h2 id="topic-method">{ui.method[locale]}</h2>
              <p>{topic.method[locale]}</p>
            </section>
            <section className="care-section" aria-labelledby="topic-course">
              <h2 id="topic-course">{ui.course[locale]}</h2>
              <p>{topic.course[locale]}</p>
            </section>
            <section className="care-section" aria-labelledby="topic-caution">
              <h2 id="topic-caution">{ui.caution[locale]}</h2>
              <div className="care-topic-facts">
                <div className="care-topic-caution">
                  <p>{topic.caution[locale]}</p>
                </div>
              </div>
            </section>
            <section className="care-section" aria-labelledby="topic-fees">
              <h2 id="topic-fees">{ui.costs[locale]}</h2>
              {fees.length > 0 && (
                <>
                  <p>{ui.costNote[locale]}</p>
                  <table className="care-fee-table">
                    <caption>
                      {ui.checked[locale]}：
                      <time dateTime={careCheckedAt}>{careCheckedAt}</time>
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">{ui.item[locale]}</th>
                        <th scope="col">{ui.price[locale]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((row) => (
                        <tr key={row.label.en}>
                          <th scope="row">
                            <a href={`${clinicUrl}/${row.source}/`}>
                              {row.label[locale]}
                            </a>
                          </th>
                          <td>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              <p className="care-fee-note">{costExtra[slug][locale]}</p>
              {!isUrology && (
                <a
                  className="care-inline-link"
                  href={`${clinicUrl}/fee/`}
                  target="_blank"
                  rel="noopener"
                >
                  {ui.feeLink[locale]}
                  {newTab}
                  <span aria-hidden="true"> ↗</span>
                </a>
              )}
            </section>
            {faq && (
              <section
                className="care-section"
                aria-labelledby="topic-faq-title"
              >
                <h2 id="topic-faq-title">{ui.faq[locale]}</h2>
                <div className="care-faq-list">
                  {faq.map((qa) => (
                    <article key={qa.question.en}>
                      <h3>
                        <span aria-hidden="true">Q.</span>
                        {qa.question[locale]}
                      </h3>
                      <p>{qa.answer[locale]}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
          <aside className="field-note">
            <strong>
              {locale === "ja"
                ? "大切なお知らせ"
                : locale === "zh"
                  ? "重要提示"
                  : "Important note"}
            </strong>
            <p>{field.note}</p>
          </aside>
          <div className="field-actions">
            <a
              className="contact-button"
              href={clinicReserveUrl}
              target="_blank"
              rel="noopener"
            >
              {content[locale].reserve}
              {newTab}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href={topic.source}
              target="_blank"
              rel="noopener"
            >
              <span className="visually-hidden">
                {topic.title[locale]}
                {locale === "en" ? ": " : "："}
              </span>
              {ui.source[locale]}
              {newTab}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <section
            className="field-related"
            aria-labelledby="topic-others-title"
          >
            <div>
              <p className="eyebrow">
                {tr("SAME FIELD", "SAME FIELD", "同一领域")[locale]}
              </p>
              <h2 id="topic-others-title">
                {isUrology ? ui.conditions[locale] : ui.treatments[locale]}
              </h2>
            </div>
            <div className="field-related-links">
              {others.map((other) => (
                <a
                  className="field-related-link"
                  href={topicPath(locale, slug, other.id)}
                  key={other.id}
                >
                  <span className="field-related-eyebrow">
                    {other.concern[locale]}
                  </span>
                  <span className="field-related-title">
                    {other.title[locale]}
                  </span>
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
          <nav
            className="care-field-switch field-related-cross"
            aria-label={ui.otherFields[locale]}
          >
            {topic.related && (
              <a href={fieldPath(locale, topic.related)}>
                {fieldCopy[locale][topic.related].title}
              </a>
            )}
            <a href={fieldsHubPath(locale)}>{ui.allFields[locale]}</a>
          </nav>
          <a className="field-back text-link" href={fieldPath(locale, slug)}>
            ← {field.title}
          </a>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
