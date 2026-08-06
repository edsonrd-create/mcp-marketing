import type { AuthManager } from "../auth/AuthManager.js";
import type { Logger } from "../logging/Logger.js";

export interface ToolContext {
  providerId: string;
  toolName: string;
  logger: Logger;
  auth: AuthManager;
  signal?: AbortSignal;
}
