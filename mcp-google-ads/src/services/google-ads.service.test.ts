import { beforeEach, describe, expect, it } from "vitest";
import { GoogleAdsService } from "./google-ads.service.js";

describe("GoogleAdsService", () => {
  let service: GoogleAdsService;

  beforeEach(() => {
    service = new GoogleAdsService({ customerId: "1234567890" });
  });

  it("lists seeded campaigns", async () => {
    const campaigns = await service.listCampaigns();
    expect(campaigns.length).toBeGreaterThanOrEqual(2);
  });

  it("creates and retrieves a campaign", async () => {
    const created = await service.createCampaign({
      name: "Test Campaign",
      budgetMicros: 10_000_000,
    });

    expect(created.name).toBe("Test Campaign");
    expect(created.status).toBe("ENABLED");

    const fetched = await service.getCampaign(created.id);
    expect(fetched.id).toBe(created.id);
  });

  it("pauses and enables a campaign", async () => {
    const created = await service.createCampaign({
      name: "Toggle Campaign",
      budgetMicros: 5_000_000,
    });

    const paused = await service.pauseCampaign(created.id);
    expect(paused.status).toBe("PAUSED");

    const enabled = await service.enableCampaign(created.id);
    expect(enabled.status).toBe("ENABLED");
  });

  it("updates budget", async () => {
    const created = await service.createCampaign({
      name: "Budget Campaign",
      budgetMicros: 5_000_000,
    });

    const updated = await service.updateBudget(created.id, 20_000_000);
    expect(updated.budgetMicros).toBe(20_000_000);
  });

  it("searches keywords", async () => {
    const keywords = await service.searchKeywords("shoes", 3);
    expect(keywords).toHaveLength(3);
    expect(keywords[0]?.keyword).toContain("shoes");
  });

  it("generates ads", async () => {
    const ads = await service.generateAds({ product: "Sneakers", count: 2 });
    expect(ads).toHaveLength(2);
    expect(ads[0]?.headline).toContain("Sneakers");
  });

  it("returns campaign report rows", async () => {
    const rows = await service.campaignReport();
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]?.impressions).toBeGreaterThan(0);
  });

  it("adds negative keywords", async () => {
    const campaigns = await service.listCampaigns();
    const campaignId = campaigns[0]?.id;
    expect(campaignId).toBeTruthy();

    const result = await service.negativeKeywords(campaignId!, ["free", "cheap"]);
    expect(result.added).toEqual(["free", "cheap"]);
  });
});
