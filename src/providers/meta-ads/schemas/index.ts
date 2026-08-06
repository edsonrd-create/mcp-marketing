import { z } from "zod";

export const metaAdsEnvSchema = z.object({
  META_ACCESS_TOKEN: z.string().min(1),
  META_AD_ACCOUNT_ID: z.string().min(1),
  META_SKIP_AUTH_VALIDATE: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
  META_FORCE_MOCK: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
});

export type MetaAdsEnv = z.infer<typeof metaAdsEnvSchema>;

export const listCampaignsSchema = z.object({});
export const listAccountsSchema = z.object({});
export const listAudiencesSchema = z.object({});
export const accountInfoSchema = z.object({});
export const getCampaignSchema = z.object({
  campaign_id: z.string().min(1),
});
export const createCampaignSchema = z.object({
  name: z.string().min(1),
  objective: z.string().min(1),
  daily_budget: z.number().positive(),
});
export const pauseCampaignSchema = z.object({ campaign_id: z.string().min(1) });
export const enableCampaignSchema = z.object({ campaign_id: z.string().min(1) });
export const resumeCampaignSchema = z.object({ campaign_id: z.string().min(1) });
export const updateBudgetSchema = z.object({
  campaign_id: z.string().min(1),
  daily_budget: z.number().positive(),
});
export const createAudienceSchema = z.object({
  name: z.string().min(1),
  subtype: z.string().optional(),
  approximate_count: z.number().int().positive().optional(),
});
export const createAdSchema = z.object({
  name: z.string().min(1),
  campaign_id: z.string().min(1),
  creative_body: z.string().min(1),
});
export const getMetricsSchema = z.object({
  campaign_id: z.string().optional(),
});
export const getInsightsSchema = z.object({
  campaign_id: z.string().optional(),
});
