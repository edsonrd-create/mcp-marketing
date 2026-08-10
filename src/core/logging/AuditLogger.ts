import type { Logger } from "./Logger.js";
import type { ToolExecutionLog } from "../types/index.js";

/** Structured audit trail for tool executions (JSON). */
export class AuditLogger {
  private readonly entries: ToolExecutionLog[] = [];

  constructor(private readonly logger: Logger) {}

  record(entry: ToolExecutionLog): void {
    this.entries.push(entry);
    this.logger.info(
      {
        kind: "audit",
        provider: entry.provider,
        tool: entry.tool,
        ms: entry.ms,
        status: entry.status,
        error: entry.error,
        at: entry.at,
      },
      "tool_audit",
    );
  }

  list(): ToolExecutionLog[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries.length = 0;
  }
}
