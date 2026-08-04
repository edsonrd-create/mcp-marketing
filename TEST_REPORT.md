# TEST_REPORT.md — Marketing Brain MCP v1.0.0

**Date:** 2026-08-04  
**Host:** CI/local agent (sem credenciais live)

## Summary

| Suite | Result |
|-------|--------|
| `npm run build` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` (workspaces + core) | PASS |
| `npm run test:google` | PASS (16 + 7) |
| `npm run validate:google` | PASS (10 tools) |
| `npm run test:meta` | PASS (5 + 1) |
| `npm run validate:meta` | PASS (14 tools) |
| `npm run validate` | PASS **71/71** |
| `npm run mcp:smoke` | PASS **71/71** |
| `npm run mcp:tools` | PASS (1 call / tool) |
| `npm run build:info` | PASS (`tools=71`, `tests=71`) |

## Unit / integration counts

Approx. **71** Vitest cases across shared, mcp-*, providers e core (per `build:info`).

## MCP tool exercise

`MCP_TOOLS_REPORT.md` regenerado — todas as tools invocadas via stdio (mock/stub).  
`recover_workflow_execution` com id inexistente retorna erro esperado (`NOT_FOUND`).

## Init timings (mcp:smoke)

| Server | Init |
|--------|------|
| google-ads | **216 ms** (lazy live SDK) |
| meta-ads | 170 ms |
| whatsapp | 177 ms |
| insights | 185 ms |
| ai-agent | 179 ms |
| workflows | 174 ms |

## Not executed (operational)

- Live Google Ads OAuth / API (`GOOGLE_ADS_LIVE_AUTH=1` + secrets)
- Live Meta Graph
- Live WhatsApp Cloud API
- Live OpenAI billing path

## Verdict

Qualidade automatizada **PASS** para release v1.0.0 staged.
