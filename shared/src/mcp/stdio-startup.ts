import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export interface McpRegistrationCounts {
  tools: number;
  prompts: number;
  resources: number;
}

export interface McpServerHealth {
  name: string;
  version: string;
  tools: number;
  prompts: number;
  resources: number;
}

type McpServerInternals = {
  _registeredTools?: Record<string, unknown>;
  _registeredPrompts?: Record<string, unknown>;
  _registeredResources?: Record<string, unknown>;
};

/** Count tools/prompts/resources already registered on an McpServer instance. */
export function getMcpRegistrationCounts(server: McpServer): McpRegistrationCounts {
  const internals = server as unknown as McpServerInternals;
  return {
    tools: Object.keys(internals._registeredTools ?? {}).length,
    prompts: Object.keys(internals._registeredPrompts ?? {}).length,
    resources: Object.keys(internals._registeredResources ?? {}).length,
  };
}

/** Structured health snapshot for terminal display (before STDIO wait). */
export function getMcpServerHealth(name: string, version: string, server: McpServer): McpServerHealth {
  const counts = getMcpRegistrationCounts(server);
  return {
    name,
    version,
    tools: counts.tools,
    prompts: counts.prompts,
    resources: counts.resources,
  };
}

export function formatMcpServerHealth(health: McpServerHealth): string {
  return [
    `🩺 Health`,
    `   • Nome: ${health.name}`,
    `   • Versão: ${health.version}`,
    `   • Tools: ${health.tools}`,
    `   • Prompts: ${health.prompts}`,
    `   • Resources: ${health.resources}`,
  ].join("\n");
}

/**
 * Write a human-readable line to stderr.
 * MCP JSON-RPC uses stdout — never log startup UX there.
 */
export function mcpStartupLog(message: string): void {
  process.stderr.write(`${message}\n`);
}

export interface ConnectStdioMcpServerOptions {
  server: McpServer;
  name: string;
  version: string;
}

/**
 * Connect an already-configured McpServer over StdioServerTransport,
 * with clear startup / health / waiting logs on stderr.
 */
export async function connectStdioMcpServer(options: ConnectStdioMcpServerOptions): Promise<void> {
  // Ensure any concurrent Pino logs from this process never touch stdout.
  process.env.MCP_STDIO_SAFE = "true";

  const { server, name, version } = options;
  const health = getMcpServerHealth(name, version, server);

  mcpStartupLog(`Marketing Brain MCP`);
  mcpStartupLog(`Servidor: ${name}`);
  mcpStartupLog(`Versão: ${version}`);
  mcpStartupLog(`Quantidade de Tools: ${health.tools}`);
  mcpStartupLog(`Quantidade de Prompts: ${health.prompts}`);
  mcpStartupLog(`Quantidade de Resources: ${health.resources}`);
  mcpStartupLog(formatMcpServerHealth(health));
  mcpStartupLog(`Aguardando conexão via STDIO...`);
  mcpStartupLog(`(nenhuma porta HTTP — o processo fica à espera no stdin; isto é esperado)`);

  let disconnectedLogged = false;
  const logDisconnected = () => {
    if (disconnectedLogged) {
      return;
    }
    disconnectedLogged = true;
    mcpStartupLog(`Cliente desconectado`);
  };
  process.stdin.on("end", logDisconnected);
  process.stdin.on("close", logDisconnected);
  process.on("SIGINT", () => {
    logDisconnected();
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);

  mcpStartupLog(`Cliente conectado`);
  mcpStartupLog(`Transporte STDIO ativo — JSON-RPC no stdin/stdout; logs em stderr.`);
}
