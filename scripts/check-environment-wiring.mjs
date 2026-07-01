import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const read = (...parts) => fs.readFileSync(path.join(out, ...parts), "utf8");
const errors = [];
const expectContains = (html, value, label) => {
  if (value && !html.includes(value)) errors.push(`${label} is missing: ${value}`);
};
const expectNotContains = (html, value, label) => {
  if (value && html.includes(value)) errors.push(`${label} should not contain: ${value}`);
};
const bool = (value) => ["1", "true", "yes", "on"].includes((value || "").trim().toLowerCase());

if (!fs.existsSync(out)) {
  console.error("The out directory does not exist. Run npm run build first.");
  process.exit(1);
}

const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/+$/, "");
const verification = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "").trim();
const client = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9328837907414732").trim();
const contact = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim();
const scriptEnabled = bool(process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED);
const manualEnabled = bool(process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED);
const placeholders = bool(process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS);
const cmpEnabled = bool(process.env.NEXT_PUBLIC_GOOGLE_CMP_ENABLED);
const slots = {
  home: (process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT || "").trim(),
  guide: (process.env.NEXT_PUBLIC_ADSENSE_GUIDE_SLOT || "").trim(),
  content: (process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "").trim(),
  planner: (process.env.NEXT_PUBLIC_ADSENSE_PLANNER_BOTTOM_SLOT || "").trim(),
};

const rootHtml = read("index.html");
const homeHtml = read("en", "index.html");
const plannerHtml = read("en", "planner", "index.html");
const guideHtml = read("en", "guides", "time-zone-converter-guide", "index.html");
const contentHtml = read("en", "about", "index.html");
const contactHtml = read("en", "contact", "index.html");

expectContains(rootHtml, site, "Root canonical/site URL");
expectContains(homeHtml, `${site}/en/`, "Localized canonical/site URL");
expectContains(fs.readFileSync(path.join(out, "robots.txt"), "utf8"), `${site}/sitemap.xml`, "robots.txt sitemap URL");
expectContains(fs.readFileSync(path.join(out, "sitemap.xml"), "utf8"), `${site}/en/`, "sitemap origin");

if (verification) {
  expectContains(rootHtml, `name="google-site-verification"`, "Root Search Console meta name");
  expectContains(rootHtml, verification, "Root Search Console token");
  expectContains(homeHtml, verification, "Localized Search Console token");
}

if (/^ca-pub-\d{10,}$/.test(client)) {
  expectContains(rootHtml, `name="google-adsense-account"`, "Root AdSense account meta name");
  expectContains(rootHtml, client, "Root AdSense publisher ID");
  expectContains(homeHtml, client, "Localized AdSense publisher ID");
  expectContains(fs.readFileSync(path.join(out, "ads.txt"), "utf8"), client.replace(/^ca-/, ""), "ads.txt publisher ID");
}

if (contact) expectContains(contactHtml, `mailto:${contact}`, "Contact email");

const activeManualAds = scriptEnabled && manualEnabled;
if (activeManualAds) {
  if (/^\d+$/.test(slots.home)) expectContains(homeHtml, `data-ad-slot="${slots.home}"`, "Home ad slot");
  if (/^\d+$/.test(slots.guide)) expectContains(guideHtml, `data-ad-slot="${slots.guide}"`, "Guide ad slot");
  if (/^\d+$/.test(slots.content)) expectContains(contentHtml, `data-ad-slot="${slots.content}"`, "Content ad slot");
  if (/^\d+$/.test(slots.planner)) expectContains(plannerHtml, `data-ad-slot="${slots.planner}"`, "Planner-bottom ad slot");
} else if (!placeholders) {
  for (const [label, html] of [["home", homeHtml], ["guide", guideHtml], ["content", contentHtml], ["planner", plannerHtml]]) {
    expectNotContains(html, "class=\"adsbygoogle\"", `${label} page`);
    expectNotContains(html, "ad-placeholder", `${label} page`);
  }
}

if (scriptEnabled && cmpEnabled) {
  expectContains(rootHtml, "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", "Root AdSense loader with Google CMP");
  expectContains(homeHtml, "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", "Localized AdSense loader with Google CMP");
}

if (errors.length) {
  console.error(`Environment wiring check failed (${errors.length}):\n${errors.join("\n")}`);
  process.exit(1);
}

console.log("Environment wiring check passed.");
console.log(JSON.stringify({ site, verification: Boolean(verification), client, scriptEnabled, manualEnabled, placeholders, cmpEnabled, slots }, null, 2));
