# Marketing Brain v1.1.0 — Release Notes (LTS + Master Prompt v2.0)

**Release date:** 2026-08-03  
**Codename:** LTS / Master v2  
**Node:** >= 22

## Overview

Marketing Brain v1.1 is an installable MCP platform for marketing operations: Google Ads, Meta Ads, WhatsApp messaging, analytics insights, an AI agent with planner/recommendations, and workflow automation — built on a shared Core MCP Framework.

## Highlights

- **71 MCP tools** across 6 servers (additive Master Prompt tools; legacy names kept)
- **Core framework**: registries, bootstrap, health/doctor services, JSON audit logs
- **CLI tooling** for doctor, health, validation, status, and release packaging
- **Monorepo workspaces** with shared TypeScript/ESM foundation
- **Memory database mode** by default; optional Firebase configuration documented

## Upgrade / Install

```bash
npm install
npm run build
npm run validate
marketing-brain doctor
```

## Validation

```bash
npm run validate      # structure and tool counts
npm run mcp:smoke     # source/dist smoke (no credentials)
npm run live:validate # writes report; blocked without .env (exit 0)
```

## Distribution

```bash
npm run build:info
npm run package:release
```

Artifacts: `BUILD_INFO.json`, `RELEASE_MANIFEST.json`, `dist-release/marketing-brain-1.1.0-lts.tar.gz`.

See `LTS_CERTIFICATION.md` for the Long Term Support sign-off.

Produces `dist-release/marketing-brain-1.1.0-lts/` and tarball.

## Sprint Final (Go Live)

Homologação local (mock/stub + CI): build, lint, typecheck, testes, validate **71/71**, mcp:smoke **71/71**, mcp:tools (todas as tools), Google/Meta validate.

Live Ads/Graph/WhatsApp Cloud exigem credenciais reais no `.env` — ver pendências operacionais em `PRODUCTION_FINAL_REPORT.md`.

## Support

See `INSTALL.md`, `docs/QUICKSTART.md` and `docs/CONFIGURATION.md` for setup.
