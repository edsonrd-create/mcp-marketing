import { registerTool } from "@mcp-marketing/shared";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  cancelAction,
  confirmAction,
  getAgentHistory,
  getAiSummary,
  listAuditLogs,
  listPendingApprovals,
  processChat,
} from "../services/agent.js";
import { ConversationMemory } from "../services/conversation-memory.js";
import {
  buildAgentReport,
  seedDemoCampaigns,
  seedDemoCustomers,
  summarizeAccount,
} from "../services/demo-data.js";
import { Planner } from "../services/planner.js";
import { PromptManager } from "../services/prompt-manager.js";
import { RecommendationEngine } from "../services/recommendation-engine.js";
import type { AgentStore } from "../services/store.js";
import { loadAgentStore, saveAgentStore } from "../services/store.js";
import type { ToolInvoker } from "../services/types.js";

export interface AiAgentToolsContext {
  storePath?: string;
  getStore?: () => Promise<AgentStore>;
  saveStore?: (store: AgentStore) => Promise<void>;
  toolInvoker?: ToolInvoker;
}

const campaignMetricsSchema = z.object({
  campaignId: z.string(),
  name: z.string(),
  spend: z.number(),
  impressions: z.number(),
  clicks: z.number(),
  conversions: z.number(),
  revenue: z.number(),
});

function resolveStoreAccess(ctx: AiAgentToolsContext) {
  const storePath = ctx.storePath;
  return {
    getStore: ctx.getStore ?? (() => loadAgentStore(storePath)),
    saveStore: ctx.saveStore ?? ((store: AgentStore) => saveAgentStore(store, storePath)),
    toolInvoker: ctx.toolInvoker,
  };
}

export function registerAiAgentTools(server: McpServer, ctx: AiAgentToolsContext = {}): void {
  const { getStore, saveStore, toolInvoker } = resolveStoreAccess(ctx);
  const recommendationEngine = new RecommendationEngine();
  const planner = new Planner();
  const promptManager = new PromptManager();
  const conversationMemory = new ConversationMemory();

  registerTool(
    server,
    "chat",
    {
      description: "Chat with the local rule-based marketing agent (no LLM)",
      inputSchema: {
        message: z.string().describe("User message"),
        sessionId: z.string().optional().describe("Session identifier"),
      },
    },
    async ({ message, sessionId }) => {
      const store = await getStore();
      const response = processChat(store, sessionId ?? "default", message);
      await saveStore(store);
      return { tool: "chat", ...response };
    },
  );

  registerTool(
    server,
    "list_pending_approvals",
    {
      description: "List actions awaiting user approval",
      inputSchema: {},
    },
    async () => {
      const store = await getStore();
      const pending = listPendingApprovals(store);
      return { tool: "list_pending_approvals", pending };
    },
  );

  registerTool(
    server,
    "confirm_action",
    {
      description: "Confirm a pending agent action",
      inputSchema: {
        actionId: z.string().describe("Pending action ID"),
      },
    },
    async ({ actionId }) => {
      const store = await getStore();
      const action = confirmAction(store, actionId);
      await saveStore(store);
      return { tool: "confirm_action", action };
    },
  );

  registerTool(
    server,
    "cancel_action",
    {
      description: "Cancel a pending agent action",
      inputSchema: {
        actionId: z.string().describe("Pending action ID"),
      },
    },
    async ({ actionId }) => {
      const store = await getStore();
      const action = cancelAction(store, actionId);
      await saveStore(store);
      return { tool: "cancel_action", action };
    },
  );

  registerTool(
    server,
    "get_agent_history",
    {
      description: "Get chat history for a session",
      inputSchema: {
        sessionId: z.string().optional(),
        limit: z.number().int().positive().max(200).optional(),
      },
    },
    async ({ sessionId, limit }) => {
      const store = await getStore();
      const history = getAgentHistory(store, sessionId, limit);
      return { tool: "get_agent_history", history };
    },
  );

  registerTool(
    server,
    "get_ai_summary",
    {
      description: "Get a summary of agent activity and pending approvals",
      inputSchema: {},
    },
    async () => {
      const store = await getStore();
      const summary = getAiSummary(store);
      return { tool: "get_ai_summary", summary };
    },
  );

  registerTool(
    server,
    "list_audit_logs",
    {
      description: "List agent audit log entries",
      inputSchema: {
        limit: z.number().int().positive().max(200).optional(),
      },
    },
    async ({ limit }) => {
      const store = await getStore();
      const logs = listAuditLogs(store, limit);
      return { tool: "list_audit_logs", logs };
    },
  );

  registerTool(
    server,
    "analyze_campaigns",
    {
      description: "Analyze campaign performance and return recommendations",
      inputSchema: {
        campaigns: z.array(campaignMetricsSchema).optional().describe("Campaign metrics to analyze"),
      },
    },
    async ({ campaigns }) => {
      const data = campaigns ?? seedDemoCampaigns();
      const recommendations = recommendationEngine.analyzeCampaigns(data);
      const plan = planner.createPlan("Optimize campaign performance", data);
      return {
        tool: "analyze_campaigns",
        campaignCount: data.length,
        recommendations,
        plan,
      };
    },
  );

  registerTool(
    server,
    "optimize_budget",
    {
      description: "Suggest budget reallocation across campaigns based on ROAS",
      inputSchema: {
        totalBudget: z.number().positive().describe("Total budget to allocate"),
        campaigns: z.array(campaignMetricsSchema).optional(),
      },
    },
    async ({ totalBudget, campaigns }) => {
      const data = campaigns ?? seedDemoCampaigns();
      const allocations = recommendationEngine.optimizeBudget(data, totalBudget);
      return { tool: "optimize_budget", totalBudget, allocations };
    },
  );

  registerTool(
    server,
    "generate_report",
    {
      description: "Generate an agent-scoped marketing performance report",
      inputSchema: {
        campaigns: z.array(campaignMetricsSchema).optional(),
      },
    },
    async ({ campaigns }) => {
      const data = campaigns ?? seedDemoCampaigns();
      const recommendations = recommendationEngine.analyzeCampaigns(data);
      const report = buildAgentReport(
        data,
        recommendations.map((r) => ({
          title: r.title,
          priority: r.priority,
          action: r.action,
        })),
      );

      if (toolInvoker) {
        try {
          await toolInvoker.execute("generate_report", { format: "json" });
        } catch {
          // Optional cross-provider call — agent report still returned
        }
      }

      return { tool: "generate_report", report };
    },
  );

  registerTool(
    server,
    "analyze_customers",
    {
      description: "Analyze customer segments and suggest targeting actions",
      inputSchema: {
        segmentId: z.string().optional().describe("Filter by segment ID"),
      },
    },
    async ({ segmentId }) => {
      let segments = seedDemoCustomers();
      if (segmentId) {
        segments = segments.filter((s) => s.segmentId === segmentId);
      }

      const insights = segments.map((segment) => ({
        segmentId: segment.segmentId,
        name: segment.name,
        customerCount: segment.customerCount,
        ltv: segment.ltv,
        conversionRate: segment.conversionRate,
        recommendation:
          segment.conversionRate < 0.03
            ? "Launch retargeting campaign for this segment"
            : "Maintain or scale engagement campaigns",
        prompt: promptManager.render("customer-segment", {
          segmentName: segment.name,
          customerCount: segment.customerCount,
          ltv: segment.ltv,
        }),
      }));

      return { tool: "analyze_customers", segmentCount: segments.length, insights };
    },
  );

  registerTool(
    server,
    "suggest_actions",
    {
      description: "Suggest prioritized marketing actions based on campaign data",
      inputSchema: {
        limit: z.number().int().positive().max(50).optional(),
        campaigns: z.array(campaignMetricsSchema).optional(),
      },
    },
    async ({ limit, campaigns }) => {
      const data = campaigns ?? seedDemoCampaigns();
      const actions = recommendationEngine.suggestActions(data, limit ?? 10);
      return { tool: "suggest_actions", count: actions.length, actions };
    },
  );

  registerTool(
    server,
    "summarize_account",
    {
      description: "Summarize overall account performance metrics",
      inputSchema: {
        campaigns: z.array(campaignMetricsSchema).optional(),
      },
    },
    async ({ campaigns }) => {
      const data = campaigns ?? seedDemoCampaigns();
      const summary = summarizeAccount(data);
      return { tool: "summarize_account", summary };
    },
  );

  registerTool(
    server,
    "marketing_chat",
    {
      description: "Marketing-focused chat that delegates to the rule-based agent",
      inputSchema: {
        message: z.string().describe("User message"),
        sessionId: z.string().optional().describe("Session identifier"),
      },
    },
    async ({ message, sessionId }) => {
      const store = await getStore();
      const sid = sessionId ?? "marketing";
      const response = processChat(store, sid, message);
      const sessionSummary = conversationMemory.summarizeSession(store, sid);
      await saveStore(store);
      return {
        tool: "marketing_chat",
        ...response,
        sessionSummary,
      };
    },
  );
}
