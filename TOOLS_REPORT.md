# TOOLS_REPORT.md

**Product:** Marketing Brain MCP v1.0.0
**Generated:** 2026-08-04T02:07:32.963Z
**Transport:** StdioServerTransport
**Total tools:** 71 (expected 71)

> Layout note: this monorepo exposes **6 STDIO servers** under `mcp-*/dist/`.
> There is **no** root `dist/index.js` or `dist/mcp/tools.js` in this repository.

| Nome | Descrição | Input Schema | Output Schema | Provider |
|------|-----------|--------------|---------------|----------|
| `list_campaigns` | List all Google Ads campaigns for the configured customer | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `get_campaign` | Get a Google Ads campaign by ID | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `create_campaign` | Create a new Google Ads campaign | `{"type":"object","properties":{"name":{"type":"string","minLength":1,"description":"Campaign name...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `pause_campaign` | Pause a Google Ads campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `enable_campaign` | Enable a paused Google Ads campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `update_budget` | Update the daily budget for a Google Ads campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1},"budget_micros":{"ty...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `campaign_report` | Get performance report for Google Ads campaigns | `{"type":"object","properties":{"campaign_id":{"type":"string","description":"Optional campaign ID...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `search_keywords` | Search keyword ideas for Google Ads | `{"type":"object","properties":{"query":{"type":"string","minLength":1,"description":"Seed keyword...` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `list_customers` | List Google Ads customer accounts accessible to the configured credentials | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `account_info` | Get Google Ads account information for the configured customer ID | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Google Ads |
| `list_accounts` | List Meta ad accounts accessible with the configured token | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `list_campaigns` | List all Meta (Facebook/Instagram) ad campaigns | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `get_campaign` | Get a Meta ad campaign by ID | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `create_campaign` | Create a new Meta ad campaign | `{"type":"object","properties":{"name":{"type":"string","minLength":1,"description":"Campaign name...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `pause_campaign` | Pause a Meta ad campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `enable_campaign` | Enable a paused Meta ad campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `resume_campaign` | Resume a paused Meta ad campaign (legacy alias of enable_campaign) | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campai...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `update_budget` | Update the daily budget for a Meta ad campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1},"daily_budget":{"typ...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `get_insights` | Get Meta campaign insights (impressions, clicks, spend, CTR) | `{"type":"object","properties":{"campaign_id":{"type":"string","description":"Optional campaign ID...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `get_metrics` | Get Meta campaign metrics (legacy alias of get_insights) | `{"type":"object","properties":{"campaign_id":{"type":"string","description":"Optional campaign ID...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `list_audiences` | List Meta custom audiences | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `create_audience` | Create a custom audience for Meta ads (legacy) | `{"type":"object","properties":{"name":{"type":"string","minLength":1,"description":"Audience name...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `create_ad` | Create a Meta ad (legacy) | `{"type":"object","properties":{"name":{"type":"string","minLength":1},"campaign_id":{"type":"stri...` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `account_info` | Get Meta ad account information | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Meta Ads |
| `send_birthday_message` | Send a personalized birthday message via WhatsApp | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number in E.1...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `send_birthday` | Send a birthday WhatsApp message (Master Prompt alias of send_birthday_message) | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number in E.1...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `send_coupon` | Send a coupon offer message via WhatsApp | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"cou...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `send_campaign` | Send a marketing campaign message to a recipient | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"cam...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `send_template` | Send a pre-approved WhatsApp template message | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"tem...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `schedule_message` | Schedule a WhatsApp message for future delivery | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"bod...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `order_confirmation` | Send an order confirmation message via WhatsApp | `{"type":"object","properties":{"to":{"type":"string","description":"Customer phone number"},"orde...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `list_templates` | List WhatsApp message templates available to the business account | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `get_message_status` | Get delivery status for a previously sent WhatsApp message | `{"type":"object","properties":{"messageId":{"type":"string","minLength":1,"description":"WhatsApp...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `validate_webhook` | Validate Meta WhatsApp webhook verification challenge | `{"type":"object","properties":{"mode":{"type":"string","description":"hub.mode"},"verifyToken":{"...` | structured JSON text (MCP CallToolResult content / structuredContent) | WhatsApp Business |
| `analyze_insights` | Analyze campaign snapshots and return heuristic insights | `{"type":"object","properties":{"campaignId":{"type":"string","description":"Filter by campaign ID...` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `get_health_scores` | Calculate health scores for campaigns | `{"type":"object","properties":{"campaignId":{"type":"string"}},"additionalProperties":false,"$sch...` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `list_recommendations` | List actionable recommendations from campaign heuristics | `{"type":"object","properties":{"campaignId":{"type":"string"},"priority":{"type":"string","enum":...` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `get_executive_dashboard` | Get executive summary dashboard for all campaigns | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `list_timeline_events` | List marketing timeline events | `{"type":"object","properties":{"campaignId":{"type":"string"},"limit":{"type":"integer","exclusiv...` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `record_timeline_event` | Record a new timeline event in the JSON event store | `{"type":"object","properties":{"type":{"type":"string","description":"Event type, e.g. campaign_l...` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `get_health_center` | Get health center overview with grade distribution and alerts | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `generate_report` | Generate a comprehensive insights report | `{"type":"object","properties":{"format":{"type":"string","enum":["json","summary"],"default":"jso...` | structured JSON text (MCP CallToolResult content / structuredContent) | Insights / Analytics |
| `chat` | Chat with the local rule-based marketing agent (no LLM) | `{"type":"object","properties":{"message":{"type":"string","description":"User message"},"sessionI...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `list_pending_approvals` | List actions awaiting user approval | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `confirm_action` | Confirm a pending agent action | `{"type":"object","properties":{"actionId":{"type":"string","description":"Pending action ID"}},"r...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `cancel_action` | Cancel a pending agent action | `{"type":"object","properties":{"actionId":{"type":"string","description":"Pending action ID"}},"r...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `get_agent_history` | Get chat history for a session | `{"type":"object","properties":{"sessionId":{"type":"string"},"limit":{"type":"integer","exclusive...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `get_ai_summary` | Get a summary of agent activity and pending approvals | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `list_audit_logs` | List agent audit log entries | `{"type":"object","properties":{"limit":{"type":"integer","exclusiveMinimum":0,"maximum":200}},"ad...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `analyze_campaigns` | Analyze campaign performance and return recommendations | `{"type":"object","properties":{"campaigns":{"type":"array","items":{"type":"object","properties":...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `optimize_budget` | Suggest budget reallocation across campaigns based on ROAS | `{"type":"object","properties":{"totalBudget":{"type":"number","exclusiveMinimum":0,"description":...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `generate_report` | Generate an agent-scoped marketing performance report | `{"type":"object","properties":{"campaigns":{"type":"array","items":{"type":"object","properties":...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `analyze_customers` | Analyze customer segments and suggest targeting actions | `{"type":"object","properties":{"segmentId":{"type":"string","description":"Filter by segment ID"}...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `suggest_actions` | Suggest prioritized marketing actions based on campaign data | `{"type":"object","properties":{"limit":{"type":"integer","exclusiveMinimum":0,"maximum":50},"camp...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `summarize_account` | Summarize overall account performance metrics | `{"type":"object","properties":{"campaigns":{"type":"array","items":{"type":"object","properties":...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `marketing_chat` | Marketing-focused chat that delegates to the rule-based agent | `{"type":"object","properties":{"message":{"type":"string","description":"User message"},"sessionI...` | structured JSON text (MCP CallToolResult content / structuredContent) | AI Agent |
| `list_workflows` | List all marketing workflows | `{"type":"object","properties":{"status":{"type":"string","enum":["active","paused","draft","archi...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `create_workflow` | Create a new marketing workflow | `{"type":"object","properties":{"name":{"type":"string"},"description":{"type":"string"},"trigger"...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `update_workflow` | Update an existing workflow | `{"type":"object","properties":{"workflowId":{"type":"string"},"name":{"type":"string"},"descripti...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `duplicate_workflow` | Duplicate an existing workflow | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additio...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `pause_workflow` | Pause an active workflow | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additio...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `delete_workflow` | Delete a workflow | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additio...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `run_workflow` | Execute a workflow immediately | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additio...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `execute_workflow` | Execute a workflow immediately (alias of run_workflow) | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additio...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `resume_workflow` | Resume a paused workflow (set status back to active) | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additio...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `run_due_workflows` | Run all scheduled workflows that are due | `{"type":"object","properties":{"asOf":{"type":"string","description":"ISO datetime to evaluate du...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `recover_workflow_execution` | Recover and re-run a failed workflow execution | `{"type":"object","properties":{"executionId":{"type":"string"}},"required":["executionId"],"addit...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `list_workflow_templates` | List available workflow templates (tpl-birthday, etc.) | `{"type":"object","properties":{"category":{"type":"string"}},"additionalProperties":false,"$schem...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `create_workflow_from_template` | Create a workflow from a seed template | `{"type":"object","properties":{"templateId":{"type":"string","description":"Template ID, e.g. tpl...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `list_workflow_executions` | List workflow execution history | `{"type":"object","properties":{"workflowId":{"type":"string"},"limit":{"type":"integer","exclusiv...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |
| `list_workflow_audit_logs` | List workflow audit log entries | `{"type":"object","properties":{"workflowId":{"type":"string"},"limit":{"type":"integer","exclusiv...` | structured JSON text (MCP CallToolResult content / structuredContent) | Workflows |

## Detalhe por tool

### `list_campaigns`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** List all Google Ads campaigns for the configured customer
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_campaign`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Get a Google Ads campaign by ID
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `create_campaign`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Create a new Google Ads campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Campaign name"
    },
    "budget_micros": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "description": "Daily budget in micros"
    },
    "channel_type": {
      "type": "string",
      "description": "Channel type, e.g. SEARCH"
    }
  },
  "required": [
    "name",
    "budget_micros"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `pause_campaign`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Pause a Google Ads campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `enable_campaign`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Enable a paused Google Ads campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `update_budget`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Update the daily budget for a Google Ads campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    },
    "budget_micros": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "campaign_id",
    "budget_micros"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `campaign_report`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Get performance report for Google Ads campaigns
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "description": "Optional campaign ID filter"
    },
    "date_range": {
      "type": "string",
      "description": "Date range label, e.g. LAST_30_DAYS"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `search_keywords`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Search keyword ideas for Google Ads
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "minLength": 1,
      "description": "Seed keyword query"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 50,
      "description": "Max results"
    }
  },
  "required": [
    "query"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_customers`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** List Google Ads customer accounts accessible to the configured credentials
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `account_info`

- **Provider:** Google Ads (`@mcp-marketing/google-ads`)
- **Descrição:** Get Google Ads account information for the configured customer ID
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_accounts`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** List Meta ad accounts accessible with the configured token
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_campaigns`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** List all Meta (Facebook/Instagram) ad campaigns
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_campaign`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Get a Meta ad campaign by ID
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `create_campaign`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Create a new Meta ad campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Campaign name"
    },
    "objective": {
      "type": "string",
      "minLength": 1,
      "description": "Campaign objective"
    },
    "daily_budget": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Daily budget in account currency"
    }
  },
  "required": [
    "name",
    "objective",
    "daily_budget"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `pause_campaign`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Pause a Meta ad campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `enable_campaign`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Enable a paused Meta ad campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `resume_campaign`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Resume a paused Meta ad campaign (legacy alias of enable_campaign)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "campaign_id"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `update_budget`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Update the daily budget for a Meta ad campaign
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "minLength": 1
    },
    "daily_budget": {
      "type": "number",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "campaign_id",
    "daily_budget"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_insights`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Get Meta campaign insights (impressions, clicks, spend, CTR)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "description": "Optional campaign ID filter"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_metrics`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Get Meta campaign metrics (legacy alias of get_insights)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaign_id": {
      "type": "string",
      "description": "Optional campaign ID filter"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_audiences`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** List Meta custom audiences
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `create_audience`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Create a custom audience for Meta ads (legacy)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Audience name"
    },
    "subtype": {
      "type": "string",
      "description": "Audience subtype"
    },
    "approximate_count": {
      "type": "integer",
      "exclusiveMinimum": 0
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `create_ad`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Create a Meta ad (legacy)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1
    },
    "campaign_id": {
      "type": "string",
      "minLength": 1
    },
    "creative_body": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "name",
    "campaign_id",
    "creative_body"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `account_info`

- **Provider:** Meta Ads (`@mcp-marketing/meta-ads`)
- **Descrição:** Get Meta ad account information
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `send_birthday_message`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Send a personalized birthday message via WhatsApp
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Recipient phone number in E.164 format"
    },
    "name": {
      "type": "string",
      "description": "Recipient name"
    },
    "couponCode": {
      "type": "string",
      "description": "Optional birthday coupon code"
    }
  },
  "required": [
    "to",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `send_birthday`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Send a birthday WhatsApp message (Master Prompt alias of send_birthday_message)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Recipient phone number in E.164 format"
    },
    "name": {
      "type": "string",
      "description": "Recipient name"
    },
    "couponCode": {
      "type": "string",
      "description": "Optional birthday coupon code"
    }
  },
  "required": [
    "to",
    "name"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `send_coupon`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Send a coupon offer message via WhatsApp
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Recipient phone number"
    },
    "couponCode": {
      "type": "string",
      "description": "Coupon code"
    },
    "discount": {
      "type": "string",
      "description": "Discount description, e.g. 20% OFF"
    },
    "expiresAt": {
      "type": "string",
      "description": "Expiration date ISO string"
    }
  },
  "required": [
    "to",
    "couponCode",
    "discount"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `send_campaign`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Send a marketing campaign message to a recipient
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Recipient phone number"
    },
    "campaignId": {
      "type": "string",
      "description": "Campaign identifier"
    },
    "message": {
      "type": "string",
      "description": "Campaign message body"
    }
  },
  "required": [
    "to",
    "campaignId",
    "message"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `send_template`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Send a pre-approved WhatsApp template message
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Recipient phone number"
    },
    "templateName": {
      "type": "string",
      "description": "Approved template name"
    },
    "templateParams": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Template body parameters"
    }
  },
  "required": [
    "to",
    "templateName"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `schedule_message`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Schedule a WhatsApp message for future delivery
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Recipient phone number"
    },
    "body": {
      "type": "string",
      "description": "Message body"
    },
    "scheduledAt": {
      "type": "string",
      "description": "ISO datetime when the message should be sent"
    },
    "templateName": {
      "type": "string"
    },
    "templateParams": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "to",
    "body",
    "scheduledAt"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `order_confirmation`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Send an order confirmation message via WhatsApp
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "to": {
      "type": "string",
      "description": "Customer phone number"
    },
    "orderId": {
      "type": "string",
      "description": "Order identifier"
    },
    "total": {
      "type": "string",
      "description": "Order total amount"
    },
    "items": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of ordered items"
    }
  },
  "required": [
    "to",
    "orderId",
    "total"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_templates`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** List WhatsApp message templates available to the business account
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_message_status`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Get delivery status for a previously sent WhatsApp message
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "messageId": {
      "type": "string",
      "minLength": 1,
      "description": "WhatsApp message ID"
    }
  },
  "required": [
    "messageId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `validate_webhook`

- **Provider:** WhatsApp Business (`@mcp-marketing/whatsapp`)
- **Descrição:** Validate Meta WhatsApp webhook verification challenge
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "mode": {
      "type": "string",
      "description": "hub.mode"
    },
    "verifyToken": {
      "type": "string",
      "description": "hub.verify_token"
    },
    "challenge": {
      "type": "string",
      "description": "hub.challenge"
    }
  },
  "required": [
    "verifyToken"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `analyze_insights`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** Analyze campaign snapshots and return heuristic insights
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaignId": {
      "type": "string",
      "description": "Filter by campaign ID"
    },
    "snapshots": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "campaignId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "channel": {
            "type": "string"
          },
          "spend": {
            "type": "number"
          },
          "impressions": {
            "type": "number"
          },
          "clicks": {
            "type": "number"
          },
          "conversions": {
            "type": "number"
          },
          "revenue": {
            "type": "number"
          },
          "periodStart": {
            "type": "string"
          },
          "periodEnd": {
            "type": "string"
          }
        },
        "required": [
          "campaignId",
          "name",
          "channel",
          "spend",
          "impressions",
          "clicks",
          "conversions",
          "revenue",
          "periodStart",
          "periodEnd"
        ],
        "additionalProperties": false
      },
      "description": "Inline campaign snapshots"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_health_scores`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** Calculate health scores for campaigns
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaignId": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_recommendations`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** List actionable recommendations from campaign heuristics
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaignId": {
      "type": "string"
    },
    "priority": {
      "type": "string",
      "enum": [
        "high",
        "medium",
        "low"
      ]
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_executive_dashboard`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** Get executive summary dashboard for all campaigns
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_timeline_events`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** List marketing timeline events
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaignId": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 100
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `record_timeline_event`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** Record a new timeline event in the JSON event store
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "description": "Event type, e.g. campaign_launched"
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "campaignId": {
      "type": "string"
    },
    "occurredAt": {
      "type": "string",
      "description": "ISO datetime, defaults to now"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {}
    }
  },
  "required": [
    "type",
    "title"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_health_center`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** Get health center overview with grade distribution and alerts
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `generate_report`

- **Provider:** Insights / Analytics (`@mcp-marketing/insights`)
- **Descrição:** Generate a comprehensive insights report
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "format": {
      "type": "string",
      "enum": [
        "json",
        "summary"
      ],
      "default": "json"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `chat`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Chat with the local rule-based marketing agent (no LLM)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "description": "User message"
    },
    "sessionId": {
      "type": "string",
      "description": "Session identifier"
    }
  },
  "required": [
    "message"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_pending_approvals`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** List actions awaiting user approval
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `confirm_action`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Confirm a pending agent action
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "actionId": {
      "type": "string",
      "description": "Pending action ID"
    }
  },
  "required": [
    "actionId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `cancel_action`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Cancel a pending agent action
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "actionId": {
      "type": "string",
      "description": "Pending action ID"
    }
  },
  "required": [
    "actionId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_agent_history`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Get chat history for a session
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "sessionId": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `get_ai_summary`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Get a summary of agent activity and pending approvals
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {},
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_audit_logs`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** List agent audit log entries
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `analyze_campaigns`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Analyze campaign performance and return recommendations
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaigns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "campaignId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "spend": {
            "type": "number"
          },
          "impressions": {
            "type": "number"
          },
          "clicks": {
            "type": "number"
          },
          "conversions": {
            "type": "number"
          },
          "revenue": {
            "type": "number"
          }
        },
        "required": [
          "campaignId",
          "name",
          "spend",
          "impressions",
          "clicks",
          "conversions",
          "revenue"
        ],
        "additionalProperties": false
      },
      "description": "Campaign metrics to analyze"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `optimize_budget`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Suggest budget reallocation across campaigns based on ROAS
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "totalBudget": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Total budget to allocate"
    },
    "campaigns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "campaignId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "spend": {
            "type": "number"
          },
          "impressions": {
            "type": "number"
          },
          "clicks": {
            "type": "number"
          },
          "conversions": {
            "type": "number"
          },
          "revenue": {
            "type": "number"
          }
        },
        "required": [
          "campaignId",
          "name",
          "spend",
          "impressions",
          "clicks",
          "conversions",
          "revenue"
        ],
        "additionalProperties": false
      }
    }
  },
  "required": [
    "totalBudget"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `generate_report`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Generate an agent-scoped marketing performance report
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaigns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "campaignId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "spend": {
            "type": "number"
          },
          "impressions": {
            "type": "number"
          },
          "clicks": {
            "type": "number"
          },
          "conversions": {
            "type": "number"
          },
          "revenue": {
            "type": "number"
          }
        },
        "required": [
          "campaignId",
          "name",
          "spend",
          "impressions",
          "clicks",
          "conversions",
          "revenue"
        ],
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `analyze_customers`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Analyze customer segments and suggest targeting actions
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "segmentId": {
      "type": "string",
      "description": "Filter by segment ID"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `suggest_actions`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Suggest prioritized marketing actions based on campaign data
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 50
    },
    "campaigns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "campaignId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "spend": {
            "type": "number"
          },
          "impressions": {
            "type": "number"
          },
          "clicks": {
            "type": "number"
          },
          "conversions": {
            "type": "number"
          },
          "revenue": {
            "type": "number"
          }
        },
        "required": [
          "campaignId",
          "name",
          "spend",
          "impressions",
          "clicks",
          "conversions",
          "revenue"
        ],
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `summarize_account`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Summarize overall account performance metrics
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "campaigns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "campaignId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "spend": {
            "type": "number"
          },
          "impressions": {
            "type": "number"
          },
          "clicks": {
            "type": "number"
          },
          "conversions": {
            "type": "number"
          },
          "revenue": {
            "type": "number"
          }
        },
        "required": [
          "campaignId",
          "name",
          "spend",
          "impressions",
          "clicks",
          "conversions",
          "revenue"
        ],
        "additionalProperties": false
      }
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `marketing_chat`

- **Provider:** AI Agent (`@mcp-marketing/ai-agent`)
- **Descrição:** Marketing-focused chat that delegates to the rule-based agent
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string",
      "description": "User message"
    },
    "sessionId": {
      "type": "string",
      "description": "Session identifier"
    }
  },
  "required": [
    "message"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_workflows`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** List all marketing workflows
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": [
        "active",
        "paused",
        "draft",
        "archived"
      ]
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `create_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Create a new marketing workflow
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "trigger": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "schedule",
            "event",
            "manual"
          ]
        },
        "cron": {
          "type": "string"
        },
        "nextRunAt": {
          "type": "string"
        },
        "eventType": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": false
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "config": {
            "type": "object",
            "additionalProperties": {},
            "default": {}
          },
          "nextStepId": {
            "type": "string"
          }
        },
        "required": [
          "type",
          "name"
        ],
        "additionalProperties": false
      },
      "minItems": 1
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "paused",
        "draft",
        "archived"
      ]
    }
  },
  "required": [
    "name",
    "trigger",
    "steps"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `update_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Update an existing workflow
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "paused",
        "draft",
        "archived"
      ]
    },
    "trigger": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "schedule",
            "event",
            "manual"
          ]
        },
        "cron": {
          "type": "string"
        },
        "nextRunAt": {
          "type": "string"
        },
        "eventType": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": false
    },
    "steps": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "config": {
            "type": "object",
            "additionalProperties": {},
            "default": {}
          },
          "nextStepId": {
            "type": "string"
          }
        },
        "required": [
          "type",
          "name"
        ],
        "additionalProperties": false
      }
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `duplicate_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Duplicate an existing workflow
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `pause_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Pause an active workflow
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `delete_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Delete a workflow
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `run_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Execute a workflow immediately
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `execute_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Execute a workflow immediately (alias of run_workflow)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `resume_workflow`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Resume a paused workflow (set status back to active)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    }
  },
  "required": [
    "workflowId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `run_due_workflows`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Run all scheduled workflows that are due
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "asOf": {
      "type": "string",
      "description": "ISO datetime to evaluate due workflows"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `recover_workflow_execution`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Recover and re-run a failed workflow execution
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "executionId": {
      "type": "string"
    }
  },
  "required": [
    "executionId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_workflow_templates`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** List available workflow templates (tpl-birthday, etc.)
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "category": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `create_workflow_from_template`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** Create a workflow from a seed template
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "templateId": {
      "type": "string",
      "description": "Template ID, e.g. tpl-birthday"
    },
    "name": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": [
        "active",
        "paused",
        "draft",
        "archived"
      ]
    }
  },
  "required": [
    "templateId"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_workflow_executions`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** List workflow execution history
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

### `list_workflow_audit_logs`

- **Provider:** Workflows (`@mcp-marketing/workflows`)
- **Descrição:** List workflow audit log entries
- **Output Schema:** structured JSON text (MCP CallToolResult content / structuredContent)
- **Input Schema:**

```json
{
  "type": "object",
  "properties": {
    "workflowId": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "exclusiveMinimum": 0,
      "maximum": 200
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Registo no start

Todas as tools listadas acima foram descobertas via cliente MCP stdio após o arranque de cada servidor
(`create*Server` / `register*Tools` → `connectStdioMcpServer`).
Contagem esperada vs descoberta: **71 / 71**.

