import { describe, expect, it } from "vitest";
import { FrameworkBootstrap } from "../server/Bootstrap.js";

describe("Health check", () => {
  it("reports Online / Offline / Configuração inválida statuses", async () => {
    const boot = await FrameworkBootstrap.create({
      rootDir: process.cwd(),
      prettyLogs: false,
      logLevel: "silent",
      env: {
        PATH: process.env.PATH ?? "",
        // intentionally omit provider credentials
      },
    });
    await boot.initialize();
    const report = await boot.healthReport();

    const google = report.providers.find((p) => p.id === "google-ads");
    expect(google?.status).toBe("invalid_config");

    const insights = report.providers.find((p) => p.id === "insights");
    // insights has no required env — online if built, else offline
    expect(["online", "offline"]).toContain(insights?.status);

    expect(["online", "invalid_config"]).toContain(report.openai.status);
    expect(["online", "offline"]).toContain(report.mcpServer.status);

    await boot.shutdown();
  });
});
