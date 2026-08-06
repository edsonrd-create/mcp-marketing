import { connectStdioMcpServer, createStdioSafeLogger } from "@mcp-marketing/shared";
import {
  createMetaAdsModule,
  registerMetaAdsTools,
  type MetaAdsModule,
} from "../../src/providers/meta-ads/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const SERVER_NAME = "mcp-meta-ads";
const SERVER_VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";
const logger = createStdioSafeLogger(SERVER_NAME);

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
  logger.info(
    {
      version: SERVER_VERSION,
      adAccountId: module.provider.getAdAccountId(),
      mode: module.provider.isLiveMode() ? "live" : "mock",
    },
    "Meta Ads MCP connecting (stdio)",
  );
  await connectStdioMcpServer({
    server,
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });
}
