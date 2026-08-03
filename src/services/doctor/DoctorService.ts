import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { HealthService } from "../health/HealthService.js";

export type DoctorSeverity = "ok" | "warn" | "fail" | "info";

export interface DoctorFinding {
  severity: DoctorSeverity;
  area: string;
  message: string;
}

export interface DoctorReport {
  findings: DoctorFinding[];
  issues: number;
  ok: boolean;
}

/**
 * Programmatic doctor checks (Node, npm, .env, deps, providers, MCP, build).
 */
export class DoctorService {
  constructor(private readonly rootDir = process.cwd()) {}

  async run(env: NodeJS.ProcessEnv = process.env): Promise<DoctorReport> {
    const findings: DoctorFinding[] = [];

    const push = (severity: DoctorSeverity, area: string, message: string) => {
      findings.push({ severity, area, message });
    };

    const major = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
    if (major >= 22) {
      push("ok", "node", `Node ${process.version} (>=22)`);
    } else {
      push("fail", "node", `Node ${process.version} — requires >=22`);
    }

    try {
      const npmVersion = execSync("npm -v", { encoding: "utf8" }).trim();
      push("ok", "npm", `npm ${npmVersion}`);
    } catch {
      push("fail", "npm", "npm not available");
    }

    const versionPath = join(this.rootDir, "VERSION");
    if (existsSync(versionPath)) {
      push("ok", "version", `VERSION ${readFileSync(versionPath, "utf8").trim()}`);
    } else {
      push("fail", "version", "VERSION file missing");
    }

    if (existsSync(join(this.rootDir, ".env.example"))) {
      push("ok", "env", ".env.example present");
    } else {
      push("warn", "env", ".env.example missing");
    }

    if (existsSync(join(this.rootDir, ".env"))) {
      push("ok", "env", ".env present");
    } else {
      push("info", "env", ".env missing — optional for smoke, required for live");
    }

    if (existsSync(join(this.rootDir, "node_modules"))) {
      push("ok", "deps", "node_modules installed");
    } else {
      push("fail", "deps", "node_modules missing — run npm install");
    }

    const mcpDirs = [
      "mcp-google-ads",
      "mcp-meta-ads",
      "mcp-whatsapp",
      "mcp-insights",
      "mcp-ai-agent",
      "mcp-workflows",
    ];
    for (const dir of mcpDirs) {
      const distOk = existsSync(join(this.rootDir, dir, "dist"));
      if (distOk) {
        push("ok", "build", `${dir} dist ok`);
      } else {
        push("warn", "build", `${dir} dist missing — run npm run build`);
      }
    }

    const health = new HealthService({ rootDir: this.rootDir, env });
    try {
      const rows = await health.list();
      for (const row of rows) {
        if (row.status === "online") {
          push("ok", "provider", `${row.name}: ${row.label}`);
        } else if (row.status === "offline") {
          push("fail", "provider", `${row.name}: ${row.label}${row.details ? ` — ${row.details}` : ""}`);
        } else {
          push("warn", "provider", `${row.name}: ${row.label}${row.details ? ` — ${row.details}` : ""}`);
        }
      }
      await health.shutdown();
    } catch (error) {
      push(
        "fail",
        "mcp",
        `Health/bootstrap failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    const issues = findings.filter((f) => f.severity === "fail" || f.severity === "warn").length;
    return { findings, issues, ok: findings.every((f) => f.severity !== "fail") };
  }
}
