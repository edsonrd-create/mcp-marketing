/** Optional callback for cross-provider tool invocation (e.g. core ToolExecutor). */
export interface ToolInvoker {
  execute(toolName: string, args: Record<string, unknown>): Promise<unknown>;
}

export interface AgentServicesContext {
  toolInvoker?: ToolInvoker;
}
