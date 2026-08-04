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

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run build` | Shared + MCP packages + app |
| `npm run typecheck` / `lint` / `test` | Qualidade |
| `npm run validate` | Contagem e inventário de tools (**71**) |
| `npm run mcp:smoke` | Smoke stdio |
| `npm run mcp:tools` | Chamada por tool → `MCP_TOOLS_REPORT.md` |
| `npm run test:google` / `validate:google` | Google Ads |
| `npm run test:meta` / `validate:meta` | Meta Ads |
| `npm run health` / `doctor` | Saúde e diagnóstico |

## MCP Servers (71 tools)

| Servidor | Pacote | Tools |
|----------|--------|------:|
| Google Ads | `@mcp-marketing/google-ads` | 10 |
| Meta Ads | `@mcp-marketing/meta-ads` | 14 |
| WhatsApp | `@mcp-marketing/whatsapp` | 10 |
| Insights | `@mcp-marketing/insights` | 8 |
| AI Agent | `@mcp-marketing/ai-agent` | 14 |
| Workflows | `@mcp-marketing/workflows` | 15 |

Clientes: [docs/cursor.md](docs/cursor.md) · [docs/claude.md](docs/claude.md) · [docs/chatgpt.md](docs/chatgpt.md)

## Produção

- Status: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- Final release: [FINAL_RELEASE_REPORT.md](FINAL_RELEASE_REPORT.md)
- Quality / Security / Tests / Summary: [QUALITY_REPORT.md](QUALITY_REPORT.md) · [SECURITY_REPORT.md](SECURITY_REPORT.md) · [TEST_REPORT.md](TEST_REPORT.md) · [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Readiness: [PRODUCTION_READINESS_REPORT.md](PRODUCTION_READINESS_REPORT.md)

Live Ads/Graph exige credenciais reais no `.env` (nunca hardcoded).

## Licença

MIT — see [LICENSE](LICENSE)
