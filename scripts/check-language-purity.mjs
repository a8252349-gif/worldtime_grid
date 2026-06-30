import fs from "node:fs";
import path from "node:path";

const root = "out";
const sourceRoot = "src/data";
const knownForeignPhrases = [
  "reliable world-time comparison",
  "multi-region meeting selection",
  "daylight-saving resilience",
  "offset and zone literacy",
  "three-continent scheduling",
  "working-hour intersection",
  "date-line clarity",
  "unambiguous time notation",
  "calendar-safe event creation",
  "scheduling fairness",
  "error prevention",
  "recurring-event stability",
  "clear written scheduling",
  "privacy-preserving planning",
  "IANA identifier practice",
  "an operations team whose weekly London–New York call shifts relative to Seoul",
  "losing future daylight-saving behavior",
  "two alternating windows across a four-week cycle",
  "convert local intervals into UTC and intersect the resulting ranges",
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
  );
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<details[^>]*class=["'][^"']*language-picker[^"']*["'][^>]*>[\s\S]*?<\/details>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ");
}

const errors = [];
const forbiddenScripts = {
  en: [/[가-힣ぁ-ゟ゠-ヿ一-龯]/],
  ko: [/[ぁ-ゟ゠-ヿ]/],
  ja: [/[가-힣]/],
  es: [/[가-힣ぁ-ゟ゠-ヿ一-龯]/],
};

for (const locale of Object.keys(forbiddenScripts)) {
  const dir = path.join(root, locale);
  if (!fs.existsSync(dir)) {
    errors.push(`Missing ${dir}`);
    continue;
  }
  for (const file of walk(dir).filter((entry) => entry.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    if (!new RegExp(`<html[^>]+lang=["']${locale}["']`, "i").test(html)) {
      errors.push(`${file}: incorrect or missing html lang`);
    }
    const text = visibleText(html);
    for (const pattern of forbiddenScripts[locale]) {
      if (pattern.test(text)) errors.push(`${file}: unexpected foreign-script text ${pattern}`);
    }
    if (locale !== "en") {
      for (const phrase of knownForeignPhrases) {
        if (text.toLowerCase().includes(phrase.toLowerCase())) errors.push(`${file}: untranslated phrase “${phrase}”`);
      }
    }
    if (locale === "ko" || locale === "ja") {
      const longEnglishRuns = text.match(/\b(?:[A-Za-z][A-Za-z'’-]*\s+){4,}[A-Za-z][A-Za-z'’-]*\b/g) || [];
      for (const run of longEnglishRuns) {
        if (/^(WorldTime Grid|Google|IANA|UTC|ICS|Slack|Markdown|localStorage)/i.test(run)) continue;
        errors.push(`${file}: suspicious English sentence “${run.slice(0, 100)}”`);
      }
    }
  }
}

for (const filename of ["home.generated.json", "guides.generated.json"]) {
  const file = path.join(sourceRoot, filename);
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const locale of ["ko", "ja", "es"]) {
    const localized = filename === "home.generated.json"
      ? parsed[locale]
      : parsed.filter((entry) => entry.locale === locale);
    const text = JSON.stringify(localized);
    for (const phrase of knownForeignPhrases) {
      if (text.toLowerCase().includes(phrase.toLowerCase())) errors.push(`${file} (${locale}): untranslated phrase “${phrase}”`);
    }
  }
}

if (errors.length) {
  console.error(`Language purity check failed (${errors.length}):\n${errors.slice(0, 80).join("\n")}`);
  process.exit(1);
}
console.log("Language purity checks passed for visible static HTML and localized content data.");
