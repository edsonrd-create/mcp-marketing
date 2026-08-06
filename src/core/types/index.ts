export type HealthStatus = "online" | "offline" | "invalid_config";

export type ToolStatus = "ok" | "error";

export interface ProviderHealth {
  id: string;
  name: string;
  status: HealthStatus;
  details?: string;
  tools: number;
}

export interface RegisteredToolMeta {
  name: string;
  providerId: string;
  description: string;
}

export interface ToolExecutionLog {
  provider: string;
  tool: string;
  ms: number;
  status: ToolStatus;
  error?: string;
  at: string;
}

export interface ProviderManifest {
  id: string;
  name: string;
  packageName: string;
  packageDir: string;
  entryRelative: string;
  toolNames: string[];
  requiredEnv: string[];
}
