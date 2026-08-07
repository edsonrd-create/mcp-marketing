import Anthropic from "@anthropic-ai/sdk";
import { ExternalApiError } from "@mcp-marketing/shared";
import type { ConfigService } from "../../config/ConfigService.js";
import type { Logger } from "../../logger/index.js";
import type { ServiceStatus } from "../../types/index.js";

export interface AnthropicServiceOptions {
  config: ConfigService;
  logger: Logger;
}

/**
 * Anthropic / Claude service shell — client is created only when ANTHROPIC_API_KEY is present.
 */
export class AnthropicService {
  private readonly config: ConfigService;
  private readonly logger: Logger;
  private client: Anthropic | null = null;

  constructor(options: AnthropicServiceOptions) {
    this.config = options.config;
    this.logger = options.logger.child({ component: "anthropic-service" });
  }

  isConfigured(): boolean {
    return this.config.hasAnthropic() && Boolean(this.config.env.ANTHROPIC_API_KEY);
  }

  getClient(): Anthropic {
    if (!this.config.env.ANTHROPIC_API_KEY) {
      throw new ExternalApiError("anthropic", "ANTHROPIC_API_KEY is not configured");
    }
    if (!this.client) {
      this.client = new Anthropic({ apiKey: this.config.env.ANTHROPIC_API_KEY });
      this.logger.info({ model: this.config.env.ANTHROPIC_MODEL }, "Anthropic client initialized");
    }
    return this.client;
  }

  status(): ServiceStatus {
    if (!this.isConfigured()) {
      return { name: "anthropic", status: "degraded", details: "ANTHROPIC_API_KEY missing" };
    }
    return {
      name: "anthropic",
      status: "ok",
      details: `model=${this.config.env.ANTHROPIC_MODEL}`,
    };
  }

  async ping(): Promise<{ ok: boolean }> {
    if (!this.isConfigured()) {
      this.logger.warn("Anthropic ping skipped — missing API key");
      return { ok: false };
    }
    this.getClient();
    return { ok: true };
  }
}

export function createAnthropicService(options: AnthropicServiceOptions): AnthropicService {
  return new AnthropicService(options);
}
