import { describe, expect, it, vi } from "vitest";
import { logToolExecution, withToolExecutionLogging } from "./tool-logging.js";

describe("tool execution logging", () => {
  it("writes to stderr", () => {
    const spy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    logToolExecution("▶ Tool start: demo", { ms: 1 });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("logs ok timing for successful handlers", async () => {
    const spy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
    const value = await withToolExecutionLogging("demo", async () => ({ ok: true }));
    expect(value).toEqual({ ok: true });
    expect(spy.mock.calls.some((c) => String(c[0]).includes("Tool ok"))).toBe(true);
    spy.mockRestore();
  });
});
