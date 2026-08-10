# Marketing Brain v1.1.0 LTS

Plataforma MCP instalável para marketing digital: **Google Ads**, **Meta Ads**, **WhatsApp**, **Insights**, **AI Agent** e **Workflows**.

Stack: Node.js · TypeScript · MCP SDK · Fastify · Google Ads API · OpenAI · Pino · Zod

## Instalação

Guia completo: [INSTALL.md](INSTALL.md) · [docs/INSTALL.md](docs/INSTALL.md)

```bash
npm install
cp .env.example .env   # preencha credenciais conforme necessário
npm run build
```

## Configuração

Variáveis em `.env` — validadas automaticamente por `EnvValidator` / `ConfigService`.

Detalhes: [docs/CONFIGURATION.md](docs/CONFIGURATION.md)

Credenciais de providers vazias → shell HTTP sobe com avisos; MCP packages exigem as próprias vars. Live Google: `GOOGLE_ADS_LIVE_AUTH=1`. WhatsApp offline: `WHATSAPP_STUB=true`.

```bash
npm run doctor
```

## Desenvolvimento

Sobe o shell HTTP (Fastify) com logs estruturados (Pino):

```bash
npm run dev
```

Endpoints:

- `GET /` — info
- `GET /health` — status dos serviços
- `GET /ready` — readiness (MCP dist)

Produção / build local:

```bash
npm run build
npm start
```

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run build` | Shared + MCP packages + app (`src/`) |
| `npm run dev` | Fastify em watch (`tsx`) |
| `npm start` | App compilada (`dist-app/`) |
| `npm run typecheck` | TypeScript (workspaces + app) |
| `npm run lint` | ESLint |
| `npm test` | Testes dos workspaces + core framework |
| `npm run test:core` | Testes do Core MCP Framework |
| `npm run health` | Health check (providers + OpenAI + MCP) |
| `npm run doctor` | Diagnóstico (Node, npm, .env, deps, providers, build) |
| `npm run test:google` | Testes do provider Google Ads (10/10 tools) |
| `npm run validate:google` | Validação do provider Google Ads |
| `npm run test:meta` | Testes do provider Meta Ads |
| `npm run validate:meta` | Validação do provider Meta Ads |
| `npm run mcp:smoke` | Smoke MCP stdio |
| `npm run mcp:tools` | Chamadas de teste + `MCP_TOOLS_REPORT.md` |

Scripts por servidor MCP mantidos: `dev:google`, `start:meta`, etc.

## Estrutura do projeto

```text
src/
├── config/                  # ConfigService, EnvValidator
├── core/                    # Core MCP Framework
│   ├── server/              # ToolRegistry, ProviderRegistry, Bootstrap
│   ├── auth/ tools/ providers/ logging/
│   └── http/                # Fastify shell
├── logger/                  # LoggerFactory (Pino)
├── providers/
│   ├── google-ads/          # Provider Google Ads (10 tools)
│   └── meta-ads/            # Provider Meta Ads (14 tools)
├── routes/                  # health, ready
├── services/                # health, OpenAI, MCP status
└── index.ts

shared/                      # libs compartilhadas (erros, logger, MCP helpers)
mcp-*/                       # servidores MCP (stdio)
packages/cli/                # CLI marketing-brain
docs/                        # documentação
```

Arquitetura MCP stdio **não muda**: os pacotes `mcp-*` continuam sendo os servidores de tools.

## Integração MCP (clientes)

| Cliente | Guia |
|---------|------|
| Cursor | [docs/cursor.md](docs/cursor.md) |
| Claude Desktop | [docs/claude.md](docs/claude.md) |
| ChatGPT Desktop | [docs/chatgpt.md](docs/chatgpt.md) |

Template: [docs/mcp-config.example.json](docs/mcp-config.example.json)

## MCP Servers (71 tools)

| Servidor | Pacote | Tools |
|----------|--------|------:|
| Google Ads | `@mcp-marketing/google-ads` | 10 |
| Meta Ads | `@mcp-marketing/meta-ads` | 14 |
| WhatsApp | `@mcp-marketing/whatsapp` | 10 |
| Insights | `@mcp-marketing/insights` | 8 |
| AI Agent | `@mcp-marketing/ai-agent` | 14 |
| Workflows | `@mcp-marketing/workflows` | 15 |

Guias: [GOOGLE_ADS.md](docs/GOOGLE_ADS.md) · [META_ADS.md](docs/META_ADS.md) · [WHATSAPP.md](docs/WHATSAPP.md)

## Google Ads (provider completo)

Guia: [docs/GOOGLE_ADS.md](docs/GOOGLE_ADS.md)

```bash
# mock / CI
npm run test:google
npm run validate:google

# conta real (sem alterar código)
# preencha GOOGLE_ADS_* no .env e:
GOOGLE_ADS_LIVE_AUTH=1 npm run start:google
```

## Documentação

- [docs/QUICKSTART.md](docs/QUICKSTART.md)
- [docs/CLI.md](docs/CLI.md)
- [docs/CONFIGURATION.md](docs/CONFIGURATION.md)
- [docs/INSTALL.md](docs/INSTALL.md)
- [docs/API.md](docs/API.md)
- [docs/GOOGLE_ADS.md](docs/GOOGLE_ADS.md)
- [docs/META_ADS.md](docs/META_ADS.md)
- [docs/WHATSAPP.md](docs/WHATSAPP.md)
- [docs/CORE_FRAMEWORK.md](docs/CORE_FRAMEWORK.md)
- [docs/DOCKER.md](docs/DOCKER.md)
- [PRODUCTION_FINAL_REPORT.md](PRODUCTION_FINAL_REPORT.md)
- [PRODUCTION_READINESS_REPORT.md](PRODUCTION_READINESS_REPORT.md)

## Licença

MIT — see [LICENSE](LICENSE)
