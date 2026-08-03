import { toErrorMessage } from "../errors/index.js";
import type { AuditLogger } from "../logging/AuditLogger.js";
import type { RequestLogger } from "../logging/RequestLogger.js";
import type { ToolRegistry } from "../server/ToolRegistry.js";
import type { AuthManager } from "../auth/AuthManager.js";
import type { Logger } from "../logging/Logger.js";
import { ToolValidator } from "./ToolValidator.js";
import type { ToolContext } from "./ToolContext.js";

export interface ToolExecutorOptions {
  registry: ToolRegistry;
  auth: AuthManager;
  logger: Logger;
  requestLogger: RequestLogger;
  auditLogger: AuditLogger;
}

export class ToolExecutor {
  private readonly validator = new ToolValidator();

  constructor(private readonly options: ToolExecutorOptions) {}

  async execute(toolName: string, args: unknown, providerId?: string): Promise<unknown> {
    const tool = this.options.registry.get(toolName, providerId);
    if (!tool) {
      throw new Error(`Tool not registered: ${toolName}`);
    }

    const ctx: ToolContext = {
      providerId: tool.providerId,
      toolName: tool.name,
      logger: this.options.logger.child({ provider: tool.providerId, tool: tool.name }),
      auth: this.options.auth,
    };

    const started = this.options.requestLogger.start(tool.providerId, tool.name);
    try {
      const validated = this.validator.validate(tool.inputSchema, args ?? {});
      const result = await tool.execute(validated, ctx);
      const ms = this.options.requestLogger.end(tool.providerId, tool.name, started, "ok");
      this.options.auditLogger.record({
        provider: tool.providerId,
        tool: tool.name,
        ms,
        status: "ok",
        at: new Date().toISOString(),
      });
      return result;
    } catch (error) {
      const message = toErrorMessage(error);
      const ms = this.options.requestLogger.end(
        tool.providerId,
        tool.name,
        started,
        "error",
        message,
      );
      this.options.auditLogger.record({
        provider: tool.providerId,
        tool: tool.name,
        ms,
        status: "error",
        error: message,
        at: new Date().toISOString(),
      });
      throw error;
    }
  }
}
