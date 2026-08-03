import { OAuth2Client } from "google-auth-library";
import { AppError, ErrorCode, createLogger } from "@mcp-marketing/shared";
import type { GoogleAdsEnv } from "../config/env.js";

const logger = createLogger("google-ads-auth");

export class GoogleAdsAuthService {
  private initialized = false;
  private oauthClient: OAuth2Client | null = null;

  constructor(private readonly env: GoogleAdsEnv) {}

  isInitialized(): boolean {
    return this.initialized;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    const required = [
      this.env.GOOGLE_ADS_CLIENT_ID,
      this.env.GOOGLE_ADS_CLIENT_SECRET,
      this.env.GOOGLE_ADS_REFRESH_TOKEN,
      this.env.GOOGLE_ADS_DEVELOPER_TOKEN,
      this.env.GOOGLE_ADS_CUSTOMER_ID,
    ];

    if (required.some((value) => !value || value.trim() === "")) {
      throw new AppError({
        code: ErrorCode.CONFIG,
        message: "Google Ads credentials are incomplete",
      });
    }

    if (this.env.GOOGLE_ADS_SKIP_AUTH_VALIDATE) {
      logger.warn("Skipping Google Ads auth validation (GOOGLE_ADS_SKIP_AUTH_VALIDATE=true)");
      this.initialized = true;
      return;
    }

    if (this.env.GOOGLE_ADS_LIVE_AUTH) {
      this.oauthClient = new OAuth2Client(
        this.env.GOOGLE_ADS_CLIENT_ID,
        this.env.GOOGLE_ADS_CLIENT_SECRET,
      );
      this.oauthClient.setCredentials({
        refresh_token: this.env.GOOGLE_ADS_REFRESH_TOKEN,
      });

      try {
        const { credentials } = await this.oauthClient.refreshAccessToken();
        if (!credentials.access_token) {
          throw new AppError({
            code: ErrorCode.AUTH,
            message: "Google Ads OAuth refresh did not return an access token",
          });
        }
        logger.info("Google Ads OAuth refresh succeeded");
      } catch (error) {
        throw new AppError({
          code: ErrorCode.AUTH,
          message: "Google Ads OAuth refresh failed",
          cause: error,
        });
      }
    } else {
      logger.warn(
        "LTS stub auth: validated credential presence only (set GOOGLE_ADS_LIVE_AUTH=1 for live refresh)",
      );
    }

    this.initialized = true;
  }

  getAccessToken(): string | null {
    return this.oauthClient?.credentials.access_token ?? null;
  }
}
