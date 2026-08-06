import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/providers/meta-ads/**/*.test.ts", "src/providers/meta-ads/__tests__/**/*.ts"],
    environment: "node",
  },
});
