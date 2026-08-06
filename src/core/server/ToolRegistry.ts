import { FrameworkError } from "../errors/index.js";
import type { ToolDefinition } from "../tools/BaseTool.js";
import type { RegisteredToolMeta } from "../types/index.js";

/**
 * Central tool registry — providers register tools here automatically via registerTools().
 */
export class ToolRegistry {
  private readonly tools = new Map<string, ToolDefinition>();

  private key(name: string, providerId: string): string {
    return `${providerId}::${name}`;
  }

  register(tool: ToolDefinition): void {
    const key = this.key(tool.name, tool.providerId);
    if (this.tools.has(key)) {
      throw new FrameworkError(
        "TOOL_ALREADY_REGISTERED",
        `Tool already registered: ${key}`,
      );
    }
    this.tools.set(key, tool);
  }

  get(name: string, providerId?: string): ToolDefinition | undefined {
    if (providerId) {
      return this.tools.get(this.key(name, providerId));
    }
    const matches = [...this.tools.values()].filter((t) => t.name === name);
    return matches[0];
  }

  list(providerId?: string): ToolDefinition[] {
    const all = [...this.tools.values()];
    if (!providerId) {
      return all;
    }
    return all.filter((t) => t.providerId === providerId);
  }

  listMeta(providerId?: string): RegisteredToolMeta[] {
    return this.list(providerId).map((t) => ({
      name: t.name,
      providerId: t.providerId,
      description: t.description,
    }));
  }

  has(name: string, providerId: string): boolean {
    return this.tools.has(this.key(name, providerId));
  }

  clear(): void {
    this.tools.clear();
  }

  get size(): number {
    return this.tools.size;
  }
}
