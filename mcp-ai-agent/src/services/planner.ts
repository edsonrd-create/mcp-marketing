import { randomUUID } from "node:crypto";
import { createLogger, type Logger } from "@mcp-marketing/shared";

export interface PlanStep {
  id: string;
  action: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedImpact?: string;
}

export interface MarketingPlan {
  id: string;
  goal: string;
  steps: PlanStep[];
  createdAt: string;
}

export interface CampaignInput {
  campaignId: string;
  name: string;
  spend: number;
  revenue: number;
  roas?: number;
}

export interface PlannerOptions {
  logger?: Logger;
}

export class Planner {
  private readonly logger: Logger;

  constructor(options: PlannerOptions = {}) {
    this.logger = options.logger ?? createLogger("planner");
  }

  createPlan(goal: string, campaigns: CampaignInput[] = []): MarketingPlan {
    const steps: PlanStep[] = [];
    const lowRoas = campaigns.filter(
      (c) => (c.roas ?? (c.spend > 0 ? c.revenue / c.spend : 0)) < 1,
    );
    const highRoas = campaigns.filter(
      (c) => (c.roas ?? (c.spend > 0 ? c.revenue / c.spend : 0)) >= 2,
    );

    steps.push({
      id: randomUUID(),
      action: "audit_performance",
      description: "Review campaign metrics and identify underperformers",
      priority: "high",
      estimatedImpact: "Baseline for optimization decisions",
    });

    if (lowRoas.length > 0) {
      steps.push({
        id: randomUUID(),
        action: "pause_underperformers",
        description: `Pause or restructure ${lowRoas.length} campaign(s) with ROAS below 1.0`,
        priority: "high",
        estimatedImpact: "Reduce wasted spend",
      });
    }

    if (highRoas.length > 0) {
      steps.push({
        id: randomUUID(),
        action: "scale_winners",
        description: `Increase budget 10-15% on ${highRoas.length} high-ROAS campaign(s)`,
        priority: "medium",
        estimatedImpact: "Capture incremental revenue",
      });
    }

    steps.push({
      id: randomUUID(),
      action: "generate_report",
      description: "Generate performance report and share with stakeholders",
      priority: "low",
    });

    const plan: MarketingPlan = {
      id: randomUUID(),
      goal,
      steps,
      createdAt: new Date().toISOString(),
    };

    this.logger.info({ planId: plan.id, stepCount: steps.length, goal }, "Created marketing plan");
    return plan;
  }

  prioritizeSteps(steps: PlanStep[]): PlanStep[] {
    const order = { high: 0, medium: 1, low: 2 };
    return [...steps].sort((a, b) => order[a.priority] - order[b.priority]);
  }
}
