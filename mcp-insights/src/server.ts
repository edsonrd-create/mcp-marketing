#!/usr/bin/env node
import { connectStdioMcpServer, createStdioSafeLogger } from "@mcp-marketing/shared";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerInsightsTools } from "./tools/index.js";

const SERVER_NAME = "mcp-marketing-insights";
const VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";
const logger = createStdioSafeLogger("mcp-insights");

export function createInsightsMcpServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: VERSION,
  });

  registerInsightsTools(server);
  return server;
}

async function main(): Promise<void> {
  const server = createInsightsMcpServer();
  await connectStdioMcpServer({ server, name: SERVER_NAME, version: VERSION });
}

const entry = process.argv[1] ?? "";
const isDirectRun = /(?:^|[/\\])server\.(m?js|cjs|ts)$/.test(entry);
if (isDirectRun) {
  main().catch((error) => {
    logger.error(error, "Failed to start Insights MCP server");
    process.exit(1);
  });
}
