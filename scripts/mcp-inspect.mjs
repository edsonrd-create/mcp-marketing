#!/usr/bin/env node
/**
 * npm run inspect — launch MCP Inspector against a Marketing Brain STDIO server.
 * Does not change architecture; uses @modelcontextprotocol/inspector via npx when available.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./lib/shared.mjs";

const DEFAULT_ENTRY = "mcp-google-ads/dist/index.js";
const entryArg = process.argv[2] ?? DEFAULT_ENTRY;
const entryAbs = resolve(ROOT, entryArg);

const mockEnv = {
  ...process.env,
  MCP_STDIO_SAFE: "true",
  GOOGLE_ADS_CLIENT_ID: process.env.GOOGLE_ADS_CLIENT_ID ?? "dev-client-id",
  GOOGLE_ADS_CLIENT_SECRET: process.env.GOOGLE_ADS_CLIENT_SECRET ?? "dev-client-secret",
  GOOGLE_ADS_REFRESH_TOKEN: process.env.GOOGLE_ADS_REFRESH_TOKEN ?? "dev-refresh-token",
  GOOGLE_ADS_DEVELOPER_TOKEN: process.env.GOOGLE_ADS_DEVELOPER_TOKEN ?? "dev-developer-token",
  GOOGLE_ADS_CUSTOMER_ID: process.env.GOOGLE_ADS_CUSTOMER_ID ?? "1234567890",
  GOOGLE_ADS_SKIP_AUTH_VALIDATE: process.env.GOOGLE_ADS_SKIP_AUTH_VALIDATE ?? "true",
  GOOGLE_ADS_FORCE_MOCK: process.env.GOOGLE_ADS_FORCE_MOCK ?? "true",
  GOOGLE_ADS_LIVE_AUTH: process.env.GOOGLE_ADS_LIVE_AUTH ?? "0",
  META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN ?? "dev-meta-token",
  META_AD_ACCOUNT_ID: process.env.META_AD_ACCOUNT_ID ?? "act_dev",
  META_SKIP_AUTH_VALIDATE: process.env.META_SKIP_AUTH_VALIDATE ?? "true",
  META_FORCE_MOCK: process.env.META_FORCE_MOCK ?? "true",
  WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN ?? "dev-wa-token",
  WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID ?? "dev-phone",
  WHATSAPP_STUB: process.env.WHATSAPP_STUB ?? "true",
};

console.log("Marketing Brain — MCP Inspector launcher");
console.log("========================================");
console.log(`Root:   ${ROOT}`);
console.log(`Entry:  ${entryAbs}`);
console.log("");

if (!existsSync(entryAbs)) {
  console.error(`FAIL: entry not found: ${entryAbs}`);
  console.error(`Run: npm run build`);
  console.error(`Example entries:`);
  console.error(`  mcp-google-ads/dist/index.js`);
  console.error(`  mcp-meta-ads/dist/index.js`);
  console.error(`  mcp-whatsapp/dist/server.js`);
  process.exit(1);
}

console.log("Manual command (if launcher fails):");
console.log(`  npx @modelcontextprotocol/inspector node ${entryArg}`);
console.log(`  Working directory: ${ROOT}`);
console.log("");
console.log("See docs/MCP_INSPECTOR.md and CURSOR_SETUP.md");
console.log("");

const check = spawnSync("npx", ["--yes", "@modelcontextprotocol/inspector", "--help"], {
  cwd: ROOT,
  encoding: "utf8",
  env: mockEnv,
  timeout: 120_000,
});

if (check.error) {
  console.error("Não foi possível executar npx. Instale Node.js/npm e tente:");
  console.error(`  npx @modelcontextprotocol/inspector node ${entryArg}`);
  process.exit(1);
}

const child = spawn(
  "npx",
  ["--yes", "@modelcontextprotocol/inspector", "node", entryAbs],
  {
    cwd: ROOT,
    env: mockEnv,
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
