import { existsSync } from "node:fs";
import path from "node:path";
import type { ProviderManifest } from "../types/index.js";
import { CatalogProvider } from "./adapters/CatalogProvider.js";
import type { BaseProvider } from "./BaseProvider.js";

/** Built-in provider manifests — does not modify existing provider packages. */
export const DEFAULT_PROVIDER_MANIFESTS: ProviderManifest[] = [
  {
    id: "google-ads",
    name: "Google Ads",
    packageName: "@mcp-marketing/google-ads",
    packageDir: "mcp-google-ads",
    entryRelative: "dist/index.js",
    toolNames: [
      "list_campaigns",
      "get_campaign",
      "create_campaign",
      "pause_campaign",
      "enable_campaign",
      "update_budget",
      "campaign_report",
      "search_keywords",
      "list_customers",
      "account_info",
    ],
    requiredEnv: [
      "GOOGLE_ADS_CLIENT_ID",
      "GOOGLE_ADS_CLIENT_SECRET",
      "GOOGLE_ADS_REFRESH_TOKEN",
      "GOOGLE_ADS_DEVELOPER_TOKEN",
      "GOOGLE_ADS_CUSTOMER_ID",
    ],
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    packageName: "@mcp-marketing/meta-ads",
    packageDir: "mcp-meta-ads",
    entryRelative: "dist/index.js",
    toolNames: [
      "list_accounts",
      "list_campaigns",
      "get_campaign",
      "create_campaign",
      "pause_campaign",
      "enable_campaign",
      "update_budget",
      "get_insights",
      "list_audiences",
      "account_info",
      "resume_campaign",
      "create_audience",
      "create_ad",
      "get_metrics",
    ],
    requiredEnv: ["META_ACCESS_TOKEN", "META_AD_ACCOUNT_ID"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    packageName: "@mcp-marketing/whatsapp",
    packageDir: "mcp-whatsapp",
    entryRelative: "dist/server.js",
    toolNames: [
      "send_birthday_message",
      "send_birthday",
      "send_coupon",
      "send_campaign",
      "send_template",
      "schedule_message",
      "order_confirmation",
      "list_templates",
      "get_message_status",
      "validate_webhook",
    ],
    requiredEnv: ["WHATSAPP_TOKEN", "WHATSAPP_PHONE_NUMBER_ID"],
  },
  {
    id: "insights",
    name: "Insights",
    packageName: "@mcp-marketing/insights",
    packageDir: "mcp-insights",
    entryRelative: "dist/server.js",
    toolNames: [
      "analyze_insights",
      "get_health_scores",
      "list_recommendations",
      "get_executive_dashboard",
      "list_timeline_events",
      "record_timeline_event",
      "get_health_center",
      "generate_report",
    ],
    requiredEnv: [],
  },
  {
    id: "ai-agent",
    name: "AI Agent",
    packageName: "@mcp-marketing/ai-agent",
    packageDir: "mcp-ai-agent",
    entryRelative: "dist/server.js",
    toolNames: [
      "chat",
      "list_pending_approvals",
      "confirm_action",
      "cancel_action",
      "get_agent_history",
      "get_ai_summary",
      "list_audit_logs",
      "analyze_campaigns",
      "optimize_budget",
      "generate_report",
      "analyze_customers",
      "suggest_actions",
      "summarize_account",
      "marketing_chat",
    ],
    requiredEnv: [],
  },
  {
    id: "workflows",
    name: "Workflows",
    packageName: "@mcp-marketing/workflows",
    packageDir: "mcp-workflows",
    entryRelative: "dist/server.js",
    toolNames: [
      "list_workflows",
      "create_workflow",
      "update_workflow",
      "duplicate_workflow",
      "pause_workflow",
      "delete_workflow",
      "run_workflow",
      "execute_workflow",
      "resume_workflow",
      "run_due_workflows",
      "recover_workflow_execution",
      "list_workflow_templates",
      "create_workflow_from_template",
      "list_workflow_executions",
      "list_workflow_audit_logs",
    ],
    requiredEnv: [],
  },
];

export interface OpenAiHealthProbe {
  id: "openai";
  name: "OpenAI";
  configured: boolean;
}

export class ProviderLoader {
  constructor(
    private readonly rootDir: string,
    private readonly manifests: ProviderManifest[] = DEFAULT_PROVIDER_MANIFESTS,
  ) {}

  load(): BaseProvider[] {
    return this.manifests.map((manifest) => new CatalogProvider(manifest, this.rootDir));
  }

  listManifests(): ProviderManifest[] {
    return [...this.manifests];
  }

  probeOpenAi(env: NodeJS.ProcessEnv = process.env): OpenAiHealthProbe {
    const key = env.OPENAI_API_KEY?.trim();
    return {
      id: "openai",
      name: "OpenAI",
      configured: Boolean(key),
    };
  }

  mcpServerBuilt(): boolean {
    return this.manifests.every((m) =>
      existsSync(path.join(this.rootDir, m.packageDir, m.entryRelative)),
    );
  }
}
