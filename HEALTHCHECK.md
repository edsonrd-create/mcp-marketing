# HEALTHCHECK.md — Marketing Brain MCP v1.0.0

**Generated:** 2026-08-04  
**Branch:** `cursor/mcp-client-validation-final-d0d2`

## Matrix

| Área | Comando / evidência | Status |
|------|---------------------|--------|
| **Build** | `npm run build` | ✔ PASS |
| **TypeScript** | `npm run typecheck` | ✔ PASS |
| **Lint** | `npm run lint` | ✔ PASS |
| **Google Ads (MCP mock)** | `npm run validate:google` / `mcp:client` | ✔ PASS |
| **Google Ads (live)** | OAuth + campanhas reais | ⏳ operacional (credenciais do operador) |
| **MCP** | `npm run mcp:smoke` · `mcp:client` · `tools:report` | ✔ PASS **71/71** |
| **STDIO UX** | `connectStdioMcpServer` logs | ✔ PASS |

## Status Geral

**✔ Saudável para uso com cliente MCP (Cursor / Claude / Inspector) em modo mock/stub.**

Live Google Ads depende de `.env` com refresh token e `GOOGLE_ADS_LIVE_AUTH=1` — pendência operacional quando não configurado neste host.

## Layout importante

| Esperado (incorreto neste repo) | Correto |
|----------------------------------|---------|
| `dist/index.js` | `mcp-google-ads/dist/index.js` (etc.) |
| `dist/mcp/server.js` | N/A — servers em `mcp-*/src/server.ts` → `dist` |
| `dist/mcp/tools.js` | Tools registadas em runtime via `register*Tools` |

## Revalidar rapidamente

```bash
npm run build
npm run typecheck
npm run doctor
npm run mcp:smoke
npm run mcp:client
npm run tools:report
```
