import { AppError, ErrorCode, createLogger } from "@mcp-marketing/shared";
import { withRetry } from "../../../utils/retry.js";
import type { MetaAdsAuthManager } from "../auth/MetaAdsAuthManager.js";
import type {
  MetaAccountInfo,
  MetaAccountSummary,
  MetaAd,
  MetaAudience,
  MetaCampaign,
  MetaMetrics,
} from "../schemas/types.js";

const logger = createLogger("meta-ads-provider");

export class MetaAdsProvider {
  private readonly campaigns = new Map<string, MetaCampaign>();
  private readonly audiences = new Map<string, MetaAudience>();
  private readonly ads = new Map<string, MetaAd>();

  constructor(private readonly auth: MetaAdsAuthManager) {
    this.seed();
  }

  private seed(): void {
    for (const campaign of [
      {
        id: "2001",
        name: "Meta Prospecting",
        status: "ACTIVE" as const,
        objective: "OUTCOME_TRAFFIC",
        dailyBudget: 100,
      },
      {
        id: "2002",
        name: "Meta Retargeting",
        status: "PAUSED" as const,
        objective: "OUTCOME_SALES",
        dailyBudget: 75,
      },
    ]) {
      this.campaigns.set(campaign.id, campaign);
    }
    this.audiences.set("3001", {
      id: "3001",
      name: "Lookalike Purchasers",
      subtype: "LOOKALIKE",
      approximateCount: 250_000,
    });
  }

  private async call<T>(tool: string, fn: () => Promise<T>): Promise<T> {
    const started = performance.now();
    const adAccountId = this.auth.getAdAccountId();
    logger.info({ tool, adAccountId }, "Meta Ads tool request start");
    try {
      const result = await withRetry(tool, fn, { retries: 2, minDelayMs: 50, maxDelayMs: 200 });
      logger.info(
        { tool, adAccountId, ms: Math.round(performance.now() - started), status: "ok" },
        "Meta Ads tool request ok",
      );
      return result;
    } catch (error) {
      logger.error(
        {
          tool,
          adAccountId,
          ms: Math.round(performance.now() - started),
          status: "error",
          err: error,
        },
        "Meta Ads tool request failed",
      );
      throw error;
    }
  }

  getAdAccountId(): string {
    return this.auth.getAdAccountId();
  }

  isLiveMode(): boolean {
    return this.auth.isLiveMode();
  }

  async listAccounts(): Promise<MetaAccountSummary[]> {
    return this.call("list_accounts", async () => [
      {
        id: this.auth.getAdAccountId(),
        name: "Primary Ad Account",
        accountStatus: 1,
      },
    ]);
  }

  async listCampaigns(): Promise<MetaCampaign[]> {
    return this.call("list_campaigns", async () => [...this.campaigns.values()]);
  }

  async getCampaign(campaignId: string): Promise<MetaCampaign> {
    return this.call("get_campaign", async () => this.requireCampaign(campaignId));
  }

  async createCampaign(input: {
    name: string;
    objective: string;
    dailyBudget: number;
  }): Promise<MetaCampaign> {
    return this.call("create_campaign", async () => {
      const id = String(2000 + this.campaigns.size + 1);
      const campaign: MetaCampaign = {
        id,
        name: input.name,
        status: "ACTIVE",
        objective: input.objective,
        dailyBudget: input.dailyBudget,
      };
      this.campaigns.set(id, campaign);
      return campaign;
    });
  }

  async pauseCampaign(campaignId: string): Promise<MetaCampaign> {
    return this.call("pause_campaign", async () => {
      const campaign = this.requireCampaign(campaignId);
      campaign.status = "PAUSED";
      this.campaigns.set(campaignId, campaign);
      return campaign;
    });
  }

  async enableCampaign(campaignId: string): Promise<MetaCampaign> {
    return this.resumeCampaign(campaignId);
  }

  async resumeCampaign(campaignId: string): Promise<MetaCampaign> {
    return this.call("resume_campaign", async () => {
      const campaign = this.requireCampaign(campaignId);
      campaign.status = "ACTIVE";
      this.campaigns.set(campaignId, campaign);
      return campaign;
    });
  }

  async updateBudget(campaignId: string, dailyBudget: number): Promise<MetaCampaign> {
    return this.call("update_budget", async () => {
      const campaign = this.requireCampaign(campaignId);
      campaign.dailyBudget = dailyBudget;
      this.campaigns.set(campaignId, campaign);
      return campaign;
    });
  }

  async createAudience(input: {
    name: string;
    subtype?: string;
    approximateCount?: number;
  }): Promise<MetaAudience> {
    return this.call("create_audience", async () => {
      const id = String(3000 + this.audiences.size + 1);
      const audience: MetaAudience = {
        id,
        name: input.name,
        subtype: input.subtype ?? "CUSTOM",
        approximateCount: input.approximateCount ?? 10_000,
      };
      this.audiences.set(id, audience);
      return audience;
    });
  }

  async listAudiences(): Promise<MetaAudience[]> {
    return this.call("list_audiences", async () => [...this.audiences.values()]);
  }

  async createAd(input: {
    name: string;
    campaignId: string;
    creativeBody: string;
  }): Promise<MetaAd> {
    return this.call("create_ad", async () => {
      this.requireCampaign(input.campaignId);
      const id = String(4000 + this.ads.size + 1);
      const ad: MetaAd = {
        id,
        name: input.name,
        campaignId: input.campaignId,
        creativeBody: input.creativeBody,
        status: "ACTIVE",
      };
      this.ads.set(id, ad);
      return ad;
    });
  }

  async getMetrics(input?: { campaignId?: string }): Promise<MetaMetrics[]> {
    return this.call("get_metrics", async () => {
      const campaigns = input?.campaignId
        ? [this.requireCampaign(input.campaignId)]
        : [...this.campaigns.values()];
      return campaigns.map((campaign, index) => ({
        campaignId: campaign.id,
        impressions: 8000 * (index + 1),
        clicks: 400 * (index + 1),
        spend: campaign.dailyBudget * 7 * (index + 1),
        reach: 5000 * (index + 1),
        ctr: 0.05,
      }));
    });
  }

  async getInsights(input?: { campaignId?: string }): Promise<MetaMetrics[]> {
    return this.getMetrics(input);
  }

  async accountInfo(): Promise<MetaAccountInfo> {
    return this.call("account_info", async () => ({
      id: this.auth.getAdAccountId(),
      name: "Primary Ad Account",
      currency: "BRL",
      timezone: "America/Sao_Paulo",
      mode: this.auth.isLiveMode() ? "live" : "mock",
    }));
  }

  private requireCampaign(campaignId: string): MetaCampaign {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new AppError({
        code: ErrorCode.NOT_FOUND,
        message: `Meta campaign not found: ${campaignId}`,
      });
    }
    return campaign;
  }
}
