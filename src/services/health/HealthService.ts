import {
  FrameworkBootstrap,
  type FrameworkHealthReport,
  type HealthStatus,
  type ProviderHealth,
} from "../../core/index.js";

export interface HealthServiceOptions {
  rootDir?: string;
  env?: NodeJS.ProcessEnv;
}

export interface NamedHealth {
  id: string;
  name: string;
  status: HealthStatus;
  label: "Online" | "Offline" | "Configuração inválida";
  details?: string;
  tools?: number;
}

function toLabel(status: HealthStatus): NamedHealth["label"] {
  if (status === "online") return "Online";
  if (status === "offline") return "Offline";
  return "Configuração inválida";
}

/**
 * Application health façade over the Core MCP Framework bootstrap.
 */
export class HealthService {
  private framework: FrameworkBootstrap | null = null;

  constructor(private readonly options: HealthServiceOptions = {}) {}

  async getFramework(): Promise<FrameworkBootstrap> {
    if (!this.framework) {
      const createOptions: {
        rootDir: string;
        logLevel: "silent";
        env?: NodeJS.ProcessEnv;
      } = {
        rootDir: this.options.rootDir ?? process.cwd(),
        logLevel: "silent",
      };
      if (this.options.env !== undefined) {
        createOptions.env = this.options.env;
      }
      this.framework = await FrameworkBootstrap.create(createOptions);
      await this.framework.initialize();
    }
    return this.framework;
  }

  async report(): Promise<FrameworkHealthReport> {
    const fw = await this.getFramework();
    return fw.healthReport();
  }

  async list(): Promise<NamedHealth[]> {
    const report = await this.report();
    const rows: NamedHealth[] = report.providers.map((p: ProviderHealth) => {
      const row: NamedHealth = {
        id: p.id,
        name: p.name,
        status: p.status,
        label: toLabel(p.status),
        tools: p.tools,
      };
      if (p.details !== undefined) {
        row.details = p.details;
      }
      return row;
    });

    const openai: NamedHealth = {
      id: report.openai.id,
      name: report.openai.name,
      status: report.openai.status,
      label: toLabel(report.openai.status),
    };
    if (report.openai.details !== undefined) {
      openai.details = report.openai.details;
    }
    rows.push(openai);

    rows.push({
      id: report.mcpServer.id,
      name: report.mcpServer.name,
      status: report.mcpServer.status,
      label: toLabel(report.mcpServer.status),
      tools: report.mcpServer.tools,
      ...(report.mcpServer.details !== undefined ? { details: report.mcpServer.details } : {}),
    });

    return rows;
  }

  async shutdown(): Promise<void> {
    if (this.framework) {
      await this.framework.shutdown();
      this.framework = null;
    }
  }
}
