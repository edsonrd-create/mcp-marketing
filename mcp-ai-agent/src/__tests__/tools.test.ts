import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TOOLS_INDEX = join(import.meta.dirname, "..", "tools", "index.ts");

describe("AI agent MCP tools", () => {
  it("registers 14 tools including phase 5 additions", () => {
    const source = readFileSync(TOOLS_INDEX, "utf8");
    const matches = source.match(/registerTool\(\s*\n?\s*server,\s*\n?\s*"([^"]+)"/g) ?? [];
    const names = matches
      .map((m) => m.match(/"([^"]+)"/)?.[1])
      .filter((name): name is string => Boolean(name));

    expect(names).toHaveLength(14);
    expect(names).toContain("analyze_campaigns");
    expect(names).toContain("optimize_budget");
    expect(names).toContain("generate_report");
    expect(names).toContain("analyze_customers");
    expect(names).toContain("suggest_actions");
    expect(names).toContain("summarize_account");
    expect(names).toContain("marketing_chat");
    expect(names).toContain("chat");
  });
});
