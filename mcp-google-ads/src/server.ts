import { connectStdioMcpServer, mcpStartupLog } from "@mcp-marketing/shared";
import {
  createGoogleAdsModule,
  registerGoogleAdsTools,
  type GoogleAdsModule,
} from "../../src/providers/google-ads/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const SERVER_NAME = "mcp-google-ads";
const SERVER_VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";

export interface GoogleAdsServerContext {
  server: McpServer;
  module: GoogleAdsModule;
}

export async function createGoogleAdsServer(): Promise<GoogleAdsServerContext> {
  const module = await createGoogleAdsModule();
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  registerGoogleAdsTools(server, module.provider);

  mcpStartupLog(
    `📦 Provider Google Ads pronto (mode=${module.provider.isLiveMode() ? "live" : "mock"}, customerId=${module.provider.getCustomerId()})`,
  );

  return { server, module };
}

export async function startGoogleAdsServer(): Promise<void> {
  const { server } = await createGoogleAdsServer();
  await connectStdioMcpServer({
    server,
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });
}
