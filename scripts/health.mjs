#!/usr/bin/env node
import { FrameworkBootstrap } from "../src/core/server/Bootstrap.ts";

function label(status) {
  if (status === "online") return "Online";
  if (status === "offline") return "Offline";
  return "Configuração inválida";
}

const framework = await FrameworkBootstrap.create({
  rootDir: process.cwd(),
  prettyLogs: false,
  logLevel: "silent",
});
await framework.initialize();
const report = await framework.healthReport();

console.log("Marketing Brain Health");
console.log("======================");
console.log(`Version: ${report.version}`);
console.log(`Generated: ${report.generatedAt}`);
console.log("");

const rows = [
  ...report.providers.map((p) => ({
    name: p.name,
    status: p.status,
    details: p.details ?? "",
  })),
  {
    name: report.openai.name,
    status: report.openai.status,
    details: report.openai.details ?? "",
  },
  {
    name: report.mcpServer.name,
    status: report.mcpServer.status,
    details: report.mcpServer.details ?? "",
  },
];

for (const row of rows) {
  const mark =
    row.status === "online" ? "✓" : row.status === "offline" ? "✗" : "!";
  console.log(`${mark} ${row.name.padEnd(14)} ${label(row.status).padEnd(22)} ${row.details}`);
}

console.log("");
console.log(
  `Framework registry: ${framework.providerRegistry.size} providers, ${framework.toolRegistry.size} tools`,
);

const failed = rows.some((r) => r.status === "offline");
await framework.shutdown();
process.exit(failed ? 1 : 0);
