#!/usr/bin/env node
import { DoctorService } from "../src/services/doctor/DoctorService.ts";

const doctor = new DoctorService(process.cwd());
const report = await doctor.run(process.env);

console.log("Marketing Brain Doctor");
console.log("======================");

const marks = { ok: "✓", warn: "!", fail: "✗", info: "i" };

for (const finding of report.findings) {
  const mark = marks[finding.severity] ?? "?";
  console.log(`${mark} [${finding.area}] ${finding.message}`);
}

console.log(`\nDoctor finished with ${report.issues} issue(s).`);
process.exit(report.ok && report.issues === 0 ? 0 : report.ok ? 0 : 1);
