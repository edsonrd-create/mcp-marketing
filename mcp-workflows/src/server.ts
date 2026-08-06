#!/usr/bin/env node
import { connectStdioMcpServer, createStdioSafeLogger } from "@mcp-marketing/shared";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerWorkflowsTools } from "./tools/index.js";

const SERVER_NAME = "mcp-marketing-workflows";
const VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";
const logger = createStdioSafeLogger("mcp-workflows");

export function createWorkflowsMcpServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: VERSION,
  });

  registerWorkflowsTools(server);
  return server;
}

async function main(): Promise<void> {
  const server = createWorkflowsMcpServer();
  await connectStdioMcpServer({ server, name: SERVER_NAME, version: VERSION });
}

const entry = process.argv[1] ?? "";
const isDirectRun = /(?:^|[/\\])server\.(m?js|cjs|ts)$/.test(entry);
if (isDirectRun) {
  main().catch((error) => {
    logger.error(error, "Failed to start Workflows MCP server");
    process.exit(1);
  });
}
