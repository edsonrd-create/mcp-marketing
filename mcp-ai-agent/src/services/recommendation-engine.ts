import { randomUUID } from "node:crypto";
import { createLogger, type Logger } from "@mcp-marketing/shared";

export interface CampaignMetrics {
  campaignId: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface AgentRecommendation {
  id: string;
  type: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  campaignId?: string;
  action: string;
}

export interface RecommendationEngineOptions {
  logger?: Logger;
}

function ctr(metrics: CampaignMetrics): number {
  return metrics.impressions > 0 ? metrics.clicks / metrics.impressions : 0;
}

function roas(metrics: CampaignMetrics): number {
  return metrics.spend > 0 ? metrics.revenue / metrics.spend : 0;
}

function cpa(metrics: CampaignMetrics): number {
  return metrics.conversions > 0 ? metrics.spend / metrics.conversions : 0;
}

function cpc(metrics: CampaignMetrics): number {
  return metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;
}

export class RecommendationEngine {
  private readonly logger: Logger;

  constructor(options: RecommendationEngineOptions = {}) {
    this.logger = options.logger ?? createLogger("recommendation-engine");
  }

  analyzeCampaigns(campaigns: CampaignMetrics[]): AgentRecommendation[] {
    const recommendations: AgentRecommendation[] = [];

    for (const campaign of campaigns) {
      const returnOnAdSpend = roas(campaign);
      const clickRate = ctr(campaign);
      const costPerAcquisition = cpa(campaign);
      const costPerClick = cpc(campaign);

      if (returnOnAdSpend < 1 && campaign.spend > 0) {
        recommendations.push({
          id: randomUUID(),
          type: "budget",
          priority: "high",
          title: `Pause or restructure ${campaign.name}`,
          description: `ROAS is ${returnOnAdSpend.toFixed(2)}x with spend ${campaign.spend.toFixed(2)}`,
          campaignId: campaign.campaignId,
          action: "pause_campaign",
        });
      }

      if (clickRate < 0.01 && campaign.impressions > 1000) {
        recommendations.push({
          id: randomUUID(),
          type: "creative",
          priority: "medium",
          title: `Improve CTR for ${campaign.name}`,
          description: `CTR ${(clickRate * 100).toFixed(2)}% is below 1% benchmark`,
          campaignId: campaign.campaignId,
          action: "review_creative",
        });
      }

      if (costPerAcquisition > campaign.revenue / Math.max(campaign.conversions, 1) * 0.5) {
        recommendations.push({
          id: randomUUID(),
          type: "targeting",
          priority: "medium",
          title: `Reduce CPA for ${campaign.name}`,
          description: `CPA ${costPerAcquisition.toFixed(2)} exceeds efficiency threshold`,
          campaignId: campaign.campaignId,
          action: "adjust_targeting",
        });
      }

      if (returnOnAdSpend >= 3) {
        recommendations.push({
          id: randomUUID(),
          type: "budget",
          priority: "low",
          title: `Scale ${campaign.name}`,
          description: `Strong ROAS ${returnOnAdSpend.toFixed(2)}x — CPC ${costPerClick.toFixed(2)}`,
          campaignId: campaign.campaignId,
          action: "increase_budget",
        });
      }
    }

    this.logger.debug(
      { campaignCount: campaigns.length, recommendationCount: recommendations.length },
      "Generated campaign recommendations",
    );
    return recommendations;
  }

  suggestActions(campaigns: CampaignMetrics[], limit = 10): AgentRecommendation[] {
    return this.analyzeCampaigns(campaigns)
      .sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      })
      .slice(0, limit);
  }

  optimizeBudget(
    campaigns: CampaignMetrics[],
    totalBudget: number,
  ): Array<{ campaignId: string; name: string; suggestedBudget: number; rationale: string }> {
    if (campaigns.length === 0) {
      return [];
    }

    const scored = campaigns.map((c) => ({
      campaign: c,
      score: roas(c),
    }));

    const totalScore = scored.reduce((sum, s) => sum + Math.max(s.score, 0.1), 0);

    const allocations = scored.map(({ campaign, score }) => {
      const weight = Math.max(score, 0.1) / totalScore;
      const suggestedBudget = Math.round(totalBudget * weight * 100) / 100;
      return {
        campaignId: campaign.campaignId,
        name: campaign.name,
        suggestedBudget,
        rationale:
          score >= 2
            ? "High ROAS — allocate proportionally more budget"
            : score < 1
              ? "Low ROAS — minimal allocation until improved"
              : "Moderate ROAS — maintain current share",
      };
    });

    this.logger.info(
      { totalBudget, campaignCount: campaigns.length },
      "Computed budget optimization",
    );
    return allocations;
  }
}
