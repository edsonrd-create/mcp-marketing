import { AppError, ErrorCode } from "@mcp-marketing/shared";

export interface GoogleAdsCampaign {
  id: string;
  name: string;
  status: "ENABLED" | "PAUSED" | "REMOVED";
  budgetMicros: number;
  channelType: string;
}

export interface GoogleAdsKeyword {
  keyword: string;
  avgMonthlySearches: number;
  competition: "LOW" | "MEDIUM" | "HIGH";
  suggestedBidMicros: number;
}

export interface GoogleAdsAdCopy {
  headline: string;
  description: string;
  finalUrl: string;
}

export interface CampaignReportRow {
  campaignId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
}

export interface GoogleAdsServiceOptions {
  customerId: string;
}

export class GoogleAdsService {
  private readonly campaigns = new Map<string, GoogleAdsCampaign>();

  constructor(private readonly options: GoogleAdsServiceOptions) {
    this.seedMockData();
  }

  private seedMockData(): void {
    const defaults: GoogleAdsCampaign[] = [
      {
        id: "1001",
        name: "Brand Awareness",
        status: "ENABLED",
        budgetMicros: 50_000_000,
        channelType: "SEARCH",
      },
      {
        id: "1002",
        name: "Retargeting",
        status: "PAUSED",
        budgetMicros: 25_000_000,
        channelType: "DISPLAY",
      },
    ];

    for (const campaign of defaults) {
      this.campaigns.set(campaign.id, campaign);
    }
  }

  async listCampaigns(): Promise<GoogleAdsCampaign[]> {
    return [...this.campaigns.values()];
  }

  async getCampaign(campaignId: string): Promise<GoogleAdsCampaign> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) {
      throw new AppError({
        code: ErrorCode.NOT_FOUND,
        message: `Campaign not found: ${campaignId}`,
      });
    }
    return campaign;
  }

  async createCampaign(input: {
    name: string;
    budgetMicros: number;
    channelType?: string;
  }): Promise<GoogleAdsCampaign> {
    const id = String(1000 + this.campaigns.size + 1);
    const campaign: GoogleAdsCampaign = {
      id,
      name: input.name,
      status: "ENABLED",
      budgetMicros: input.budgetMicros,
      channelType: input.channelType ?? "SEARCH",
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async pauseCampaign(campaignId: string): Promise<GoogleAdsCampaign> {
    const campaign = await this.getCampaign(campaignId);
    campaign.status = "PAUSED";
    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async enableCampaign(campaignId: string): Promise<GoogleAdsCampaign> {
    const campaign = await this.getCampaign(campaignId);
    campaign.status = "ENABLED";
    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async updateBudget(campaignId: string, budgetMicros: number): Promise<GoogleAdsCampaign> {
    const campaign = await this.getCampaign(campaignId);
    campaign.budgetMicros = budgetMicros;
    this.campaigns.set(campaignId, campaign);
    return campaign;
  }

  async searchKeywords(query: string, limit = 10): Promise<GoogleAdsKeyword[]> {
    const base = query.trim() || "marketing";
    return Array.from({ length: Math.min(limit, 10) }, (_, index) => ({
      keyword: `${base} ${index + 1}`,
      avgMonthlySearches: 1000 * (index + 1),
      competition: (["LOW", "MEDIUM", "HIGH"] as const)[index % 3],
      suggestedBidMicros: 500_000 * (index + 1),
    }));
  }

  async generateAds(input: {
    product: string;
    tone?: string;
    count?: number;
  }): Promise<GoogleAdsAdCopy[]> {
    const count = input.count ?? 3;
    return Array.from({ length: count }, (_, index) => ({
      headline: `${input.product} — Offer ${index + 1}`,
      description: `Discover ${input.product} with a ${input.tone ?? "professional"} tone.`,
      finalUrl: `https://example.com/${input.product.toLowerCase().replace(/\s+/g, "-")}`,
    }));
  }

  async campaignReport(input?: {
    campaignId?: string;
    dateRange?: string;
  }): Promise<CampaignReportRow[]> {
    const campaigns = input?.campaignId
      ? [await this.getCampaign(input.campaignId)]
      : await this.listCampaigns();

    return campaigns.map((campaign, index) => ({
      campaignId: campaign.id,
      campaignName: campaign.name,
      impressions: 10_000 * (index + 1),
      clicks: 500 * (index + 1),
      costMicros: campaign.budgetMicros / 2,
      conversions: 25 * (index + 1),
    }));
  }

  async negativeKeywords(campaignId: string, keywords: string[]): Promise<{ added: string[] }> {
    await this.getCampaign(campaignId);
    return { added: keywords };
  }

  getCustomerId(): string {
    return this.options.customerId;
  }
}
