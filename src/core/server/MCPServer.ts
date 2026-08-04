import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ToolRegistry } from "./ToolRegistry.js";
import type { ProviderRegistry } from "./ProviderRegistry.js";

export interface MCPServerOptions {
  name?: string;
  version?: string;
  toolRegistry: ToolRegistry;
  providerRegistry: ProviderRegistry;
}

/**
 * Framework MCP server shell — exposes registered catalog metadata.
 * Individual package servers (stdio) remain the execution hosts.
 */
export class MarketingBrainMCPServer {
  readonly server: McpServer;
  readonly toolRegistry: ToolRegistry;
  readonly providerRegistry: ProviderRegistry;

  constructor(options: MCPServerOptions) {
    this.toolRegistry = options.toolRegistry;
    this.providerRegistry = options.providerRegistry;
    this.server = new McpServer({
      name: options.name ?? "marketing-brain-mcp",
      version: options.version ?? "1.0.0",
    });
  }

  summary() {
    return {
      providers: this.providerRegistry.list().map((p) => p.id),
      tools: this.toolRegistry.size,
      toolsByProvider: Object.fromEntries(
        this.providerRegistry.list().map((p) => [p.id, this.toolRegistry.list(p.id).length]),
      ),
    };
  }
}

/** Alias matching Sprint 4 naming. */
export { MarketingBrainMCPServer as MCPServer };
