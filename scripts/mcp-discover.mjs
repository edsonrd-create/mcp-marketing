#!/usr/bin/env node
/**
 * MCP Autodiscovery — list tools/prompts/resources + input schemas via stdio client.
 * Writes MCP_DISCOVERY_REPORT.md (and prints summary).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  EXPECTED_TOOLS,
  getExpectedToolsCount,
  readVersion,
  ROOT,
} from "./lib/shared.mjs";
import { buildSmokeEnv, listMcpServerTargets, withMcpClient } from "./lib/mcp-client.mjs";

const version = readVersion();
const env = buildSmokeEnv({ MCP_STDIO_SAFE: "true" });

/** @param {unknown} schema */
function summarizeSchema(schema) {
  if (!schema || typeof schema !== "object") {
    return { type: "unknown" };
  }
  const s = /** @type {Record<string, unknown>} */ (schema);
  if (s.type || s.properties || s.$schema) {
    return s;
  }
  return s;
}

function categoryForPackage(pkgName) {
  const map = {
    "@mcp-marketing/google-ads": "Google Ads",
    "@mcp-marketing/meta-ads": "Meta Ads",
    "@mcp-marketing/whatsapp": "WhatsApp Business",
    "@mcp-marketing/insights": "Insights / Analytics",
    "@mcp-marketing/ai-agent": "AI Agent",
    "@mcp-marketing/workflows": "Workflows",
  };
  return map[pkgName] ?? pkgName;
}

const lines = [];
lines.push(`# MCP Discovery Report`);
lines.push("");
lines.push(`**Product:** Marketing Brain MCP v${version}`);
lines.push(`**Generated:** ${new Date().toISOString()}`);
lines.push(`**Transport:** StdioServerTransport`);
lines.push(`**Expected tools:** ${getExpectedToolsCount()}`);
lines.push("");

/** @type {Array<{pkg: string, tool: string, category: string, description?: string, inputSchema: unknown, outputSchema: string}>} */
const catalog = [];
let totalTools = 0;
let totalPrompts = 0;
let totalResources = 0;
let failures = 0;

for (const target of listMcpServerTargets()) {
  console.log(`Discovering ${target.name}...`);
  const outcome = await withMcpClient(
    target,
    async (client) => {
      const toolsRes = await client.listTools();
      let prompts = [];
      let resources = [];
      try {
        const p = await client.listPrompts();
        prompts = p.prompts ?? [];
      } catch {
        prompts = [];
      }
      try {
        const r = await client.listResources();
        resources = r.resources ?? [];
      } catch {
        resources = [];
      }
      return {
        tools: toolsRes.tools ?? [],
        prompts,
        resources,
        serverVersion: undefined,
      };
    },
    env,
  );

  lines.push(`## ${target.name}`);
  lines.push("");

  if (!outcome.ok || !outcome.result) {
    failures += 1;
    lines.push(`**Status:** FAIL — ${outcome.error ?? "unknown"}`);
    lines.push("");
    console.log(`  FAIL ${outcome.error}`);
    continue;
  }

  const { tools, prompts, resources } = outcome.result;
  totalTools += tools.length;
  totalPrompts += prompts.length;
  totalResources += resources.length;

  const expected = EXPECTED_TOOLS[target.name] ?? [];
  const listed = tools.map((t) => t.name);
  const missing = expected.filter((n) => !listed.includes(n));
  const extra = listed.filter((n) => !expected.includes(n));

  lines.push(`**Status:** PASS (${outcome.ms}ms)`);
  lines.push(`**Tools:** ${tools.length} (expected ${expected.length})`);
  lines.push(`**Prompts:** ${prompts.length}`);
  lines.push(`**Resources:** ${resources.length}`);
  if (missing.length) lines.push(`**Missing vs inventory:** ${missing.join(", ")}`);
  if (extra.length) lines.push(`**Extra vs inventory:** ${extra.join(", ")}`);
  lines.push("");

  lines.push(`| Tool | Category | Description | Input schema | Output schema |`);
  lines.push(`|------|----------|-------------|--------------|---------------|`);

  for (const tool of tools) {
    const category = categoryForPackage(target.name);
    const input = summarizeSchema(tool.inputSchema);
    const inputJson = JSON.stringify(input);
    const inputShort =
      inputJson.length > 120 ? `${inputJson.slice(0, 117)}...` : inputJson;
    // MCP tools in this product return structured JSON text; no formal outputSchema registered.
    const outputSchema = "structured JSON text (`structuredContent` / `content[].text`)";
    lines.push(
      `| \`${tool.name}\` | ${category} | ${(tool.description ?? "").replace(/\|/g, "/")} | \`${inputShort.replace(/\|/g, "/").replace(/`/g, "'")}\` | ${outputSchema} |`,
    );
    catalog.push({
      pkg: target.name,
      tool: tool.name,
      category,
      description: tool.description,
      inputSchema: input,
      outputSchema,
    });
  }
  lines.push("");

  if (prompts.length) {
    lines.push(`### Prompts`);
    for (const p of prompts) {
      lines.push(`- \`${p.name}\`${p.description ? ` — ${p.description}` : ""}`);
    }
    lines.push("");
  } else {
    lines.push(`_Nenhum Prompt registado neste servidor._`);
    lines.push("");
  }

  if (resources.length) {
    lines.push(`### Resources`);
    for (const r of resources) {
      lines.push(`- \`${r.uri}\` (${r.name ?? "unnamed"})`);
    }
    lines.push("");
  } else {
    lines.push(`_Nenhum Resource registado neste servidor._`);
    lines.push("");
  }

  console.log(
    `  PASS tools=${tools.length} prompts=${prompts.length} resources=${resources.length}`,
  );
}

lines.push(`## Totals`);
lines.push("");
lines.push(`| Metric | Count |`);
lines.push(`|--------|------:|`);
lines.push(`| Tools discovered | ${totalTools} |`);
lines.push(`| Prompts | ${totalPrompts} |`);
lines.push(`| Resources | ${totalResources} |`);
lines.push(`| Server failures | ${failures} |`);
lines.push("");
lines.push(`## Catalog JSON`);
lines.push("");
lines.push("```json");
lines.push(JSON.stringify(catalog, null, 2));
lines.push("```");
lines.push("");

const outPath = join(ROOT, "MCP_DISCOVERY_REPORT.md");
writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8");
console.log(`\nWrote ${outPath}`);
console.log(`Discovered ${totalTools} tools / ${totalPrompts} prompts / ${totalResources} resources`);

if (failures > 0 || totalTools !== getExpectedToolsCount()) {
  process.exitCode = 1;
}
