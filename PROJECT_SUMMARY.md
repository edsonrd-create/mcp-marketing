# PROJECT_SUMMARY.md — Marketing Brain MCP v1.0.0

**Date:** 2026-08-04

## Version summary

| Field | Value |
|-------|-------|
| Version | **v1.0.0** |
| Date | 2026-08-04 |
| Providers | **6** |
| Tools | **71** |
| Test cases (build-info) | **71** |
| Node | ≥ 22 (`v22.14.0` certified) |

### Tools by provider

| Provider | Tools |
|----------|------:|
| Google Ads | 10 |
| Meta Ads | 14 |
| WhatsApp | 10 |
| Insights | 8 |
| AI Agent | 14 |
| Workflows | 15 |

## Main scripts

`build`, `typecheck`, `lint`, `test`, `validate`, `health`, `doctor`, `mcp:smoke`, `mcp:tools`, `test:google`, `validate:google`, `test:meta`, `validate:meta`, `build:info`, `package:release`, `certify:lts`, `dev` / `start`, `start:*` / `dev:*` per server

## Main dependencies

| Package | Role |
|---------|------|
| `@modelcontextprotocol/sdk` | MCP protocol |
| `fastify` | HTTP shell |
| `google-ads-api` / `google-auth-library` | Google Ads |
| `openai` | OpenAI service (optional) |
| `zod` | Schemas / env |
| `pino` / `pino-pretty` | Logging |
| `dotenv` | Env loading |
| `@mcp-marketing/shared` | Shared errors, logger, MCP helpers |

## Distribution packages

`shared`, `mcp-google-ads`, `mcp-meta-ads`, `mcp-whatsapp`, `mcp-insights`, `mcp-ai-agent`, `mcp-workflows`, `packages/cli`, `packages/create-marketing-brain`

## Status

✅ Production Ready (staged) — see `FINAL_RELEASE_REPORT.md` and `PROJECT_STATUS.md`.
