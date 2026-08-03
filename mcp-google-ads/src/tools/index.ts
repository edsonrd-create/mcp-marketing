import { z } from "zod";
import { structuredResult, withToolErrorHandling } from "@mcp-marketing/shared";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GoogleAdsService } from "../services/google-ads.service.js";

type ToolHandler = (args: Record<string, unknown>) => Promise<CallToolResult>;

function toolHandler(handler: ToolHandler): ToolHandler {
  return withToolErrorHandling(handler) as ToolHandler;
}

export function registerGoogleAdsTools(server: McpServer, service: GoogleAdsService): void {
  server.tool(
    "list_campaigns",
    "List all Google Ads campaigns for the configured customer",
    {},
    toolHandler(async () => {
      const campaigns = await service.listCampaigns();
      return structuredResult({ campaigns, customerId: service.getCustomerId() });
    }),
  );

  server.tool(
    "get_campaign",
    "Get a Google Ads campaign by ID",
    { campaign_id: z.string().min(1).describe("Campaign ID") },
    toolHandler(async ({ campaign_id }) => {
      const campaign = await service.getCampaign(String(campaign_id));
      return structuredResult({ campaign });
    }),
  );

  server.tool(
    "create_campaign",
    "Create a new Google Ads campaign",
    {
      name: z.string().min(1).describe("Campaign name"),
      budget_micros: z.number().int().positive().describe("Daily budget in micros"),
      channel_type: z.string().optional().describe("Channel type, e.g. SEARCH"),
    },
    toolHandler(async ({ name, budget_micros, channel_type }) => {
      const input: {
        name: string;
        budgetMicros: number;
        channelType?: string;
      } = {
        name: String(name),
        budgetMicros: Number(budget_micros),
      };
      if (channel_type !== undefined) {
        input.channelType = String(channel_type);
      }
      const campaign = await service.createCampaign(input);
      return structuredResult({ campaign });
    }),
  );

  server.tool(
    "pause_campaign",
    "Pause a Google Ads campaign",
    { campaign_id: z.string().min(1).describe("Campaign ID") },
    toolHandler(async ({ campaign_id }) => {
      const campaign = await service.pauseCampaign(String(campaign_id));
      return structuredResult({ campaign, action: "paused" });
    }),
  );

  server.tool(
    "enable_campaign",
    "Enable a paused Google Ads campaign",
    { campaign_id: z.string().min(1).describe("Campaign ID") },
    toolHandler(async ({ campaign_id }) => {
      const campaign = await service.enableCampaign(String(campaign_id));
      return structuredResult({ campaign, action: "enabled" });
    }),
  );

  server.tool(
    "update_budget",
    "Update the daily budget for a Google Ads campaign",
    {
      campaign_id: z.string().min(1).describe("Campaign ID"),
      budget_micros: z.number().int().positive().describe("New daily budget in micros"),
    },
    toolHandler(async ({ campaign_id, budget_micros }) => {
      const campaign = await service.updateBudget(String(campaign_id), Number(budget_micros));
      return structuredResult({ campaign });
    }),
  );

  server.tool(
    "search_keywords",
    "Search keyword ideas for Google Ads",
    {
      query: z.string().min(1).describe("Seed keyword query"),
      limit: z.number().int().min(1).max(50).optional().describe("Max results"),
    },
    toolHandler(async ({ query, limit }) => {
      const keywords = await service.searchKeywords(
        String(query),
        limit === undefined ? undefined : Number(limit),
      );
      return structuredResult({ keywords });
    }),
  );

  server.tool(
    "generate_ads",
    "Generate ad copy suggestions for Google Ads",
    {
      product: z.string().min(1).describe("Product or service name"),
      tone: z.string().optional().describe("Desired tone"),
      count: z.number().int().min(1).max(10).optional().describe("Number of variants"),
    },
    toolHandler(async ({ product, tone, count }) => {
      const input: { product: string; tone?: string; count?: number } = {
        product: String(product),
      };
      if (tone !== undefined) {
        input.tone = String(tone);
      }
      if (count !== undefined) {
        input.count = Number(count);
      }
      const ads = await service.generateAds(input);
      return structuredResult({ ads });
    }),
  );

  server.tool(
    "campaign_report",
    "Get performance report for Google Ads campaigns",
    {
      campaign_id: z.string().optional().describe("Optional campaign ID filter"),
      date_range: z.string().optional().describe("Date range label, e.g. LAST_30_DAYS"),
    },
    toolHandler(async ({ campaign_id, date_range }) => {
      const input: { campaignId?: string; dateRange?: string } = {};
      if (campaign_id !== undefined) {
        input.campaignId = String(campaign_id);
      }
      if (date_range !== undefined) {
        input.dateRange = String(date_range);
      }
      const rows = await service.campaignReport(input);
      return structuredResult({ rows, dateRange: date_range ?? "LAST_30_DAYS" });
    }),
  );

  server.tool(
    "negative_keywords",
    "Add negative keywords to a Google Ads campaign",
    {
      campaign_id: z.string().min(1).describe("Campaign ID"),
      keywords: z.array(z.string().min(1)).min(1).describe("Negative keywords to add"),
    },
    toolHandler(async ({ campaign_id, keywords }) => {
      const result = await service.negativeKeywords(
        String(campaign_id),
        keywords as string[],
      );
      return structuredResult({ campaignId: campaign_id, ...result });
    }),
  );
}
