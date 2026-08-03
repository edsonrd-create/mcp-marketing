import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createLogger } from "@mcp-marketing/shared";
import {
  createMetaAdsModule,
  registerMetaAdsTools,
  type MetaAdsModule,
} from "../../src/providers/meta-ads/index.js";

const SERVER_NAME = "mcp-meta-ads";
const SERVER_VERSION = "1.1.0";

const logger = createLogger(SERVER_NAME);

export interface MetaAdsServerContext {
  server: McpServer;
  module: MetaAdsModule;
}

export async function createMetaAdsServer(): Promise<MetaAdsServerContext> {
  const module = await createMetaAdsModule();
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  registerMetaAdsTools(server, module.provider);

  logger.info(
    {
      adAccountId: module.provider.getAdAccountId(),
      mode: module.provider.isLiveMode() ? "live" : "mock",
      tools: 14,
    },
    "Meta Ads MCP provider ready",
  );

  return { server, module };
}

export async function startMetaAdsServer(): Promise<void> {
  const { server, module } = await createMetaAdsServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info(
    {
      version: SERVER_VERSION,
      adAccountId: module.provider.getAdAccountId(),
      mode: module.provider.isLiveMode() ? "live" : "mock",
    },
    "Meta Ads MCP server started (stdio)",
  );
}
