import type { ZodTypeAny } from "zod";
import type { ToolContext } from "./ToolContext.js";

export interface ToolDefinition<TSchema extends ZodTypeAny = ZodTypeAny> {
  name: string;
  providerId: string;
  description: string;
  inputSchema: TSchema;
  execute: (args: unknown, ctx: ToolContext) => Promise<unknown>;
}

/**
 * Base class for framework tools. Existing MCP packages keep their own handlers;
 * new providers can extend BaseTool for shared validation/execution.
 */
export abstract class BaseTool<TSchema extends ZodTypeAny = ZodTypeAny> {
  abstract readonly name: string;
  abstract readonly providerId: string;
  abstract readonly description: string;
  abstract readonly inputSchema: TSchema;

  abstract run(args: unknown, ctx: ToolContext): Promise<unknown>;

  toDefinition(): ToolDefinition<TSchema> {
    return {
      name: this.name,
      providerId: this.providerId,
      description: this.description,
      inputSchema: this.inputSchema,
      execute: (args, ctx) => this.run(args, ctx),
    };
  }
}
