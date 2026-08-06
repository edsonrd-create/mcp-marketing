# Changelog

## [1.0.0] - 2026-08-03 — Production Ready

### Added
- Certificação **v1.0.0 Production Ready** (71 MCP tools, 6 servers)
- Relatórios: `CODE_AUDIT.md`, `TEST_REPORT.md`, `PRODUCTION_READINESS_REPORT.md`, `FINAL_STATUS.md`
- Core MCP Framework, providers Google Ads + Meta Ads, WhatsApp/AI/Workflows/Insights
- CLI `marketing-brain`, Docker, CI, docs de instalação e configuração

### Fixed
- Shared build `tsc --build --force` (evita `dist/` stale)
- WhatsApp: verify token via env; erros Graph sanitizados
- HTTP: `details` de erro só em `VALIDATION`
- Google Ads: lazy-load do SDK live (mock cold start mais rápido)
- Workflows / AI Agent: erros via `AppError`
- Remoção de dep não usada (`long`); `google-auth-library` no root
- Limpeza de shims/orfaos e alinhamento de env/docs

### Requirements
- Node.js >= 22
