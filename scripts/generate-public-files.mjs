import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const site=(process.env.NEXT_PUBLIC_SITE_URL||"https://example.com").replace(/\/$/,"");
const locales=["en","ko","ja","es"];
const staticPages=["how-it-works","faq","about","contact","privacy","terms","cookie-policy","accessibility","editorial-policy","time-calculation-methodology"];
const resources=["time-converter","working-hours-overlap","dst-checker","date-line-visualizer","utc-offset-explainer"];
const guides=JSON.parse(fs.readFileSync(path.join(root,"src/data/guides.generated.json"),"utf8"));
const slugs=[...new Set(guides.map(g=>g.slug))];
const paths=["/"];
for(const locale of locales){
  paths.push(`/${locale}/`,`/${locale}/planner/`,`/${locale}/guides/`,`/${locale}/resources/`);
  for(const page of staticPages)paths.push(`/${locale}/${page}/`);
  for(const tool of resources)paths.push(`/${locale}/resources/${tool}/`);
  for(const slug of slugs)paths.push(`/${locale}/guides/${slug}/`);
}
const urls=paths.map(p=>`${site}${p}`);
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc><lastmod>2026-06-29</lastmod></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root,"public/sitemap.xml"),xml);
fs.writeFileSync(path.join(root,"public/sitemap.txt"),urls.join("\n")+"\n");
fs.writeFileSync(path.join(root,"public/robots.txt"),`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
const enGuides=guides.filter(g=>g.locale==="en");
const rssItems=enGuides.map(g=>`<item><title><![CDATA[${g.title}]]></title><link>${site}/en/guides/${g.slug}/</link><guid>${site}/en/guides/${g.slug}/</guid><description><![CDATA[${g.description}]]></description><pubDate>Mon, 29 Jun 2026 00:00:00 GMT</pubDate></item>`).join("");
fs.writeFileSync(path.join(root,"public/feed.xml"),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>WorldTime Grid Guides</title><link>${site}/en/guides/</link><description>Global scheduling and time-zone guides</description>${rssItems}</channel></rss>`);
const atomEntries=enGuides.map(g=>`<entry><title>${g.title.replaceAll("&","&amp;")}</title><id>${site}/en/guides/${g.slug}/</id><link href="${site}/en/guides/${g.slug}/"/><updated>2026-06-29T00:00:00Z</updated><summary>${g.description.replaceAll("&","&amp;")}</summary></entry>`).join("");
fs.writeFileSync(path.join(root,"public/atom.xml"),`<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>WorldTime Grid Guides</title><id>${site}/en/guides/</id><updated>2026-06-29T00:00:00Z</updated>${atomEntries}</feed>`);
console.log(`Generated sitemap, feeds and robots for ${urls.length} URLs.`);
