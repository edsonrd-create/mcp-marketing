export {
  AppError,
  ErrorCode,
  ExternalApiError,
  ValidationError,
  isAppError,
  toErrorMessage,
} from "@mcp-marketing/shared";

export class FrameworkError extends Error {
  readonly code: string;
  readonly details?: unknown;

  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.name = "FrameworkError";
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
  }
}
