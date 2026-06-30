import fs from "node:fs";import path from "node:path";
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const patterns=[/NEXT_PUBLIC_[A-Z_]+/,/Render Static Site/i,/Deploy(?:ment)? to Render/i,/GitHub deploy/i,/Lighthouse target/i,/\bTODO\b/,/Set [A-Z_]+ before launch/i,/supplied project configuration/i,/provided project configuration/i,/환경변수를 설정/i,/운영 전에 NEXT_PUBLIC/i,/公開前にNEXT_PUBLIC/i,/Configura NEXT_PUBLIC/i];
const errors=[];
for(const file of walk("out").filter(f=>f.endsWith(".html"))){let text=fs.readFileSync(file,"utf8");text=text.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ");for(const pattern of patterns)if(pattern.test(text))errors.push(`${file}: ${pattern}`);}
if(errors.length){console.error(`Developer-facing copy found (${errors.length}):\n${errors.slice(0,40).join("\n")}`);process.exit(1);}
console.log("Public copy check passed: no deployment or environment-variable instructions are exposed.");
