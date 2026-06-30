import fs from "node:fs";
const guides=JSON.parse(fs.readFileSync("src/data/guides.generated.json","utf8"));
const flatten=g=>[...g.intro,...g.sections.flatMap(s=>[s.heading,...s.paragraphs]),...g.table.flat(),...g.checklist,...g.mistakes,...g.faqs.flat()].join(" ");
const failures=[];const stats={};
for(const g of guides){const text=flatten(g);let count,minimum;if(g.locale==="en"||g.locale==="es"){count=(text.match(/[\p{L}\p{N}’'-]+/gu)||[]).length;minimum=1200;}else{count=text.replace(/\s/g,"").length;minimum=g.locale==="ko"?3500:3000;}stats[g.locale]??=[];stats[g.locale].push(count);if(count<minimum)failures.push(`${g.locale}/${g.slug}: ${count} < ${minimum}`);}
for(const [locale,values] of Object.entries(stats))console.log(`${locale}: min ${Math.min(...values)}, max ${Math.max(...values)}, guides ${values.length}`);
if(failures.length){console.error(failures.join("\n"));process.exit(1);}console.log("Guide length check passed.");
