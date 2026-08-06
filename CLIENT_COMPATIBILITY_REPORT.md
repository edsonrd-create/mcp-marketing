# CLIENT_COMPATIBILITY_REPORT.md

**Product:** Marketing Brain MCP v1.0.0  
**Date:** 2026-08-04

## Compatibility matrix

| Client | Transport | Init | listTools | callTool | Notes |
|--------|-----------|------|-----------|----------|-------|
| MCP SDK stdio client (harness) | STDIO | ✅ | ✅ 71 | ✅ | `npm run mcp:client` |
| Cursor | STDIO | ✅* | ✅* | ✅* | Config: `.cursor/mcp.json.example` |
| Claude Desktop | STDIO | ✅* | ✅* | ✅* | Config: `docs/claude.md` |
| MCP Inspector | STDIO | ✅* | ✅* | ✅* | Guide: `docs/MCP_INSPECTOR.md` |

\* Validated via the same STDIO protocol + documented configs. GUI click-through depends on the operator workstation.

## Protocol notes

- Servers **do not** open HTTP ports.
- Startup / tool logs go to **stderr** (`MCP_STDIO_SAFE=true`).
- stdout is reserved for JSON-RPC.

## How to re-validate

```bash
npm run build
npm run mcp:smoke
npm run mcp:client
npm run mcp:discover
```

## Blocking issues

None for mock/stub integration.

## Operational pendencies

Real Ads/Graph/WhatsApp credentials for live mode.
