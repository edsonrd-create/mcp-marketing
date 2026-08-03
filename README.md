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

## Scripts principais

```bash
npm run build           # compila workspaces
npm run test            # testes
npm run validate        # validação estrutural
npm run mcp:smoke       # smoke sem credenciais
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

## Licença

MIT — see [LICENSE](LICENSE)
