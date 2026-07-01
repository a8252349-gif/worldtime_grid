import fs from "node:fs";
import path from "node:path";

const token = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "").trim();
if (!token) {
  console.log("Search Console verification token is not set; skipping generated HTML token check.");
  process.exit(0);
}

const files = [
  path.join("out", "index.html"),
  path.join("out", "en", "index.html"),
  path.join("out", "ko", "index.html"),
  path.join("out", "ja", "index.html"),
  path.join("out", "es", "index.html"),
];

for (const file of files) {
  if (!fs.existsSync(file)) throw new Error(`Missing generated page: ${file}`);
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('name="google-site-verification"') || !html.includes(`content="${token}"`)) {
    throw new Error(`Google verification meta tag missing or incorrect in ${file}`);
  }
}
console.log(`Google verification meta tag found in ${files.length} generated entry pages.`);
