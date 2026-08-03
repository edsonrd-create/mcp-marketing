import { AuthManager } from "../auth/AuthManager.js";
import { Credentials } from "../auth/Credentials.js";
import { Logger } from "../logging/Logger.js";
import { AuditLogger } from "../logging/AuditLogger.js";
import { RequestLogger } from "../logging/RequestLogger.js";
import { ProviderLoader } from "../providers/ProviderLoader.js";
import { ToolExecutor } from "../tools/ToolExecutor.js";
import type { HealthStatus, ProviderHealth } from "../types/index.js";
import { VERSION } from "../http/version.js";
import { MarketingBrainMCPServer } from "./MCPServer.js";
import { ProviderRegistry } from "./ProviderRegistry.js";
import { Router } from "./Router.js";
import { ToolRegistry } from "./ToolRegistry.js";

export interface FrameworkHealthReport {
  version: string;
  generatedAt: string;
  providers: ProviderHealth[];
  openai: { id: string; name: string; status: HealthStatus; details?: string };
  mcpServer: { id: string; name: string; status: HealthStatus; details?: string; tools: number };
}

export interface FrameworkBootstrapOptions {
  rootDir?: string;
  env?: NodeJS.ProcessEnv;
  prettyLogs?: boolean;
  logLevel?: import("../logging/Logger.js").CoreLogLevel;
}

/**
 * Boots the shared MCP framework: load providers, register tools, wire executor/router.
 */
export class FrameworkBootstrap {
  readonly toolRegistry = new ToolRegistry();
  readonly providerRegistry = new ProviderRegistry();
  readonly auth = new AuthManager();
  readonly logger: Logger;
  readonly auditLogger: AuditLogger;
  readonly requestLogger: RequestLogger;
  readonly executor: ToolExecutor;
  readonly router: Router;
  readonly mcpServer: MarketingBrainMCPServer;
  readonly loader: ProviderLoader;
  readonly rootDir: string;
  private readonly env: NodeJS.ProcessEnv;
  private ready = false;

  private constructor(options: FrameworkBootstrapOptions) {
    this.rootDir = options.rootDir ?? process.cwd();
    this.env = options.env ?? process.env;
    this.logger = Logger.create({
      service: "mcp-framework",
      pretty: options.prettyLogs ?? false,
      level: options.logLevel ?? "info",
    });
    this.auditLogger = new AuditLogger(this.logger);
    this.requestLogger = new RequestLogger(this.logger);
    this.loader = new ProviderLoader(this.rootDir);
    this.executor = new ToolExecutor({
      registry: this.toolRegistry,
      auth: this.auth,
      logger: this.logger,
      requestLogger: this.requestLogger,
      auditLogger: this.auditLogger,
    });
    this.router = new Router(this.toolRegistry, this.providerRegistry, this.executor);
    this.mcpServer = new MarketingBrainMCPServer({
      toolRegistry: this.toolRegistry,
      providerRegistry: this.providerRegistry,
    });
  }

  static async create(options: FrameworkBootstrapOptions = {}): Promise<FrameworkBootstrap> {
    return new FrameworkBootstrap(options);
  }

  async initialize(): Promise<void> {
    if (this.ready) {
      return;
    }

    const manifests = this.loader.listManifests();
    for (const provider of this.loader.load()) {
      this.providerRegistry.register(provider);
      const manifest = manifests.find((m) => m.id === provider.id);
      const credValues: Record<string, string> = {};
      for (const key of manifest?.requiredEnv ?? []) {
        const value = this.env[key];
        if (value) {
          credValues[key] = value;
        }
      }
      this.auth.registerCredentials(new Credentials(provider.id, credValues));
    }

    await this.providerRegistry.initializeAll(
      { rootDir: this.rootDir, env: this.env },
      this.toolRegistry,
    );

    this.ready = true;
    this.logger.info(
      {
        kind: "bootstrap",
        providers: this.providerRegistry.size,
        tools: this.toolRegistry.size,
      },
      "framework_ready",
    );
  }

  async shutdown(): Promise<void> {
    await this.providerRegistry.shutdownAll();
    this.auth.clear();
    this.ready = false;
    this.logger.info({ kind: "bootstrap" }, "framework_shutdown");
  }

  isReady(): boolean {
    return this.ready;
  }

  async healthReport(): Promise<FrameworkHealthReport> {
    if (!this.ready) {
      await this.initialize();
    }

    const providers = await this.providerRegistry.healthAll();
    const openaiProbe = this.loader.probeOpenAi(this.env);
    const openai: FrameworkHealthReport["openai"] = {
      id: "openai",
      name: "OpenAI",
      status: openaiProbe.configured ? "online" : "invalid_config",
    };
    if (!openaiProbe.configured) {
      openai.details = "OPENAI_API_KEY missing";
    }

    const mcpBuilt = this.loader.mcpServerBuilt();
    const mcpServer: FrameworkHealthReport["mcpServer"] = {
      id: "mcp-server",
      name: "MCP Server",
      status: mcpBuilt ? "online" : "offline",
      tools: this.toolRegistry.size,
      details: mcpBuilt
        ? `${this.providerRegistry.size} providers / ${this.toolRegistry.size} tools registered`
        : "One or more MCP package dist entrypoints missing — run npm run build",
    };

    return {
      version: VERSION,
      generatedAt: new Date().toISOString(),
      providers,
      openai,
      mcpServer,
    };
  }
}

/** Sprint 4 naming alias. */
export { FrameworkBootstrap as Bootstrap };
