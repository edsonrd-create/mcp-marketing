#!/usr/bin/env node
import { connectStdioMcpServer, createStdioSafeLogger } from "@mcp-marketing/shared";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAiAgentTools } from "./tools/index.js";

const SERVER_NAME = "mcp-marketing-ai-agent";
const VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";
const logger = createStdioSafeLogger("mcp-ai-agent");

export function createAiAgentMcpServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: VERSION,
  });

  registerAiAgentTools(server);
  return server;
}

async function main(): Promise<void> {
  const server = createAiAgentMcpServer();
  await connectStdioMcpServer({ server, name: SERVER_NAME, version: VERSION });
}

const entry = process.argv[1] ?? "";
const isDirectRun = /(?:^|[/\\])server\.(m?js|cjs|ts)$/.test(entry);
if (isDirectRun) {
  main().catch((error) => {
    logger.error(error, "Failed to start AI Agent MCP server");
    process.exit(1);
  });
}
