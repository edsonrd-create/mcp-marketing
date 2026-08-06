# MCP Tools Report

**Product:** Marketing Brain v1.0.0 LTS
**Generated:** 2026-08-04T00:01:13.785Z
**Expected tools:** 71
**Calls recorded:** 73
**PASS:** 73 · **ERROR:** 0 · **FAIL:** 0

> Test harness uses placeholder credentials and `WHATSAPP_STUB=true` (no live network).

| Package | Tool | Status | Time (ms) | Result |
|---------|------|--------|----------:|--------|
| `@mcp-marketing/google-ads` | `list_campaigns` | PASS | 4 | { "campaigns": [ { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, { "id": "1002", "name": "Retargeting", "status": "PAUSED", "budget |
| `@mcp-marketing/google-ads` | `get_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `create_campaign` | PASS | 1 | { "campaign": { "id": "1003", "name": "MCP Smoke Campaign", "status": "ENABLED", "budgetMicros": 1000000, "channelType": "SEARCH" }, "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `pause_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "PAUSED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "action": "paused", "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `enable_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "action": "enabled", "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `update_budget` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 2000000, "channelType": "SEARCH" }, "customerId": "1234567890" } |
| `@mcp-marketing/google-ads` | `search_keywords` | PASS | 1 | { "keywords": [ { "keyword": "marketing automation 1", "avgMonthlySearches": 1000, "competition": "LOW", "suggestedBidMicros": 500000 }, { "keyword": "marketing automation 2", "avgMonthlySearches": 20 |
| `@mcp-marketing/google-ads` | `campaign_report` | PASS | 1 | { "rows": [ { "campaignId": "1001", "campaignName": "Brand Awareness", "impressions": 10000, "clicks": 500, "costMicros": 1000000, "conversions": 25, "dateRange": "LAST_30_DAYS" }, { "campaignId": "10 |
| `@mcp-marketing/google-ads` | `list_customers` | PASS | 1 | { "customers": [ { "id": "1234567890", "descriptiveName": "Marketing Brain Demo Account", "currencyCode": "BRL", "timeZone": "America/Sao_Paulo", "manager": false }, { "id": "9999999999", "descriptive |
| `@mcp-marketing/google-ads` | `account_info` | PASS | 1 | { "account": { "customerId": "1234567890", "descriptiveName": "Marketing Brain Demo Account", "currencyCode": "BRL", "timeZone": "America/Sao_Paulo", "autoTaggingEnabled": true, "trackingUrlTemplate": |
| `@mcp-marketing/meta-ads` | `list_accounts` | PASS | 4 | { "accounts": [ { "id": "act_smoke_123", "name": "Primary Ad Account", "accountStatus": 1 } ], "adAccountId": "act_smoke_123" } |
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
| `@mcp-marketing/whatsapp` | `send_birthday_message` | PASS | 3 | { "tool": "send_birthday_message", "messageId": "stub_1785801672925", "to": "+5511999999999", "status": "sent", "body": "Feliz aniversário, Smoke User! 🎂 Use o cupom SMOKE10 na sua próxima compra.",  |
| `@mcp-marketing/whatsapp` | `send_birthday` | PASS | 1 | { "tool": "send_birthday", "messageId": "stub_1785801672927", "to": "+5511999999999", "status": "sent", "body": "Feliz aniversário, Smoke User! 🎂 Use o cupom SMOKE10 na sua próxima compra.", "sentAt" |
| `@mcp-marketing/whatsapp` | `send_coupon` | PASS | 1 | { "tool": "send_coupon", "messageId": "stub_1785801672928", "to": "+5511999999999", "status": "sent", "body": "🎁 Cupom exclusivo: SAVE20 — 20% OFF.", "sentAt": "2026-08-04T00:01:12.928Z" } |
| `@mcp-marketing/whatsapp` | `send_campaign` | PASS | 1 | { "tool": "send_campaign", "campaignId": "camp-smoke", "messageId": "stub_1785801672928", "to": "+5511999999999", "status": "sent", "body": "[camp-smoke] Smoke campaign message", "sentAt": "2026-08-04 |
| `@mcp-marketing/whatsapp` | `send_template` | PASS | 1 | { "tool": "send_template", "templateName": "hello_world", "messageId": "stub_1785801672929", "to": "+5511999999999", "status": "sent", "body": "template:hello_world", "sentAt": "2026-08-04T00:01:12.92 |
| `@mcp-marketing/whatsapp` | `schedule_message` | PASS | 1 | { "tool": "schedule_message", "scheduled": { "id": "9a7a0dad-8da7-4dd5-a064-fae7a9ebacc2", "channel": "whatsapp", "recipient": "+5511999999999", "body": "Scheduled smoke message", "scheduledAt": "2026 |
| `@mcp-marketing/whatsapp` | `order_confirmation` | PASS | 1 | { "tool": "order_confirmation", "orderId": "ORD-SMOKE-1", "messageId": "stub_1785801672932", "to": "+5511999999999", "status": "sent", "body": "✅ Pedido ORD-SMOKE-1 confirmado! Total: R$ 99,90.\nItens |
| `@mcp-marketing/whatsapp` | `list_templates` | PASS | 1 | { "tool": "list_templates", "templates": [ { "name": "hello_world", "language": "en_US", "status": "APPROVED", "category": "UTILITY" }, { "name": "birthday_offer", "language": "pt_BR", "status": "APPR |
| `@mcp-marketing/whatsapp` | `get_message_status` | PASS | 1 | { "tool": "get_message_status", "messageId": "stub_missing", "status": null } |
| `@mcp-marketing/whatsapp` | `validate_webhook` | PASS | 1 | { "tool": "validate_webhook", "ok": true, "challenge": "12345" } |
| `@mcp-marketing/insights` | `analyze_insights` | PASS | 5 | { "tool": "analyze_insights", "count": 2, "insights": [ { "id": "447a4a44-7cb2-4a09-a84b-92e179c2a312", "severity": "info", "category": "profitability", "title": "Strong ROAS performance", "descriptio |
| `@mcp-marketing/insights` | `get_health_scores` | PASS | 1 | { "tool": "get_health_scores", "scores": [] } |
| `@mcp-marketing/insights` | `list_recommendations` | PASS | 1 | { "tool": "list_recommendations", "recommendations": [] } |
| `@mcp-marketing/insights` | `get_executive_dashboard` | PASS | 2 | { "tool": "get_executive_dashboard", "dashboard": { "summary": { "campaigns": 0, "totalSpend": 0, "totalRevenue": 0, "totalConversions": 0, "totalClicks": 0, "overallRoas": 0, "overallCpa": 0, "overal |
| `@mcp-marketing/insights` | `list_timeline_events` | PASS | 1 | { "tool": "list_timeline_events", "events": [ { "id": "d29a478a-fa54-4bdc-acd8-1bfb214cf62e", "type": "smoke_test", "title": "MCP tools smoke", "description": "Generated by npm run mcp:tools", "campai |
| `@mcp-marketing/insights` | `record_timeline_event` | PASS | 3 | { "tool": "record_timeline_event", "event": { "id": "e2e82656-8d74-4bf2-87e9-0698db425ee3", "type": "smoke_test", "title": "MCP tools smoke", "description": "Generated by npm run mcp:tools", "campaign |
| `@mcp-marketing/insights` | `get_health_center` | PASS | 1 | { "tool": "get_health_center", "healthCenter": { "overallScore": 0, "gradeDistribution": { "A": 0, "B": 0, "C": 0, "D": 0, "F": 0 }, "campaigns": [], "alerts": [], "updatedAt": "2026-08-04T00:01:13.15 |
| `@mcp-marketing/insights` | `generate_report` | PASS | 1 | { "tool": "generate_report", "report": { "title": "Marketing Brain Insights Report", "generatedAt": "2026-08-04T00:01:13.159Z", "dashboard": { "summary": { "campaigns": 0, "totalSpend": 0, "totalReven |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 4 | { "tool": "chat", "message": { "id": "7e6c7b73-2f80-4560-9b20-37238fd6abcf", "role": "assistant", "content": "Hello! I'm the Marketing Brain agent. I can help with campaigns, budgets, reports, and wor |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 1 | { "tool": "chat", "message": { "id": "0964ce70-8c17-4fc5-8455-c8d82bc74128", "role": "assistant", "content": "I can pause the campaign. Please confirm to proceed.", "timestamp": "2026-08-04T00:01:13.3 |
| `@mcp-marketing/ai-agent` | `list_pending_approvals` | PASS | 1 | { "tool": "list_pending_approvals", "pending": [ { "id": "9901a89a-6c06-4681-886f-82df2a263b2c", "type": "pause_campaign", "description": "I can pause the campaign. Please confirm to proceed.", "paylo |
| `@mcp-marketing/ai-agent` | `get_agent_history` | PASS | 1 | { "tool": "get_agent_history", "history": [ { "id": "8e990fa3-f450-4978-8f7b-b73b5ffc416c", "role": "user", "content": "hello", "timestamp": "2026-08-03T21:57:14.554Z", "sessionId": "smoke-session" }, |
| `@mcp-marketing/ai-agent` | `get_ai_summary` | PASS | 1 | { "tool": "get_ai_summary", "summary": { "totalMessages": 30, "pendingApprovals": 1, "confirmedActions": 4, "cancelledActions": 4, "recentTopics": [ "please pause campaign Brand Awareness", "What is m |
| `@mcp-marketing/ai-agent` | `list_audit_logs` | PASS | 1 | { "tool": "list_audit_logs", "logs": [ { "id": "45e50ee8-1cb6-4dad-917f-9394f0c04b8c", "action": "chat", "actor": "user", "details": { "sessionId": "smoke-session-2", "messageLength": 34 }, "timestamp |
| `@mcp-marketing/ai-agent` | `analyze_campaigns` | PASS | 1 | { "tool": "analyze_campaigns", "campaignCount": 2, "recommendations": [ { "id": "9ced3075-73db-4f12-aa34-8eda547a5158", "type": "budget", "priority": "low", "title": "Scale Summer Sale", "description" |
| `@mcp-marketing/ai-agent` | `optimize_budget` | PASS | 1 | { "tool": "optimize_budget", "totalBudget": 10000, "allocations": [ { "campaignId": "camp-001", "name": "Summer Sale", "suggestedBudget": 9000, "rationale": "High ROAS — allocate proportionally more b |
| `@mcp-marketing/ai-agent` | `generate_report` | PASS | 1 | { "tool": "generate_report", "report": { "title": "Marketing Brain Agent Report", "generatedAt": "2026-08-04T00:01:13.372Z", "summary": { "campaignCount": 2, "totalSpend": 7000, "totalRevenue": 18800, |
| `@mcp-marketing/ai-agent` | `analyze_customers` | PASS | 1 | { "tool": "analyze_customers", "segmentCount": 3, "insights": [ { "segmentId": "seg-001", "name": "High-Value Repeat Buyers", "customerCount": 1250, "ltv": 450, "conversionRate": 0.08, "recommendation |
| `@mcp-marketing/ai-agent` | `suggest_actions` | PASS | 1 | { "tool": "suggest_actions", "count": 3, "actions": [ { "id": "8d603b2a-c8c6-4435-aa4a-ea16320032fd", "type": "budget", "priority": "high", "title": "Pause or restructure Retargeting", "description":  |
| `@mcp-marketing/ai-agent` | `summarize_account` | PASS | 1 | { "tool": "summarize_account", "summary": { "campaignCount": 2, "totalSpend": 7000, "totalRevenue": 18800, "totalConversions": 310, "totalClicks": 8000, "overallRoas": 2.6857142857142855, "overallCpa" |
| `@mcp-marketing/ai-agent` | `marketing_chat` | PASS | 1 | { "tool": "marketing_chat", "message": { "id": "7fe49224-56ce-4b9f-a7d4-ee6d673de42e", "role": "assistant", "content": "I understand your request. For detailed analytics, use the Insights MCP tools. F |
| `@mcp-marketing/ai-agent` | `confirm_action` | PASS | 1 | { "tool": "confirm_action", "action": { "id": "9901a89a-6c06-4681-886f-82df2a263b2c", "type": "pause_campaign", "description": "I can pause the campaign. Please confirm to proceed.", "payload": { "ori |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 1 | { "tool": "chat", "message": { "id": "2c3a03af-fa4c-4c0f-8993-93073989b5e4", "role": "assistant", "content": "I can help launch a campaign. This action requires approval before execution.", "timestamp |
| `@mcp-marketing/ai-agent` | `cancel_action` | PASS | 1 | { "tool": "cancel_action", "action": { "id": "97d7ea9a-9dfb-4c5c-80c4-487967006b0a", "type": "launch_campaign", "description": "I can help launch a campaign. This action requires approval before execu |
| `@mcp-marketing/workflows` | `list_workflows` | PASS | 4 | { "tool": "list_workflows", "workflows": [ { "id": "73ec5051-61ef-4521-9bb2-3e5f68bb8e82", "name": "Birthday Smoke", "description": "Send a birthday WhatsApp message with optional coupon", "status": " |
| `@mcp-marketing/workflows` | `create_workflow` | PASS | 3 | { "tool": "create_workflow", "workflow": { "id": "8333c480-0eb1-42b3-b221-72be9bda1240", "name": "Smoke Workflow", "description": "Created by mcp:tools", "status": "active", "trigger": { "type": "manu |
| `@mcp-marketing/workflows` | `list_workflow_templates` | PASS | 2 | { "tool": "list_workflow_templates", "templates": [ { "id": "tpl-birthday", "name": "Birthday Message", "description": "Send a birthday WhatsApp message with optional coupon", "category": "whatsapp",  |
| `@mcp-marketing/workflows` | `create_workflow_from_template` | PASS | 1 | { "tool": "create_workflow_from_template", "workflow": { "id": "a9d5cdf8-84bf-44bf-af1b-98492bf03d36", "name": "Birthday Smoke", "description": "Send a birthday WhatsApp message with optional coupon", |
| `@mcp-marketing/workflows` | `run_due_workflows` | PASS | 1 | { "tool": "run_due_workflows", "count": 0, "executions": [] } |
| `@mcp-marketing/workflows` | `list_workflow_executions` | PASS | 1 | { "tool": "list_workflow_executions", "executions": [ { "id": "22e7090f-bdd7-4d17-996d-34de1a77bdc8", "workflowId": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "status": "completed", "startedAt": "2026-08 |
| `@mcp-marketing/workflows` | `list_workflow_audit_logs` | PASS | 1 | { "tool": "list_workflow_audit_logs", "logs": [ { "id": "91ab9497-e7a1-4014-b82c-a091075fa8c3", "workflowId": "5f828f00-d3d7-46b9-ab4a-a25a95f70efa", "action": "workflow_created", "actor": "system", " |
| `@mcp-marketing/workflows` | `update_workflow` | PASS | 1 | { "tool": "update_workflow", "workflow": { "id": "8333c480-0eb1-42b3-b221-72be9bda1240", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "active", "trigger": { "type |
| `@mcp-marketing/workflows` | `duplicate_workflow` | PASS | 1 | { "tool": "duplicate_workflow", "workflow": { "id": "7aec48cb-d071-411e-a43d-37a5cb44d503", "name": "Smoke Workflow Updated (copy)", "description": "Created by mcp:tools", "status": "draft", "trigger" |
| `@mcp-marketing/workflows` | `run_workflow` | PASS | 1 | { "tool": "run_workflow", "execution": { "id": "42da3b93-a557-4d7d-9f7a-bf9639decb5b", "workflowId": "8333c480-0eb1-42b3-b221-72be9bda1240", "status": "completed", "startedAt": "2026-08-04T00:01:13.73 |
| `@mcp-marketing/workflows` | `execute_workflow` | PASS | 1 | { "tool": "execute_workflow", "execution": { "id": "6f45e366-6640-4242-a78f-1a0d36ff0d99", "workflowId": "8333c480-0eb1-42b3-b221-72be9bda1240", "status": "completed", "startedAt": "2026-08-04T00:01:1 |
| `@mcp-marketing/workflows` | `pause_workflow` | PASS | 1 | { "tool": "pause_workflow", "workflow": { "id": "8333c480-0eb1-42b3-b221-72be9bda1240", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "paused", "trigger": { "type" |
| `@mcp-marketing/workflows` | `resume_workflow` | PASS | 1 | { "tool": "resume_workflow", "workflow": { "id": "8333c480-0eb1-42b3-b221-72be9bda1240", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "active", "trigger": { "type |
| `@mcp-marketing/workflows` | `recover_workflow_execution` | PASS | 1 | error: Execution not found: nonexistent-execution |
| `@mcp-marketing/workflows` | `delete_workflow` | PASS | 1 | { "tool": "delete_workflow", "deleted": true, "workflowId": "8333c480-0eb1-42b3-b221-72be9bda1240" } |

## Summary by package

### @mcp-marketing/google-ads

- `list_campaigns`: PASS (4ms)
- `get_campaign`: PASS (1ms)
- `create_campaign`: PASS (1ms)
- `pause_campaign`: PASS (1ms)
- `enable_campaign`: PASS (1ms)
- `update_budget`: PASS (1ms)
- `campaign_report`: PASS (1ms)
- `search_keywords`: PASS (1ms)
- `list_customers`: PASS (1ms)
- `account_info`: PASS (1ms)

### @mcp-marketing/meta-ads

- `list_accounts`: PASS (4ms)
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

- `analyze_insights`: PASS (5ms)
- `get_health_scores`: PASS (1ms)
- `list_recommendations`: PASS (1ms)
- `get_executive_dashboard`: PASS (2ms)
- `list_timeline_events`: PASS (1ms)
- `record_timeline_event`: PASS (3ms)
- `get_health_center`: PASS (1ms)
- `generate_report`: PASS (1ms)

### @mcp-marketing/ai-agent

- `chat`: PASS (4ms)
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
- `summarize_account`: PASS (1ms)
- `marketing_chat`: PASS (1ms)

### @mcp-marketing/workflows

- `list_workflows`: PASS (4ms)
- `create_workflow`: PASS (3ms)
- `update_workflow`: PASS (1ms)
- `duplicate_workflow`: PASS (1ms)
- `pause_workflow`: PASS (1ms)
- `delete_workflow`: PASS (1ms)
- `run_workflow`: PASS (1ms)
- `execute_workflow`: PASS (1ms)
- `resume_workflow`: PASS (1ms)
- `run_due_workflows`: PASS (1ms)
- `recover_workflow_execution`: PASS (1ms)
- `list_workflow_templates`: PASS (2ms)
- `create_workflow_from_template`: PASS (1ms)
- `list_workflow_executions`: PASS (1ms)
- `list_workflow_audit_logs`: PASS (1ms)

## Criterion

- Servers started via stdio MCP client: yes
- Tools covered: 71
- Report generated: yes

