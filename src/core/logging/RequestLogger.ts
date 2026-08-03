import type { Logger } from "./Logger.js";

/** Request lifecycle logger — start / duration / status / error. */
export class RequestLogger {
  constructor(private readonly logger: Logger) {}

  start(provider: string, tool: string): number {
    this.logger.info({ kind: "request_start", provider, tool }, "tool_request_start");
    return performance.now();
  }

  end(
    provider: string,
    tool: string,
    started: number,
    status: "ok" | "error",
    error?: string,
  ): number {
    const ms = Math.round(performance.now() - started);
    const payload: Record<string, unknown> = {
      kind: "request_end",
      provider,
      tool,
      ms,
      status,
    };
    if (error !== undefined) {
      payload.error = error;
    }
    if (status === "error") {
      this.logger.error(payload, "tool_request_end");
    } else {
      this.logger.info(payload, "tool_request_end");
    }
    return ms;
  }
}
