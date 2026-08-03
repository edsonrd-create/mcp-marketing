#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import {
  ALL_WORKSPACES,
  ROOT,
  VERSION_FILE,
  buildWorkspaceStatus,
  checkNodeVersion,
  formatPlatform,
  readVersion,
} from "./lib/shared.mjs";
import { FrameworkBootstrap } from "../src/core/server/Bootstrap.ts";

let issues = 0;

function ok(msg) {
  console.log(`✓ ${msg}`);
}

function warn(msg) {
  console.warn(`! ${msg}`);
  issues += 1;
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  issues += 1;
}

function info(msg) {
  console.log(`i ${msg}`);
}

console.log("Marketing Brain Doctor");
console.log("======================");

const nodeCheck = checkNodeVersion();
if (nodeCheck.ok) {
  ok(`Node ${nodeCheck.current} (${nodeCheck.required})`);
} else {
  fail(`Node ${nodeCheck.current} — requires ${nodeCheck.required}`);
}

try {
  const npmVersion = execSync("npm -v", { encoding: "utf8" }).trim();
  ok(`npm ${npmVersion}`);
} catch {
  fail("npm not available");
}

console.log(`Platform: ${formatPlatform()}`);
console.log(`Root: ${ROOT}`);

if (existsSync(VERSION_FILE)) {
  try {
    ok(`VERSION: ${readVersion()}`);
  } catch (error) {
    fail(error.message);
  }
} else {
  fail(`VERSION file missing at ${VERSION_FILE}`);
}

const envExample = `${ROOT}/.env.example`;
if (existsSync(envExample)) {
  ok(".env.example present");
} else {
  warn(".env.example missing — copy before live validation");
}

const envFile = `${ROOT}/.env`;
if (existsSync(envFile)) {
  ok(".env present");
  try {
    const content = readFileSync(envFile, "utf8");
    if (!content.trim()) {
      warn(".env is empty");
    }
  } catch {
    warn("Unable to read .env");
  }
} else {
  info(".env missing — required for live API validation (optional for smoke)");
}

console.log("\nDependencies:");
if (existsSync(`${ROOT}/node_modules`)) {
  ok("node_modules installed");
} else {
  fail("node_modules missing — run npm install");
}
if (existsSync(`${ROOT}/package-lock.json`)) {
  ok("package-lock.json present");
} else {
  warn("package-lock.json missing");
}

console.log("\nWorkspaces / Build:");
for (const ws of buildWorkspaceStatus()) {
  if (!ws.exists) {
    fail(`${ws.name} — package.json missing`);
    continue;
  }
  if (ws.dist) {
    ok(`${ws.name} v${ws.version} — dist ok`);
  } else if (ws.expectedTools) {
    warn(`${ws.name} v${ws.version} — dist missing (run npm run build)`);
  } else {
    info(`${ws.name} v${ws.version} — no dist required`);
  }
}

for (const ws of ALL_WORKSPACES) {
  if (!existsSync(`${ROOT}/${ws.dir}`)) {
    fail(`directory missing: ${ws.dir}`);
  }
}

if (existsSync(`${ROOT}/dist-app`)) {
  ok("dist-app present (app shell build)");
} else {
  info("dist-app missing — run npm run build:app for production start");
}

console.log("\nProviders / MCP Framework:");
try {
  const framework = await FrameworkBootstrap.create({
    rootDir: ROOT,
    prettyLogs: false,
    logLevel: "silent",
  });
  await framework.initialize();
  const report = await framework.healthReport();

  for (const provider of report.providers) {
    const line = `${provider.name}: ${provider.status} (${provider.tools} tools)`;
    if (provider.status === "online") {
      ok(line);
    } else if (provider.status === "offline") {
      fail(line + (provider.details ? ` — ${provider.details}` : ""));
    } else {
      warn(line + (provider.details ? ` — ${provider.details}` : ""));
    }
  }

  if (report.openai.status === "online") {
    ok(`OpenAI: ${report.openai.status}`);
  } else {
    warn(`OpenAI: ${report.openai.status}${report.openai.details ? ` — ${report.openai.details}` : ""}`);
  }

  if (report.mcpServer.status === "online") {
    ok(`MCP Server: ${report.mcpServer.status} — ${report.mcpServer.details}`);
  } else {
    fail(`MCP Server: ${report.mcpServer.status} — ${report.mcpServer.details}`);
  }

  ok(`Tool registry: ${framework.toolRegistry.size} tools across ${framework.providerRegistry.size} providers`);
  await framework.shutdown();
} catch (error) {
  fail(`Framework bootstrap failed: ${error instanceof Error ? error.message : String(error)}`);
}

console.log(`\nDoctor finished with ${issues} issue(s).`);
process.exit(issues > 0 ? 1 : 0);
