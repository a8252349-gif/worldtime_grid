import fs from "node:fs";import path from "node:path";
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const errors=[];
for(const file of walk("out").filter(f=>f.endsWith(".html"))){const html=fs.readFileSync(file,"utf8");if(/ad-placeholder|adsbygoogle/.test(html))errors.push(file);}
if(errors.length){console.error(`Advertising markup is visible while approval-mode ads are disabled:\n${errors.slice(0,30).join("\n")}`);process.exit(1);}
console.log("Ad-slot check passed: no empty or active advertising blocks are present.");
