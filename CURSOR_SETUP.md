# CURSOR_SETUP.md — Marketing Brain MCP no Cursor Desktop

**Versão:** 1.0.0  
**Transport:** `StdioServerTransport` (sem porta HTTP)

> Este monorepo **não** usa `dist/index.js` nem `dist/mcp/tools.js` na raiz.  
> Cada provider é um servidor STDIO em `mcp-*/dist/...`.

---

## Pré-requisitos

```bash
cd E:\marketing-brain-mcp
npm install
npm run build
```

Confirme que existem, por exemplo:

- `mcp-google-ads\dist\index.js`
- `mcp-meta-ads\dist\index.js`
- `mcp-whatsapp\dist\server.js`

---

## Opção A — ficheiro do projeto (recomendado)

```bash
cp .cursor/mcp.json.example .cursor/mcp.json
```

No Cursor: **Settings → MCP → Refresh**. Devem aparecer **6 servers / 71 tools**.

---

## Opção B — Add Server (um servidor)

### Google Ads (começar por aqui)

| Campo | Valor |
|--------|--------|
| **Nome do servidor** | `Marketing Brain` (ou `marketing-brain-google-ads`) |
| **Type** | command |
| **Command** | `node` |
| **Working Directory** | `E:\marketing-brain-mcp` |
| **Arguments** | `mcp-google-ads\dist\index.js` |

**Não use** `dist\index.js` na raiz.

### Variáveis de ambiente (mock / desenvolvimento)

```text
MCP_STDIO_SAFE=true
GOOGLE_ADS_CLIENT_ID=dev-client-id
GOOGLE_ADS_CLIENT_SECRET=dev-client-secret
GOOGLE_ADS_REFRESH_TOKEN=dev-refresh-token
GOOGLE_ADS_DEVELOPER_TOKEN=dev-developer-token
GOOGLE_ADS_CUSTOMER_ID=1234567890
GOOGLE_ADS_SKIP_AUTH_VALIDATE=true
GOOGLE_ADS_FORCE_MOCK=true
GOOGLE_ADS_LIVE_AUTH=0
```

### Live (conta real)

Preencha secrets reais; remova mock; use:

```text
GOOGLE_ADS_LIVE_AUTH=1
GOOGLE_ADS_SKIP_AUTH_VALIDATE=false
GOOGLE_ADS_FORCE_MOCK=false
```

---

## Outros Arguments (mesmo Working Directory)

| Servidor | Arguments |
|----------|-----------|
| Meta Ads | `mcp-meta-ads\dist\index.js` |
| WhatsApp | `mcp-whatsapp\dist\server.js` |
| Insights | `mcp-insights\dist\server.js` |
| AI Agent | `mcp-ai-agent\dist\server.js` |
| Workflows | `mcp-workflows\dist\server.js` |

---

## Como validar a conexão

1. Settings → MCP → o server deve ficar **verde / connected**
2. Ou na raiz do repo:

```bash
npm run mcp:smoke
npm run mcp:client
```

3. Arranque local com logs:

```bash
npm run dev
```

Deve mostrar: versão, quantidade de tools, “Aguardando conexão via STDIO”, “Cliente conectado”.

---

## Como listar Tools

No Cursor: painel MCP / chat com tools do server.  
Localmente:

```bash
npm run tools:report
npm run mcp:discover
```

Inventário: `TOOLS_REPORT.md` (**71** tools).

---

## Como testar uma Tool

No Cursor: chame `list_campaigns` (Google/Meta) ou `list_templates` (WhatsApp stub).

Localmente:

```bash
npm run mcp:client
npm run mcp:tools
```

Inspector:

```bash
npm run inspect
# ou
npm run inspect -- mcp-meta-ads/dist/index.js
```

---

## Comportamento esperado

- Sem porta HTTP
- Logs em **stderr**
- Processo à espera no stdin após o banner — **normal**
