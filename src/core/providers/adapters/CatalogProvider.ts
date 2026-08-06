import { existsSync } from "node:fs";
import path from "node:path";
import type { ToolRegistry } from "../../server/ToolRegistry.js";
import type { ProviderManifest } from "../../types/index.js";
import { BaseProvider, type ProviderInitOptions } from "../BaseProvider.js";

/**
 * Read-only adapter around an existing MCP package.
 * Registers tool catalog entries without changing provider source code.
 */
export class CatalogProvider extends BaseProvider {
  readonly id: string;
  readonly name: string;

  private options: ProviderInitOptions | null = null;

  constructor(
    private readonly manifest: ProviderManifest,
    private readonly rootDir: string,
  ) {
    super();
    this.id = manifest.id;
    this.name = manifest.name;
  }

  async initialize(options: ProviderInitOptions): Promise<void> {
    this.options = options;
    this.initialized = true;
  }

  async shutdown(): Promise<void> {
    this.initialized = false;
  }

  registerTools(registry: ToolRegistry): void {
    for (const toolName of this.manifest.toolNames) {
      registry.register(
        this.catalogTool(toolName, `${this.name} tool: ${toolName}`),
      );
    }
  }

  async health() {
    const env = this.options?.env ?? process.env;
    const missing = this.manifest.requiredEnv.filter((key) => !env[key]?.trim());
    const entry = path.join(this.rootDir, this.manifest.packageDir, this.manifest.entryRelative);
    const built = existsSync(entry);
    const tools = this.manifest.toolNames.length;

    if (missing.length > 0) {
      return this.buildHealth(
        "invalid_config",
        tools,
        `Missing env: ${missing.join(", ")}`,
      );
    }

    if (!built) {
      return this.buildHealth(
        "offline",
        tools,
        `Build missing: ${this.manifest.packageDir}/${this.manifest.entryRelative}`,
      );
    }

    return this.buildHealth("online", tools, `${this.manifest.packageName} ready`);
  }
}
