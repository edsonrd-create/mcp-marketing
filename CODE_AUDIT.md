# CODE_AUDIT.md — Marketing Brain MCP v1.0.0

**Date:** 2026-08-04  
**Branch:** `cursor/v1-production-ready-d0d2`

## Scope

Auditoria da estrutura, imports, dependências, código morto, segurança e compatibilidade entre módulos. Sem novas funcionalidades.

## Findings corrected

| Item | Action |
|------|--------|
| Dep `long` não usada (root) | Removida |
| `google-auth-library` só no workspace google | Adicionada no root |
| Shared build stale (`tsbuildinfo` sem `dist/`) | `tsc --build --force` |
| Shims mortos mcp-google/meta `*.service.ts` / auth re-exports | Removidos |
| Diretórios órfãos vazios (`repositories`, `types`, …) | Removidos |
| Middleware / doctor-banner não usados | Removidos |
| HTTP ecoava `AppError.details` sempre | Só em `VALIDATION` |
| OAuth Google logava `{ err }` bruto | Loga `errMessage` |
| WhatsApp verify token / Graph body | Env + sanitização |
| Workflows / AI Agent `throw new Error` | `AppError` |
| Google Ads SDK no cold start mock | Lazy `import()` do live client |
| Docs/env com `META_APP_*` não lidos | Removidos do example; `META_FORCE_MOCK` documentado |
| Versões 1.1.0 inconsistentes com meta v1.0.0 | Unificadas em **1.0.0** |

## Residual (aceitáveis / follow-up)

- Layout dual `src/providers/*` ↔ `mcp-*` (bundled por tsup) — refatoração maior fora do escopo
- `DATABASE_MODE=sqlite|postgres` e `FIREBASE_*` não implementados
- Loggers duplicados (shared vs `src/core/logging`) — cosmético
- `npm audit`: 3 vulnerabilidades transitivas (low/moderate)

## Module compatibility

| Module | Status |
|--------|--------|
| shared → all mcp-* | OK |
| google/meta providers → mcp packages | OK (bundle) |
| Core framework → health/doctor | OK |
| App HTTP shell → ConfigService/Zod | OK |

## Verdict

Código alinhado para **v1.0.0 Production Ready** em modo staged/mock.
