import { describe, expect, it } from "vitest";
import { HealthService } from "./HealthService.js";

describe("HealthService", () => {
  it("lists providers with status labels", async () => {
    const service = new HealthService({
      rootDir: process.cwd(),
      env: { PATH: process.env.PATH ?? "" },
    });
    const rows = await service.list();
    expect(rows.some((r) => r.name === "Google Ads")).toBe(true);
    expect(rows.some((r) => r.name === "MCP Server")).toBe(true);
    expect(rows.every((r) => ["Online", "Offline", "Configuração inválida"].includes(r.label))).toBe(
      true,
    );
    await service.shutdown();
  });
});
