#!/usr/bin/env node
import { HealthService } from "../src/services/health/HealthService.ts";

const health = new HealthService({ rootDir: process.cwd() });
const rows = await health.list();
const fw = await health.getFramework();

console.log("Marketing Brain Health");
console.log("======================");
console.log(`Generated: ${new Date().toISOString()}`);
console.log("");

for (const row of rows) {
  const mark = row.status === "online" ? "✓" : row.status === "offline" ? "✗" : "!";
  const details = row.details ?? "";
  console.log(`${mark} ${row.name.padEnd(14)} ${row.label.padEnd(22)} ${details}`);
}

console.log("");
console.log(
  `Framework registry: ${fw.providerRegistry.size} providers, ${fw.toolRegistry.size} tools`,
);

const failed = rows.some((r) => r.status === "offline");
await health.shutdown();
process.exit(failed ? 1 : 0);
