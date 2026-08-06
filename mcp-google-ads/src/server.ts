import { connectStdioMcpServer, createStdioSafeLogger } from "@mcp-marketing/shared";
import {
  createGoogleAdsModule,
  registerGoogleAdsTools,
  type GoogleAdsModule,
} from "../../src/providers/google-ads/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const SERVER_NAME = "mcp-google-ads";
const SERVER_VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";
const logger = createStdioSafeLogger(SERVER_NAME);

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

  logger.info(
    {
      customerId: module.provider.getCustomerId(),
      mode: module.provider.isLiveMode() ? "live" : "mock",
      tools: 10,
    },
    "Google Ads MCP provider ready",
  );

  return { server, module };
}

export async function startGoogleAdsServer(): Promise<void> {
  const { server, module } = await createGoogleAdsServer();
  logger.info(
    {
      version: SERVER_VERSION,
      customerId: module.provider.getCustomerId(),
      mode: module.provider.isLiveMode() ? "live" : "mock",
    },
    "Google Ads MCP connecting (stdio)",
  );
  await connectStdioMcpServer({
    server,
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });
}
