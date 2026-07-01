import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
  );
}

const bool = (value) => ["1", "true", "yes", "on"].includes((value || "").trim().toLowerCase());
const scriptEnabled = bool(process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED);
const manualEnabled = bool(process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED);
const placeholders = bool(process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS);
const errors = [];

for (const file of walk("out").filter((item) => item.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const hasAd = html.includes('class="adsbygoogle"');
  const hasPlaceholder = html.includes("ad-placeholder");

  if ((!scriptEnabled || !manualEnabled) && !placeholders && (hasAd || hasPlaceholder)) {
    errors.push(`${file}: advertising markup is visible while manual ads are disabled`);
  }

  if (hasAd) {
    const units = [...html.matchAll(/<ins[^>]*class="adsbygoogle"[^>]*>/g)].map((match) => match[0]);
    for (const unit of units) {
      if (!/data-ad-client="ca-pub-\d{10,}"/.test(unit)) errors.push(`${file}: invalid or missing data-ad-client`);
      if (!/data-ad-slot="\d+"/.test(unit)) errors.push(`${file}: invalid or missing data-ad-slot`);
    }
  }
}

if (errors.length) {
  console.error(`Ad-slot check failed:\n${errors.slice(0, 50).join("\n")}`);
  process.exit(1);
}

console.log("Ad-slot check passed.");
