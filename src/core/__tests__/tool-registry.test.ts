import { describe, expect, it, beforeEach } from "vitest";
import { z } from "zod";
import { ToolRegistry } from "../server/ToolRegistry.js";
import { FrameworkError } from "../errors/index.js";

describe("ToolRegistry", () => {
  let registry: ToolRegistry;

  beforeEach(() => {
    registry = new ToolRegistry();
  });

  it("registers tools per provider", () => {
    registry.register({
      name: "list_campaigns",
      providerId: "google-ads",
      description: "List campaigns",
      inputSchema: z.object({}),
      execute: async () => ({ ok: true }),
    });
    registry.register({
      name: "list_campaigns",
      providerId: "meta-ads",
      description: "List meta campaigns",
      inputSchema: z.object({}),
      execute: async () => ({ ok: true }),
    });

    expect(registry.size).toBe(2);
    expect(registry.get("list_campaigns", "google-ads")?.providerId).toBe("google-ads");
    expect(registry.list("meta-ads")).toHaveLength(1);
  });

  it("rejects duplicate provider+tool", () => {
    const tool = {
      name: "update_budget",
      providerId: "google-ads",
      description: "Update budget",
      inputSchema: z.object({}),
      execute: async () => ({}),
    };
    registry.register(tool);
    expect(() => registry.register(tool)).toThrow(FrameworkError);
  });
});
