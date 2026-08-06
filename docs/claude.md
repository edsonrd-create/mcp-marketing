# Claude Desktop — MCP Client Integration

Connect Marketing Brain to [Claude Desktop](https://claude.ai/download) via **StdioServerTransport** (sem porta HTTP).

## Prerequisites

```bash
npm install
npm run build
cp .env.example .env
```

## Config file location

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` (se suportado) |

## Example (mock / local)

Replace `ROOT` with the absolute monorepo path:

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
    },
    "marketing-brain-meta-ads": {
      "command": "node",
      "args": ["ROOT/mcp-meta-ads/dist/index.js"],
      "cwd": "ROOT",
      "env": {
        "MCP_STDIO_SAFE": "true",
        "META_ACCESS_TOKEN": "dev-meta-token",
        "META_AD_ACCOUNT_ID": "act_dev",
        "META_SKIP_AUTH_VALIDATE": "true",
        "META_FORCE_MOCK": "true"
      }
    },
    "marketing-brain-whatsapp": {
      "command": "node",
      "args": ["ROOT/mcp-whatsapp/dist/server.js"],
      "cwd": "ROOT",
      "env": {
        "MCP_STDIO_SAFE": "true",
        "WHATSAPP_TOKEN": "dev-wa-token",
        "WHATSAPP_PHONE_NUMBER_ID": "dev-phone",
        "WHATSAPP_STUB": "true"
      }
    }
  }
}
```

Template completo: [`mcp-config.example.json`](mcp-config.example.json).

## Verify

1. Restart Claude Desktop.
2. Confirm MCP servers connected.
3. Ask Claude to list campaigns (`list_campaigns`) or list WhatsApp templates (`list_templates`).

Local harness:

```bash
npm run mcp:client
```

## Notes

- Logs de arranque ficam em stderr; o processo à espera no stdin é **esperado**.
- Live APIs: substitua placeholders por secrets reais e remova flags mock/stub.
