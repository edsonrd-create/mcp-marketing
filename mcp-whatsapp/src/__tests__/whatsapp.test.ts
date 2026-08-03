import { createDatabase } from "@mcp-marketing/shared";
import { describe, expect, it } from "vitest";
import { createSchedulerService } from "../services/scheduler.js";
import { createStubWhatsAppService } from "../services/whatsapp.js";

describe("WhatsApp services", () => {
  it("stub service sends messages without network", async () => {
    const service = createStubWhatsAppService();
    const result = await service.sendMessage({
      to: "+5511999999999",
      body: "Hello",
    });
    expect(result.status).toBe("sent");
    expect(result.to).toBe("+5511999999999");

    const status = await service.getMessageStatus(result.messageId);
    expect(status?.messageId).toBe(result.messageId);

    const templates = await service.listTemplates();
    expect(templates.length).toBeGreaterThan(0);

    const webhook = await service.validateWebhook({
      mode: "subscribe",
      verifyToken: "marketing-brain",
      challenge: "42",
    });
    expect(webhook.ok).toBe(true);
    expect(webhook.challenge).toBe("42");
  });

  it("scheduler persists scheduled messages via createDatabase memory", async () => {
    const db = createDatabase({ driver: "memory" });
    const scheduler = createSchedulerService(db);
    const scheduled = await scheduler.schedule({
      to: "+5511999999999",
      body: "Future message",
      scheduledAt: "2026-12-01T10:00:00.000Z",
    });
    expect(scheduled.status).toBe("pending");
    expect(await scheduler.list()).toHaveLength(1);
    expect(await scheduler.getDue(new Date("2026-12-02T00:00:00.000Z"))).toHaveLength(1);
  });
});
