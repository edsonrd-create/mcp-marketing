# Installation — Marketing Brain MCP

Guia rápido. Detalhes: [docs/INSTALL.md](docs/INSTALL.md).

## Requirements

- Node.js **>= 22**
- npm 10+

## Install

```bash
npm install
cp .env.example .env
npm run build
```

## Verify

```bash
npm run doctor
npm run health
npm run validate
WHATSAPP_STUB=true npm run mcp:smoke
```

## Missing credentials (expected until live go-live)

Com `.env` copiado do example (valores vazios), `doctor` / `health` reportam:

- `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CUSTOMER_ID`
- `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`
- `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`
- `OPENAI_API_KEY`

Preencha no `.env` (nunca hardcode no código). Para WhatsApp webhook live, defina também `WHATSAPP_VERIFY_TOKEN`.

## Start

```bash
npm run dev          # HTTP shell
npm run start:google # MCP Google Ads (stdio)
npm run start:meta
npm run start:whatsapp
```

Clientes MCP: [docs/cursor.md](docs/cursor.md), [docs/claude.md](docs/claude.md), [docs/mcp-config.example.json](docs/mcp-config.example.json).

## Production

Ver [PRODUCTION_FINAL_REPORT.md](PRODUCTION_FINAL_REPORT.md).
