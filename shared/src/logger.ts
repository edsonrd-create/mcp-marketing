import pino, { type Logger, type LoggerOptions } from "pino";

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";

const isProduction = process.env.NODE_ENV === "production";

function buildPinoOptions(level: LogLevel): LoggerOptions {
  const base: LoggerOptions = {
    level,
  };

  if (isProduction) {
    return {
      ...base,
      formatters: {
        level(label) {
          return { severity: label.toUpperCase() };
        },
      },
    };
  }

  return {
    ...base,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
      },
    },
  };
}

export function createLogger(service: string, level: LogLevel = "info"): Logger {
  return pino(buildPinoOptions(level)).child({ service });
}

export type { Logger };
