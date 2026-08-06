import { z } from "zod";
import type { ToolRegistry } from "../server/ToolRegistry.js";
import type { HealthStatus, ProviderHealth } from "../types/index.js";
import type { ToolDefinition } from "../tools/BaseTool.js";
import type { ToolContext } from "../tools/ToolContext.js";

export interface ProviderInitOptions {
  rootDir: string;
  env: NodeJS.ProcessEnv;
}

/**
 * Contract every Marketing Brain provider must implement for the shared framework.
 */
export abstract class BaseProvider {
  abstract readonly id: string;
  abstract readonly name: string;

  protected initialized = false;

  abstract initialize(options: ProviderInitOptions): Promise<void>;
  abstract shutdown(): Promise<void>;
  abstract health(): Promise<ProviderHealth>;

  /** Register this provider's tools into the central ToolRegistry. */
  abstract registerTools(registry: ToolRegistry): void | Promise<void>;

  isInitialized(): boolean {
    return this.initialized;
  }

  protected catalogTool(
    name: string,
    description: string,
  ): ToolDefinition {
    return {
      name,
      providerId: this.id,
      description,
      inputSchema: z.object({}).passthrough(),
      execute: async (_args: unknown, _ctx: ToolContext) => ({
        provider: this.id,
        tool: name,
        note: "Catalog registration — execution remains in the MCP package server",
      }),
    };
  }

  protected buildHealth(
    status: HealthStatus,
    tools: number,
    details?: string,
  ): ProviderHealth {
    const health: ProviderHealth = {
      id: this.id,
      name: this.name,
      status,
      tools,
    };
    if (details !== undefined) {
      health.details = details;
    }
    return health;
  }
}
