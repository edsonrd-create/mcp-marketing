# MCP Tools Report

**Product:** Marketing Brain v1.0.0 LTS
**Generated:** 2026-08-04T01:42:41.921Z
**Expected tools:** 71
**Calls recorded:** 73
**PASS:** 73 · **ERROR:** 0 · **FAIL:** 0

> Test harness uses placeholder credentials and `WHATSAPP_STUB=true` (no live network).

| Package | Tool | Status | Time (ms) | Result |
|---------|------|--------|----------:|--------|
| `@mcp-marketing/google-ads` | `list_campaigns` | PASS | 5 | { "campaigns": [ { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, { "id": "1002", "name": "Retargeting", "status": "PAUSED", "budget |
| `@mcp-marketing/google-ads` | `get_campaign` | PASS | 2 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `create_campaign` | PASS | 2 | { "campaign": { "id": "1003", "name": "MCP Smoke Campaign", "status": "ENABLED", "budgetMicros": 1000000, "channelType": "SEARCH" }, "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `pause_campaign` | PASS | 2 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "PAUSED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "action": "paused", "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `enable_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "action": "enabled", "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `update_budget` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 2000000, "channelType": "SEARCH" }, "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `search_keywords` | PASS | 1 | { "keywords": [ { "keyword": "marketing automation 1", "avgMonthlySearches": 1000, "competition": "LOW", "suggestedBidMicros": 500000 }, { "keyword": "marketing automation 2", "avgMonthlySearches": 20 |
| `@mcp-marketing/google-ads` | `campaign_report` | PASS | 1 | { "rows": [ { "campaignId": "1001", "campaignName": "Brand Awareness", "impressions": 10000, "clicks": 500, "costMicros": 1000000, "conversions": 25, "dateRange": "LAST_30_DAYS" }, { "campaignId": "10 |
| `@mcp-marketing/google-ads` | `list_customers` | PASS | 2 | { "customers": [ { "id": "1234567890", "descriptiveName": "Marketing Brain Demo Account", "currencyCode": "BRL", "timeZone": "America/Sao_Paulo", "manager": false }, { "id": "9999999999", "descriptive |
| `@mcp-marketing/google-ads` | `account_info` | PASS | 1 | { "account": { "customerId": "1234567890", "descriptiveName": "Marketing Brain Demo Account", "currencyCode": "BRL", "timeZone": "America/Sao_Paulo", "autoTaggingEnabled": true, "trackingUrlTemplate": |
| `@mcp-marketing/meta-ads` | `list_accounts` | PASS | 3 | { "accounts": [ { "id": "act_smoke_123", "name": "Primary Ad Account", "accountStatus": 1 } ], "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `list_campaigns` | PASS | 1 | { "campaigns": [ { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, { "id": "2002", "name": "Meta Retargeting", "status": "PAUSED", " |
| `@mcp-marketing/meta-ads` | `get_campaign` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `create_campaign` | PASS | 1 | { "campaign": { "id": "2003", "name": "Meta Smoke", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 50 }, "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `pause_campaign` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "PAUSED", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, "action": "paused", "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `enable_campaign` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, "action": "enabled", "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `resume_campaign` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, "action": "resumed", "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `update_budget` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 80 }, "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `get_insights` | PASS | 1 | { "insights": [ { "campaignId": "2001", "impressions": 8000, "clicks": 400, "spend": 560, "reach": 5000, "ctr": 0.05 } ], "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `list_audiences` | PASS | 1 | { "audiences": [ { "id": "3001", "name": "Lookalike Purchasers", "subtype": "LOOKALIKE", "approximateCount": 250000 } ], "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `account_info` | PASS | 1 | { "account": { "id": "act_smoke_123", "name": "Primary Ad Account", "currency": "BRL", "timezone": "America/Sao_Paulo", "mode": "mock" }, "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `create_audience` | PASS | 1 | { "audience": { "id": "3002", "name": "Smoke Audience", "subtype": "CUSTOM", "approximateCount": 1000 }, "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `create_ad` | PASS | 1 | { "ad": { "id": "4001", "name": "Smoke Ad", "campaignId": "2001", "creativeBody": "Try Marketing Brain", "status": "ACTIVE" }, "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/meta-ads` | `get_metrics` | PASS | 1 | { "metrics": [ { "campaignId": "2001", "impressions": 8000, "clicks": 400, "spend": 560, "reach": 5000, "ctr": 0.05 } ], "adAccountId": "act_smoke_123" } |
| `@mcp-marketing/whatsapp` | `send_birthday_message` | PASS | 3 | { "tool": "send_birthday_message", "messageId": "stub_1785807761265", "to": "+5511999999999", "status": "sent", "body": "Feliz aniversário, Smoke User! 🎂 Use o cupom SMOKE10 na sua próxima compra.",  |
| `@mcp-marketing/whatsapp` | `send_birthday` | PASS | 1 | { "tool": "send_birthday", "messageId": "stub_1785807761266", "to": "+5511999999999", "status": "sent", "body": "Feliz aniversário, Smoke User! 🎂 Use o cupom SMOKE10 na sua próxima compra.", "sentAt" |
| `@mcp-marketing/whatsapp` | `send_coupon` | PASS | 1 | { "tool": "send_coupon", "messageId": "stub_1785807761267", "to": "+5511999999999", "status": "sent", "body": "🎁 Cupom exclusivo: SAVE20 — 20% OFF.", "sentAt": "2026-08-04T01:42:41.267Z" } |
| `@mcp-marketing/whatsapp` | `send_campaign` | PASS | 1 | { "tool": "send_campaign", "campaignId": "camp-smoke", "messageId": "stub_1785807761268", "to": "+5511999999999", "status": "sent", "body": "[camp-smoke] Smoke campaign message", "sentAt": "2026-08-04 |
| `@mcp-marketing/whatsapp` | `send_template` | PASS | 1 | { "tool": "send_template", "templateName": "hello_world", "messageId": "stub_1785807761269", "to": "+5511999999999", "status": "sent", "body": "template:hello_world", "sentAt": "2026-08-04T01:42:41.26 |
| `@mcp-marketing/whatsapp` | `schedule_message` | PASS | 1 | { "tool": "schedule_message", "scheduled": { "id": "46670e8b-365c-4b47-91e4-3c85ce16c93d", "channel": "whatsapp", "recipient": "+5511999999999", "body": "Scheduled smoke message", "scheduledAt": "2026 |
| `@mcp-marketing/whatsapp` | `order_confirmation` | PASS | 1 | { "tool": "order_confirmation", "orderId": "ORD-SMOKE-1", "messageId": "stub_1785807761271", "to": "+5511999999999", "status": "sent", "body": "✅ Pedido ORD-SMOKE-1 confirmado! Total: R$ 99,90.\nItens |
| `@mcp-marketing/whatsapp` | `list_templates` | PASS | 1 | { "tool": "list_templates", "templates": [ { "name": "hello_world", "language": "en_US", "status": "APPROVED", "category": "UTILITY" }, { "name": "birthday_offer", "language": "pt_BR", "status": "APPR |
| `@mcp-marketing/whatsapp` | `get_message_status` | PASS | 1 | { "tool": "get_message_status", "messageId": "stub_missing", "status": null } |
| `@mcp-marketing/whatsapp` | `validate_webhook` | PASS | 1 | { "tool": "validate_webhook", "ok": true, "challenge": "12345" } |
| `@mcp-marketing/insights` | `analyze_insights` | PASS | 6 | { "tool": "analyze_insights", "count": 2, "insights": [ { "id": "0084282c-6b59-4dbf-83dd-0548b10e744d", "severity": "info", "category": "profitability", "title": "Strong ROAS performance", "descriptio |
| `@mcp-marketing/insights` | `get_health_scores` | PASS | 1 | { "tool": "get_health_scores", "scores": [] } |
| `@mcp-marketing/insights` | `list_recommendations` | PASS | 1 | { "tool": "list_recommendations", "recommendations": [] } |
| `@mcp-marketing/insights` | `get_executive_dashboard` | PASS | 1 | { "tool": "get_executive_dashboard", "dashboard": { "summary": { "campaigns": 0, "totalSpend": 0, "totalRevenue": 0, "totalConversions": 0, "totalClicks": 0, "overallRoas": 0, "overallCpa": 0, "overal |
| `@mcp-marketing/insights` | `list_timeline_events` | PASS | 1 | { "tool": "list_timeline_events", "events": [ { "id": "d29a478a-fa54-4bdc-acd8-1bfb214cf62e", "type": "smoke_test", "title": "MCP tools smoke", "description": "Generated by npm run mcp:tools", "campai |
| `@mcp-marketing/insights` | `record_timeline_event` | PASS | 3 | { "tool": "record_timeline_event", "event": { "id": "dad12201-d94e-4553-bfb0-933462531c8e", "type": "smoke_test", "title": "MCP tools smoke", "description": "Generated by npm run mcp:tools", "campaign |
| `@mcp-marketing/insights` | `get_health_center` | PASS | 1 | { "tool": "get_health_center", "healthCenter": { "overallScore": 0, "gradeDistribution": { "A": 0, "B": 0, "C": 0, "D": 0, "F": 0 }, "campaigns": [], "alerts": [], "updatedAt": "2026-08-04T01:42:41.47 |
| `@mcp-marketing/insights` | `generate_report` | PASS | 1 | { "tool": "generate_report", "report": { "title": "Marketing Brain Insights Report", "generatedAt": "2026-08-04T01:42:41.476Z", "dashboard": { "summary": { "campaigns": 0, "totalSpend": 0, "totalReven |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 5 | { "tool": "chat", "message": { "id": "a43f5c45-9541-4f02-98bd-9bf4ecc0ed32", "role": "assistant", "content": "Hello! I'm the Marketing Brain agent. I can help with campaigns, budgets, reports, and wor |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 2 | { "tool": "chat", "message": { "id": "d3d3f60c-25d0-4eef-90c2-8f7b4730e653", "role": "assistant", "content": "I can pause the campaign. Please confirm to proceed.", "timestamp": "2026-08-04T01:42:41.6 |
| `@mcp-marketing/ai-agent` | `list_pending_approvals` | PASS | 1 | { "tool": "list_pending_approvals", "pending": [ { "id": "e32983c0-8b87-4bc6-813b-15644f8d7512", "type": "pause_campaign", "description": "I can pause the campaign. Please confirm to proceed.", "paylo |
| `@mcp-marketing/ai-agent` | `get_agent_history` | PASS | 1 | { "tool": "get_agent_history", "history": [ { "id": "447ce2eb-937c-4676-bd3a-2c071f56a8e8", "role": "user", "content": "hello", "timestamp": "2026-08-03T23:20:09.625Z", "sessionId": "smoke-session" }, |
| `@mcp-marketing/ai-agent` | `get_ai_summary` | PASS | 1 | { "tool": "get_ai_summary", "summary": { "totalMessages": 46, "pendingApprovals": 1, "confirmedActions": 6, "cancelledActions": 6, "recentTopics": [ "please pause campaign Brand Awareness", "What is m |
| `@mcp-marketing/ai-agent` | `list_audit_logs` | PASS | 1 | { "tool": "list_audit_logs", "logs": [ { "id": "c6135c1e-68c8-4dc2-a699-16d47b8725eb", "action": "action_cancelled", "actor": "user", "details": { "actionId": "088a0903-e588-4028-9c3e-4d470077fa0f", " |
| `@mcp-marketing/ai-agent` | `analyze_campaigns` | PASS | 1 | { "tool": "analyze_campaigns", "campaignCount": 2, "recommendations": [ { "id": "14ea1d1b-6758-4b02-b341-c545a2273e9c", "type": "budget", "priority": "low", "title": "Scale Summer Sale", "description" |
| `@mcp-marketing/ai-agent` | `optimize_budget` | PASS | 1 | { "tool": "optimize_budget", "totalBudget": 10000, "allocations": [ { "campaignId": "camp-001", "name": "Summer Sale", "suggestedBudget": 9000, "rationale": "High ROAS — allocate proportionally more b |
| `@mcp-marketing/ai-agent` | `generate_report` | PASS | 1 | { "tool": "generate_report", "report": { "title": "Marketing Brain Agent Report", "generatedAt": "2026-08-04T01:42:41.681Z", "summary": { "campaignCount": 2, "totalSpend": 7000, "totalRevenue": 18800, |
| `@mcp-marketing/ai-agent` | `analyze_customers` | PASS | 1 | { "tool": "analyze_customers", "segmentCount": 3, "insights": [ { "segmentId": "seg-001", "name": "High-Value Repeat Buyers", "customerCount": 1250, "ltv": 450, "conversionRate": 0.08, "recommendation |
| `@mcp-marketing/ai-agent` | `suggest_actions` | PASS | 1 | { "tool": "suggest_actions", "count": 3, "actions": [ { "id": "13467d62-ae47-46a9-b93c-13ae73c586a6", "type": "budget", "priority": "high", "title": "Pause or restructure Retargeting", "description":  |
| `@mcp-marketing/ai-agent` | `summarize_account` | PASS | 0 | { "tool": "summarize_account", "summary": { "campaignCount": 2, "totalSpend": 7000, "totalRevenue": 18800, "totalConversions": 310, "totalClicks": 8000, "overallRoas": 2.6857142857142855, "overallCpa" |
| `@mcp-marketing/ai-agent` | `marketing_chat` | PASS | 1 | { "tool": "marketing_chat", "message": { "id": "b811cdbd-4662-4d04-b664-e7f3ff861104", "role": "assistant", "content": "I understand your request. For detailed analytics, use the Insights MCP tools. F |
| `@mcp-marketing/ai-agent` | `confirm_action` | PASS | 1 | { "tool": "confirm_action", "action": { "id": "e32983c0-8b87-4bc6-813b-15644f8d7512", "type": "pause_campaign", "description": "I can pause the campaign. Please confirm to proceed.", "payload": { "ori |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 1 | { "tool": "chat", "message": { "id": "ab64c73e-0744-4c11-b067-2e4c44545a90", "role": "assistant", "content": "I can help launch a campaign. This action requires approval before execution.", "timestamp |
| `@mcp-marketing/ai-agent` | `cancel_action` | PASS | 1 | { "tool": "cancel_action", "action": { "id": "46ab869e-736f-4e4e-8ef7-f88a68f3dc1f", "type": "launch_campaign", "description": "I can help launch a campaign. This action requires approval before execu |
| `@mcp-marketing/workflows` | `list_workflows` | PASS | 4 | { "tool": "list_workflows", "workflows": [ { "id": "73ec5051-61ef-4521-9bb2-3e5f68bb8e82", "name": "Birthday Smoke", "description": "Send a birthday WhatsApp message with optional coupon", "status": " |
| `@mcp-marketing/workflows` | `create_workflow` | PASS | 4 | { "tool": "create_workflow", "workflow": { "id": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f", "name": "Smoke Workflow", "description": "Created by mcp:tools", "status": "active", "trigger": { "type": "manu |
| `@mcp-marketing/workflows` | `list_workflow_templates` | PASS | 2 | { "tool": "list_workflow_templates", "templates": [ { "id": "tpl-birthday", "name": "Birthday Message", "description": "Send a birthday WhatsApp message with optional coupon", "category": "whatsapp",  |
| `@mcp-marketing/workflows` | `create_workflow_from_template` | PASS | 1 | { "tool": "create_workflow_from_template", "workflow": { "id": "3cef1665-c2c0-4a82-8db7-1dd59d9a39a9", "name": "Birthday Smoke", "description": "Send a birthday WhatsApp message with optional coupon", |
| `@mcp-marketing/workflows` | `run_due_workflows` | PASS | 2 | { "tool": "run_due_workflows", "count": 0, "executions": [] } |
| `@mcp-marketing/workflows` | `list_workflow_executions` | PASS | 1 | { "tool": "list_workflow_executions", "executions": [ { "id": "22e7090f-bdd7-4d17-996d-34de1a77bdc8", "workflowId": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "status": "completed", "startedAt": "2026-08 |
| `@mcp-marketing/workflows` | `list_workflow_audit_logs` | PASS | 1 | { "tool": "list_workflow_audit_logs", "logs": [ { "id": "8d3737b6-2047-4cce-a1f9-20aef2327b18", "workflowId": "8333c480-0eb1-42b3-b221-72be9bda1240", "action": "workflow_updated", "actor": "system", " |
| `@mcp-marketing/workflows` | `update_workflow` | PASS | 1 | { "tool": "update_workflow", "workflow": { "id": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "active", "trigger": { "type |
| `@mcp-marketing/workflows` | `duplicate_workflow` | PASS | 2 | { "tool": "duplicate_workflow", "workflow": { "id": "2bcf0a55-80e1-477f-85e5-6d9219026531", "name": "Smoke Workflow Updated (copy)", "description": "Created by mcp:tools", "status": "draft", "trigger" |
| `@mcp-marketing/workflows` | `run_workflow` | PASS | 1 | { "tool": "run_workflow", "execution": { "id": "0b720068-1fd3-4687-9a5f-89fdbb7a9b05", "workflowId": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f", "status": "completed", "startedAt": "2026-08-04T01:42:41.90 |
| `@mcp-marketing/workflows` | `execute_workflow` | PASS | 1 | { "tool": "execute_workflow", "execution": { "id": "7580eed2-d17c-4711-b0d4-b7f0fd677f2a", "workflowId": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f", "status": "completed", "startedAt": "2026-08-04T01:42:4 |
| `@mcp-marketing/workflows` | `pause_workflow` | PASS | 1 | { "tool": "pause_workflow", "workflow": { "id": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "paused", "trigger": { "type" |
| `@mcp-marketing/workflows` | `resume_workflow` | PASS | 1 | { "tool": "resume_workflow", "workflow": { "id": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "active", "trigger": { "type |
| `@mcp-marketing/workflows` | `recover_workflow_execution` | PASS | 1 | error: Execution not found: nonexistent-execution |
| `@mcp-marketing/workflows` | `delete_workflow` | PASS | 1 | { "tool": "delete_workflow", "deleted": true, "workflowId": "ce6b50c2-fb78-4fb6-a9f1-2e123cb9231f" } |

## Summary by package

### @mcp-marketing/google-ads

- `list_campaigns`: PASS (5ms)
- `get_campaign`: PASS (2ms)
- `create_campaign`: PASS (2ms)
- `pause_campaign`: PASS (2ms)
- `enable_campaign`: PASS (1ms)
- `update_budget`: PASS (1ms)
- `campaign_report`: PASS (1ms)
- `search_keywords`: PASS (1ms)
- `list_customers`: PASS (2ms)
- `account_info`: PASS (1ms)

### @mcp-marketing/meta-ads

- `list_accounts`: PASS (3ms)
- `list_campaigns`: PASS (1ms)
- `get_campaign`: PASS (1ms)
- `create_campaign`: PASS (1ms)
- `pause_campaign`: PASS (1ms)
- `enable_campaign`: PASS (1ms)
- `update_budget`: PASS (1ms)
- `get_insights`: PASS (1ms)
- `list_audiences`: PASS (1ms)
- `account_info`: PASS (1ms)
- `resume_campaign`: PASS (1ms)
- `create_audience`: PASS (1ms)
- `create_ad`: PASS (1ms)
- `get_metrics`: PASS (1ms)

### @mcp-marketing/whatsapp

- `send_birthday_message`: PASS (3ms)
- `send_birthday`: PASS (1ms)
- `send_coupon`: PASS (1ms)
- `send_campaign`: PASS (1ms)
- `send_template`: PASS (1ms)
- `schedule_message`: PASS (1ms)
- `order_confirmation`: PASS (1ms)
- `list_templates`: PASS (1ms)
- `get_message_status`: PASS (1ms)
- `validate_webhook`: PASS (1ms)

### @mcp-marketing/insights

- `analyze_insights`: PASS (6ms)
- `get_health_scores`: PASS (1ms)
- `list_recommendations`: PASS (1ms)
- `get_executive_dashboard`: PASS (1ms)
- `list_timeline_events`: PASS (1ms)
- `record_timeline_event`: PASS (3ms)
- `get_health_center`: PASS (1ms)
- `generate_report`: PASS (1ms)

### @mcp-marketing/ai-agent

- `chat`: PASS (5ms)
- `list_pending_approvals`: PASS (1ms)
- `confirm_action`: PASS (1ms)
- `cancel_action`: PASS (1ms)
- `get_agent_history`: PASS (1ms)
- `get_ai_summary`: PASS (1ms)
- `list_audit_logs`: PASS (1ms)
- `analyze_campaigns`: PASS (1ms)
- `optimize_budget`: PASS (1ms)
- `generate_report`: PASS (1ms)
- `analyze_customers`: PASS (1ms)
- `suggest_actions`: PASS (1ms)
- `summarize_account`: PASS (0ms)
- `marketing_chat`: PASS (1ms)

### @mcp-marketing/workflows

- `list_workflows`: PASS (4ms)
- `create_workflow`: PASS (4ms)
- `update_workflow`: PASS (1ms)
- `duplicate_workflow`: PASS (2ms)
- `pause_workflow`: PASS (1ms)
- `delete_workflow`: PASS (1ms)
- `run_workflow`: PASS (1ms)
- `execute_workflow`: PASS (1ms)
- `resume_workflow`: PASS (1ms)
- `run_due_workflows`: PASS (2ms)
- `recover_workflow_execution`: PASS (1ms)
- `list_workflow_templates`: PASS (2ms)
- `create_workflow_from_template`: PASS (1ms)
- `list_workflow_executions`: PASS (1ms)
- `list_workflow_audit_logs`: PASS (1ms)

## Criterion

- Servers started via stdio MCP client: yes
- Tools covered: 71
- Report generated: yes

