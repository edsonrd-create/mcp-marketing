import { describe, expect, it } from "vitest";
import {
  cancelAction,
  confirmAction,
  createEmptyAgentStore,
  listPendingApprovals,
  processChat,
} from "../services/agent.js";
import { ConversationMemory } from "../services/conversation-memory.js";
import { buildAgentReport, seedDemoCampaigns, summarizeAccount } from "../services/demo-data.js";
import { Planner } from "../services/planner.js";
import { PromptManager } from "../services/prompt-manager.js";
import { RecommendationEngine } from "../services/recommendation-engine.js";

describe("AI agent", () => {
  it("responds to chat with rule-based replies", () => {
    const store = createEmptyAgentStore();
    const response = processChat(store, "test-session", "Hello!");
    expect(response.message.role).toBe("assistant");
    expect(response.message.content).toMatch(/Marketing Brain/i);
  });

  it("creates pending approval for campaign actions", () => {
    const store = createEmptyAgentStore();
    const response = processChat(store, "test-session", "Please launch a campaign");
    expect(response.pendingAction).toBeDefined();
    expect(response.pendingAction?.status).toBe("pending");
    expect(listPendingApprovals(store)).toHaveLength(1);
  });

  it("confirms and cancels pending actions", () => {
    const store = createEmptyAgentStore();
    const response = processChat(store, "s1", "Pause the campaign now");
    const actionId = response.pendingAction!.id;

    const confirmed = confirmAction(store, actionId);
    expect(confirmed.status).toBe("confirmed");
    expect(listPendingApprovals(store)).toHaveLength(0);

    const response2 = processChat(store, "s1", "Launch a new campaign");
    const actionId2 = response2.pendingAction!.id;
    const cancelled = cancelAction(store, actionId2);
    expect(cancelled.status).toBe("cancelled");
  });
});

describe("ConversationMemory", () => {
  it("summarizes session history", () => {
    const store = createEmptyAgentStore();
    const memory = new ConversationMemory();
    processChat(store, "sess-1", "Hello");
    processChat(store, "sess-1", "Show budgets");

    const summary = memory.summarizeSession(store, "sess-1");
    expect(summary.messageCount).toBeGreaterThan(0);
    expect(summary.topics.length).toBeGreaterThan(0);
  });
});

describe("Planner", () => {
  it("creates a marketing plan with prioritized steps", () => {
    const planner = new Planner();
    const campaigns = seedDemoCampaigns();
    const plan = planner.createPlan("Improve ROAS", campaigns);

    expect(plan.steps.length).toBeGreaterThan(0);
    expect(plan.goal).toBe("Improve ROAS");
    const prioritized = planner.prioritizeSteps(plan.steps);
    expect(prioritized[0]?.priority).toBe("high");
  });
});

describe("RecommendationEngine", () => {
  it("analyzes campaigns and suggests budget optimization", () => {
    const engine = new RecommendationEngine();
    const campaigns = seedDemoCampaigns();
    const recommendations = engine.analyzeCampaigns(campaigns);

    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.some((r) => r.campaignId === "camp-002")).toBe(true);

    const allocations = engine.optimizeBudget(campaigns, 10_000);
    expect(allocations).toHaveLength(2);
    expect(allocations.reduce((sum, a) => sum + a.suggestedBudget, 0)).toBeCloseTo(10_000, 0);
  });

  it("suggests prioritized actions", () => {
    const engine = new RecommendationEngine();
    const actions = engine.suggestActions(seedDemoCampaigns(), 5);
    expect(actions.length).toBeLessThanOrEqual(5);
    expect(actions[0]?.priority).toBe("high");
  });
});

describe("PromptManager", () => {
  it("renders templates with variables", () => {
    const manager = new PromptManager();
    const rendered = manager.render("account-summary", {
      campaignCount: 3,
      totalSpend: 7000,
      totalRevenue: 18800,
      overallRoas: 2.69,
    });
    expect(rendered).toContain("3 campaigns");
    expect(rendered).toContain("7000");
  });
});

describe("Account summary and report", () => {
  it("computes account metrics including CPC", () => {
    const campaigns = seedDemoCampaigns();
    const summary = summarizeAccount(campaigns);

    expect(summary.campaignCount).toBe(2);
    expect(summary.overallRoas).toBeGreaterThan(0);
    expect(summary.overallCpc).toBeGreaterThan(0);
    expect(summary.totalConversions).toBe(310);
  });

  it("builds agent report with campaign metrics", () => {
    const campaigns = seedDemoCampaigns();
    const engine = new RecommendationEngine();
    const recommendations = engine.analyzeCampaigns(campaigns);
    const report = buildAgentReport(
      campaigns,
      recommendations.map((r) => ({
        title: r.title,
        priority: r.priority,
        action: r.action,
      })),
    );

    expect(report.campaigns).toHaveLength(2);
    expect(report.campaigns[0]?.cpc).toBeGreaterThan(0);
    expect(report.summary.overallCpc).toBeGreaterThan(0);
  });
});
