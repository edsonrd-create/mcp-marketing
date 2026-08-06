import { AppError, ErrorCode, createLogger } from "@mcp-marketing/shared";
import type { MetaAdsEnv } from "../schemas/index.js";

const logger = createLogger("meta-ads-auth-manager");

/**
 * Long-lived token manager for Meta Graph API.
 * Validates token presence; live Graph calls remain optional for LTS/mock.
 */
export class MetaAdsAuthManager {
  private initialized = false;

  constructor(private readonly env: MetaAdsEnv) {}

  isInitialized(): boolean {
    return this.initialized;
  }

  isLiveMode(): boolean {
    return !this.env.META_SKIP_AUTH_VALIDATE && !this.env.META_FORCE_MOCK;
  }

  getAccessToken(): string {
    return this.env.META_ACCESS_TOKEN;
  }

  getAdAccountId(): string {
    return this.env.META_AD_ACCOUNT_ID;
  }

  getAuthorizationHeader(): string {
    return `Bearer ${this.env.META_ACCESS_TOKEN}`;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!this.env.META_ACCESS_TOKEN?.trim()) {
      throw new AppError({
        code: ErrorCode.CONFIG,
        message: "META_ACCESS_TOKEN is required",
      });
    }
    if (!this.env.META_AD_ACCOUNT_ID?.trim()) {
      throw new AppError({
        code: ErrorCode.CONFIG,
        message: "META_AD_ACCOUNT_ID is required",
      });
    }

    if (this.env.META_SKIP_AUTH_VALIDATE || this.env.META_FORCE_MOCK) {
      logger.warn(
        { adAccountId: this.getAdAccountId() },
        "Meta auth ready in mock/skip mode (long-lived token not validated against Graph)",
      );
      this.initialized = true;
      return;
    }

    logger.info(
      { adAccountId: this.getAdAccountId() },
      "Meta long-lived token present — ready for Graph API calls",
    );
    this.initialized = true;
  }
}
