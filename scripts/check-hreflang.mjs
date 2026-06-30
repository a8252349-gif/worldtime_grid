import fs from "node:fs";
import path from "node:path";

const locales = ["en", "ko", "ja", "es"];
const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]
  );
}

function routeFor(file) {
  const directory = path.relative("out", path.dirname(file)).split(path.sep).filter(Boolean).join("/");
  return `/${directory}/`;
}

function alternates(html) {
  const result = new Map();
  for (const match of html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"[^>]*>/gi)) {
    result.set(match[1], match[2]);
  }
  return result;
}

const files = walk("out").filter((file) => /\/(en|ko|ja|es)\/.*index\.html$/.test(file));
const pages = new Map(files.map((file) => [routeFor(file), fs.readFileSync(file, "utf8")]));
const failures = [];

for (const [route, html] of pages) {
  const currentLocale = route.split("/")[1];
  const suffix = route.replace(new RegExp(`^/${currentLocale}`), "");
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  const expectedCanonical = `${origin}${route}`;
  if (canonical !== expectedCanonical) failures.push(`${route}: canonical ${canonical || "missing"} !== ${expectedCanonical}`);

  const links = alternates(html);
  for (const locale of locales) {
    const targetRoute = `/${locale}${suffix}`;
    const expected = `${origin}${targetRoute}`;
    if (links.get(locale) !== expected) failures.push(`${route}: ${locale} alternate ${links.get(locale) || "missing"} !== ${expected}`);
    if (!pages.has(targetRoute)) failures.push(`${route}: alternate target missing ${targetRoute}`);
    else {
      const reciprocal = alternates(pages.get(targetRoute));
      if (reciprocal.get(currentLocale) !== `${origin}${route}`) failures.push(`${targetRoute}: missing reciprocal ${currentLocale} link to ${route}`);
    }
  }
  const expectedDefault = `${origin}/en${suffix}`;
  if (links.get("x-default") !== expectedDefault) failures.push(`${route}: x-default ${links.get("x-default") || "missing"} !== ${expectedDefault}`);
}

if (failures.length) {
  console.error(`hreflang/canonical check failed (${failures.length}):\n${failures.slice(0, 50).join("\n")}`);
  process.exit(1);
}
console.log(`hreflang and canonical reciprocity passed for ${pages.size} localized pages.`);
