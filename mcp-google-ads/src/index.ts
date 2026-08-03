#!/usr/bin/env node
import { startGoogleAdsServer } from "./server.js";

startGoogleAdsServer().catch((error: unknown) => {
  console.error("Failed to start Google Ads MCP server:", error);
  process.exit(1);
});
