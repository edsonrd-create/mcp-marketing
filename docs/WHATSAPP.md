# WhatsApp Business MCP Provider (Master Prompt v2 — Phase 4)

## Setup

```bash
cp .env.example .env
```

Required:

- `WHATSAPP_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`

Optional:

- `WHATSAPP_API_VERSION` (default `v21.0`)
- `WHATSAPP_STUB=true` — offline smoke (no Graph calls)
- `WHATSAPP_VERIFY_TOKEN` — webhook verification (default `marketing-brain`)

```bash
npm run build
npm run start:whatsapp
```

## Tools (10)

| Tool | Notes |
|------|-------|
| `send_template` | Master Prompt |
| `send_campaign` | Master Prompt |
| `send_birthday` | Master Prompt alias |
| `list_templates` | Master Prompt |
| `get_message_status` | Master Prompt |
| `validate_webhook` | Master Prompt |
| `send_birthday_message` | Legacy (kept) |
| `send_coupon` | Legacy |
| `schedule_message` | Queue/scheduler |
| `order_confirmation` | Legacy |

## Validation

```bash
npm run test -w @mcp-marketing/whatsapp
npm run mcp:smoke
```
