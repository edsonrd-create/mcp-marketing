import { describe, expect, it } from "vitest";
import { createMetaAdsModule } from "../../../src/providers/meta-ads/index.js";

describe("MetaAdsService (package)", () => {
  it("lists and mutates campaigns via provider module", async () => {
    const module = await createMetaAdsModule({
      META_ACCESS_TOKEN: "pkg-token",
      META_AD_ACCOUNT_ID: "act_999",
      META_SKIP_AUTH_VALIDATE: true,
      META_FORCE_MOCK: true,
    });

    const campaigns = await module.provider.listCampaigns();
    expect(campaigns.length).toBeGreaterThanOrEqual(2);

    const created = await module.provider.createCampaign({
      name: "Package Test",
      objective: "OUTCOME_TRAFFIC",
      dailyBudget: 25,
    });
    expect(created.status).toBe("ACTIVE");

    const paused = await module.provider.pauseCampaign(created.id);
    expect(paused.status).toBe("PAUSED");

    const insights = await module.provider.getInsights({ campaignId: "2001" });
    expect(insights[0]?.campaignId).toBe("2001");
  });
});
