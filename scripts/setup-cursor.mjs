#!/usr/bin/env node
/**
 * setup:cursor — copia .cursor/mcp.json.example → .cursor/mcp.json
 * Compatível com Windows (cmd / PowerShell).
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const example = join(root, ".cursor", "mcp.json.example");
const targetDir = join(root, ".cursor");
const target = join(targetDir, "mcp.json");

if (!existsSync(example)) {
  console.error("FAIL: .cursor/mcp.json.example não encontrado.");
  console.error(`Root esperado: ${root}`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(example, target);
console.log(`Wrote ${target}`);
console.log("No Cursor: Settings → MCP → Refresh");
console.log("Working Directory = raiz do repo (ex.: E:\\marketing-brain)");
console.log("Args Google Ads = mcp-google-ads\\dist\\index.js");
