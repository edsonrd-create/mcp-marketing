# SECURITY_REPORT.md — Marketing Brain MCP v1.0.0

**Date:** 2026-08-04

## Controls verified

| Control | Status |
|---------|--------|
| `.env` gitignored | PASS |
| No live API keys / private keys in source | PASS (scan) |
| Secrets via env + Zod (providers) | PASS |
| WhatsApp live verify token from env (no prod default) | PASS |
| Graph error bodies truncated/redacted | PASS |
| HTTP `AppError.details` only for `VALIDATION` | PASS |
| OAuth refresh failures log message, not raw token-bearing objects | PASS |
| Smoke/tests use placeholders only | PASS |

## Logging

- Pino structured logs (shared + providers)  
- Tool wrappers log start/ok without credentials  

## Exception handling

- Google/Meta providers: `AppError` / `ExternalApiError`  
- Workflows / AI Agent: `AppError`  
- MCP `registerTool` → `wrapToolError`  

## Residual risks

1. Operator must supply real secrets out-of-band  
2. `MARKETING_BRAIN_STRICT_ENV` optional — HTTP shell can boot with warnings  
3. Transitive npm advisories (low/moderate) — schedule `npm audit fix` in maintenance  

## Conclusion

No exposed secrets found. Security posture acceptable for staged production.
