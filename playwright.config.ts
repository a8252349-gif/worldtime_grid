import fs from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const systemChromium = "/usr/lib/chromium/chromium";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || (fs.existsSync(systemChromium) ? systemChromium : undefined);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath, args: ["--no-sandbox"] } : undefined,
  },
  webServer: {
    command: "npx serve out -l 4173",
    url: "http://localhost:4173",
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
