import fs from "node:fs";
import path from "node:path";

const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
const xml = fs.readFileSync("public/sitemap.xml", "utf8");
const txt = fs.readFileSync("public/sitemap.txt", "utf8").trim().split("\n").filter(Boolean);
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const failures = [];

if (locs.length !== txt.length) failures.push(`XML ${locs.length} and TXT ${txt.length} counts differ`);
if (new Set(locs).size !== locs.length) failures.push("duplicate sitemap URLs");
for (let index = 0; index < locs.length; index += 1) if (locs[index] !== txt[index]) failures.push(`XML/TXT mismatch at ${index}: ${locs[index]} vs ${txt[index]}`);

for (const url of locs) {
  let parsed;
  try { parsed = new URL(url); } catch { failures.push(`invalid URL: ${url}`); continue; }
  if (parsed.origin !== origin) failures.push(`wrong origin: ${url}`);
  const route = parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
  const target = route === "/" ? path.join("out", "index.html") : path.join("out", route, "index.html");
  if (!fs.existsSync(target)) failures.push(`missing exported file for ${url}: ${target}`);
}

const exported = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "index.html" && (full === path.join("out", "index.html") || /out\/(en|ko|ja|es)\//.test(full.replaceAll("\\", "/")))) exported.push(full);
  }
}
walk("out");
const exportedUrls = new Set(exported.map((file) => {
  if (file === path.join("out", "index.html")) return `${origin}/`;
  const directory = path.relative("out", path.dirname(file)).split(path.sep).join("/");
  return `${origin}/${directory}/`;
}));
for (const url of exportedUrls) if (!locs.includes(url)) failures.push(`exported indexable page missing from sitemap: ${url}`);

if (failures.length) {
  console.error(`Sitemap/export check failed (${failures.length}):\n${failures.slice(0, 50).join("\n")}`);
  process.exit(1);
}
console.log(`Sitemap/export match passed with ${locs.length} URLs and ${exportedUrls.size} exported index pages.`);
