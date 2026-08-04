# Marketing Brain v1.0.0 — Production Ready

Plataforma MCP para marketing digital: **Google Ads**, **Meta Ads**, **WhatsApp**, **Insights**, **AI Agent** e **Workflows**.

Stack: Node.js ≥22 · TypeScript · MCP SDK · Fastify · Google Ads API · OpenAI · Pino · Zod

## Instalação

```bash
npm install
cp .env.example .env
npm run build
```

```bash
npm run doctor
npm run mcp:smoke
npm run mcp:client
```

## Como executar

Os servidores MCP usam **`StdioServerTransport`**:

- **Não abrem porta HTTP**
- Ficam à espera de um **cliente MCP** no stdin/stdout
- Logs de arranque (health, tools, “aguardando conexão”) vão para **stderr**
- Se o terminal “parecer parado” depois do health, **é o comportamento esperado**

```bash
npm run doctor          # diagnóstico (sem conectar MCP)
npm run dev             # Google Ads MCP (mock) + logs de arranque
npm run dev:meta        # Meta Ads
npm run dev:whatsapp    # WhatsApp stub
npm run dev:app         # Shell HTTP Fastify (separado do MCP)
```

Ao correr `npm run dev` deverá ver algo como:

```text
🚀 Marketing Brain MCP iniciando... (mcp-google-ads)
📦 Registrando Tools... (10)
🧠 Registrando Prompts... (0)
📚 Registrando Resources... (0)
🩺 Health
   • Nome: mcp-google-ads
   • Versão: 1.0.0
   • Tools: 10
   • Prompts: 0
   • Resources: 0
🔌 Aguardando conexão de um cliente MCP via STDIO...
✅ Cliente MCP conectado.
```

### Cursor

1. `npm run build`
2. Copie `.cursor/mcp.json.example` → `.cursor/mcp.json` (ajuste o caminho absoluto da raiz)
3. Settings → MCP → reload
4. Confirme servers/tools e chame p.ex. `list_campaigns`

Exemplo mínimo (Google Ads mock):

```json
{
  "mcpServers": {
    "mcp-google-ads": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/mcp-marketing/mcp-google-ads/dist/index.js"],
      "env": {
        "MCP_STDIO_SAFE": "true",
        "GOOGLE_ADS_CLIENT_ID": "dev",
        "GOOGLE_ADS_CLIENT_SECRET": "dev",
        "GOOGLE_ADS_REFRESH_TOKEN": "dev",
        "GOOGLE_ADS_DEVELOPER_TOKEN": "dev",
        "GOOGLE_ADS_CUSTOMER_ID": "1234567890",
        "GOOGLE_ADS_SKIP_AUTH_VALIDATE": "true",
        "GOOGLE_ADS_FORCE_MOCK": "true",
        "GOOGLE_ADS_LIVE_AUTH": "0"
      }
    }
  }
}
```

Guia: [docs/cursor.md](docs/cursor.md) · template: [docs/mcp-config.example.json](docs/mcp-config.example.json)

### Claude Desktop

1. Edite `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`)
2. Use `command: "node"` + `args` apontando para `mcp-*/dist/...` + `env` mock ou live
3. Reinicie o Claude Desktop

Guia: [docs/claude.md](docs/claude.md)

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector node ./mcp-google-ads/dist/index.js
```

Working directory = raiz do repo. Guia: [docs/MCP_INSPECTOR.md](docs/MCP_INSPECTOR.md)

## Como testar uma Tool

```bash
# Handshake + 1 call por servidor
npm run mcp:client

# Todas as tools
npm run mcp:tools

# Autodescoberta (schemas)
npm run mcp:discover
```

No Cursor/Claude/Inspector: chame `list_campaigns` (Google/Meta) ou `list_templates` (WhatsApp stub).

## Scripts MCP

| Script | Descrição |
|--------|-----------|
| `mcp:smoke` | Init + listTools (**71**) |
| `mcp:client` | Handshake + 1 tool / server |
| `mcp:discover` | Catálogo + schemas → `MCP_DISCOVERY_REPORT.md` |
| `mcp:tools` | callTool em todas → `MCP_TOOLS_REPORT.md` |
| `doctor` | Diagnóstico sem cliente |
| `validate:google` / `validate:meta` | Providers (mock) |

## MCP Servers (71 tools)

| Servidor | Pacote | Tools |
|----------|--------|------:|
| Google Ads | `@mcp-marketing/google-ads` | 10 |
| Meta Ads | `@mcp-marketing/meta-ads` | 14 |
| WhatsApp | `@mcp-marketing/whatsapp` | 10 |
| Insights | `@mcp-marketing/insights` | 8 |
| AI Agent | `@mcp-marketing/ai-agent` | 14 |
| Workflows | `@mcp-marketing/workflows` | 15 |

## Relatórios de integração

- [MCP_CONNECTION_REPORT.md](MCP_CONNECTION_REPORT.md)
- [MCP_TOOLS_REPORT.md](MCP_TOOLS_REPORT.md)
- [MCP_DISCOVERY_REPORT.md](MCP_DISCOVERY_REPORT.md)
- [CLIENT_COMPATIBILITY_REPORT.md](CLIENT_COMPATIBILITY_REPORT.md)

## Licença

MIT — see [LICENSE](LICENSE)
