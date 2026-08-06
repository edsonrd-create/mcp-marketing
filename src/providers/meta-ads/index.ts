import { loadEnv } from "@mcp-marketing/shared";
import { MetaAdsAuthManager } from "./auth/MetaAdsAuthManager.js";
import { MetaAdsProvider } from "./services/MetaAdsProvider.js";
import { metaAdsEnvSchema, type MetaAdsEnv } from "./schemas/index.js";

export { MetaAdsAuthManager } from "./auth/MetaAdsAuthManager.js";
export { MetaAdsProvider } from "./services/MetaAdsProvider.js";
export { registerMetaAdsTools, META_ADS_TOOL_NAMES } from "./tools/index.js";
export { metaAdsEnvSchema, type MetaAdsEnv } from "./schemas/index.js";
export type * from "./schemas/types.js";

export interface MetaAdsModule {
  env: MetaAdsEnv;
  auth: MetaAdsAuthManager;
  provider: MetaAdsProvider;
}

export function loadMetaAdsProviderEnv(): MetaAdsEnv {
  return loadEnv({ schema: metaAdsEnvSchema });
}

export async function createMetaAdsModule(
  env: MetaAdsEnv = loadMetaAdsProviderEnv(),
): Promise<MetaAdsModule> {
  const auth = new MetaAdsAuthManager(env);
  await auth.initialize();
  const provider = new MetaAdsProvider(auth);
  return { env, auth, provider };
}
