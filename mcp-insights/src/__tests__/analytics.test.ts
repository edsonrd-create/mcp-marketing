import { describe, expect, it } from "vitest";
import {
  analyzeInsights,
  computeCampaignMetrics,
  getExecutiveDashboard,
  getHealthScores,
  listRecommendations,
} from "../services/analytics.js";
import { seedDemoSnapshots } from "../tools/index.js";

describe("analyzeInsights", () => {
  const snapshots = seedDemoSnapshots();

  it("returns insights for campaign snapshots", () => {
    const insights = analyzeInsights(snapshots);
    expect(insights.length).toBeGreaterThan(0);
    expect(insights.some((i) => i.campaignId === "camp-001")).toBe(true);
  });

  it("flags negative ROAS campaigns", () => {
    const insights = analyzeInsights(snapshots);
    const critical = insights.filter((i) => i.severity === "critical");
    expect(critical.some((i) => i.campaignId === "camp-002")).toBe(true);
  });

  it("computes health scores", () => {
    const scores = getHealthScores(snapshots);
    expect(scores).toHaveLength(2);
    expect(scores[0]?.score).toBeGreaterThan(0);
    expect(["A", "B", "C", "D", "F"]).toContain(scores[0]?.grade);
  });

  it("generates recommendations from insights", () => {
    const recommendations = listRecommendations(snapshots);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0]?.action).toBeTruthy();
  });

  it("computes CPC alongside ROAS, CPA, and CTR", () => {
    const metrics = computeCampaignMetrics(snapshots[0]!);
    expect(metrics.cpc).toBeGreaterThan(0);
    expect(metrics.roas).toBeGreaterThan(0);
    expect(metrics.cpa).toBeGreaterThan(0);
    expect(metrics.ctr).toBeGreaterThan(0);
    expect(metrics.conversions).toBe(300);
    expect(metrics.revenue).toBe(18000);
  });

  it("exposes overall CPC in executive dashboard", () => {
    const dashboard = getExecutiveDashboard(snapshots);
    expect(dashboard.summary.overallCpc).toBeGreaterThan(0);
    expect(dashboard.summary.totalConversions).toBe(310);
    expect(dashboard.summary.totalClicks).toBe(8000);
    expect(dashboard.metrics?.[0]?.cpc).toBeGreaterThan(0);
  });
});
