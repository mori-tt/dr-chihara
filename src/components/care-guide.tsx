import { clinicUrl, type Locale } from "@/lib/content";
import { careCheckedAt, careTopics, tr } from "@/lib/care-guide";
import {
  careUi as ui,
  careFaq,
  costExtra,
  examination,
  feeRows,
  furtherReading,
  preparation,
  urgent,
} from "@/lib/care-support";
import { fieldCopy, type FieldSlug } from "@/lib/fields";
import { CareContents } from "./care-contents";

export function CareGuide({
  locale,
  slug,
}: {
  locale: Locale;
  slug: FieldSlug;
}) {
  const topics = careTopics[slug];
  const isUrology = slug === "urology";
  const title = isUrology ? ui.conditions[locale] : ui.treatments[locale];
  const links = [
    ["care-explore", ui.explore[locale]],
    ["care-details", title],
    ["care-process", isUrology ? ui.tests[locale] : ui.process[locale]],
    ["care-fees", ui.costs[locale]],
    ["care-faq", ui.faq[locale]],
    ["care-prepare", ui.prepare[locale]],
  ];
  return (
    <>
      {isUrology && (
        <aside className="care-urgent">
          <strong>
            {
              tr(
                "早めの受診が必要な症状",
                "When to seek prompt care",
                "需及时就医的症状",
              )[locale]
            }
          </strong>
          <p>{urgent[locale]}</p>
        </aside>
      )}
      <div className="care-layout">
        <CareContents
          links={links}
          label={ui.contents[locale]}
          contactLabel={ui.booking[locale]}
          contactUrl={`${clinicUrl}/contact/`}
        />
        <div className="care-reading">
          <section
            className="care-section"
            id="care-explore"
            aria-labelledby="care-explore-title"
          >
            <p className="eyebrow">01 / FIND YOUR CONCERN</p>
            <h2 id="care-explore-title">{ui.explore[locale]}</h2>
            <p className="care-intro">{ui.exploreBody[locale]}</p>
            <div className="care-explorer">
              {topics.map((topic, index) => (
                <a
                  href={`#${topic.id}`}
                  key={topic.id}
                  className="care-explorer-card"
                >
                  <span className="care-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{topic.concern[locale]}</strong>
                  <span className="care-explorer-name">
                    {topic.title[locale]}
                  </span>
                  <span className="care-explorer-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>
          {slug === "regenerate" && (
            <section
              className="care-comparison"
              aria-labelledby="care-compare-title"
            >
              <h2 id="care-compare-title">
                {
                  tr(
                    "3つの方法は、材料も工程も違います。",
                    "Three approaches. Different materials and processes.",
                    "三种方式，材料与流程各不相同。",
                  )[locale]
                }
              </h2>
              <div className="care-compare-grid">
                {[
                  [
                    tr("幹細胞", "Stem cells", "干细胞"),
                    tr(
                      "本人の脂肪 → 細胞を培養 → 投与",
                      "Patient's fat → cell culture → administration",
                      "本人脂肪 → 细胞培养 → 投与",
                    ),
                  ],
                  [
                    tr("PRP", "PRP", "PRP"),
                    tr(
                      "本人の血液 → 血漿を分離 → 注入",
                      "Patient's blood → plasma separation → injection",
                      "本人血液 → 血浆分离 → 注入",
                    ),
                  ],
                  [
                    tr("培養上清液", "Culture supernatant", "培养上清液"),
                    tr(
                      "細胞を培養した液 → 成分を製剤化 → 投与",
                      "Culture fluid → preparation → administration",
                      "细胞培养液 → 制剂 → 投与",
                    ),
                  ],
                ].map(([name, body]) => (
                  <div key={name.en}>
                    <h3>{name[locale]}</h3>
                    <p>{body[locale]}</p>
                  </div>
                ))}
              </div>
              <p>
                {
                  tr(
                    "効果・リスク・承認状況は一括りにできません。目的と製剤ごとに、根拠と他の選択肢を確認します。",
                    "Evidence, risks and approval status differ. Assess the purpose and preparation alongside alternatives.",
                    "效果、风险和批准情况不能一概而论，需按目的和制剂确认依据与替代选择。",
                  )[locale]
                }
              </p>
            </section>
          )}
          <section
            className="care-section"
            id="care-details"
            aria-labelledby="care-details-title"
          >
            <p className="eyebrow">02 / IN DETAIL</p>
            <h2 id="care-details-title">{title}</h2>
            {topics.map((topic, index) => (
              <article
                className="care-topic"
                id={topic.id}
                key={topic.id}
                aria-labelledby={`${topic.id}-title`}
              >
                <header className="care-topic-heading">
                  <span className="care-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="care-topic-concern">
                      {topic.concern[locale]}
                    </p>
                    <h3 id={`${topic.id}-title`}>{topic.title[locale]}</h3>
                  </div>
                </header>
                <p className="care-topic-description">
                  {topic.description[locale]}
                </p>
                <dl className="care-topic-facts">
                  <div>
                    <dt>{ui.method[locale]}</dt>
                    <dd>{topic.method[locale]}</dd>
                  </div>
                  <div>
                    <dt>{ui.course[locale]}</dt>
                    <dd>{topic.course[locale]}</dd>
                  </div>
                  <div className="care-topic-caution">
                    <dt>{ui.caution[locale]}</dt>
                    <dd>{topic.caution[locale]}</dd>
                  </div>
                </dl>
                <div className="care-topic-links">
                  <a href={topic.source}>
                    {ui.source[locale]} <span aria-hidden="true">↗</span>
                  </a>
                  <a href="#care-explore">{ui.back[locale]} ↑</a>
                </div>
              </article>
            ))}
          </section>
          <section
            className="care-section"
            id="care-process"
            aria-labelledby="care-process-title"
          >
            <p className="eyebrow">03 / YOUR VISIT</p>
            <h2 id="care-process-title">
              {isUrology ? ui.tests[locale] : ui.process[locale]}
            </h2>
            {isUrology && (
              <div className="care-exams">
                {examination.map((exam) => (
                  <div key={exam.title.en}>
                    <h3>{exam.title[locale]}</h3>
                    <p>{exam.body[locale]}</p>
                  </div>
                ))}
              </div>
            )}
            <ol className="care-steps">
              {fieldCopy[locale][slug].process.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            {slug === "regenerate" && (
              <p className="care-intro">
                {
                  tr(
                    "幹細胞治療の培養には約1か月が必要と案内されています。採取日・投与日・経過確認日を含む来院計画を立てます。PRPや培養上清液は工程が異なります。",
                    "Cultured-cell treatment requires around one month of culture according to the clinic. Plan collection, administration and follow-up separately; PRP and supernatant have different workflows.",
                    "官方介绍干细胞培养约需一个月，应分别安排采集、投与和复診，PRP与上清液的流程不同。",
                  )[locale]
                }
              </p>
            )}
          </section>
          <section
            className="care-section"
            id="care-fees"
            aria-labelledby="care-fees-title"
          >
            <p className="eyebrow">04 / FEES</p>
            <h2 id="care-fees-title">{ui.costs[locale]}</h2>
            {feeRows[slug].length > 0 && (
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
                    {feeRows[slug].map((row) => (
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
              <a className="care-inline-link" href={`${clinicUrl}/fee/`}>
                {ui.feeLink[locale]} ↗
              </a>
            )}
          </section>
          <section
            className="care-section"
            id="care-faq"
            aria-labelledby="care-faq-title"
          >
            <p className="eyebrow">05 / QUESTIONS</p>
            <h2 id="care-faq-title">{ui.faq[locale]}</h2>
            <div className="care-faq-list">
              {careFaq[slug].map((qa) => (
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
          <section
            className="care-section"
            id="care-prepare"
            aria-labelledby="care-prepare-title"
          >
            <p className="eyebrow">06 / BEFORE YOU VISIT</p>
            <h2 id="care-prepare-title">{ui.prepare[locale]}</h2>
            <ul className="care-preparation">
              {preparation.map((item) => (
                <li key={item.en}>{item[locale]}</li>
              ))}
            </ul>
            <div className="care-contact-panel">
              <h3>{ui.booking[locale]}</h3>
              <p>{ui.bookingNote[locale]}</p>
              <a className="contact-button" href={`${clinicUrl}/contact/`}>
                {
                  tr(
                    "お問い合わせフォーム",
                    "Clinic contact form",
                    "诊所咨询表",
                  )[locale]
                }{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="care-inline-link" href="tel:+81667723456">
                06-6772-3456
              </a>
            </div>
          </section>
          <section
            className="care-sources"
            aria-labelledby="care-sources-title"
          >
            <h2 id="care-sources-title">{ui.references[locale]}</h2>
            <p>
              {ui.checked[locale]}：
              <time dateTime={careCheckedAt}>{careCheckedAt}</time>
            </p>
            <ul>
              {furtherReading
                .filter((item) => item.field === slug)
                .map((item) => (
                  <li key={item.url}>
                    <a href={item.url}>{item.label[locale]} ↗</a>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
