import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";

const guideSrc = await readFile("src/lib/care-guide.ts", "utf8");

// Generate code-native typographic share cards from local photos and fonts.
// No external image API, web server or network access is required.
async function embeddedFont(packageName) {
  const directory = new URL(
    `../node_modules/@fontsource-variable/${packageName}/`,
    import.meta.url,
  );
  let css = await readFile(new URL("index.css", directory), "utf8");
  for (const path of new Set(
    [...css.matchAll(/url\(([^)]+)\)/g)].map((match) =>
      match[1].replace(/["']/g, ""),
    ),
  )) {
    const data = await readFile(new URL(path, directory));
    css = css
      .split(path)
      .join(`data:font/woff2;base64,${data.toString("base64")}`);
  }
  return css;
}
const fonts = (
  await Promise.all([embeddedFont("dm-sans"), embeddedFont("noto-sans-jp")])
).join("\n");

// Each card renders to public/images/og/{key}-{locale}.png.
// Field cards are referenced by fieldMetadata(); when publishing a real
// dialogue, add an `article-{slug}` card and dialogueMetadata() picks it up.
const cards = [
  {
    key: "profile",
    file: "portrait.webp",
    eyebrow: "CARE BEYOND BEAUTY",
    badge: "OSAKA, JAPAN",
    grayscale: true,
    copy: {
      ja: ["千原 良友", "医師・医学博士", "その人らしさに、医療で寄り添う。"],
      en: [
        "Yoshitomo<br>Chihara",
        "Physician & PhD",
        "Care that sees the person in you.",
      ],
      zh: ["千原 良友", "医生・医学博士", "以医疗，守护每个人的独特。"],
    },
  },
  {
    key: "crossroads",
    file: "stock/conversation.webp",
    eyebrow: "HUMAN CROSSROADS / DIALOGUES",
    badge: "ILLUSTRATIVE PHOTOGRAPH",
    copy: {
      ja: ["人間交差点", "千原良友の対談シリーズ", "対話から見つける、生き方のヒント。"],
      en: [
        "Human<br>Crossroads",
        "Conversations with Yoshitomo Chihara",
        "Where lives meet. Where perspectives grow.",
      ],
      zh: ["人生交汇点", "千原良友的对谈系列", "从对话中，发现生活的启发。"],
    },
  },
  {
    key: "sample",
    file: "stock/laboratory.webp",
    eyebrow: "HUMAN CROSSROADS / DIALOGUES",
    badge: "FICTION / SAMPLE",
    copy: {
      ja: ["再生医療の未来", "期待と根拠のあいだで考える", "架空の医師との対談サンプル"],
      en: [
        "Regenerative<br>medicine",
        "Between hope and evidence",
        "A fictional conversation between doctors",
      ],
      zh: ["再生医疗的未来", "在期待与证据之间", "与虚构医生的对谈示例"],
    },
  },
  {
    key: "field-rejuvenation",
    file: "consultation.webp",
    eyebrow: "FIELDS OF CARE",
    badge: "OSAKA, JAPAN",
    copy: {
      ja: ["美容医療", "AESTHETIC MEDICINE", "変化を急がず、その人らしい表情と毎日に寄り添う医療。"],
      en: [
        "Aesthetic<br>medicine",
        "AESTHETIC MEDICINE",
        "Care for the way you look, feel and move through everyday life.",
      ],
      zh: ["美容医疗", "AESTHETIC MEDICINE", "从容面对变化，让医疗贴近每个人的日常与表情。"],
    },
  },
  {
    key: "field-regenerate",
    file: "stock/laboratory.webp",
    eyebrow: "FIELDS OF CARE",
    badge: "ILLUSTRATIVE PHOTOGRAPH",
    copy: {
      ja: ["再生医療", "REGENERATIVE MEDICINE", "期待だけでなく、根拠・限界・リスクを丁寧に確認する。"],
      en: [
        "Regenerative<br>medicine",
        "REGENERATIVE MEDICINE",
        "Hope matters. So do evidence, uncertainty and informed consent.",
      ],
      zh: ["再生医疗", "REGENERATIVE MEDICINE", "关注期待，也同样关注证据、不确定性与知情同意。"],
    },
  },
  {
    key: "field-urology",
    file: "stock/stethoscope.webp",
    eyebrow: "FIELDS OF CARE",
    badge: "ILLUSTRATIVE PHOTOGRAPH",
    copy: {
      ja: ["泌尿器科", "UROLOGY", "相談しづらい排尿の悩みを、腎臓から尿道までの仕組みから考える。"],
      en: [
        "Urology",
        "UROLOGY",
        "A straightforward place to discuss urinary symptoms and men’s health.",
      ],
      zh: ["泌尿科", "UROLOGY", "从肾脏到尿道，坦然讨论难以启齿的排尿困扰。"],
    },
  },
  // Published dialogue articles — add one entry per published article, e.g.:
  // { key: "article-my-slug", file: "dialogues/my-slug.webp", eyebrow: "HUMAN CROSSROADS / DIALOGUES", badge: "CONVERSATION", copy: { ja: [...], en: [...], zh: [...] } },
];

// Per-topic cards are derived from src/lib/care-guide.ts so they stay in sync
// with the topic data. Each topic block is flat (`{ id: "...", title: tr("ja",
// "en", "zh"), ... }`), which lets us read titles with a simple parser.
const topicCards = (() => {
  const fields = [
    { slug: "rejuvenation", file: "consultation.webp", badge: "OSAKA, JAPAN", name: { ja: "美容医療", en: "AESTHETIC MEDICINE", zh: "美容医疗" } },
    { slug: "regenerate", file: "stock/laboratory.webp", badge: "ILLUSTRATIVE PHOTOGRAPH", name: { ja: "再生医療", en: "REGENERATIVE MEDICINE", zh: "再生医疗" } },
    { slug: "urology", file: "stock/stethoscope.webp", badge: "ILLUSTRATIVE PHOTOGRAPH", name: { ja: "泌尿器科", en: "UROLOGY", zh: "泌尿科" } },
  ];
  const list = [];
  for (const [index, field] of fields.entries()) {
    // Topic blocks sit between `slug: [` and the next field key.
    const from = guideSrc.indexOf(`${field.slug}: [`);
    const next = fields[index + 1]?.slug;
    const to = next ? guideSrc.indexOf(`${next}: [`) : guideSrc.length;
    const section = guideSrc.slice(from, to);
    for (const block of section.matchAll(
      /\{[^{}]*?\bid: "([^"]+)",([\s\S]*?)\n    \},?/g,
    )) {
      const [, id, body] = block;
      const texts = (key) => {
        // A tr() call ends with `)` followed by `,` or `}`; `)` inside a
        // string (e.g. "Platelet-rich plasma (PRP)") is followed by `"`.
        const match = body.match(
          new RegExp(`${key}: tr\\(([\\s\\S]*?)\\)(?=[,}\\s])`),
        );
        if (!match) return null;
        const strings = [...match[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(
          (s) => JSON.parse(`"${s[1]}"`),
        );
        return strings.length === 3 ? strings : null;
      };
      const [ja, en, zh] = texts("title") ?? [];
      const concern = texts("concern") ?? [];
      if (!ja || !en || !zh)
        throw new Error(`Could not parse topic "${id}" in care-guide.ts`);
      list.push({
        key: `topic-${id}`,
        file: field.file,
        eyebrow: "FIELDS OF CARE",
        badge: field.badge,
        copy: {
          ja: [ja, field.name.ja, concern[0] ?? ""],
          en: [en, field.name.en, concern[1] ?? ""],
          zh: [zh, field.name.zh, concern[2] ?? ""],
        },
      });
    }
  }
  return list;
})();
cards.push(...topicCards);
if (topicCards.length < 20)
  throw new Error(
    `Expected at least 20 topic cards, parsed ${topicCards.length} — check the care-guide.ts format`,
  );
const browser = await chromium.launch({ headless: true });
await mkdir("public/images/og", { recursive: true });
try {
  for (const card of cards) {
    const picture = (await readFile(`public/images/${card.file}`)).toString(
      "base64",
    );
    for (const [locale, [title, subtitle, description]] of Object.entries(
      card.copy,
    )) {
      const page = await browser.newPage({
        viewport: { width: 1200, height: 630 },
        deviceScaleFactor: 1,
      });
      await page.setContent(`<!doctype html><html lang="${locale}"><head><style>${fonts}
        *{box-sizing:border-box}body{margin:0;background:#f3f2ed;color:#242621;font-family:'DM Sans Variable','Noto Sans JP Variable',sans-serif}
        main{width:1200px;height:630px;position:relative;overflow:hidden}.photo{position:absolute;right:0;top:0;width:460px;height:630px;object-fit:cover;${card.grayscale ? "filter:grayscale(1);object-position:55% center;" : ""}}
        .copy{width:740px;height:630px;padding:48px 52px;position:relative;display:flex;flex-direction:column}.brand{font:italic 58px Georgia,serif;line-height:1}.brand span{color:#b7432d}.eyebrow{font-size:14px;letter-spacing:2px;margin:35px 0 0;color:#b7432d}
        h1{font-size:${card.key.startsWith("topic-") ? (locale === "en" ? "52" : "56") : locale === "en" ? "68" : "62"}px;line-height:1.18;letter-spacing:-1px;margin:24px 0 20px;font-weight:500}h2{font-size:23px;font-weight:400;margin:0;line-height:1.6}.description{font-size:18px;line-height:1.8;color:#696b62;margin:15px 0 0}.footer{margin-top:auto;font-size:13px;letter-spacing:2px;border-top:1px solid #d8d8cd;padding-top:18px}
        .badge{position:absolute;right:24px;bottom:28px;background:#f3f2ed;color:#b7432d;padding:12px 16px;font-size:13px;letter-spacing:1px}.line{position:absolute;left:0;top:0;width:8px;height:630px;background:#b7432d}
      </style></head><body><main><img class="photo" alt="" src="data:image/webp;base64,${picture}"><div class="copy"><div class="brand">yc<span>·</span></div><p class="eyebrow">${card.eyebrow}</p><h1>${title}</h1><h2>${subtitle}</h2><p class="description">${description}</p><div class="footer">YOSHITOMO CHIHARA · ${card.key === "profile" ? "PERSONAL WEBSITE" : card.key.startsWith("field-") || card.key.startsWith("topic-") ? "FIELDS OF CARE" : "CONVERSATIONS"}</div></div><div class="badge">${card.badge}</div><div class="line"></div></main></body></html>`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map((image) => image.decode()));
      });
      await page.screenshot({
        path: `public/images/og/${card.key}-${locale}.png`,
      });
      console.log(`Generated ${card.key}-${locale}.png`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
