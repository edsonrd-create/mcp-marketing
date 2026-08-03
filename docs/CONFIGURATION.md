# Configuration

## Environment (`.env`)

Copy `.env.example` to `.env`.

### Google Ads

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_ADS_CLIENT_ID` | yes | OAuth client ID |
| `GOOGLE_ADS_CLIENT_SECRET` | yes | OAuth client secret |
| `GOOGLE_ADS_REFRESH_TOKEN` | yes | OAuth refresh token |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | yes | Google Ads API developer token |
| `GOOGLE_ADS_CUSTOMER_ID` | yes | Ads customer ID |
| `GOOGLE_ADS_SKIP_AUTH_VALIDATE` | no | `true` for smoke tests |

### Meta Ads

| Variable | Required | Description |
|----------|----------|-------------|
| `META_ACCESS_TOKEN` | yes | Graph API access token |
| `META_AD_ACCOUNT_ID` | yes | Ad account ID (`act_...`) |
| `META_SKIP_AUTH_VALIDATE` | no | `true` for smoke tests |

### WhatsApp

| Variable | Required | Description |
|----------|----------|-------------|
| `WHATSAPP_TOKEN` | yes | Cloud API token |
| `WHATSAPP_PHONE_NUMBER_ID` | yes | Phone number ID |
| `WHATSAPP_STUB` | no | `true` to skip Graph API (local MCP smoke/tools) |

### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_MODE` | `memory` | In-memory store for LTS |

### Optional Firebase

`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

## JSON config

Profiles in `config/`:

- `default.json` — base settings
- `development.json` — debug logging
- `production.json` — production defaults

## Script flags

- `SKIP_DOTENV_FILE=true` — skip loading `.env` in scripts / MCP harness
- `GOOGLE_ADS_SKIP_AUTH_VALIDATE=true` — smoke without OAuth
- `META_SKIP_AUTH_VALIDATE=true` — smoke without Meta live validation
- `WHATSAPP_STUB=true` — WhatsApp tools without live Graph calls

MCP client guides: [cursor.md](cursor.md), [claude.md](claude.md), [chatgpt.md](chatgpt.md), [mcp-config.example.json](mcp-config.example.json).
