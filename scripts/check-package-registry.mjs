import fs from "node:fs";

const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const badResolved = [];
const privateUrls = [];
const privateHostPattern = /(artifactory|applied-caas|localhost|\.local$|^127\.|^10\.|^192\.168\.|^172\.(1[6-9]|2\d|3[01])\.)/i;

for (const [name, pkg] of Object.entries(lock.packages || {})) {
  const resolved = pkg?.resolved;
  if (typeof resolved !== "string") continue;
  if (resolved.startsWith("https://registry.npmjs.org/")) continue;
  if (resolved.startsWith("git+") || resolved.startsWith("github:")) continue;
  badResolved.push(`${name || "root"}: ${resolved}`);
}

function inspect(value, pointer = "package-lock") {
  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      if (privateHostPattern.test(url.hostname)) privateUrls.push(`${pointer}: ${value}`);
    } catch {
      privateUrls.push(`${pointer}: invalid URL ${value}`);
    }
    return;
  }
  if (Array.isArray(value)) value.forEach((item, index) => inspect(item, `${pointer}[${index}]`));
  else if (value && typeof value === "object") Object.entries(value).forEach(([key, item]) => inspect(item, `${pointer}.${key}`));
}
inspect(lock);

const failures = [...badResolved.map((value) => `non-public resolved URL: ${value}`), ...privateUrls.map((value) => `private URL: ${value}`)];
if (failures.length) {
  console.error(`Package registry check failed (${failures.length}):\n${failures.slice(0, 30).join("\n")}`);
  process.exit(1);
}
const tarballs = Object.values(lock.packages || {}).filter((pkg) => typeof pkg?.resolved === "string").length;
console.log(`Package registry check passed: ${tarballs} tarball URLs use https://registry.npmjs.org/ and private URL count is 0.`);
