import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
for (const fileName of [".env.local", ".env"]) {
  const filePath = path.join(root, fileName);
  if (!fs.existsSync(filePath)) continue;
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const separator = line.indexOf("=");
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

const text = (key) => (process.env[key] || "").trim();
const bool = (key) => ["1", "true", "yes", "on"].includes(text(key).toLowerCase());
const errors = [];
const warnings = [];

const siteUrl = text("NEXT_PUBLIC_SITE_URL");
if (siteUrl) {
  try {
    const url = new URL(siteUrl);
    if (url.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(url.hostname)) {
      errors.push("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
    }
  } catch {
    errors.push("NEXT_PUBLIC_SITE_URL is not a valid absolute URL.");
  }
}

const email = text("NEXT_PUBLIC_CONTACT_EMAIL");
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.push("NEXT_PUBLIC_CONTACT_EMAIL is not a valid email address.");
}

const verification = text("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
if (verification.includes("<meta") || verification.includes("google-site-verification")) {
  errors.push("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION must contain only the content token, not the full meta tag.");
}

const client = text("NEXT_PUBLIC_ADSENSE_CLIENT") || "ca-pub-9328837907414732";
if (!/^ca-pub-\d{10,}$/.test(client)) {
  errors.push("NEXT_PUBLIC_ADSENSE_CLIENT must look like ca-pub-1234567890123456.");
}

const scriptEnabled = bool("NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED");
const manualEnabled = bool("NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED");
const cmpEnabled = bool("NEXT_PUBLIC_GOOGLE_CMP_ENABLED");
const slotKeys = [
  "NEXT_PUBLIC_ADSENSE_HOME_SLOT",
  "NEXT_PUBLIC_ADSENSE_GUIDE_SLOT",
  "NEXT_PUBLIC_ADSENSE_CONTENT_SLOT",
  "NEXT_PUBLIC_ADSENSE_PLANNER_BOTTOM_SLOT",
];
const slots = slotKeys.map((key) => [key, text(key)]);

for (const [key, value] of slots) {
  if (value && !/^\d+$/.test(value)) errors.push(`${key} must contain only the numeric AdSense slot ID.`);
}
if (manualEnabled && !scriptEnabled) {
  errors.push("Manual ads are enabled but the AdSense script is disabled.");
}
if (manualEnabled && slots.every(([, value]) => !value)) {
  errors.push("Manual ads are enabled but no AdSense slot ID is configured.");
}
if (cmpEnabled && !scriptEnabled) {
  warnings.push("Google CMP is enabled while the AdSense script is disabled; CMP has no effect until the script is enabled.");
}

if (warnings.length) warnings.forEach((warning) => console.warn(`Environment warning: ${warning}`));
if (errors.length) {
  console.error(`Environment validation failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log("Environment validation passed.");
