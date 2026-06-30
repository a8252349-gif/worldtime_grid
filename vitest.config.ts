import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    pool: "forks",
    minWorkers: 1,
    maxWorkers: 1,
  },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
