# CURSOR_SETUP.md — Marketing Brain MCP no Cursor Desktop

**Versão:** 1.0.0  
**Transport:** `StdioServerTransport` (sem porta HTTP)

> Este monorepo **não** usa `dist/index.js` nem `dist/mcp/tools.js` na raiz.  
> Cada provider é um servidor STDIO em `mcp-*/dist/...`.

---

## Pré-requisitos

Na pasta do projeto (exemplo Windows):

```bat
cd E:\marketing-brain
npm install
npm run build
npm run check:entries
```

Confirme que existem:

- `E:\marketing-brain\mcp-google-ads\dist\index.js`
- `E:\marketing-brain\mcp-meta-ads\dist\index.js`
- `E:\marketing-brain\mcp-whatsapp\dist\server.js`

Se a pasta for outra (ex. `E:\marketing-brain-mcp`), use **esse** caminho como Working Directory — o importante é ser a **raiz do monorepo** (onde está `package.json`).

---

## Opção A — ficheiro do projeto (recomendado)

```bat
cd E:\marketing-brain
copy .cursor\mcp.json.example .cursor\mcp.json
```

No Cursor: abra a pasta `E:\marketing-brain` → **Settings → MCP → Refresh**.  
Devem aparecer **6 servers / 71 tools**.

---

## Opção B — Add Server (um servidor)

### Google Ads (começar por aqui)

| Campo | Valor |
|--------|--------|
| **Nome do servidor** | `Marketing Brain` (ou `marketing-brain-google-ads`) |
| **Type** | command |
| **Command** | `node` |
| **Working Directory** | `E:\marketing-brain` |
| **Arguments** | `mcp-google-ads\dist\index.js` |

**Não use**

- `E:\marketing-brain\dist\index.js`
- `dist\index.js`
- `dist\mcp\tools.js`

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

```text
GOOGLE_ADS_LIVE_AUTH=1
GOOGLE_ADS_SKIP_AUTH_VALIDATE=false
GOOGLE_ADS_FORCE_MOCK=false
```

(+ secrets reais no env / `.env`)

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

## Erros comuns

| Sintoma | Causa | Correção |
|---------|--------|----------|
| 0 tools / server red | Args = `dist\index.js` | Use `mcp-google-ads\dist\index.js` |
| ficheiro não encontrado | Sem `npm run build` | `npm run build` + `npm run check:entries` |
| “parece travado” | STDIO à espera | Normal — sem porta HTTP |
| pasta errada | Abriu outro diretório | Open Folder = raiz com `package.json` |

---

## Como validar a conexão

```bat
cd E:\marketing-brain
npm run check:entries
npm run mcp:smoke
npm run mcp:client
npm run doctor
```

No Cursor: server verde → chame `list_campaigns`.

---

## Como listar / testar Tools

```bat
npm run tools:report
npm run mcp:discover
npm run mcp:client
npm run inspect
```

Inventário: `TOOLS_REPORT.md` (**71** tools).

---

## Comportamento esperado

- Sem porta HTTP  
- Logs em **stderr**  
- Processo à espera no stdin após o banner — **normal**
