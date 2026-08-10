# API — Marketing Brain MCP

Marketing Brain exposes **MCP tools over stdio** (primary) and a small **HTTP shell** for health/status.

## HTTP shell

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | App info + framework registry counts |
| GET | `/health` | Provider health (Online / Offline / Configuração inválida) |
| GET | `/ready` | Readiness (MCP dist entrypoints) |

```bash
npm run dev
curl http://127.0.0.1:3000/health
```

## MCP tools (71)

### Google Ads (10)

`list_campaigns` · `get_campaign` · `create_campaign` · `pause_campaign` · `enable_campaign` · `update_budget` · `campaign_report` · `search_keywords` · `list_customers` · `account_info`

### Meta Ads (14)

Master: `list_accounts` · `list_campaigns` · `get_campaign` · `create_campaign` · `pause_campaign` · `enable_campaign` · `update_budget` · `get_insights` · `list_audiences` · `account_info`  

Legacy: `resume_campaign` · `create_audience` · `create_ad` · `get_metrics`

### WhatsApp (10)

Master: `send_template` · `send_campaign` · `send_birthday` · `list_templates` · `get_message_status` · `validate_webhook`  

Legacy: `send_birthday_message` · `send_coupon` · `schedule_message` · `order_confirmation`

### Insights (8)

`analyze_insights` · `get_health_scores` · `list_recommendations` · `get_executive_dashboard` · `list_timeline_events` · `record_timeline_event` · `get_health_center` · `generate_report`

### AI Agent (14)

Legacy: `chat` · `list_pending_approvals` · `confirm_action` · `cancel_action` · `get_agent_history` · `get_ai_summary` · `list_audit_logs`  

Master: `analyze_campaigns` · `optimize_budget` · `generate_report` · `analyze_customers` · `suggest_actions` · `summarize_account` · `marketing_chat`

### Workflows (15)

Core: `create_workflow` · `execute_workflow` · `run_workflow` · `pause_workflow` · `resume_workflow` · `delete_workflow` · `run_due_workflows`  

Plus: `list_workflows` · `update_workflow` · `duplicate_workflow` · `recover_workflow_execution` · `list_workflow_templates` · `create_workflow_from_template` · `list_workflow_executions` · `list_workflow_audit_logs`

## Errors

Structured via `AppError` / `ValidationError` / `ExternalApiError` (`@mcp-marketing/shared`). MCP tools return structured JSON content with error wrapping.

## Auth

Configured only through environment variables — see [CONFIGURATION.md](CONFIGURATION.md). Never commit secrets.
