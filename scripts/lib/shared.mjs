import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const ROOT = join(__dirname, "..", "..");

export const VERSION_FILE = join(ROOT, "VERSION");
export const MIN_NODE_MAJOR = 22;

export const MCP_WORKSPACES = [
  { dir: "mcp-google-ads", name: "@mcp-marketing/google-ads", expectedTools: 10 },
  { dir: "mcp-meta-ads", name: "@mcp-marketing/meta-ads", expectedTools: 8 },
  { dir: "mcp-whatsapp", name: "@mcp-marketing/whatsapp", expectedTools: 6 },
  { dir: "mcp-insights", name: "@mcp-marketing/insights", expectedTools: 8 },
  { dir: "mcp-ai-agent", name: "@mcp-marketing/ai-agent", expectedTools: 7 },
  { dir: "mcp-workflows", name: "@mcp-marketing/workflows", expectedTools: 13 },
];

export const ALL_WORKSPACES = [
  { dir: "shared", name: "@mcp-marketing/shared" },
  ...MCP_WORKSPACES,
  { dir: "packages/cli", name: "@mcp-marketing/cli" },
  { dir: "packages/create-marketing-brain", name: "@mcp-marketing/create-marketing-brain" },
];

export const EXPECTED_TOOLS = {
  "@mcp-marketing/google-ads": [
    "list_campaigns",
    "get_campaign",
    "create_campaign",
    "pause_campaign",
    "enable_campaign",
    "update_budget",
    "search_keywords",
    "generate_ads",
    "campaign_report",
    "negative_keywords",
  ],
  "@mcp-marketing/meta-ads": [
    "list_campaigns",
    "create_campaign",
    "pause_campaign",
    "resume_campaign",
    "update_budget",
    "create_audience",
    "create_ad",
    "get_metrics",
  ],
  "@mcp-marketing/whatsapp": [
    "send_birthday_message",
    "send_coupon",
    "send_campaign",
    "send_template",
    "schedule_message",
    "order_confirmation",
  ],
  "@mcp-marketing/insights": [
    "analyze_insights",
    "get_health_scores",
    "list_recommendations",
    "get_executive_dashboard",
    "list_timeline_events",
    "record_timeline_event",
    "get_health_center",
    "generate_report",
  ],
  "@mcp-marketing/ai-agent": [
    "chat",
    "list_pending_approvals",
    "confirm_action",
    "cancel_action",
    "get_agent_history",
    "get_ai_summary",
    "list_audit_logs",
  ],
  "@mcp-marketing/workflows": [
    "list_workflows",
    "create_workflow",
    "update_workflow",
    "duplicate_workflow",
    "pause_workflow",
    "delete_workflow",
    "run_workflow",
    "run_due_workflows",
    "recover_workflow_execution",
    "list_workflow_templates",
    "create_workflow_from_template",
    "list_workflow_executions",
    "list_workflow_audit_logs",
  ],
};

export const START_COMMANDS = [
  { key: "google", script: "start:google", label: "Google Ads MCP" },
  { key: "meta", script: "start:meta", label: "Meta Ads MCP" },
  { key: "whatsapp", script: "start:whatsapp", label: "WhatsApp MCP" },
  { key: "insights", script: "start:insights", label: "Insights MCP" },
  { key: "ai-agent", script: "start:ai-agent", label: "AI Agent MCP" },
  { key: "workflows", script: "start:workflows", label: "Workflows MCP" },
];

export function readVersion() {
  if (!existsSync(VERSION_FILE)) {
    throw new Error(`VERSION file not found at ${VERSION_FILE}`);
  }
  return readFileSync(VERSION_FILE, "utf8").trim();
}

export function getGitCommit() {
  try {
    return execSync("git rev-parse HEAD", { cwd: ROOT, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

export function getNpmVersion() {
  try {
    return execSync("npm -v", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

export function getWorkspacePackageNames() {
  return ALL_WORKSPACES.map((ws) => ws.name);
}

export function getExpectedToolsCount() {
  return Object.values(EXPECTED_TOOLS).reduce((sum, tools) => sum + tools.length, 0);
}

export function workspacePackageJsonPath(dir) {
  return join(ROOT, dir, "package.json");
}

export function workspaceExists(dir) {
  return existsSync(workspacePackageJsonPath(dir));
}

export function readWorkspacePackage(dir) {
  const pkgPath = workspacePackageJsonPath(dir);
  if (!existsSync(pkgPath)) {
    return null;
  }
  return JSON.parse(readFileSync(pkgPath, "utf8"));
}

export function checkNodeVersion() {
  const major = Number.parseInt(process.versions.node.split(".")[0], 10);
  return {
    ok: major >= MIN_NODE_MAJOR,
    current: process.version,
    required: `>=${MIN_NODE_MAJOR}`,
  };
}

export function countTestFiles(dir = ROOT) {
  let count = 0;
  const skip = new Set(["node_modules", ".git", "dist", "dist-release"]);

  function walk(current) {
    let entries;
    try {
      entries = readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (skip.has(entry.name)) {
        continue;
      }
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".test.ts")) {
        count += 1;
      }
    }
  }

  walk(dir);
  return count;
}

export function findToolSourceFile(workspaceDir) {
  const candidates = [
    join(ROOT, workspaceDir, "src", "tools", "index.ts"),
    join(ROOT, workspaceDir, "dist", "tools", "index.js"),
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

export function countToolsInSource(filePath) {
  const content = readFileSync(filePath, "utf8");
  const registerMatches = content.match(/registerTool\(\s*\n?\s*server,\s*\n?\s*"([^"]+)"/g) ?? [];
  const serverToolMatches = content.match(/server\.tool\(\s*\n?\s*"([^"]+)"/g) ?? [];
  const names = new Set();

  for (const match of [...registerMatches, ...serverToolMatches]) {
    const nameMatch = match.match(/"([^"]+)"/);
    if (nameMatch) {
      names.add(nameMatch[1]);
    }
  }

  return { count: names.size, names: [...names] };
}

export function buildWorkspaceStatus() {
  return ALL_WORKSPACES.map((ws) => {
    const pkg = readWorkspacePackage(ws.dir);
    const exists = Boolean(pkg);
    const distExists = existsSync(join(ROOT, ws.dir, "dist"));
    return {
      dir: ws.dir,
      name: ws.name,
      exists,
      version: pkg?.version ?? null,
      dist: distExists,
      expectedTools: ws.expectedTools ?? null,
    };
  });
}

export function formatPlatform() {
  return `${process.platform}-${process.arch}`;
}

export function rel(path) {
  return relative(ROOT, path) || ".";
}
