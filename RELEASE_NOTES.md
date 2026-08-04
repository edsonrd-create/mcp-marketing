# Marketing Brain v1.0.0 — Release Notes (Production Ready)

**Release date:** 2026-08-03  
**Codename:** Production Ready  
**Node:** >= 22

## Overview

Marketing Brain v1.0.0 is the production-ready MCP platform for marketing operations: Google Ads, Meta Ads, WhatsApp, Insights, AI Agent and Workflows — with a shared Core MCP Framework.

## Highlights

- **71 MCP tools** across 6 servers
- Mock/stub homologation complete without live credentials
- Security hardening: env-driven secrets, sanitized Graph errors, validation-only HTTP details
- Performance: Google Ads live SDK lazy-loaded (faster mock init)

## Install / Validate

```bash
npm install
cp .env.example .env
npm run build
npm run validate
WHATSAPP_STUB=true npm run mcp:smoke
```

## Operational note

Live Google Ads / Meta Graph / WhatsApp Cloud / OpenAI require real credentials in `.env`. See `FINAL_STATUS.md` for the production checklist and pendências operacionais.

## Support

`INSTALL.md` · `docs/CONFIGURATION.md` · `docs/QUICKSTART.md`
