#!/usr/bin/env node
/**
 * Verifica se os entrypoints MCP existem após `npm run build`.
 * Ajuda a diagnosticar Args errados no Cursor (ex.: dist/index.js na raiz).
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./lib/shared.mjs";

const entries = [
  "mcp-google-ads/dist/index.js",
  "mcp-meta-ads/dist/index.js",
  "mcp-whatsapp/dist/server.js",
  "mcp-insights/dist/server.js",
  "mcp-ai-agent/dist/server.js",
  "mcp-workflows/dist/server.js",
];

const wrongRoot = [
  "dist/index.js",
  "dist/mcp/server.js",
  "dist/mcp/tools.js",
];

console.log("Marketing Brain — check MCP entries");
console.log(`Root: ${ROOT}`);
console.log("");

let ok = true;
for (const rel of entries) {
  const abs = join(ROOT, rel);
  const exists = existsSync(abs);
  console.log(`${exists ? "✓" : "✗"} ${rel}`);
  if (!exists) ok = false;
}

console.log("");
console.log("Paths que NÃO devem ser usados no Cursor (raiz do monorepo):");
for (const rel of wrongRoot) {
  const abs = join(ROOT, rel);
  const exists = existsSync(abs);
  console.log(
    exists
      ? `! ${rel} existe — ignore no MCP config (layout incorreto para este monorepo)`
      : `· ${rel} ausente (esperado)`,
  );
}

console.log("");
if (!ok) {
  console.error("FAIL: faltam entrypoints. Execute: npm run build");
  process.exit(1);
}

console.log("OK: 6 entrypoints MCP prontos.");
console.log("Cursor Args (exemplo Google Ads): mcp-google-ads\\\\dist\\\\index.js");
console.log("Working Directory: raiz do repo (ex.: E:\\\\marketing-brain)");
