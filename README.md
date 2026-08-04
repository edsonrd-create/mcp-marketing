# Marketing Brain v1.0.0 — Production Ready

Plataforma MCP para marketing digital: **Google Ads**, **Meta Ads**, **WhatsApp**, **Insights**, **AI Agent** e **Workflows**.

Stack: Node.js ≥22 · TypeScript · MCP SDK · Fastify · Google Ads API · OpenAI · Pino · Zod

## Instalação

```bash
npm install
cp .env.example .env
npm run build
```

Guias: [INSTALL.md](INSTALL.md) · [docs/INSTALL.md](docs/INSTALL.md) · [docs/CONFIGURATION.md](docs/CONFIGURATION.md)

```bash
npm run doctor
npm run validate
WHATSAPP_STUB=true npm run mcp:smoke
```

## Como executar

Os servidores MCP usam **`StdioServerTransport`**:

- **Não abrem porta HTTP**
- Ficam à espera de um **cliente MCP** no stdin/stdout
- Logs de arranque vão para **stderr** (o stdout é reservado ao protocolo MCP)
- Se o terminal “parecer parado” depois das mensagens de health, **é o comportamento esperado**

```bash
# Arranque local (Google Ads MCP em modo mock) — mostra logs e aguarda cliente
npm run dev

# Outros servidores MCP
npm run dev:meta
npm run dev:whatsapp
npm run dev:insights
npm run dev:ai-agent
npm run dev:workflows

# Shell HTTP Fastify (opcional, separado do MCP STDIO)
npm run dev:app
```

Exemplo do que deve aparecer no terminal:

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
✅ Transporte STDIO ativo — pronto para um cliente MCP.
```

### Cursor

Em `.cursor/mcp.json` (ajuste `ROOT` para o caminho absoluto do repo):

```json
{
  "mcpServers": {
    "marketing-brain-google-ads": {
      "command": "node",
      "args": ["ROOT/mcp-google-ads/dist/index.js"],
      "cwd": "ROOT",
      "env": {
        "GOOGLE_ADS_SKIP_AUTH_VALIDATE": "true",
        "GOOGLE_ADS_FORCE_MOCK": "true",
        "MCP_STDIO_SAFE": "true"
      }
    }
  }
}
```

Guia completo: [docs/cursor.md](docs/cursor.md)

### Claude Desktop

Em `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "marketing-brain-google-ads": {
      "command": "node",
      "args": ["ROOT/mcp-google-ads/dist/index.js"],
      "cwd": "ROOT",
      "env": {
        "GOOGLE_ADS_SKIP_AUTH_VALIDATE": "true",
        "GOOGLE_ADS_FORCE_MOCK": "true",
        "MCP_STDIO_SAFE": "true"
      }
    }
  }
}
```

Guia completo: [docs/claude.md](docs/claude.md) · template: [docs/mcp-config.example.json](docs/mcp-config.example.json)

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | MCP Google Ads (STDIO) com logs de arranque |
| `npm run doctor` | Diagnóstico (Node, TS, deps, .env, Google, OpenAI, MCP SDK) — sem conectar cliente |
| `npm run build` | Shared + MCP packages + app |
| `npm run typecheck` / `lint` / `test` | Qualidade |
| `npm run validate` | Contagem e inventário de tools (**71**) |
| `npm run mcp:smoke` | Smoke stdio |
| `npm run mcp:tools` | Chamada por tool → `MCP_TOOLS_REPORT.md` |
| `npm run test:google` / `validate:google` | Google Ads |
| `npm run test:meta` / `validate:meta` | Meta Ads |
| `npm run health` | Saúde dos providers |
| `npm run dev:app` | Shell HTTP Fastify |

## MCP Servers (71 tools)

| Servidor | Pacote | Tools |
|----------|--------|------:|
| Google Ads | `@mcp-marketing/google-ads` | 10 |
| Meta Ads | `@mcp-marketing/meta-ads` | 14 |
| WhatsApp | `@mcp-marketing/whatsapp` | 10 |
| Insights | `@mcp-marketing/insights` | 8 |
| AI Agent | `@mcp-marketing/ai-agent` | 14 |
| Workflows | `@mcp-marketing/workflows` | 15 |

## Produção

- Status: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- Final release: [FINAL_RELEASE_REPORT.md](FINAL_RELEASE_REPORT.md)

Live Ads/Graph exige credenciais reais no `.env` (nunca hardcoded).

## Licença

MIT — see [LICENSE](LICENSE)
