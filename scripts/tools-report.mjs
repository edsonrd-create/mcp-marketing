#!/usr/bin/env node
/**
 * TOOLS_REPORT.md — inventory of all MCP tools exposed via stdio clients.
 * Does not change tools; only discovers what startServer/register* already registers.
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

function providerForPackage(pkgName) {
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

/** @type {Array<{name: string, description: string, inputSchema: unknown, outputSchema: string, provider: string, package: string}>} */
const rows = [];
let failures = 0;

for (const target of listMcpServerTargets()) {
  console.log(`Inspecting tools: ${target.name}`);
  const outcome = await withMcpClient(
    target,
    async (client) => {
      const toolsRes = await client.listTools();
      return toolsRes.tools ?? [];
    },
    env,
  );

  if (!outcome.ok || !outcome.result) {
    failures += 1;
    console.log(`  FAIL ${outcome.error}`);
    continue;
  }

  const expected = EXPECTED_TOOLS[target.name] ?? [];
  const listed = outcome.result.map((t) => t.name);
  const missing = expected.filter((n) => !listed.includes(n));
  if (missing.length) {
    failures += 1;
    console.log(`  MISSING registered tools: ${missing.join(", ")}`);
  }

  for (const tool of outcome.result) {
    rows.push({
      name: tool.name,
      description: tool.description ?? "",
      inputSchema: tool.inputSchema ?? {},
      outputSchema: "structured JSON text (MCP CallToolResult content / structuredContent)",
      provider: providerForPackage(target.name),
      package: target.name,
    });
  }
  console.log(`  PASS ${outcome.result.length} tools`);
}

const lines = [];
lines.push(`# TOOLS_REPORT.md`);
lines.push("");
lines.push(`**Product:** Marketing Brain MCP v${version}`);
lines.push(`**Generated:** ${new Date().toISOString()}`);
lines.push(`**Transport:** StdioServerTransport`);
lines.push(`**Total tools:** ${rows.length} (expected ${getExpectedToolsCount()})`);
lines.push("");
lines.push(`> Layout note: this monorepo exposes **6 STDIO servers** under \`mcp-*/dist/\`.`);
lines.push(`> There is **no** root \`dist/index.js\` or \`dist/mcp/tools.js\` in this repository.`);
lines.push("");
lines.push(`| Nome | Descrição | Input Schema | Output Schema | Provider |`);
lines.push(`|------|-----------|--------------|---------------|----------|`);

for (const row of rows) {
  const inputJson = JSON.stringify(row.inputSchema);
  const inputShort = inputJson.length > 100 ? `${inputJson.slice(0, 97)}...` : inputJson;
  const desc = row.description.replace(/\|/g, "/").replace(/\n/g, " ");
  lines.push(
    `| \`${row.name}\` | ${desc} | \`${inputShort.replace(/\|/g, "/").replace(/`/g, "'")}\` | ${row.outputSchema} | ${row.provider} |`,
  );
}

lines.push("");
lines.push(`## Detalhe por tool`);
lines.push("");

for (const row of rows) {
  lines.push(`### \`${row.name}\``);
  lines.push("");
  lines.push(`- **Provider:** ${row.provider} (\`${row.package}\`)`);
  lines.push(`- **Descrição:** ${row.description || "_sem descrição_"}`);
  lines.push(`- **Output Schema:** ${row.outputSchema}`);
  lines.push(`- **Input Schema:**`);
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(row.inputSchema, null, 2));
  lines.push("```");
  lines.push("");
}

lines.push(`## Registo no start`);
lines.push("");
lines.push(`Todas as tools listadas acima foram descobertas via cliente MCP stdio após o arranque de cada servidor`);
lines.push(`(\`create*Server\` / \`register*Tools\` → \`connectStdioMcpServer\`).`);
lines.push(`Contagem esperada vs descoberta: **${getExpectedToolsCount()} / ${rows.length}**.`);
lines.push("");

const outPath = join(ROOT, "TOOLS_REPORT.md");
writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8");
console.log(`\nWrote ${outPath}`);
console.log(`Tools: ${rows.length}/${getExpectedToolsCount()}`);

if (failures > 0 || rows.length !== getExpectedToolsCount()) {
  process.exitCode = 1;
}
