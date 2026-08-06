import { describe, expect, it, beforeEach } from "vitest";
import { ProviderRegistry } from "../server/ProviderRegistry.js";
import { ToolRegistry } from "../server/ToolRegistry.js";
import { BaseProvider, type ProviderInitOptions } from "../providers/BaseProvider.js";
import type { ProviderHealth } from "../types/index.js";

class FakeProvider extends BaseProvider {
  readonly id = "fake";
  readonly name = "Fake";
  initializeCalls = 0;
  shutdownCalls = 0;

  async initialize(_options: ProviderInitOptions): Promise<void> {
    this.initializeCalls += 1;
    this.initialized = true;
  }

  async shutdown(): Promise<void> {
    this.shutdownCalls += 1;
    this.initialized = false;
  }

  async health(): Promise<ProviderHealth> {
    return this.buildHealth("online", 1, "ok");
  }

  registerTools(registry: ToolRegistry): void {
    registry.register(this.catalogTool("ping", "Ping tool"));
  }
}

describe("ProviderRegistry", () => {
  let providers: ProviderRegistry;
  let tools: ToolRegistry;

  beforeEach(() => {
    providers = new ProviderRegistry();
    tools = new ToolRegistry();
  });

  it("initializes providers and auto-registers tools", async () => {
    const fake = new FakeProvider();
    providers.register(fake);
    await providers.initializeAll({ rootDir: process.cwd() }, tools);

    expect(fake.initializeCalls).toBe(1);
    expect(tools.size).toBe(1);
    expect(tools.get("ping", "fake")).toBeTruthy();

    const health = await providers.healthAll();
    expect(health[0]?.status).toBe("online");

    await providers.shutdownAll();
    expect(fake.shutdownCalls).toBe(1);
  });
});
