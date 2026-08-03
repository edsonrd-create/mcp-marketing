import { z } from "zod";
import { loadEnv } from "@mcp-marketing/shared";

const googleAdsEnvSchema = z.object({
  GOOGLE_ADS_CLIENT_ID: z.string().min(1),
  GOOGLE_ADS_CLIENT_SECRET: z.string().min(1),
  GOOGLE_ADS_REFRESH_TOKEN: z.string().min(1),
  GOOGLE_ADS_DEVELOPER_TOKEN: z.string().min(1),
  GOOGLE_ADS_CUSTOMER_ID: z.string().min(1),
  GOOGLE_ADS_SKIP_AUTH_VALIDATE: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
  GOOGLE_ADS_LIVE_AUTH: z
    .enum(["0", "1"])
    .optional()
    .transform((v) => v === "1"),
});

export type GoogleAdsEnv = z.infer<typeof googleAdsEnvSchema>;

export function loadGoogleAdsEnv(): GoogleAdsEnv {
  return loadEnv({
    schema: googleAdsEnvSchema,
    skipEnvFile: process.env.VITEST === "true" || process.env.NODE_ENV === "test",
  });
}
