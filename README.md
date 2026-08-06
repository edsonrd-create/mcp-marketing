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

## Como executar (STDIO)

Os servidores MCP usam **`StdioServerTransport`**:

- **Não abrem porta HTTP**
- Ficam à espera de um **cliente MCP** no stdin/stdout
- Logs de arranque e de tools vão para **stderr**
- Se o terminal “parecer parado” depois do health, **é o comportamento esperado**

```bash
npm run dev            # Google Ads MCP (mock) + logs
npm run dev:meta       # Meta Ads
npm run dev:whatsapp   # WhatsApp stub
npm run dev:app        # Shell HTTP Fastify (separado)
```

## Como conectar no Cursor

1. `npm run build`
2. `cp .cursor/mcp.json.example .cursor/mcp.json`
3. Cursor Settings → MCP → reload
4. Confirme **6 servers / 71 tools**
5. Execute p.ex. `list_campaigns`

Guia: [docs/cursor.md](docs/cursor.md)

## Como conectar no Claude Desktop

1. Edite `claude_desktop_config.json` (ver [docs/claude.md](docs/claude.md))
2. Use `command: node` + `args: [ROOT/mcp-*/dist/...]` + env mock ou live
3. Reinicie o Claude Desktop e teste uma tool

## Como conectar no MCP Inspector

```bash
npx @modelcontextprotocol/inspector node ./mcp-google-ads/dist/index.js
```

Working directory = raiz do repo. Guia completo: [docs/MCP_INSPECTOR.md](docs/MCP_INSPECTOR.md)

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
