# MCP Inspector — Marketing Brain MCP

Guia para inspecionar os servidores STDIO com o [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

## Pré-requisitos

```bash
npm install
npm run build
cp .env.example .env   # opcional para mock; obrigatório para live
```

Node.js ≥ 22.

## Arranque (UI)

Na raiz do repositório:

```bash
npx @modelcontextprotocol/inspector \
  node ./mcp-google-ads/dist/index.js
```

### Parâmetros recomendados

| Campo | Valor |
|-------|--------|
| Transport | **STDIO** |
| Command | `node` |
| Arguments | `./mcp-google-ads/dist/index.js` (ou outro `dist` server) |
| Working directory | raiz do repo (`/absolute/path/to/mcp-marketing`) |
| Env | ver tabela abaixo |

### Variáveis de ambiente (mock / smoke)

**Google Ads**

```bash
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

**Meta Ads**

```bash
npx @modelcontextprotocol/inspector node ./mcp-meta-ads/dist/index.js
```

```text
MCP_STDIO_SAFE=true
META_ACCESS_TOKEN=dev-meta-token
META_AD_ACCOUNT_ID=act_dev
META_SKIP_AUTH_VALIDATE=true
META_FORCE_MOCK=true
```

**WhatsApp**

```bash
npx @modelcontextprotocol/inspector node ./mcp-whatsapp/dist/server.js
```

```text
MCP_STDIO_SAFE=true
WHATSAPP_TOKEN=dev-wa-token
WHATSAPP_PHONE_NUMBER_ID=dev-phone
WHATSAPP_STUB=true
```

## Exemplos de chamadas

### Google Ads — listar campanhas

- Tool: `list_campaigns`
- Arguments: `{}`

### Google Ads — relatório

- Tool: `campaign_report`
- Arguments: `{ "date_range": "LAST_30_DAYS" }`

### Meta Ads — insights

- Tool: `get_insights`
- Arguments: `{ "campaign_id": "2001" }`

### WhatsApp — templates

- Tool: `list_templates`
- Arguments: `{}`

## Verificação rápida sem UI

```bash
npm run mcp:smoke
npm run mcp:client
npm run mcp:discover
npm run mcp:tools
```

## Notas

- O Inspector fala MCP via STDIO — **não há porta HTTP** no servidor Marketing Brain MCP.
- Logs de arranque/execução aparecem em **stderr**; o stdout é o protocolo JSON-RPC.
- Se o processo “ficar parado” após o health banner, está **à espera do cliente** (esperado).
