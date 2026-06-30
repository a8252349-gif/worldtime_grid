import fs from "node:fs";import path from "node:path";
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk("out").filter(f=>/\/(en|ko|ja|es)\/.*index\.html$/.test(f));
const urlFor=f=>"/"+path.relative("out",path.dirname(f)).split(path.sep).filter(Boolean).join("/")+"/";
const urls=new Set(files.map(urlFor)),incoming=new Map([...urls].map(u=>[u,0]));
for(const file of files){const html=fs.readFileSync(file,"utf8");for(const m of html.matchAll(/href="(\/(?:en|ko|ja|es)\/[^"?#]*)"/g)){const u=m[1].endsWith("/")?m[1]:m[1]+"/";if(incoming.has(u))incoming.set(u,incoming.get(u)+1);}}
const orphans=[...incoming].filter(([u,n])=>n===0&&!/^\/(en|ko|ja|es)\/$/.test(u));
if(orphans.length){console.error(`Orphan pages found (${orphans.length}):\n${orphans.slice(0,30).map(([u])=>u).join("\n")}`);process.exit(1);}
console.log(`Orphan-page check passed for ${urls.size} localized pages.`);
