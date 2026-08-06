#!/usr/bin/env node
/**
 * MCP Client validation — handshake, listTools, execute one smoke tool per server.
 * Writes evidence used by MCP_CONNECTION_REPORT / CLIENT_COMPATIBILITY_REPORT.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getExpectedToolsCount, readVersion, ROOT } from "./lib/shared.mjs";
import {
  buildSmokeEnv,
  listMcpServerTargets,
  summarizeToolResult,
  withMcpClient,
} from "./lib/mcp-client.mjs";

const version = readVersion();
const env = buildSmokeEnv({ MCP_STDIO_SAFE: "true" });

/** First safe smoke call per package */
const SMOKE_CALL = {
  "@mcp-marketing/google-ads": { name: "list_campaigns", arguments: {} },
  "@mcp-marketing/meta-ads": { name: "list_campaigns", arguments: {} },
  "@mcp-marketing/whatsapp": {
    name: "list_templates",
    arguments: {},
  },
  "@mcp-marketing/insights": {
    name: "get_executive_dashboard",
    arguments: {},
  },
  "@mcp-marketing/ai-agent": {
    name: "get_ai_summary",
    arguments: {},
  },
  "@mcp-marketing/workflows": {
    name: "list_workflows",
    arguments: {},
  },
};

const rows = [];
let okServers = 0;
let totalTools = 0;

console.log("MCP Client Validation (stdio)");
console.log("=============================");

for (const target of listMcpServerTargets()) {
  const smoke = SMOKE_CALL[target.name];
  const outcome = await withMcpClient(
    target,
    async (client) => {
      const initOk = true; // connect() already completed handshake
      const listed = await client.listTools();
      const tools = listed.tools ?? [];
      let call = null;
      if (smoke) {
        const started = performance.now();
        const result = await client.callTool({
          name: smoke.name,
          arguments: smoke.arguments,
        });
        call = {
          name: smoke.name,
          ms: Math.round(performance.now() - started),
          summary: summarizeToolResult(result),
          isError: Boolean(result?.isError),
        };
      }
      return { initOk, tools, call };
    },
    env,
  );

  if (!outcome.ok || !outcome.result) {
    console.log(`FAIL ${target.name} — ${outcome.error}`);
    rows.push({
      server: target.name,
      ok: false,
      error: outcome.error,
      tools: 0,
      handshake: false,
      toolCall: null,
      ms: outcome.ms,
    });
    continue;
  }

  const { tools, call, initOk } = outcome.result;
  totalTools += tools.length;
  const callOk = Boolean(call) && !call.isError;
  const serverOk = initOk && tools.length > 0 && callOk;
  if (serverOk) okServers += 1;

  console.log(
    `${serverOk ? "PASS" : "FAIL"} ${target.name} — handshake ok, tools ${tools.length}, call ${call?.name} ${callOk ? "ok" : "fail"} (${call?.ms ?? "-"}ms)`,
  );

  rows.push({
    server: target.name,
    ok: serverOk,
    error: null,
    tools: tools.length,
    toolNames: tools.map((t) => t.name),
    handshake: true,
    toolCall: call,
    ms: outcome.ms,
  });
}

const report = {
  version,
  generatedAt: new Date().toISOString(),
  transport: "stdio",
  expectedTools: getExpectedToolsCount(),
  discoveredTools: totalTools,
  serversOk: okServers,
  serversTotal: listMcpServerTargets().length,
  rows,
};

const outJson = join(ROOT, "MCP_CLIENT_VALIDATION.json");
writeFileSync(outJson, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`\nWrote ${outJson}`);
console.log(
  `Result: ${okServers}/${report.serversTotal} servers, ${totalTools}/${report.expectedTools} tools`,
);

if (okServers !== report.serversTotal || totalTools !== report.expectedTools) {
  process.exitCode = 1;
}
