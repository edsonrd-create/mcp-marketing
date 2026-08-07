import { describe, expect, it, vi } from "vitest";
import { AnthropicService } from "./AnthropicService.js";
import type { ConfigService } from "../../config/ConfigService.js";
import type { Logger } from "../../logger/index.js";
import { ExternalApiError } from "@mcp-marketing/shared";

function createMockLogger(): Logger {
  return {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    trace: vi.fn(),
    fatal: vi.fn(),
    child: vi.fn().mockImplementation(() => createMockLogger()),
  } as unknown as Logger;
}

function createMockConfig(hasAnthropic: boolean, apiKey?: string, model = "claude-3-5-sonnet-20241022"): ConfigService {
  return {
    hasAnthropic: () => hasAnthropic,
    env: {
      ANTHROPIC_API_KEY: apiKey,
      ANTHROPIC_MODEL: model,
    },
  } as unknown as ConfigService;
}

describe("AnthropicService", () => {
  it("returns degraded status when ANTHROPIC_API_KEY is not configured", () => {
    const config = createMockConfig(false);
    const logger = createMockLogger();
    const service = new AnthropicService({ config, logger });

    expect(service.isConfigured()).toBe(false);
    expect(service.status()).toEqual({
      name: "anthropic",
      status: "degraded",
      details: "ANTHROPIC_API_KEY missing",
    });
  });

  it("throws ExternalApiError when getClient is called without key", () => {
    const config = createMockConfig(false);
    const logger = createMockLogger();
    const service = new AnthropicService({ config, logger });

    expect(() => service.getClient()).toThrow(ExternalApiError);
  });

  it("returns ok status and initializes client when key is configured", () => {
    const config = createMockConfig(true, "sk-ant-test-key-12345");
    const logger = createMockLogger();
    const service = new AnthropicService({ config, logger });

    expect(service.isConfigured()).toBe(true);
    expect(service.status()).toEqual({
      name: "anthropic",
      status: "ok",
      details: "model=claude-3-5-sonnet-20241022",
    });

    const client = service.getClient();
    expect(client).toBeDefined();
    // Subsequent getClient calls return cached client
    expect(service.getClient()).toBe(client);
  });

  it("handles ping correctly depending on configuration", async () => {
    const unconfigured = new AnthropicService({
      config: createMockConfig(false),
      logger: createMockLogger(),
    });
    await expect(unconfigured.ping()).resolves.toEqual({ ok: false });

    const configured = new AnthropicService({
      config: createMockConfig(true, "sk-ant-test-key-12345"),
      logger: createMockLogger(),
    });
    await expect(configured.ping()).resolves.toEqual({ ok: true });
  });
});
