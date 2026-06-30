import fs from "node:fs";

const guides = JSON.parse(fs.readFileSync("src/data/guides.generated.json", "utf8"));
const text = (guide) =>
  [...guide.intro, ...guide.sections.flatMap((section) => section.paragraphs)]
    .join(" ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

function grams(value, size = 5) {
  const words = value.split(" ");
  const result = new Set();
  for (let index = 0; index <= words.length - size; index += 1) {
    result.add(words.slice(index, index + size).join(" "));
  }
  return result;
}

let maximum = 0;
let maximumPair = "";
const failures = [];

for (const locale of ["en", "ko", "ja", "es"]) {
  const items = guides
    .filter((guide) => guide.locale === locale)
    .map((guide) => ({ ...guide, grams: grams(text(guide)) }));

  for (let first = 0; first < items.length; first += 1) {
    for (let second = first + 1; second < items.length; second += 1) {
      let common = 0;
      for (const gram of items[first].grams) {
        if (items[second].grams.has(gram)) common += 1;
      }
      const union = items[first].grams.size + items[second].grams.size - common;
      const similarity = union === 0 ? 0 : common / union;
      if (similarity > maximum) {
        maximum = similarity;
        maximumPair = `${locale}: ${items[first].slug} / ${items[second].slug}`;
      }
      if (similarity > 0.15) {
        failures.push(
          `${locale} ${(similarity * 100).toFixed(2)}% ${items[first].slug} / ${items[second].slug}`,
        );
      }
    }
  }
}

console.log(
  `Maximum 5-gram Jaccard similarity: ${(maximum * 100).toFixed(2)}% (${maximumPair})`,
);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Duplicate-content check passed (threshold: 15%).");
