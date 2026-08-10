import { createLogger, type Logger } from "@mcp-marketing/shared";

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  variables: string[];
}

const DEFAULT_TEMPLATES: PromptTemplate[] = [
  {
    id: "campaign-analysis",
    name: "Campaign Analysis",
    category: "analytics",
    template:
      "Analyze campaign {{campaignName}} with spend {{spend}}, ROAS {{roas}}, and CTR {{ctr}}. Provide optimization recommendations.",
    variables: ["campaignName", "spend", "roas", "ctr"],
  },
  {
    id: "budget-review",
    name: "Budget Review",
    category: "budget",
    template:
      "Review total budget of {{totalBudget}} across {{campaignCount}} campaigns. Suggest reallocation based on ROAS performance.",
    variables: ["totalBudget", "campaignCount"],
  },
  {
    id: "account-summary",
    name: "Account Summary",
    category: "reporting",
    template:
      "Summarize account performance: {{campaignCount}} campaigns, total spend {{totalSpend}}, revenue {{totalRevenue}}, overall ROAS {{overallRoas}}.",
    variables: ["campaignCount", "totalSpend", "totalRevenue", "overallRoas"],
  },
  {
    id: "customer-segment",
    name: "Customer Segment Analysis",
    category: "customers",
    template:
      "Analyze customer segment {{segmentName}} with {{customerCount}} customers and LTV {{ltv}}. Suggest targeting actions.",
    variables: ["segmentName", "customerCount", "ltv"],
  },
];

export interface PromptManagerOptions {
  logger?: Logger;
  templates?: PromptTemplate[];
}

export class PromptManager {
  private readonly templates: Map<string, PromptTemplate>;
  private readonly logger: Logger;

  constructor(options: PromptManagerOptions = {}) {
    this.logger = options.logger ?? createLogger("prompt-manager");
    this.templates = new Map(
      (options.templates ?? DEFAULT_TEMPLATES).map((t) => [t.id, t]),
    );
  }

  listTemplates(category?: string): PromptTemplate[] {
    const all = [...this.templates.values()];
    if (!category) {
      return all;
    }
    return all.filter((t) => t.category === category);
  }

  getTemplate(id: string): PromptTemplate | undefined {
    return this.templates.get(id);
  }

  render(templateId: string, variables: Record<string, string | number>): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Prompt template not found: ${templateId}`);
    }

    let rendered = template.template;
    for (const [key, value] of Object.entries(variables)) {
      rendered = rendered.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value));
    }

    const unresolved = rendered.match(/\{\{(\w+)\}\}/g);
    if (unresolved) {
      this.logger.warn({ templateId, unresolved }, "Prompt rendered with unresolved variables");
    }

    return rendered;
  }

  registerTemplate(template: PromptTemplate): void {
    this.templates.set(template.id, template);
    this.logger.debug({ templateId: template.id }, "Registered prompt template");
  }
}
