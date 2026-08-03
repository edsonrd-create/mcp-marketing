# Installation — Marketing Brain MCP

## Requirements

- Node.js **>= 22**
- npm 10+
- Git

## Install

```bash
git clone https://github.com/edsonrd-create/mcp-marketing.git
cd mcp-marketing
npm install
cp .env.example .env
npm run build
```

## Verify

```bash
npm run doctor
npm run health
npm run validate
npm run mcp:smoke
```

## Start

HTTP shell:

```bash
npm run dev
# or
npm start
```

MCP servers (stdio):

```bash
npm run start:google
npm run start:meta
npm run start:whatsapp
npm run start:insights
npm run start:ai-agent
npm run start:workflows
```

Client guides: [cursor.md](cursor.md), [claude.md](claude.md), [mcp-config.example.json](mcp-config.example.json).

## Production checklist

See [PRODUCTION_READINESS_REPORT.md](../PRODUCTION_READINESS_REPORT.md).
