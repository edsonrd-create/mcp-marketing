process.env.SKIP_DOTENV_FILE = "1";
process.env.GOOGLE_ADS_SKIP_AUTH_VALIDATE = "1";
process.env.META_SKIP_AUTH_VALIDATE = "true";

import { existsSync } from "node:fs";
import {
  EXPECTED_TOOLS,
  MCP_WORKSPACES,
  countToolsInSource,
  findToolSourceFile,
  getExpectedToolsCount,
} from "./lib/shared.mjs";

let failed = false;

function report(name, ok, detail) {
  const status = ok ? "PASS" : "FAIL";
  console.log(`${status} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) {
    failed = true;
  }
}

console.log("MCP Smoke Test (structure only, no live credentials)");
console.log("====================================================");

let totalFound = 0;

for (const ws of MCP_WORKSPACES) {
  const expected = EXPECTED_TOOLS[ws.name] ?? [];
  const sourceFile = findToolSourceFile(ws.dir);
  const distIndex = `${ws.dir}/dist/index.js`;
  const hasDist = existsSync(distIndex);

  if (!sourceFile) {
    report(ws.name, false, "no tool registration source found");
    continue;
  }

  const { count, names } = countToolsInSource(sourceFile);
  totalFound += count;
  const namesOk = expected.every((tool) => names.includes(tool));
  const countOk = count === expected.length;
  const ok = countOk && namesOk;

  report(
    ws.name,
    ok,
    `${count}/${expected.length} tools${hasDist ? ", dist built" : ", dist missing"}`,
  );
}

const expectedTotal = getExpectedToolsCount();
report("total tools", totalFound === expectedTotal, `${totalFound}/${expectedTotal}`);

if (failed) {
  process.exit(1);
}

console.log("\nSmoke test passed.");
