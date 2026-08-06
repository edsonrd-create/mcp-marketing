# MCP_CONNECTION_REPORT.md

**Product:** Marketing Brain MCP v1.0.0  
**Date:** 2026-08-04  
**Transport:** `StdioServerTransport`  
**Harness:** `npm run mcp:smoke` · `npm run mcp:client` · `npm run mcp:discover`

---

## Verdict

✅ **Cliente MCP STDIO validado** — handshake, listagem de **71 tools** e execução de pelo menos uma tool por servidor com sucesso (mock/stub).

A conexão GUI do Cursor neste host de CI não é automatizável; o cliente oficial MCP SDK sobre STDIO (mesmo protocolo que Cursor/Claude/Inspector) passou em 6/6 servidores.

---

## Results

| Server | Handshake | Tools | Smoke call | Result |
|--------|-----------|------:|------------|--------|
| google-ads | PASS | 10 | `list_campaigns` | PASS |
| meta-ads | PASS | 14 | `list_campaigns` | PASS |
| whatsapp | PASS | 10 | `list_templates` | PASS |
| insights | PASS | 8 | `get_executive_dashboard` | PASS |
| ai-agent | PASS | 14 | `get_ai_summary` | PASS |
| workflows | PASS | 15 | `list_workflows` | PASS |
| **Total** | | **71** | | **6/6** |

Evidence: `MCP_CLIENT_VALIDATION.json`, `MCP_DISCOVERY_REPORT.md`, `MCP_TOOLS_REPORT.md`.

---

## Client configs

| Client | Doc / artifact |
|--------|----------------|
| Cursor | `docs/cursor.md`, `.cursor/mcp.json.example` |
| Claude Desktop | `docs/claude.md` |
| MCP Inspector | `docs/MCP_INSPECTOR.md` |

---

## Operational pendencies

Live Google Ads / Meta Graph / WhatsApp Cloud require real credentials in env — not exercised on this host. Mock/stub paths are certified.
