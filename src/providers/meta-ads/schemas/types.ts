export interface MetaCampaign {
  id: string;
  name: string;
  status: "ACTIVE" | "PAUSED" | "ARCHIVED";
  objective: string;
  dailyBudget: number;
}

export interface MetaAudience {
  id: string;
  name: string;
  subtype: string;
  approximateCount: number;
}

export interface MetaAd {
  id: string;
  name: string;
  campaignId: string;
  creativeBody: string;
  status: "ACTIVE" | "PAUSED";
}

export interface MetaMetrics {
  campaignId: string;
  impressions: number;
  clicks: number;
  spend: number;
  reach: number;
  ctr: number;
}

export interface MetaAccountInfo {
  id: string;
  name: string;
  currency: string;
  timezone: string;
  mode: "mock" | "live";
}

export interface MetaAccountSummary {
  id: string;
  name: string;
  accountStatus: number;
}
