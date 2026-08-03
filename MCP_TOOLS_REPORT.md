# MCP Tools Report

**Product:** Marketing Brain v1.1.0 LTS
**Generated:** 2026-08-03T21:57:14.832Z
**Expected tools:** 52
**Calls recorded:** 54
**PASS:** 54 · **ERROR:** 0 · **FAIL:** 0

> Test harness uses placeholder credentials and `WHATSAPP_STUB=true` (no live network).

| Package | Tool | Status | Time (ms) | Result |
|---------|------|--------|----------:|--------|
| `@mcp-marketing/google-ads` | `list_campaigns` | PASS | 3 | { "campaigns": [ { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, { "id": "1002", "name": "Retargeting", "status": "PAUSED", "budget |
| `@mcp-marketing/google-ads` | `get_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" } } |
| `@mcp-marketing/google-ads` | `create_campaign` | PASS | 1 | { "campaign": { "id": "1003", "name": "MCP Smoke Campaign", "status": "ENABLED", "budgetMicros": 1000000, "channelType": "SEARCH" } } |
| `@mcp-marketing/google-ads` | `pause_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "PAUSED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "action": "paused" } |
| `@mcp-marketing/google-ads` | `enable_campaign` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 50000000, "channelType": "SEARCH" }, "action": "enabled" } |
| `@mcp-marketing/google-ads` | `update_budget` | PASS | 1 | { "campaign": { "id": "1001", "name": "Brand Awareness", "status": "ENABLED", "budgetMicros": 2000000, "channelType": "SEARCH" } } |
| `@mcp-marketing/google-ads` | `search_keywords` | PASS | 1 | { "keywords": [ { "keyword": "marketing automation 1", "avgMonthlySearches": 1000, "competition": "LOW", "suggestedBidMicros": 500000 }, { "keyword": "marketing automation 2", "avgMonthlySearches": 20 |
| `@mcp-marketing/google-ads` | `generate_ads` | PASS | 1 | { "ads": [ { "headline": "Marketing Brain — Offer 1", "description": "Discover Marketing Brain with a professional tone.", "finalUrl": "https://example.com/marketing-brain" }, { "headline": "Marketing |
| `@mcp-marketing/google-ads` | `campaign_report` | PASS | 1 | { "rows": [ { "campaignId": "1001", "campaignName": "Brand Awareness", "impressions": 10000, "clicks": 500, "costMicros": 1000000, "conversions": 25 }, { "campaignId": "1002", "campaignName": "Retarge |
| `@mcp-marketing/google-ads` | `negative_keywords` | PASS | 1 | { "campaignId": "1001", "added": [ "free", "cheap" ] } |
| `@mcp-marketing/meta-ads` | `list_campaigns` | PASS | 2 | { "campaigns": [ { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, { "id": "2002", "name": "Meta Retargeting", "status": "PAUSED", " |
| `@mcp-marketing/meta-ads` | `create_campaign` | PASS | 1 | { "campaign": { "id": "2003", "name": "Meta Smoke", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 50 } } |
| `@mcp-marketing/meta-ads` | `pause_campaign` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "PAUSED", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, "action": "paused" } |
| `@mcp-marketing/meta-ads` | `resume_campaign` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 100 }, "action": "resumed" } |
| `@mcp-marketing/meta-ads` | `update_budget` | PASS | 1 | { "campaign": { "id": "2001", "name": "Meta Prospecting", "status": "ACTIVE", "objective": "OUTCOME_TRAFFIC", "dailyBudget": 80 } } |
| `@mcp-marketing/meta-ads` | `create_audience` | PASS | 1 | { "audience": { "id": "3001", "name": "Smoke Audience", "subtype": "CUSTOM", "approximateCount": 1000 } } |
| `@mcp-marketing/meta-ads` | `create_ad` | PASS | 1 | { "ad": { "id": "4001", "name": "Smoke Ad", "campaignId": "2001", "creativeBody": "Try Marketing Brain", "status": "ACTIVE" } } |
| `@mcp-marketing/meta-ads` | `get_metrics` | PASS | 1 | { "metrics": [ { "campaignId": "2001", "impressions": 8000, "clicks": 400, "spend": 560, "reach": 5000, "ctr": 0.05 } ] } |
| `@mcp-marketing/whatsapp` | `send_birthday_message` | PASS | 3 | { "tool": "send_birthday_message", "messageId": "stub_1785794234117", "to": "+5511999999999", "status": "sent", "body": "Feliz aniversário, Smoke User! 🎂 Use o cupom SMOKE10 na sua próxima compra.",  |
| `@mcp-marketing/whatsapp` | `send_coupon` | PASS | 1 | { "tool": "send_coupon", "messageId": "stub_1785794234119", "to": "+5511999999999", "status": "sent", "body": "🎁 Cupom exclusivo: SAVE20 — 20% OFF.", "sentAt": "2026-08-03T21:57:14.119Z" } |
| `@mcp-marketing/whatsapp` | `send_campaign` | PASS | 1 | { "tool": "send_campaign", "campaignId": "camp-smoke", "messageId": "stub_1785794234120", "to": "+5511999999999", "status": "sent", "body": "[camp-smoke] Smoke campaign message", "sentAt": "2026-08-03 |
| `@mcp-marketing/whatsapp` | `send_template` | PASS | 1 | { "tool": "send_template", "templateName": "hello_world", "messageId": "stub_1785794234120", "to": "+5511999999999", "status": "sent", "body": "template:hello_world", "sentAt": "2026-08-03T21:57:14.12 |
| `@mcp-marketing/whatsapp` | `schedule_message` | PASS | 1 | { "tool": "schedule_message", "scheduled": { "id": "423f9974-6442-4189-82ab-050a8e67e4d1", "channel": "whatsapp", "recipient": "+5511999999999", "body": "Scheduled smoke message", "scheduledAt": "2026 |
| `@mcp-marketing/whatsapp` | `order_confirmation` | PASS | 1 | { "tool": "order_confirmation", "orderId": "ORD-SMOKE-1", "messageId": "stub_1785794234122", "to": "+5511999999999", "status": "sent", "body": "✅ Pedido ORD-SMOKE-1 confirmado! Total: R$ 99,90.\nItens |
| `@mcp-marketing/insights` | `analyze_insights` | PASS | 4 | { "tool": "analyze_insights", "count": 1, "insights": [ { "id": "f2161882-064a-47ae-8122-3dd6ca7dd87f", "severity": "info", "category": "profitability", "title": "Strong ROAS performance", "descriptio |
| `@mcp-marketing/insights` | `get_health_scores` | PASS | 1 | { "tool": "get_health_scores", "scores": [] } |
| `@mcp-marketing/insights` | `list_recommendations` | PASS | 1 | { "tool": "list_recommendations", "recommendations": [] } |
| `@mcp-marketing/insights` | `get_executive_dashboard` | PASS | 1 | { "tool": "get_executive_dashboard", "dashboard": { "summary": { "campaigns": 0, "totalSpend": 0, "totalRevenue": 0, "totalConversions": 0, "overallRoas": 0, "averageHealthScore": 0 }, "topPerformers" |
| `@mcp-marketing/insights` | `list_timeline_events` | PASS | 1 | { "tool": "list_timeline_events", "events": [] } |
| `@mcp-marketing/insights` | `record_timeline_event` | PASS | 2 | { "tool": "record_timeline_event", "event": { "id": "d29a478a-fa54-4bdc-acd8-1bfb214cf62e", "type": "smoke_test", "title": "MCP tools smoke", "description": "Generated by npm run mcp:tools", "campaign |
| `@mcp-marketing/insights` | `get_health_center` | PASS | 1 | { "tool": "get_health_center", "healthCenter": { "overallScore": 0, "gradeDistribution": { "A": 0, "B": 0, "C": 0, "D": 0, "F": 0 }, "campaigns": [], "alerts": [], "updatedAt": "2026-08-03T21:57:14.32 |
| `@mcp-marketing/insights` | `generate_report` | PASS | 1 | { "tool": "generate_report", "report": { "title": "Marketing Brain Insights Report", "generatedAt": "2026-08-03T21:57:14.325Z", "dashboard": { "summary": { "campaigns": 0, "totalSpend": 0, "totalReven |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 4 | { "tool": "chat", "message": { "id": "0039e345-4cf3-4dc6-bdf5-cc98e72e2ef0", "role": "assistant", "content": "Hello! I'm the Marketing Brain agent. I can help with campaigns, budgets, reports, and wor |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 2 | { "tool": "chat", "message": { "id": "a42b5c84-3bbf-4e45-98d0-51854546dc32", "role": "assistant", "content": "I can pause the campaign. Please confirm to proceed.", "timestamp": "2026-08-03T21:57:14.5 |
| `@mcp-marketing/ai-agent` | `list_pending_approvals` | PASS | 1 | { "tool": "list_pending_approvals", "pending": [ { "id": "7736e4b8-b531-4c3d-bf69-1c4c0cf10787", "type": "pause_campaign", "description": "I can pause the campaign. Please confirm to proceed.", "paylo |
| `@mcp-marketing/ai-agent` | `get_agent_history` | PASS | 1 | { "tool": "get_agent_history", "history": [ { "id": "8e990fa3-f450-4978-8f7b-b73b5ffc416c", "role": "user", "content": "hello", "timestamp": "2026-08-03T21:57:14.554Z", "sessionId": "smoke-session" }, |
| `@mcp-marketing/ai-agent` | `get_ai_summary` | PASS | 1 | { "tool": "get_ai_summary", "summary": { "totalMessages": 4, "pendingApprovals": 1, "confirmedActions": 0, "cancelledActions": 0, "recentTopics": [ "hello", "please pause campaign Brand Awareness" ],  |
| `@mcp-marketing/ai-agent` | `list_audit_logs` | PASS | 1 | { "tool": "list_audit_logs", "logs": [ { "id": "ca218c71-0937-469e-9e69-dd984d3f2e2c", "action": "chat", "actor": "user", "details": { "sessionId": "smoke-session", "messageLength": 5 }, "timestamp":  |
| `@mcp-marketing/ai-agent` | `confirm_action` | PASS | 1 | { "tool": "confirm_action", "action": { "id": "7736e4b8-b531-4c3d-bf69-1c4c0cf10787", "type": "pause_campaign", "description": "I can pause the campaign. Please confirm to proceed.", "payload": { "ori |
| `@mcp-marketing/ai-agent` | `chat` | PASS | 1 | { "tool": "chat", "message": { "id": "2b3f8673-5a41-4e76-a886-e9e514e9483f", "role": "assistant", "content": "I can help launch a campaign. This action requires approval before execution.", "timestamp |
| `@mcp-marketing/ai-agent` | `cancel_action` | PASS | 1 | { "tool": "cancel_action", "action": { "id": "d631e8b2-0de1-4614-9002-35e6b8b15f4a", "type": "launch_campaign", "description": "I can help launch a campaign. This action requires approval before execu |
| `@mcp-marketing/workflows` | `list_workflows` | PASS | 3 | { "tool": "list_workflows", "workflows": [] } |
| `@mcp-marketing/workflows` | `create_workflow` | PASS | 3 | { "tool": "create_workflow", "workflow": { "id": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "name": "Smoke Workflow", "description": "Created by mcp:tools", "status": "active", "trigger": { "type": "manu |
| `@mcp-marketing/workflows` | `list_workflow_templates` | PASS | 1 | { "tool": "list_workflow_templates", "templates": [ { "id": "tpl-birthday", "name": "Birthday Message", "description": "Send a birthday WhatsApp message with optional coupon", "category": "whatsapp",  |
| `@mcp-marketing/workflows` | `create_workflow_from_template` | PASS | 1 | { "tool": "create_workflow_from_template", "workflow": { "id": "73ec5051-61ef-4521-9bb2-3e5f68bb8e82", "name": "Birthday Smoke", "description": "Send a birthday WhatsApp message with optional coupon", |
| `@mcp-marketing/workflows` | `run_due_workflows` | PASS | 1 | { "tool": "run_due_workflows", "count": 0, "executions": [] } |
| `@mcp-marketing/workflows` | `list_workflow_executions` | PASS | 1 | { "tool": "list_workflow_executions", "executions": [] } |
| `@mcp-marketing/workflows` | `list_workflow_audit_logs` | PASS | 1 | { "tool": "list_workflow_audit_logs", "logs": [ { "id": "224e2063-627a-417e-ad00-4d4372f9d1dc", "workflowId": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "action": "workflow_created", "actor": "system", " |
| `@mcp-marketing/workflows` | `update_workflow` | PASS | 1 | { "tool": "update_workflow", "workflow": { "id": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "active", "trigger": { "type |
| `@mcp-marketing/workflows` | `duplicate_workflow` | PASS | 1 | { "tool": "duplicate_workflow", "workflow": { "id": "eed7d50c-5dd0-48d3-9b50-fb4b6c7d44f4", "name": "Smoke Workflow Updated (copy)", "description": "Created by mcp:tools", "status": "draft", "trigger" |
| `@mcp-marketing/workflows` | `run_workflow` | PASS | 1 | { "tool": "run_workflow", "execution": { "id": "22e7090f-bdd7-4d17-996d-34de1a77bdc8", "workflowId": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "status": "completed", "startedAt": "2026-08-03T21:57:14.79 |
| `@mcp-marketing/workflows` | `pause_workflow` | PASS | 1 | { "tool": "pause_workflow", "workflow": { "id": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff", "name": "Smoke Workflow Updated", "description": "Created by mcp:tools", "status": "paused", "trigger": { "type" |
| `@mcp-marketing/workflows` | `recover_workflow_execution` | PASS | 1 | error: Execution not found: nonexistent-execution |
| `@mcp-marketing/workflows` | `delete_workflow` | PASS | 1 | { "tool": "delete_workflow", "deleted": true, "workflowId": "f8d7dac4-3546-4a2f-b11e-d2a187e652ff" } |

## Summary by package

### @mcp-marketing/google-ads

- `list_campaigns`: PASS (3ms)
- `get_campaign`: PASS (1ms)
- `create_campaign`: PASS (1ms)
- `pause_campaign`: PASS (1ms)
- `enable_campaign`: PASS (1ms)
- `update_budget`: PASS (1ms)
- `search_keywords`: PASS (1ms)
- `generate_ads`: PASS (1ms)
- `campaign_report`: PASS (1ms)
- `negative_keywords`: PASS (1ms)

### @mcp-marketing/meta-ads

- `list_campaigns`: PASS (2ms)
- `create_campaign`: PASS (1ms)
- `pause_campaign`: PASS (1ms)
- `resume_campaign`: PASS (1ms)
- `update_budget`: PASS (1ms)
- `create_audience`: PASS (1ms)
- `create_ad`: PASS (1ms)
- `get_metrics`: PASS (1ms)

### @mcp-marketing/whatsapp

- `send_birthday_message`: PASS (3ms)
- `send_coupon`: PASS (1ms)
- `send_campaign`: PASS (1ms)
- `send_template`: PASS (1ms)
- `schedule_message`: PASS (1ms)
- `order_confirmation`: PASS (1ms)

### @mcp-marketing/insights

- `analyze_insights`: PASS (4ms)
- `get_health_scores`: PASS (1ms)
- `list_recommendations`: PASS (1ms)
- `get_executive_dashboard`: PASS (1ms)
- `list_timeline_events`: PASS (1ms)
- `record_timeline_event`: PASS (2ms)
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

### @mcp-marketing/workflows

- `list_workflows`: PASS (3ms)
- `create_workflow`: PASS (3ms)
- `update_workflow`: PASS (1ms)
- `duplicate_workflow`: PASS (1ms)
- `pause_workflow`: PASS (1ms)
- `delete_workflow`: PASS (1ms)
- `run_workflow`: PASS (1ms)
- `run_due_workflows`: PASS (1ms)
- `recover_workflow_execution`: PASS (1ms)
- `list_workflow_templates`: PASS (1ms)
- `create_workflow_from_template`: PASS (1ms)
- `list_workflow_executions`: PASS (1ms)
- `list_workflow_audit_logs`: PASS (1ms)

## Criterion

- Servers started via stdio MCP client: yes
- Tools covered: 52
- Report generated: yes

