import fs from "node:fs";import path from "node:path";
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const seenTitle=new Map(),seenDescription=new Map(),errors=[];
for(const file of walk("out").filter(f=>/\/(en|ko|ja|es)\/.*index\.html$/.test(f))){
 const html=fs.readFileSync(file,"utf8");
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim();
 const desc=html.match(/<meta name="description" content="([^"]*)"/s)?.[1]?.trim();
 for(const [value,map,label] of [[title,seenTitle,"title"],[desc,seenDescription,"description"]]){
  if(!value){errors.push(`${file}: missing ${label}`);continue;}
  if(map.has(value))errors.push(`${label} duplicate: ${file} and ${map.get(value)}`);else map.set(value,file);
 }
}
if(errors.length){console.error(`Metadata uniqueness failed (${errors.length}):\n${errors.slice(0,30).join("\n")}`);process.exit(1);}
console.log(`Metadata uniqueness passed: ${seenTitle.size} titles and ${seenDescription.size} descriptions.`);
