import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { structuredResult, withToolErrorHandling } from "@mcp-marketing/shared";
import { z } from "zod";
import type { MetaAdsProvider } from "../services/MetaAdsProvider.js";
import {
  accountInfoSchema,
  createAdSchema,
  createAudienceSchema,
  createCampaignSchema,
  enableCampaignSchema,
  getCampaignSchema,
  getInsightsSchema,
  getMetricsSchema,
  listAccountsSchema,
  listAudiencesSchema,
  listCampaignsSchema,
  pauseCampaignSchema,
  resumeCampaignSchema,
  updateBudgetSchema,
} from "../schemas/index.js";

type ToolHandler = (args: Record<string, unknown>) => Promise<CallToolResult>;

function toolHandler(handler: ToolHandler): ToolHandler {
  return withToolErrorHandling(handler) as ToolHandler;
}

/** Master Prompt v2 tools + legacy aliases for compatibility. */
export const META_ADS_TOOL_NAMES = [
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
  // legacy (kept for compatibility)
  "resume_campaign",
  "create_audience",
  "create_ad",
  "get_metrics",
] as const;

export type MetaAdsToolName = (typeof META_ADS_TOOL_NAMES)[number];

export function registerMetaAdsTools(server: McpServer, provider: MetaAdsProvider): void {
  server.tool(
    "list_accounts",
    "List Meta ad accounts accessible with the configured token",
    listAccountsSchema.shape,
    toolHandler(async (raw) => {
      listAccountsSchema.parse(raw);
      const accounts = await provider.listAccounts();
      return structuredResult({ accounts, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "list_campaigns",
    "List all Meta (Facebook/Instagram) ad campaigns",
    listCampaignsSchema.shape,
    toolHandler(async (raw) => {
      listCampaignsSchema.parse(raw);
      const campaigns = await provider.listCampaigns();
      return structuredResult({
        campaigns,
        adAccountId: provider.getAdAccountId(),
        mode: provider.isLiveMode() ? "live" : "mock",
      });
    }),
  );

  server.tool(
    "get_campaign",
    "Get a Meta ad campaign by ID",
    getCampaignSchema.shape,
    toolHandler(async (raw) => {
      const { campaign_id } = getCampaignSchema.parse(raw);
      const campaign = await provider.getCampaign(campaign_id);
      return structuredResult({ campaign, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "create_campaign",
    "Create a new Meta ad campaign",
    {
      name: z.string().min(1).describe("Campaign name"),
      objective: z.string().min(1).describe("Campaign objective"),
      daily_budget: z.number().positive().describe("Daily budget in account currency"),
    },
    toolHandler(async (raw) => {
      const input = createCampaignSchema.parse(raw);
      const campaign = await provider.createCampaign({
        name: input.name,
        objective: input.objective,
        dailyBudget: input.daily_budget,
      });
      return structuredResult({ campaign, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "pause_campaign",
    "Pause a Meta ad campaign",
    pauseCampaignSchema.shape,
    toolHandler(async (raw) => {
      const { campaign_id } = pauseCampaignSchema.parse(raw);
      const campaign = await provider.pauseCampaign(campaign_id);
      return structuredResult({ campaign, action: "paused", adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "enable_campaign",
    "Enable a paused Meta ad campaign",
    enableCampaignSchema.shape,
    toolHandler(async (raw) => {
      const { campaign_id } = enableCampaignSchema.parse(raw);
      const campaign = await provider.enableCampaign(campaign_id);
      return structuredResult({
        campaign,
        action: "enabled",
        adAccountId: provider.getAdAccountId(),
      });
    }),
  );

  server.tool(
    "resume_campaign",
    "Resume a paused Meta ad campaign (legacy alias of enable_campaign)",
    resumeCampaignSchema.shape,
    toolHandler(async (raw) => {
      const { campaign_id } = resumeCampaignSchema.parse(raw);
      const campaign = await provider.resumeCampaign(campaign_id);
      return structuredResult({
        campaign,
        action: "resumed",
        adAccountId: provider.getAdAccountId(),
      });
    }),
  );

  server.tool(
    "update_budget",
    "Update the daily budget for a Meta ad campaign",
    updateBudgetSchema.shape,
    toolHandler(async (raw) => {
      const { campaign_id, daily_budget } = updateBudgetSchema.parse(raw);
      const campaign = await provider.updateBudget(campaign_id, daily_budget);
      return structuredResult({ campaign, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "get_insights",
    "Get Meta campaign insights (impressions, clicks, spend, CTR)",
    {
      campaign_id: z.string().optional().describe("Optional campaign ID filter"),
    },
    toolHandler(async (raw) => {
      const input = getInsightsSchema.parse(raw);
      const insightsInput =
        input.campaign_id !== undefined ? { campaignId: input.campaign_id } : undefined;
      const insights = await provider.getInsights(insightsInput);
      return structuredResult({ insights, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "get_metrics",
    "Get Meta campaign metrics (legacy alias of get_insights)",
    {
      campaign_id: z.string().optional().describe("Optional campaign ID filter"),
    },
    toolHandler(async (raw) => {
      const input = getMetricsSchema.parse(raw);
      const metricsInput =
        input.campaign_id !== undefined ? { campaignId: input.campaign_id } : undefined;
      const metrics = await provider.getMetrics(metricsInput);
      return structuredResult({ metrics, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "list_audiences",
    "List Meta custom audiences",
    listAudiencesSchema.shape,
    toolHandler(async (raw) => {
      listAudiencesSchema.parse(raw);
      const audiences = await provider.listAudiences();
      return structuredResult({ audiences, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "create_audience",
    "Create a custom audience for Meta ads (legacy)",
    {
      name: z.string().min(1).describe("Audience name"),
      subtype: z.string().optional().describe("Audience subtype"),
      approximate_count: z.number().int().positive().optional(),
    },
    toolHandler(async (raw) => {
      const input = createAudienceSchema.parse(raw);
      const audienceInput: {
        name: string;
        subtype?: string;
        approximateCount?: number;
      } = { name: input.name };
      if (input.subtype !== undefined) audienceInput.subtype = input.subtype;
      if (input.approximate_count !== undefined) {
        audienceInput.approximateCount = input.approximate_count;
      }
      const audience = await provider.createAudience(audienceInput);
      return structuredResult({ audience, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "create_ad",
    "Create a Meta ad (legacy)",
    {
      name: z.string().min(1),
      campaign_id: z.string().min(1),
      creative_body: z.string().min(1),
    },
    toolHandler(async (raw) => {
      const input = createAdSchema.parse(raw);
      const ad = await provider.createAd({
        name: input.name,
        campaignId: input.campaign_id,
        creativeBody: input.creative_body,
      });
      return structuredResult({ ad, adAccountId: provider.getAdAccountId() });
    }),
  );

  server.tool(
    "account_info",
    "Get Meta ad account information",
    accountInfoSchema.shape,
    toolHandler(async (raw) => {
      accountInfoSchema.parse(raw);
      const account = await provider.accountInfo();
      return structuredResult({ account, adAccountId: provider.getAdAccountId() });
    }),
  );
}
