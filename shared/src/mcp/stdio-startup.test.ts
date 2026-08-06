import { describe, expect, it, vi } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  formatMcpServerHealth,
  getMcpRegistrationCounts,
  getMcpServerHealth,
  mcpStartupLog,
} from "./stdio-startup.js";

describe("mcp stdio startup helpers", () => {
  it("counts registered tools on McpServer", () => {
    const server = new McpServer({ name: "test", version: "1.0.0" });
    server.tool("alpha", "demo", async () => ({ content: [{ type: "text", text: "ok" }] }));
    server.tool("beta", "demo", async () => ({ content: [{ type: "text", text: "ok" }] }));

    const counts = getMcpRegistrationCounts(server);
    expect(counts.tools).toBe(2);
    expect(counts.prompts).toBe(0);
    expect(counts.resources).toBe(0);

    const health = getMcpServerHealth("test", "1.0.0", server);
    expect(health.name).toBe("test");
    expect(health.tools).toBe(2);
    expect(formatMcpServerHealth(health)).toContain("Tools: 2");
  });

  it("writes startup lines to stderr", () => {
    const spy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    mcpStartupLog("hello");
    expect(spy).toHaveBeenCalledWith("hello\n");
    spy.mockRestore();
  });
});
