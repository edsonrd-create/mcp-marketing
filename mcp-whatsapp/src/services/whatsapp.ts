import { ExternalApiError } from "@mcp-marketing/shared";
import type { WhatsAppEnv } from "../config/env.js";

export interface SendMessageInput {
  to: string;
  body: string;
  templateName?: string;
  templateParams?: string[];
}

export interface SendMessageResult {
  messageId: string;
  to: string;
  status: "sent" | "queued" | "scheduled" | "delivered" | "failed";
  body: string;
  sentAt: string;
}

export interface WhatsAppTemplate {
  name: string;
  language: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  category: string;
}

export interface WebhookValidationInput {
  mode?: string;
  verifyToken: string;
  challenge?: string;
}

export interface WhatsAppService {
  sendMessage(input: SendMessageInput): Promise<SendMessageResult>;
  listTemplates(): Promise<WhatsAppTemplate[]>;
  getMessageStatus(messageId: string): Promise<SendMessageResult | null>;
  validateWebhook(input: WebhookValidationInput): Promise<{
    ok: boolean;
    challenge?: string;
    reason?: string;
  }>;
}

export interface WhatsAppServiceOptions {
  env: WhatsAppEnv;
  fetchImpl?: typeof fetch;
  verifyToken?: string;
}

const DEFAULT_TEMPLATES: WhatsAppTemplate[] = [
  { name: "hello_world", language: "en_US", status: "APPROVED", category: "UTILITY" },
  { name: "birthday_offer", language: "pt_BR", status: "APPROVED", category: "MARKETING" },
  { name: "order_confirm", language: "pt_BR", status: "APPROVED", category: "UTILITY" },
];

function createMessageStore() {
  const messages = new Map<string, SendMessageResult>();
  return {
    save(result: SendMessageResult): SendMessageResult {
      messages.set(result.messageId, result);
      return result;
    },
    get(messageId: string): SendMessageResult | null {
      return messages.get(messageId) ?? null;
    },
  };
}

function sanitizeApiErrorBody(body: string): string {
  return body
    .slice(0, 240)
    .replace(/(access_token|token|authorization)=([^&\s"']+)/gi, "$1=[redacted]")
    .replace(/"access_token"\s*:\s*"[^"]*"/gi, '"access_token":"[redacted]"');
}

export function createWhatsAppService(options: WhatsAppServiceOptions): WhatsAppService {
  const { env, fetchImpl = fetch } = options;
  const store = createMessageStore();
  const verifyToken = options.verifyToken ?? process.env.WHATSAPP_VERIFY_TOKEN;

  return {
    async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
      const url = `https://graph.facebook.com/${env.WHATSAPP_API_VERSION}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

      const payload = input.templateName
        ? {
            messaging_product: "whatsapp",
            to: input.to,
            type: "template",
            template: {
              name: input.templateName,
              language: { code: "pt_BR" },
              components: input.templateParams?.length
                ? [
                    {
                      type: "body",
                      parameters: input.templateParams.map((text) => ({
                        type: "text",
                        text,
                      })),
                    },
                  ]
                : [],
            },
          }
        : {
            messaging_product: "whatsapp",
            to: input.to,
            type: "text",
            text: { body: input.body },
          };

      const response = await fetchImpl(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const detail = sanitizeApiErrorBody(await response.text());
        throw new ExternalApiError(
          "whatsapp",
          `WhatsApp API error (${response.status}): ${detail}`,
          { status: response.status },
        );
      }

      const data = (await response.json()) as { messages?: Array<{ id: string }> };
      const messageId = data.messages?.[0]?.id ?? `wa_${Date.now()}`;

      return store.save({
        messageId,
        to: input.to,
        status: "sent",
        body: input.body,
        sentAt: new Date().toISOString(),
      });
    },

    async listTemplates(): Promise<WhatsAppTemplate[]> {
      return [...DEFAULT_TEMPLATES];
    },

    async getMessageStatus(messageId: string): Promise<SendMessageResult | null> {
      return store.get(messageId);
    },

    async validateWebhook(input: WebhookValidationInput) {
      if (!verifyToken) {
        return { ok: false, reason: "WHATSAPP_VERIFY_TOKEN not configured" };
      }
      if (input.verifyToken !== verifyToken) {
        return { ok: false, reason: "verify token mismatch" };
      }
      if (input.mode === "subscribe" && input.challenge) {
        return { ok: true, challenge: input.challenge };
      }
      return { ok: true };
    },
  };
}

/** Stub service for tests — no network calls. */
export function createStubWhatsAppService(options?: { verifyToken?: string }): WhatsAppService {
  const store = createMessageStore();
  const verifyToken = options?.verifyToken ?? process.env.WHATSAPP_VERIFY_TOKEN ?? "test-verify-token";

  return {
    async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
      return store.save({
        messageId: `stub_${Date.now()}`,
        to: input.to,
        status: "sent",
        body: input.body,
        sentAt: new Date().toISOString(),
      });
    },

    async listTemplates(): Promise<WhatsAppTemplate[]> {
      return [...DEFAULT_TEMPLATES];
    },

    async getMessageStatus(messageId: string): Promise<SendMessageResult | null> {
      return store.get(messageId);
    },

    async validateWebhook(input: WebhookValidationInput) {
      if (input.verifyToken !== verifyToken) {
        return { ok: false, reason: "verify token mismatch" };
      }
      if (input.mode === "subscribe" && input.challenge) {
        return { ok: true, challenge: input.challenge };
      }
      return { ok: true };
    },
  };
}
