#!/usr/bin/env node
/**
 * Marketing Brain Doctor — local diagnostics without starting MCP STDIO.
 * Validates Node, TypeScript, dependencies, .env, Google Ads / OpenAI env,
 * MCP SDK presence, and provider readiness (in-process, no client connect).
 */
import { config as loadDotenv } from "dotenv";
import { DoctorService } from "../src/services/doctor/DoctorService.ts";

// Load local .env so doctor sees Google Ads / OpenAI / Meta / WhatsApp keys.
// Secrets stay in process env only — never commit .env.
if (process.env.SKIP_DOTENV_FILE !== "true") {
  loadDotenv({ path: ".env" });
}

const doctor = new DoctorService(process.cwd());
const report = await doctor.run(process.env);

console.log("Marketing Brain Doctor");
console.log("======================");
console.log("(sem conectar a um cliente MCP / sem StdioServerTransport)\n");

const marks = { ok: "✓", warn: "!", fail: "✗", info: "i" };

for (const finding of report.findings) {
  const mark = marks[finding.severity] ?? "?";
  console.log(`${mark} [${finding.area}] ${finding.message}`);
}

console.log(`\nDoctor finished with ${report.issues} issue(s).`);
process.exit(report.ok && report.issues === 0 ? 0 : report.ok ? 0 : 1);
