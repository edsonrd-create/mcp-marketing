import { describe, expect, it } from "vitest";
import { FrameworkBootstrap } from "../server/Bootstrap.js";

describe("FrameworkBootstrap", () => {
  it("loads catalog providers and registers all tools", async () => {
    const boot = await FrameworkBootstrap.create({
      rootDir: process.cwd(),
      prettyLogs: false,
      logLevel: "silent",
      env: {
        ...process.env,
        GOOGLE_ADS_CLIENT_ID: "x",
        GOOGLE_ADS_CLIENT_SECRET: "x",
        GOOGLE_ADS_REFRESH_TOKEN: "x",
        GOOGLE_ADS_DEVELOPER_TOKEN: "x",
        GOOGLE_ADS_CUSTOMER_ID: "123",
        META_ACCESS_TOKEN: "x",
        META_AD_ACCOUNT_ID: "act_1",
        WHATSAPP_TOKEN: "x",
        WHATSAPP_PHONE_NUMBER_ID: "1",
        OPENAI_API_KEY: "sk-test",
      },
    });

    await boot.initialize();
    expect(boot.isReady()).toBe(true);
    expect(boot.providerRegistry.size).toBe(6);
    expect(boot.toolRegistry.size).toBe(52);
    expect(boot.toolRegistry.list("google-ads").map((t) => t.name)).toContain("list_campaigns");
    expect(boot.toolRegistry.list("meta-ads").map((t) => t.name)).toContain("list_campaigns");
    expect(boot.toolRegistry.list("whatsapp").map((t) => t.name)).toContain("send_template");

    const report = await boot.healthReport();
    expect(report.providers.find((p) => p.id === "google-ads")?.status).toBe("online");
    expect(report.openai.status).toBe("online");
    expect(report.mcpServer.tools).toBe(52);

    await boot.shutdown();
    expect(boot.isReady()).toBe(false);
  });
});
