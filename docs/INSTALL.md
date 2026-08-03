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

## Missing credentials

Empty values after `cp .env.example .env` are expected until live credentials are supplied. `npm run doctor` lists exactly which provider keys are missing. Root quickstart: [../INSTALL.md](../INSTALL.md).

## Production checklist

See [PRODUCTION_FINAL_REPORT.md](../PRODUCTION_FINAL_REPORT.md) and [PRODUCTION_READINESS_REPORT.md](../PRODUCTION_READINESS_REPORT.md).
