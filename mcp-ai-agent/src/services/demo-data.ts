import type { CampaignMetrics } from "./recommendation-engine.js";

/** Demo campaign data for offline agent tools when no live provider is connected. */
export function seedDemoCampaigns(): CampaignMetrics[] {
  return [
    {
      campaignId: "camp-001",
      name: "Summer Sale",
      spend: 5000,
      impressions: 250000,
      clicks: 7500,
      conversions: 300,
      revenue: 18000,
    },
    {
      campaignId: "camp-002",
      name: "Retargeting",
      spend: 2000,
      impressions: 50000,
      clicks: 500,
      conversions: 10,
      revenue: 800,
    },
  ];
}

export interface CustomerSegment {
  segmentId: string;
  name: string;
  customerCount: number;
  ltv: number;
  conversionRate: number;
}

export function seedDemoCustomers(): CustomerSegment[] {
  return [
    {
      segmentId: "seg-001",
      name: "High-Value Repeat Buyers",
      customerCount: 1250,
      ltv: 450,
      conversionRate: 0.08,
    },
    {
      segmentId: "seg-002",
      name: "Cart Abandoners",
      customerCount: 3400,
      ltv: 85,
      conversionRate: 0.02,
    },
    {
      segmentId: "seg-003",
      name: "New Visitors",
      customerCount: 8900,
      ltv: 35,
      conversionRate: 0.012,
    },
  ];
}

export interface AccountSummary {
  campaignCount: number;
  totalSpend: number;
  totalRevenue: number;
  totalConversions: number;
  totalClicks: number;
  overallRoas: number;
  overallCpa: number;
  overallCtr: number;
  overallCpc: number;
  generatedAt: string;
}

export function summarizeAccount(campaigns: CampaignMetrics[]): AccountSummary {
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);

  return {
    campaignCount: campaigns.length,
    totalSpend,
    totalRevenue,
    totalConversions,
    totalClicks,
    overallRoas: totalSpend > 0 ? totalRevenue / totalSpend : 0,
    overallCpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
    overallCtr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
    overallCpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
    generatedAt: new Date().toISOString(),
  };
}

export interface AgentReport {
  title: string;
  generatedAt: string;
  summary: AccountSummary;
  recommendations: Array<{ title: string; priority: string; action: string }>;
  campaigns: Array<{
    campaignId: string;
    name: string;
    roas: number;
    cpa: number;
    ctr: number;
    cpc: number;
  }>;
}

export function buildAgentReport(
  campaigns: CampaignMetrics[],
  recommendations: Array<{ title: string; priority: string; action: string }>,
): AgentReport {
  const summary = summarizeAccount(campaigns);

  return {
    title: "Marketing Brain Agent Report",
    generatedAt: new Date().toISOString(),
    summary,
    recommendations,
    campaigns: campaigns.map((c) => ({
      campaignId: c.campaignId,
      name: c.name,
      roas: c.spend > 0 ? c.revenue / c.spend : 0,
      cpa: c.conversions > 0 ? c.spend / c.conversions : 0,
      ctr: c.impressions > 0 ? c.clicks / c.impressions : 0,
      cpc: c.clicks > 0 ? c.spend / c.clicks : 0,
    })),
  };
}
