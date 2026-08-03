import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createLogger } from "@mcp-marketing/shared";
import { GoogleAdsAuthService } from "./auth/google-ads-auth.service.js";
import { loadGoogleAdsEnv } from "./config/env.js";
import { GoogleAdsService } from "./services/google-ads.service.js";
import { registerGoogleAdsTools } from "./tools/index.js";

const SERVER_NAME = "mcp-google-ads";
const SERVER_VERSION = "1.1.0";

const logger = createLogger(SERVER_NAME);

export interface GoogleAdsServerContext {
  server: McpServer;
  auth: GoogleAdsAuthService;
  service: GoogleAdsService;
}

export async function createGoogleAdsServer(): Promise<GoogleAdsServerContext> {
  const env = loadGoogleAdsEnv();
  const auth = new GoogleAdsAuthService(env);
  await auth.initialize();

  const service = new GoogleAdsService({
    customerId: env.GOOGLE_ADS_CUSTOMER_ID,
  });

  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  registerGoogleAdsTools(server, service);

  return { server, auth, service };
}

export async function startGoogleAdsServer(): Promise<void> {
  const { server } = await createGoogleAdsServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info({ version: SERVER_VERSION }, "Google Ads MCP server started (stdio)");
}
