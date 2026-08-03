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
  status: "sent" | "queued" | "scheduled";
  body: string;
  sentAt: string;
}

export interface WhatsAppService {
  sendMessage(input: SendMessageInput): Promise<SendMessageResult>;
}

export interface WhatsAppServiceOptions {
  env: WhatsAppEnv;
  fetchImpl?: typeof fetch;
}

export function createWhatsAppService(options: WhatsAppServiceOptions): WhatsAppService {
  const { env, fetchImpl = fetch } = options;

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
        const detail = await response.text();
        throw new Error(`WhatsApp API error (${response.status}): ${detail}`);
      }

      const data = (await response.json()) as { messages?: Array<{ id: string }> };
      const messageId = data.messages?.[0]?.id ?? `wa_${Date.now()}`;

      return {
        messageId,
        to: input.to,
        status: "sent",
        body: input.body,
        sentAt: new Date().toISOString(),
      };
    },
  };
}

/** Stub service for tests — no network calls. */
export function createStubWhatsAppService(): WhatsAppService {
  return {
    async sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
      return {
        messageId: `stub_${Date.now()}`,
        to: input.to,
        status: "sent",
        body: input.body,
        sentAt: new Date().toISOString(),
      };
    },
  };
}
