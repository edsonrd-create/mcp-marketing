# Marketing Brain v1.1.0 LTS

Plataforma MCP instalável para marketing digital: **Google Ads**, **Meta Ads**, **WhatsApp**, **Insights**, **AI Agent** e **Workflows**.

Installable MCP platform for digital marketing automation.

## Requisitos / Requirements

- Node.js **>= 22**
- npm workspaces (monorepo)

## Início rápido / Quick start

```bash
npm install
cp .env.example .env   # preencha credenciais / fill credentials
npm run build
marketing-brain doctor
marketing-brain start
```

## MCP Servers (52 ferramentas / tools)

| Servidor | Pacote | Tools |
|----------|--------|------:|
| Google Ads | `@mcp-marketing/google-ads` | 10 |
| Meta Ads | `@mcp-marketing/meta-ads` | 8 |
| WhatsApp | `@mcp-marketing/whatsapp` | 6 |
| Insights | `@mcp-marketing/insights` | 8 |
| AI Agent | `@mcp-marketing/ai-agent` | 7 |
| Workflows | `@mcp-marketing/workflows` | 13 |

## Integração com clientes MCP

Documentação por cliente (stdio, sem credenciais reais nos exemplos):

| Cliente | Guia |
|---------|------|
| Cursor | [docs/cursor.md](docs/cursor.md) |
| Claude Desktop | [docs/claude.md](docs/claude.md) |
| ChatGPT Desktop | [docs/chatgpt.md](docs/chatgpt.md) (quando suportado) |

Template completo: [docs/mcp-config.example.json](docs/mcp-config.example.json)

### Cursor

1. `npm install && npm run build`
2. Em **Settings → MCP**, adicione os servidores do exemplo em `docs/cursor.md` (substitua `ROOT` pelo caminho absoluto do monorepo).
3. Recarregue os servidores MCP e confira as **52 tools**.

### Claude Desktop

1. Edite `claude_desktop_config.json` conforme [docs/claude.md](docs/claude.md).
2. Feche e reabra o Claude Desktop.
3. Verifique o painel de tools / MCP.

### Validação local (sem cliente GUI)

```bash
npm run build
npm run mcp:smoke    # inicia os 6 servidores via stdio, confirma 52 tools, registra tempos, encerra
npm run mcp:tools    # chama cada tool e gera MCP_TOOLS_REPORT.md
```

Relatório: [MCP_TOOLS_REPORT.md](MCP_TOOLS_REPORT.md)

## Scripts principais

```bash
npm run build           # compila workspaces
npm run test            # testes
npm run validate        # validação estrutural
npm run mcp:smoke       # smoke MCP (stdio client)
npm run mcp:tools       # chamada de teste por tool + relatório
npm run live:validate   # validação live (.env)
npm run build:info      # BUILD_INFO.json
npm run package:release # tarball LTS
```

## CLI

```bash
marketing-brain doctor
marketing-brain status
marketing-brain validate
create-marketing-brain ./meu-projeto
```

## Documentação

- [docs/QUICKSTART.md](docs/QUICKSTART.md)
- [docs/CLI.md](docs/CLI.md)
- [docs/CONFIGURATION.md](docs/CONFIGURATION.md)
- [docs/DOCKER.md](docs/DOCKER.md)
- [docs/cursor.md](docs/cursor.md)
- [docs/claude.md](docs/claude.md)
- [docs/chatgpt.md](docs/chatgpt.md)

## Licença

MIT — see [LICENSE](LICENSE)
