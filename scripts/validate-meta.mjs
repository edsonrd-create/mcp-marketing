#!/usr/bin/env node
import {
  createMetaAdsModule,
  META_ADS_TOOL_NAMES,
} from "../src/providers/meta-ads/index.ts";

process.env.SKIP_DOTENV_FILE = "true";
process.env.META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "validate-meta-token";
process.env.META_AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID || "act_validate";
process.env.META_SKIP_AUTH_VALIDATE = "true";
process.env.META_FORCE_MOCK = "true";

console.log("Meta Ads provider validation");
console.log("============================");

const module = await createMetaAdsModule();
let failed = false;

function pass(msg) {
  console.log(`PASS: ${msg}`);
}
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed = true;
}

if (META_ADS_TOOL_NAMES.length !== 14) {
  fail(`tool catalog: ${META_ADS_TOOL_NAMES.length}`);
} else {
  pass(`tool catalog: ${META_ADS_TOOL_NAMES.length}`);
}

pass(
  `auth initialized (adAccountId=${module.provider.getAdAccountId()}, live=${module.provider.isLiveMode()})`,
);

const checks = [
  ["list_accounts", () => module.provider.listAccounts()],
  ["list_campaigns", () => module.provider.listCampaigns()],
  ["get_campaign", () => module.provider.getCampaign("2001")],
  [
    "create_campaign",
    () =>
      module.provider.createCampaign({
        name: "Validate Meta",
        objective: "OUTCOME_TRAFFIC",
        dailyBudget: 10,
      }),
  ],
  ["pause_campaign", () => module.provider.pauseCampaign("2001")],
  ["enable_campaign", () => module.provider.enableCampaign("2001")],
  ["update_budget", () => module.provider.updateBudget("2001", 55)],
  ["get_insights", () => module.provider.getInsights()],
  ["list_audiences", () => module.provider.listAudiences()],
  ["account_info", () => module.provider.accountInfo()],
];

for (const [name, fn] of checks) {
  const started = performance.now();
  try {
    await fn();
    pass(`${name} (${Math.round(performance.now() - started)}ms)`);
  } catch (error) {
    fail(`${name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log("\nMeta Ads validation passed — set META_SKIP_AUTH_VALIDATE=false for live Graph.");
