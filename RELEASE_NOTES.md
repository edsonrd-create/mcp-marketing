# Marketing Brain v1.0.0 — Release Notes (Final)

**Release date:** 2026-08-04  
**Status:** Production Ready (staged)  
**Node:** >= 22

## Overview

Final release of Marketing Brain MCP: installable platform for Google Ads, Meta Ads, WhatsApp, Insights, AI Agent and Workflows over the Model Context Protocol.

## Numbers

- **Version:** v1.0.0  
- **Providers:** 6  
- **Tools:** 71  
- **Automated tests (build-info):** 71  

## Install

```bash
npm install
cp .env.example .env
npm run build
npm run validate
WHATSAPP_STUB=true npm run mcp:smoke
```

## Documentation

`INSTALL.md` · `docs/CONFIGURATION.md` · `PROJECT_STATUS.md` · `FINAL_RELEASE_REPORT.md`

## Operational note

Live Google Ads / Meta Graph / WhatsApp Cloud / OpenAI require real `.env` credentials supplied by the operator. No fictional credentials are embedded in the product.
