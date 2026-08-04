import { connectStdioMcpServer, mcpStartupLog } from "@mcp-marketing/shared";
import {
  createMetaAdsModule,
  registerMetaAdsTools,
  type MetaAdsModule,
} from "../../src/providers/meta-ads/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const SERVER_NAME = "mcp-meta-ads";
const SERVER_VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";

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

  mcpStartupLog(
    `📦 Provider Meta Ads pronto (mode=${module.provider.isLiveMode() ? "live" : "mock"}, adAccountId=${module.provider.getAdAccountId()})`,
  );

  return { server, module };
}

export async function startMetaAdsServer(): Promise<void> {
  const { server } = await createMetaAdsServer();
  await connectStdioMcpServer({
    server,
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });
}
