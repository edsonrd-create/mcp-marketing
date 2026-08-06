import { OAuth2Client } from "google-auth-library";
import {
  AppError,
  ErrorCode,
  ExternalApiError,
  createLogger,
} from "@mcp-marketing/shared";
import type { GoogleAdsEnv } from "../schemas/index.js";

const logger = createLogger("google-ads-auth-manager");

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

/**
 * OAuth2 manager for Google Ads — refresh token, access-token cache, error handling.
 */
export class GoogleAdsAuthManager {
  private oauthClient: OAuth2Client | null = null;
  private cache: CachedToken | null = null;
  private initialized = false;

  /** Safety window before expiry to force refresh (ms). */
  private readonly expirySkewMs = 60_000;

  constructor(private readonly env: GoogleAdsEnv) {}

  isInitialized(): boolean {
    return this.initialized;
  }

  /** True when live API mode is enabled and mock is not forced. */
  isLiveMode(): boolean {
    return Boolean(this.env.GOOGLE_ADS_LIVE_AUTH) && !this.env.GOOGLE_ADS_FORCE_MOCK;
  }

  getCustomerId(): string {
    return this.env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");
  }

  getLoginCustomerId(): string | undefined {
    return this.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replace(/-/g, "");
  }

  getDeveloperToken(): string {
    return this.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  }

  getEnv(): GoogleAdsEnv {
    return this.env;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.assertCredentialsPresent();

    if (this.env.GOOGLE_ADS_SKIP_AUTH_VALIDATE && !this.isLiveMode()) {
      logger.warn(
        { customerId: this.getCustomerId() },
        "Skipping Google Ads auth validation (GOOGLE_ADS_SKIP_AUTH_VALIDATE=true)",
      );
      this.initialized = true;
      return;
    }

    this.oauthClient = new OAuth2Client(
      this.env.GOOGLE_ADS_CLIENT_ID,
      this.env.GOOGLE_ADS_CLIENT_SECRET,
    );
    this.oauthClient.setCredentials({
      refresh_token: this.env.GOOGLE_ADS_REFRESH_TOKEN,
    });

    if (this.isLiveMode()) {
      await this.refreshAccessToken(true);
      logger.info({ customerId: this.getCustomerId() }, "Google Ads OAuth live refresh succeeded");
    } else {
      logger.warn(
        { customerId: this.getCustomerId() },
        "Google Ads auth ready in mock mode (set GOOGLE_ADS_LIVE_AUTH=1 for live API)",
      );
    }

    this.initialized = true;
  }

  /**
   * Returns a valid access token, refreshing automatically when expired or missing.
   */
  async getAccessToken(): Promise<string> {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.isLiveMode()) {
      return "mock-access-token";
    }

    if (this.cache && Date.now() < this.cache.expiresAt - this.expirySkewMs) {
      return this.cache.accessToken;
    }

    return this.refreshAccessToken(false);
  }

  /** Force refresh of the access token using the configured refresh token. */
  async refreshAccessToken(isInit: boolean): Promise<string> {
    if (!this.oauthClient) {
      this.oauthClient = new OAuth2Client(
        this.env.GOOGLE_ADS_CLIENT_ID,
        this.env.GOOGLE_ADS_CLIENT_SECRET,
      );
      this.oauthClient.setCredentials({
        refresh_token: this.env.GOOGLE_ADS_REFRESH_TOKEN,
      });
    }

    try {
      const started = performance.now();
      logger.info(
        { customerId: this.getCustomerId(), isInit },
        "Refreshing Google Ads access token",
      );
      const { credentials } = await this.oauthClient.refreshAccessToken();
      if (!credentials.access_token) {
        throw new AppError({
          code: ErrorCode.AUTH,
          message: "Google Ads OAuth refresh did not return an access token",
        });
      }

      const expiresAt = credentials.expiry_date ?? Date.now() + 3_500_000;
      this.cache = {
        accessToken: credentials.access_token,
        expiresAt,
      };

      logger.info(
        {
          customerId: this.getCustomerId(),
          ms: Math.round(performance.now() - started),
          expiresAt: new Date(expiresAt).toISOString(),
        },
        "Google Ads access token cached",
      );

      return credentials.access_token;
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "unknown error";
      logger.error(
        { customerId: this.getCustomerId(), errMessage },
        "Google Ads OAuth refresh failed",
      );
      if (error instanceof AppError) {
        throw error;
      }
      throw new ExternalApiError("google-ads", "Google Ads OAuth refresh failed", undefined, error);
    }
  }

  private assertCredentialsPresent(): void {
    const required: Array<keyof GoogleAdsEnv> = [
      "GOOGLE_ADS_CLIENT_ID",
      "GOOGLE_ADS_CLIENT_SECRET",
      "GOOGLE_ADS_REFRESH_TOKEN",
      "GOOGLE_ADS_DEVELOPER_TOKEN",
      "GOOGLE_ADS_CUSTOMER_ID",
    ];

    const missing = required.filter((key) => {
      const value = this.env[key];
      return typeof value !== "string" || value.trim() === "";
    });

    if (missing.length > 0) {
      throw new AppError({
        code: ErrorCode.CONFIG,
        message: `Google Ads credentials incomplete: ${missing.join(", ")}`,
        details: { missing },
      });
    }
  }
}
