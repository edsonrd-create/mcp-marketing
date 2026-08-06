import { FrameworkError } from "../errors/index.js";
import type { BaseProvider } from "../providers/BaseProvider.js";
import type { ProviderHealth } from "../types/index.js";
import type { ToolRegistry } from "./ToolRegistry.js";

/**
 * Central provider registry — initialize / shutdown / health / auto tool registration.
 */
export class ProviderRegistry {
  private readonly providers = new Map<string, BaseProvider>();

  register(provider: BaseProvider): void {
    if (this.providers.has(provider.id)) {
      throw new FrameworkError(
        "PROVIDER_ALREADY_REGISTERED",
        `Provider already registered: ${provider.id}`,
      );
    }
    this.providers.set(provider.id, provider);
  }

  get(id: string): BaseProvider | undefined {
    return this.providers.get(id);
  }

  list(): BaseProvider[] {
    return [...this.providers.values()];
  }

  get size(): number {
    return this.providers.size;
  }

  async initializeAll(
    options: { rootDir: string; env?: NodeJS.ProcessEnv },
    toolRegistry: ToolRegistry,
  ): Promise<void> {
    const env = options.env ?? process.env;
    for (const provider of this.providers.values()) {
      await provider.initialize({ rootDir: options.rootDir, env });
      await provider.registerTools(toolRegistry);
    }
  }

  async shutdownAll(): Promise<void> {
    for (const provider of this.providers.values()) {
      await provider.shutdown();
    }
  }

  async healthAll(): Promise<ProviderHealth[]> {
    const results: ProviderHealth[] = [];
    for (const provider of this.providers.values()) {
      results.push(await provider.health());
    }
    return results;
  }

  clear(): void {
    this.providers.clear();
  }
}
