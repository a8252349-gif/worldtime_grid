import fs from "node:fs";
const guides=JSON.parse(fs.readFileSync("src/data/guides.generated.json","utf8"));
const required=["slug","locale","title","description","intro","sections","table","checklist","mistakes","faqs","related","updated","svg"];
const failures=[];
for(const g of guides){for(const field of required)if(!g[field]||(Array.isArray(g[field])&&!g[field].length))failures.push(`${g.locale}/${g.slug}: missing ${field}`);if(g.faqs.length<5)failures.push(`${g.locale}/${g.slug}: fewer than 5 FAQs`);if(g.related.length<3)failures.push(`${g.locale}/${g.slug}: fewer than 3 related guides`);if(g.table.length<2)failures.push(`${g.locale}/${g.slug}: table missing rows`);}
const counts=Object.groupBy(guides,g=>g.locale);for(const locale of ["en","ko","ja","es"])if((counts[locale]||[]).length!==15)failures.push(`${locale}: expected 15 guides`);
if(failures.length){console.error(failures.join("\n"));process.exit(1);}console.log("Content quality structure passed for 60 guides.");
