#!/usr/bin/env node
import { connectStdioMcpServer, createStdioSafeLogger } from "@mcp-marketing/shared";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { loadWhatsAppEnv } from "./config/env.js";
import { createStubWhatsAppService, createWhatsAppService } from "./services/whatsapp.js";
import { registerWhatsAppTools } from "./tools/index.js";

const SERVER_NAME = "mcp-marketing-whatsapp";
const VERSION = "1.0.0";

process.env.MCP_STDIO_SAFE = "true";
const logger = createStdioSafeLogger("mcp-whatsapp");

export function createWhatsAppMcpServer(): McpServer {
  const env = loadWhatsAppEnv();
  const useStub = process.env.WHATSAPP_STUB === "true";
  const verifyToken = env.WHATSAPP_VERIFY_TOKEN ?? process.env.WHATSAPP_VERIFY_TOKEN;
  const whatsapp = useStub
    ? createStubWhatsAppService(verifyToken ? { verifyToken } : undefined)
    : createWhatsAppService({
        env,
        ...(verifyToken ? { verifyToken } : {}),
      });

  if (useStub) {
    logger.warn("Using WhatsApp stub service (WHATSAPP_STUB=true) — no Graph API calls");
  }

  const server = new McpServer({
    name: SERVER_NAME,
    version: VERSION,
  });

  registerWhatsAppTools(server, { env, whatsapp });
  return server;
}

async function main(): Promise<void> {
  const server = createWhatsAppMcpServer();
  await connectStdioMcpServer({ server, name: SERVER_NAME, version: VERSION });
}

const entry = process.argv[1] ?? "";
const isDirectRun = /(?:^|[/\\])server\.(m?js|cjs|ts)$/.test(entry);
if (isDirectRun) {
  main().catch((error) => {
    logger.error(error, "Failed to start WhatsApp MCP server");
    process.exit(1);
  });
}
