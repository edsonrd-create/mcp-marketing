import { ExternalApiError } from "@mcp-marketing/shared";
import type { ConfigService } from "../../config/ConfigService.js";
import type { Logger } from "../../logger/index.js";
import type { ServiceStatus } from "../../types/index.js";

export interface GoogleAdsServiceOptions {
  config: ConfigService;
  logger: Logger;
}

/**
 * HTTP-shell Google Ads status service (Sprint 1).
 * Full MCP provider: `src/providers/google-ads`.
 */
export class GoogleAdsService {
  private readonly config: ConfigService;
  private readonly logger: Logger;

  constructor(options: GoogleAdsServiceOptions) {
    this.config = options.config;
    this.logger = options.logger.child({ component: "google-ads-service" });
  }

  isConfigured(): boolean {
    return this.config.hasGoogleAds();
  }

  status(): ServiceStatus {
    if (!this.isConfigured()) {
      return {
        name: "google-ads",
        status: "degraded",
        details: "Credentials incomplete — set .env and GOOGLE_ADS_LIVE_AUTH=1 for live MCP",
      };
    }
    return { name: "google-ads", status: "ok", details: "Credentials present" };
  }

  async ping(): Promise<{ ok: boolean }> {
    if (!this.isConfigured()) {
      this.logger.warn("Google Ads ping skipped — missing credentials");
      return { ok: false };
    }
    this.logger.debug("Google Ads credentials detected");
    return { ok: true };
  }

  requireConfigured(): void {
    if (!this.isConfigured()) {
      throw new ExternalApiError("google-ads", "Google Ads credentials are not configured");
    }
  }
}

export function createGoogleAdsService(options: GoogleAdsServiceOptions): GoogleAdsService {
  return new GoogleAdsService(options);
}
