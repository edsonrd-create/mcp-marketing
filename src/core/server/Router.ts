import type { ToolExecutor } from "../tools/ToolExecutor.js";
import type { ToolRegistry } from "./ToolRegistry.js";
import type { ProviderRegistry } from "./ProviderRegistry.js";

/**
 * Routes tool calls to the correct provider-scoped registration.
 * When multiple providers share a tool name (e.g. list_campaigns),
 * the caller must pass providerId or the first match is used.
 */
export class Router {
  constructor(
    private readonly tools: ToolRegistry,
    private readonly providers: ProviderRegistry,
    private readonly executor: ToolExecutor,
  ) {}

  resolve(toolName: string, providerId?: string) {
    return this.tools.get(toolName, providerId);
  }

  async invoke(toolName: string, args: unknown, providerId?: string): Promise<unknown> {
    const tool = this.resolve(toolName, providerId);
    if (!tool) {
      throw new Error(
        providerId
          ? `No tool ${toolName} for provider ${providerId}`
          : `No tool registered: ${toolName}`,
      );
    }
    if (!this.providers.get(tool.providerId)) {
      throw new Error(`Provider offline in registry: ${tool.providerId}`);
    }
    return this.executor.execute(tool.name, args, tool.providerId);
  }

  listByProvider(providerId: string) {
    return this.tools.list(providerId).map((t) => t.name);
  }
}
