# CLAUDE_SETUP.md — Marketing Brain MCP no Claude Desktop

**Versão:** 1.0.0  
**Transport:** StdioServerTransport

---

## Pré-requisitos

```bash
cd /caminho/para/mcp-marketing
npm install
npm run build
```

---

## Ficheiro de configuração

Edite `claude_desktop_config.json`:

| SO | Caminho típico |
|----|----------------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

### Exemplo (mock Google Ads + Meta + WhatsApp)

Substitua `ROOT` pelo caminho absoluto do repositório (ex.: `E:\\marketing-brain-mcp`).

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

Template completo (6 servers): [docs/mcp-config.example.json](docs/mcp-config.example.json) · [docs/claude.md](docs/claude.md)

---

## Validar

1. Guarde o JSON e **reinicie o Claude Desktop**
2. Confirme os servers MCP no Claude
3. Peça para listar tools ou chamar `list_campaigns`
4. No repo: `npm run mcp:client`

---

## Notas

- **Não** use `ROOT/dist/index.js` — não é o entry STDIO deste monorepo
- Live Ads: secrets reais + `GOOGLE_ADS_LIVE_AUTH=1`
- Logs de arranque aparecem no log do Claude (stderr do processo), não como “porta HTTP”
