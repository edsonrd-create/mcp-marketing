import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "src/core/**/*.test.ts",
      "src/core/__tests__/**/*.ts",
      "src/utils/**/*.test.ts",
      "src/services/**/*.test.ts",
    ],
    environment: "node",
  },
});
