import { describe, expect, it } from "vitest";
import { withRetry } from "./retry.js";

describe("withRetry", () => {
  it("returns on first success", async () => {
    let calls = 0;
    const result = await withRetry("op", async () => {
      calls += 1;
      return 42;
    });
    expect(result).toBe(42);
    expect(calls).toBe(1);
  });

  it("retries transient failures", async () => {
    let calls = 0;
    const result = await withRetry(
      "op",
      async () => {
        calls += 1;
        if (calls < 3) {
          throw new Error("timeout");
        }
        return "ok";
      },
      { retries: 3, minDelayMs: 1, maxDelayMs: 2 },
    );
    expect(result).toBe("ok");
    expect(calls).toBe(3);
  });
});
