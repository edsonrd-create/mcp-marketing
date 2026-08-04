# Installation — Marketing Brain MCP v1.0.0

## Requirements

- Node.js **>= 22**
- npm 10+

## Install

```bash
npm install
cp .env.example .env
npm run build
```

## Verify (sem credenciais live)

```bash
npm run doctor
npm run health
npm run validate
WHATSAPP_STUB=true npm run mcp:smoke
```

## Credenciais faltando (esperado até go-live live)

Com `.env` vazio copiado do example, `npm run doctor` lista:

- Google Ads: `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CUSTOMER_ID`
- Meta Ads: `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`
- WhatsApp: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` (+ `WHATSAPP_VERIFY_TOKEN` para webhook)
- OpenAI: `OPENAI_API_KEY`

Preencha no `.env`. Não coloque secrets no código.

## Start

```bash
npm run dev
npm run start:google
npm run start:meta
npm run start:whatsapp
```

Detalhes: [docs/INSTALL.md](docs/INSTALL.md) · [docs/CONFIGURATION.md](docs/CONFIGURATION.md) · [PROJECT_STATUS.md](PROJECT_STATUS.md)
