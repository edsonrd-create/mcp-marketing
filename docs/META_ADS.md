# Meta Ads MCP Provider (Master Prompt v2 — Phase 3)

Connect a Meta (Facebook/Instagram) ad account and run provider tools **without code changes**.

Legacy tools (`resume_campaign`, `create_audience`, `create_ad`, `get_metrics`) remain registered for compatibility.

## Setup

```bash
cp .env.example .env
```

Required:

- `META_ACCESS_TOKEN` — long-lived Graph token
- `META_AD_ACCOUNT_ID` — `act_...`

Optional:

- `META_SKIP_AUTH_VALIDATE=true` — mock/smoke without Graph validation
- `META_FORCE_MOCK=true` — force mock data layer

```bash
npm run build
npm run start:meta
```

## Tools (14)

### Master Prompt

| Tool | Description |
|------|-------------|
| `list_accounts` | List ad accounts |
| `list_campaigns` | List campaigns |
| `get_campaign` | Get campaign by id |
| `create_campaign` | Create campaign |
| `pause_campaign` | Pause campaign |
| `enable_campaign` | Enable campaign |
| `update_budget` | Update daily budget |
| `get_insights` | Performance insights |
| `list_audiences` | List audiences |
| `account_info` | Account metadata |

### Legacy aliases

`resume_campaign` · `create_audience` · `create_ad` · `get_metrics`

## Validation

```bash
npm run test:meta
npm run validate:meta
```

## Layout

```text
src/providers/meta-ads/
├── auth/MetaAdsAuthManager.ts
├── services/MetaAdsProvider.ts
├── schemas/
└── tools/
```
