# Docker (brief)

Marketing Brain v1.1 LTS does not ship a production Dockerfile in this release. Recommended approach:

## Local development

Use Node 22+ directly:

```bash
npm install
npm run build
npm run start:google
```

## Container outline

1. Base image: `node:22-bookworm-slim`
2. Copy monorepo, run `npm ci && npm run build`
3. Mount `.env` at runtime (never bake secrets into images)
4. Expose MCP stdio transport via your orchestrator (Cursor, Claude Desktop, etc.)

## Health checks

```bash
npm run validate
npm run mcp:smoke
marketing-brain doctor
```

For LTS distribution packaging without Docker, use:

```bash
npm run package:release
```
