import pino, { type Logger as PinoLogger } from "pino";

export type CoreLogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";

/**
 * Central JSON logger for the MCP framework (Pino, JSON by default).
 */
export class Logger {
  private constructor(readonly pino: PinoLogger) {}

  static create(options?: { service?: string; level?: CoreLogLevel; pretty?: boolean }): Logger {
    const service = options?.service ?? "mcp-framework";
    const level = options?.level ?? "info";
    const pretty = options?.pretty ?? false;

    const instance = pino(
      pretty
        ? {
            level,
            transport: {
              target: "pino-pretty",
              options: { colorize: true, translateTime: "SYS:standard" },
            },
          }
        : {
            level,
            formatters: {
              level(label) {
                return { level: label };
              },
            },
          },
    ).child({ service });

    return new Logger(instance);
  }

  child(bindings: Record<string, unknown>): Logger {
    return new Logger(this.pino.child(bindings));
  }

  info(obj: Record<string, unknown>, msg?: string): void {
    this.pino.info(obj, msg);
  }

  warn(obj: Record<string, unknown>, msg?: string): void {
    this.pino.warn(obj, msg);
  }

  error(obj: Record<string, unknown>, msg?: string): void {
    this.pino.error(obj, msg);
  }

  debug(obj: Record<string, unknown>, msg?: string): void {
    this.pino.debug(obj, msg);
  }
}
