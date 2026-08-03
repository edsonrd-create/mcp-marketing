import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { EXPECTED_TOOLS, getExpectedToolsCount, readVersion, ROOT } from "./lib/shared.mjs";

const version = readVersion();
const lines = [
  "# MCP Tools Report",
  "",
  `Marketing Brain v${version} LTS — ${getExpectedToolsCount()} MCP tools`,
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
];

for (const [pkg, tools] of Object.entries(EXPECTED_TOOLS)) {
  lines.push(`## ${pkg} (${tools.length})`);
  lines.push("");
  for (const tool of tools) {
    lines.push(`- \`${tool}\``);
  }
  lines.push("");
}

const outputPath = join(ROOT, "MCP_TOOLS_REPORT.md");
writeFileSync(outputPath, `${lines.join("\n")}\n`);
console.log(`Wrote ${outputPath}`);
