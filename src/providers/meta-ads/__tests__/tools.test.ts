import { describe, expect, it, beforeAll } from "vitest";
import {
  createMetaAdsModule,
  META_ADS_TOOL_NAMES,
  type MetaAdsEnv,
  type MetaAdsModule,
} from "../index.js";

function testEnv(overrides: Partial<MetaAdsEnv> = {}): MetaAdsEnv {
  return {
    META_ACCESS_TOKEN: "test-token",
    META_AD_ACCOUNT_ID: "act_123",
    META_SKIP_AUTH_VALIDATE: true,
    META_FORCE_MOCK: true,
    ...overrides,
  };
}

describe("Meta Ads provider tools", () => {
  let module: MetaAdsModule;

  beforeAll(async () => {
    module = await createMetaAdsModule(testEnv());
  });

  it("registers Master Prompt tools plus legacy aliases", () => {
    expect(META_ADS_TOOL_NAMES).toContain("list_accounts");
    expect(META_ADS_TOOL_NAMES).toContain("get_insights");
    expect(META_ADS_TOOL_NAMES).toContain("enable_campaign");
    expect(META_ADS_TOOL_NAMES).toContain("resume_campaign");
    expect(META_ADS_TOOL_NAMES).toContain("get_metrics");
    expect(META_ADS_TOOL_NAMES.length).toBe(14);
  });

  it("list_accounts", async () => {
    const accounts = await module.provider.listAccounts();
    expect(accounts[0]?.id).toBe("act_123");
  });

  it("list_campaigns / get_campaign", async () => {
    const campaigns = await module.provider.listCampaigns();
    expect(campaigns.length).toBeGreaterThanOrEqual(2);
    const campaign = await module.provider.getCampaign("2001");
    expect(campaign.name).toBe("Meta Prospecting");
  });

  it("create / pause / enable / update_budget", async () => {
    const created = await module.provider.createCampaign({
      name: "Master v2",
      objective: "OUTCOME_TRAFFIC",
      dailyBudget: 40,
    });
    expect(created.id).toBeTruthy();
    const paused = await module.provider.pauseCampaign(created.id);
    expect(paused.status).toBe("PAUSED");
    const enabled = await module.provider.enableCampaign(created.id);
    expect(enabled.status).toBe("ACTIVE");
    const budgeted = await module.provider.updateBudget(created.id, 99);
    expect(budgeted.dailyBudget).toBe(99);
  });

  it("get_insights / list_audiences / account_info", async () => {
    const insights = await module.provider.getInsights();
    expect(insights.length).toBeGreaterThan(0);
    const audiences = await module.provider.listAudiences();
    expect(audiences.length).toBeGreaterThan(0);
    const account = await module.provider.accountInfo();
    expect(account.mode).toBe("mock");
  });
});
