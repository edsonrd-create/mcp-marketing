# Core MCP Framework (Sprint 4)

Shared infrastructure for all Marketing Brain providers. Existing provider packages are **not modified** — they are loaded via catalog adapters.

## Layout

```text
src/core/
├── server/       # MCPServer, ToolRegistry, ProviderRegistry, Router, Bootstrap
├── auth/         # AuthManager, TokenStore, Credentials
├── tools/        # BaseTool, ToolExecutor, ToolContext, ToolValidator
├── providers/    # BaseProvider, ProviderLoader, adapters/
├── logging/      # Logger (JSON), AuditLogger, RequestLogger
├── errors/
├── config/
├── cache/
├── types/
└── http/         # Fastify shell (Sprint 1)
```

## Contracts

### Provider

Each provider implements:

- `initialize()`
- `shutdown()`
- `health()` → `online` | `offline` | `invalid_config`
- `registerTools(registry)` — auto-registers into `ToolRegistry`

### Tools

Providers register tools centrally (example):

| Provider | Examples |
|----------|----------|
| Google Ads | `list_campaigns`, `update_budget`, `campaign_report` |
| Meta Ads | `list_campaigns`, `get_metrics` |
| WhatsApp | `send_template`, `send_campaign` |

## Scripts

```bash
npm run health    # Google Ads, Meta Ads, WhatsApp, OpenAI, MCP Server
npm run doctor    # Node, npm, .env, deps, providers, MCP, build
npm run test:core # Framework unit tests
```

## Logs

Framework logs are JSON (Pino) and include:

- `provider`
- `tool`
- `ms`
- `status`
- `error` (when failed)

## Adding a new provider

1. Implement `BaseProvider` (or add a `ProviderManifest` in `ProviderLoader`).
2. Call `registerTools()` with each tool definition.
3. Keep package stdio server for MCP clients — framework catalog stays in sync.
