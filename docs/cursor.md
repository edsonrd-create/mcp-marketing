# Cursor — MCP Client Integration

Connect Marketing Brain MCP servers to [Cursor](https://cursor.com) via **StdioServerTransport**.

## Prerequisites

```bash
npm install
npm run build
cp .env.example .env   # fill credentials for live use; mock flags OK for local
```

## Project example config

Copy the example into the project (or merge into user `~/.cursor/mcp.json`):

```bash
cp .cursor/mcp.json.example .cursor/mcp.json
```

O ficheiro [`.cursor/mcp.json.example`](../.cursor/mcp.json.example) já usa `${workspaceFolder}` e **mock env** seguro para listar/executar tools sem credenciais live.

## Cursor MCP config (manual)

**Cursor Settings → MCP**, ou editar `~/.cursor/mcp.json` / `.cursor/mcp.json`.

```json
{
  "mcpServers": {
    "marketing-brain-google-ads": {
      "command": "node",
      "args": ["ROOT/mcp-google-ads/dist/index.js"],
      "cwd": "ROOT",
      "env": {
        "MCP_STDIO_SAFE": "true",
        "GOOGLE_ADS_CLIENT_ID": "dev-client-id",
        "GOOGLE_ADS_CLIENT_SECRET": "dev-client-secret",
        "GOOGLE_ADS_REFRESH_TOKEN": "dev-refresh-token",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "dev-developer-token",
        "GOOGLE_ADS_CUSTOMER_ID": "1234567890",
        "GOOGLE_ADS_SKIP_AUTH_VALIDATE": "true",
        "GOOGLE_ADS_FORCE_MOCK": "true",
        "GOOGLE_ADS_LIVE_AUTH": "0"
      }
    }
  }
}
```

Substitua `ROOT` pelo caminho absoluto do repositório. Template completo: [`mcp-config.example.json`](mcp-config.example.json).

## Validate (local harness ≡ Handshake + listTools + callTool)

```bash
npm run mcp:smoke      # init + listTools (71)
npm run mcp:client     # handshake + 1 tool call / server
npm run mcp:discover   # schemas → MCP_DISCOVERY_REPORT.md
npm run mcp:tools      # call each tool → MCP_TOOLS_REPORT.md
```

No Cursor:

1. Reload MCP servers.
2. Confirme os 6 servers online e **71 tools**.
3. Execute p.ex. `list_campaigns` (Google) ou `list_templates` (WhatsApp stub).

## Expected STDIO behaviour

- Sem porta HTTP.
- Logs de arranque/tools em **stderr**.
- Processo à espera no stdin após o banner de health — **normal**.

## Live credentials

Para contas reais: remova `*_FORCE_MOCK` / `WHATSAPP_STUB`, preencha secrets no `.env` / config MCP, e use `GOOGLE_ADS_LIVE_AUTH=1` quando aplicável. Sem credenciais = **pendência operacional**.
