import { createDatabase, registerTool } from "@mcp-marketing/shared";
import type { Database } from "@mcp-marketing/shared";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { WhatsAppEnv } from "../config/env.js";
import { createSchedulerService } from "../services/scheduler.js";
import type { WhatsAppService } from "../services/whatsapp.js";

export interface WhatsAppToolsContext {
  env: WhatsAppEnv;
  whatsapp: WhatsAppService;
  db?: Database;
}

export function registerWhatsAppTools(server: McpServer, ctx: WhatsAppToolsContext): void {
  const db = ctx.db ?? createDatabase({ driver: "memory" });
  const scheduler = createSchedulerService(db);

  const sendBirthday = async ({
    to,
    name,
    couponCode,
  }: {
    to: string;
    name: string;
    couponCode?: string | undefined;
  }) => {
    const body = couponCode
      ? `Feliz aniversário, ${name}! 🎂 Use o cupom ${couponCode} na sua próxima compra.`
      : `Feliz aniversário, ${name}! 🎂 Desejamos um dia incrível.`;
    const result = await ctx.whatsapp.sendMessage({ to, body });
    return result;
  };

  registerTool(
    server,
    "send_birthday_message",
    {
      description: "Send a personalized birthday message via WhatsApp",
      inputSchema: {
        to: z.string().describe("Recipient phone number in E.164 format"),
        name: z.string().describe("Recipient name"),
        couponCode: z.string().optional().describe("Optional birthday coupon code"),
      },
    },
    async (args) => {
      const result = await sendBirthday(args);
      return { tool: "send_birthday_message", ...result };
    },
  );

  registerTool(
    server,
    "send_birthday",
    {
      description: "Send a birthday WhatsApp message (Master Prompt alias of send_birthday_message)",
      inputSchema: {
        to: z.string().describe("Recipient phone number in E.164 format"),
        name: z.string().describe("Recipient name"),
        couponCode: z.string().optional().describe("Optional birthday coupon code"),
      },
    },
    async (args) => {
      const result = await sendBirthday(args);
      return { tool: "send_birthday", ...result };
    },
  );

  registerTool(
    server,
    "send_coupon",
    {
      description: "Send a coupon offer message via WhatsApp",
      inputSchema: {
        to: z.string().describe("Recipient phone number"),
        couponCode: z.string().describe("Coupon code"),
        discount: z.string().describe("Discount description, e.g. 20% OFF"),
        expiresAt: z.string().optional().describe("Expiration date ISO string"),
      },
    },
    async ({ to, couponCode, discount, expiresAt }) => {
      const expiry = expiresAt ? ` Válido até ${expiresAt}.` : "";
      const body = `🎁 Cupom exclusivo: ${couponCode} — ${discount}.${expiry}`;
      const result = await ctx.whatsapp.sendMessage({ to, body });
      return { tool: "send_coupon", ...result };
    },
  );

  registerTool(
    server,
    "send_campaign",
    {
      description: "Send a marketing campaign message to a recipient",
      inputSchema: {
        to: z.string().describe("Recipient phone number"),
        campaignId: z.string().describe("Campaign identifier"),
        message: z.string().describe("Campaign message body"),
      },
    },
    async ({ to, campaignId, message }) => {
      const body = `[${campaignId}] ${message}`;
      const result = await ctx.whatsapp.sendMessage({ to, body });
      return { tool: "send_campaign", campaignId, ...result };
    },
  );

  registerTool(
    server,
    "send_template",
    {
      description: "Send a pre-approved WhatsApp template message",
      inputSchema: {
        to: z.string().describe("Recipient phone number"),
        templateName: z.string().describe("Approved template name"),
        templateParams: z.array(z.string()).optional().describe("Template body parameters"),
      },
    },
    async ({ to, templateName, templateParams }) => {
      const result = await ctx.whatsapp.sendMessage({
        to,
        body: `template:${templateName}`,
        templateName,
        ...(templateParams !== undefined ? { templateParams } : {}),
      });
      return { tool: "send_template", templateName, ...result };
    },
  );

  registerTool(
    server,
    "schedule_message",
    {
      description: "Schedule a WhatsApp message for future delivery",
      inputSchema: {
        to: z.string().describe("Recipient phone number"),
        body: z.string().describe("Message body"),
        scheduledAt: z.string().describe("ISO datetime when the message should be sent"),
        templateName: z.string().optional(),
        templateParams: z.array(z.string()).optional(),
      },
    },
    async ({ to, body, scheduledAt, templateName, templateParams }) => {
      const scheduled = await scheduler.schedule({
        to,
        body,
        scheduledAt,
        ...(templateName !== undefined ? { templateName } : {}),
        ...(templateParams !== undefined ? { templateParams } : {}),
      });
      return { tool: "schedule_message", scheduled };
    },
  );

  registerTool(
    server,
    "order_confirmation",
    {
      description: "Send an order confirmation message via WhatsApp",
      inputSchema: {
        to: z.string().describe("Customer phone number"),
        orderId: z.string().describe("Order identifier"),
        total: z.string().describe("Order total amount"),
        items: z.array(z.string()).optional().describe("List of ordered items"),
      },
    },
    async ({ to, orderId, total, items }) => {
      const itemList = items?.length ? `\nItens: ${items.join(", ")}` : "";
      const body = `✅ Pedido ${orderId} confirmado! Total: ${total}.${itemList}`;
      const result = await ctx.whatsapp.sendMessage({ to, body });
      return { tool: "order_confirmation", orderId, ...result };
    },
  );

  registerTool(
    server,
    "list_templates",
    {
      description: "List WhatsApp message templates available to the business account",
      inputSchema: {},
    },
    async () => {
      const templates = await ctx.whatsapp.listTemplates();
      return { tool: "list_templates", templates };
    },
  );

  registerTool(
    server,
    "get_message_status",
    {
      description: "Get delivery status for a previously sent WhatsApp message",
      inputSchema: {
        messageId: z.string().min(1).describe("WhatsApp message ID"),
      },
    },
    async ({ messageId }) => {
      const status = await ctx.whatsapp.getMessageStatus(messageId);
      return { tool: "get_message_status", messageId, status };
    },
  );

  registerTool(
    server,
    "validate_webhook",
    {
      description: "Validate Meta WhatsApp webhook verification challenge",
      inputSchema: {
        mode: z.string().optional().describe("hub.mode"),
        verifyToken: z.string().describe("hub.verify_token"),
        challenge: z.string().optional().describe("hub.challenge"),
      },
    },
    async ({ mode, verifyToken, challenge }) => {
      const validationInput: {
        verifyToken: string;
        mode?: string;
        challenge?: string;
      } = { verifyToken };
      if (mode !== undefined) validationInput.mode = mode;
      if (challenge !== undefined) validationInput.challenge = challenge;
      const result = await ctx.whatsapp.validateWebhook(validationInput);
      return { tool: "validate_webhook", ...result };
    },
  );
}
