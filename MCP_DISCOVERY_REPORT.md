# MCP Discovery Report

**Product:** Marketing Brain MCP v1.0.0
**Generated:** 2026-08-04T01:42:39.201Z
**Transport:** StdioServerTransport
**Expected tools:** 71

## @mcp-marketing/google-ads

**Status:** PASS (194ms)
**Tools:** 10 (expected 10)
**Prompts:** 0
**Resources:** 0

| Tool | Category | Description | Input schema | Output schema |
|------|----------|-------------|--------------|---------------|
| `list_campaigns` | Google Ads | List all Google Ads campaigns for the configured customer | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_campaign` | Google Ads | Get a Google Ads campaign by ID | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `create_campaign` | Google Ads | Create a new Google Ads campaign | `{"type":"object","properties":{"name":{"type":"string","minLength":1,"description":"Campaign name"},"budget_micros":{...` | structured JSON text (`structuredContent` / `content[].text`) |
| `pause_campaign` | Google Ads | Pause a Google Ads campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `enable_campaign` | Google Ads | Enable a paused Google Ads campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `update_budget` | Google Ads | Update the daily budget for a Google Ads campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1},"budget_micros":{"type":"integer","exclu...` | structured JSON text (`structuredContent` / `content[].text`) |
| `campaign_report` | Google Ads | Get performance report for Google Ads campaigns | `{"type":"object","properties":{"campaign_id":{"type":"string","description":"Optional campaign ID filter"},"date_rang...` | structured JSON text (`structuredContent` / `content[].text`) |
| `search_keywords` | Google Ads | Search keyword ideas for Google Ads | `{"type":"object","properties":{"query":{"type":"string","minLength":1,"description":"Seed keyword query"},"limit":{"t...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_customers` | Google Ads | List Google Ads customer accounts accessible to the configured credentials | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `account_info` | Google Ads | Get Google Ads account information for the configured customer ID | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |

_Nenhum Prompt registado neste servidor._

_Nenhum Resource registado neste servidor._

## @mcp-marketing/meta-ads

**Status:** PASS (165ms)
**Tools:** 14 (expected 14)
**Prompts:** 0
**Resources:** 0

| Tool | Category | Description | Input schema | Output schema |
|------|----------|-------------|--------------|---------------|
| `list_accounts` | Meta Ads | List Meta ad accounts accessible with the configured token | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_campaigns` | Meta Ads | List all Meta (Facebook/Instagram) ad campaigns | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_campaign` | Meta Ads | Get a Meta ad campaign by ID | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `create_campaign` | Meta Ads | Create a new Meta ad campaign | `{"type":"object","properties":{"name":{"type":"string","minLength":1,"description":"Campaign name"},"objective":{"typ...` | structured JSON text (`structuredContent` / `content[].text`) |
| `pause_campaign` | Meta Ads | Pause a Meta ad campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `enable_campaign` | Meta Ads | Enable a paused Meta ad campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `resume_campaign` | Meta Ads | Resume a paused Meta ad campaign (legacy alias of enable_campaign) | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1}},"required":["campaign_id"],"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `update_budget` | Meta Ads | Update the daily budget for a Meta ad campaign | `{"type":"object","properties":{"campaign_id":{"type":"string","minLength":1},"daily_budget":{"type":"number","exclusi...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_insights` | Meta Ads | Get Meta campaign insights (impressions, clicks, spend, CTR) | `{"type":"object","properties":{"campaign_id":{"type":"string","description":"Optional campaign ID filter"}},"addition...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_metrics` | Meta Ads | Get Meta campaign metrics (legacy alias of get_insights) | `{"type":"object","properties":{"campaign_id":{"type":"string","description":"Optional campaign ID filter"}},"addition...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_audiences` | Meta Ads | List Meta custom audiences | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `create_audience` | Meta Ads | Create a custom audience for Meta ads (legacy) | `{"type":"object","properties":{"name":{"type":"string","minLength":1,"description":"Audience name"},"subtype":{"type"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `create_ad` | Meta Ads | Create a Meta ad (legacy) | `{"type":"object","properties":{"name":{"type":"string","minLength":1},"campaign_id":{"type":"string","minLength":1},"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `account_info` | Meta Ads | Get Meta ad account information | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |

_Nenhum Prompt registado neste servidor._

_Nenhum Resource registado neste servidor._

## @mcp-marketing/whatsapp

**Status:** PASS (166ms)
**Tools:** 10 (expected 10)
**Prompts:** 0
**Resources:** 0

| Tool | Category | Description | Input schema | Output schema |
|------|----------|-------------|--------------|---------------|
| `send_birthday_message` | WhatsApp Business | Send a personalized birthday message via WhatsApp | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number in E.164 format"},"name":{...` | structured JSON text (`structuredContent` / `content[].text`) |
| `send_birthday` | WhatsApp Business | Send a birthday WhatsApp message (Master Prompt alias of send_birthday_message) | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number in E.164 format"},"name":{...` | structured JSON text (`structuredContent` / `content[].text`) |
| `send_coupon` | WhatsApp Business | Send a coupon offer message via WhatsApp | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"couponCode":{"type":"st...` | structured JSON text (`structuredContent` / `content[].text`) |
| `send_campaign` | WhatsApp Business | Send a marketing campaign message to a recipient | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"campaignId":{"type":"st...` | structured JSON text (`structuredContent` / `content[].text`) |
| `send_template` | WhatsApp Business | Send a pre-approved WhatsApp template message | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"templateName":{"type":"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `schedule_message` | WhatsApp Business | Schedule a WhatsApp message for future delivery | `{"type":"object","properties":{"to":{"type":"string","description":"Recipient phone number"},"body":{"type":"string",...` | structured JSON text (`structuredContent` / `content[].text`) |
| `order_confirmation` | WhatsApp Business | Send an order confirmation message via WhatsApp | `{"type":"object","properties":{"to":{"type":"string","description":"Customer phone number"},"orderId":{"type":"string...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_templates` | WhatsApp Business | List WhatsApp message templates available to the business account | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_message_status` | WhatsApp Business | Get delivery status for a previously sent WhatsApp message | `{"type":"object","properties":{"messageId":{"type":"string","minLength":1,"description":"WhatsApp message ID"}},"requ...` | structured JSON text (`structuredContent` / `content[].text`) |
| `validate_webhook` | WhatsApp Business | Validate Meta WhatsApp webhook verification challenge | `{"type":"object","properties":{"mode":{"type":"string","description":"hub.mode"},"verifyToken":{"type":"string","desc...` | structured JSON text (`structuredContent` / `content[].text`) |

_Nenhum Prompt registado neste servidor._

_Nenhum Resource registado neste servidor._

## @mcp-marketing/insights

**Status:** PASS (155ms)
**Tools:** 8 (expected 8)
**Prompts:** 0
**Resources:** 0

| Tool | Category | Description | Input schema | Output schema |
|------|----------|-------------|--------------|---------------|
| `analyze_insights` | Insights / Analytics | Analyze campaign snapshots and return heuristic insights | `{"type":"object","properties":{"campaignId":{"type":"string","description":"Filter by campaign ID"},"snapshots":{"typ...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_health_scores` | Insights / Analytics | Calculate health scores for campaigns | `{"type":"object","properties":{"campaignId":{"type":"string"}},"additionalProperties":false,"$schema":"http://json-sc...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_recommendations` | Insights / Analytics | List actionable recommendations from campaign heuristics | `{"type":"object","properties":{"campaignId":{"type":"string"},"priority":{"type":"string","enum":["high","medium","lo...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_executive_dashboard` | Insights / Analytics | Get executive summary dashboard for all campaigns | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_timeline_events` | Insights / Analytics | List marketing timeline events | `{"type":"object","properties":{"campaignId":{"type":"string"},"limit":{"type":"integer","exclusiveMinimum":0,"maximum...` | structured JSON text (`structuredContent` / `content[].text`) |
| `record_timeline_event` | Insights / Analytics | Record a new timeline event in the JSON event store | `{"type":"object","properties":{"type":{"type":"string","description":"Event type, e.g. campaign_launched"},"title":{"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_health_center` | Insights / Analytics | Get health center overview with grade distribution and alerts | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `generate_report` | Insights / Analytics | Generate a comprehensive insights report | `{"type":"object","properties":{"format":{"type":"string","enum":["json","summary"],"default":"json"}},"additionalProp...` | structured JSON text (`structuredContent` / `content[].text`) |

_Nenhum Prompt registado neste servidor._

_Nenhum Resource registado neste servidor._

## @mcp-marketing/ai-agent

**Status:** PASS (160ms)
**Tools:** 14 (expected 14)
**Prompts:** 0
**Resources:** 0

| Tool | Category | Description | Input schema | Output schema |
|------|----------|-------------|--------------|---------------|
| `chat` | AI Agent | Chat with the local rule-based marketing agent (no LLM) | `{"type":"object","properties":{"message":{"type":"string","description":"User message"},"sessionId":{"type":"string",...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_pending_approvals` | AI Agent | List actions awaiting user approval | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `confirm_action` | AI Agent | Confirm a pending agent action | `{"type":"object","properties":{"actionId":{"type":"string","description":"Pending action ID"}},"required":["actionId"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `cancel_action` | AI Agent | Cancel a pending agent action | `{"type":"object","properties":{"actionId":{"type":"string","description":"Pending action ID"}},"required":["actionId"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_agent_history` | AI Agent | Get chat history for a session | `{"type":"object","properties":{"sessionId":{"type":"string"},"limit":{"type":"integer","exclusiveMinimum":0,"maximum"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `get_ai_summary` | AI Agent | Get a summary of agent activity and pending approvals | `{"type":"object","properties":{},"$schema":"http://json-schema.org/draft-07/schema#"}` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_audit_logs` | AI Agent | List agent audit log entries | `{"type":"object","properties":{"limit":{"type":"integer","exclusiveMinimum":0,"maximum":200}},"additionalProperties":...` | structured JSON text (`structuredContent` / `content[].text`) |
| `analyze_campaigns` | AI Agent | Analyze campaign performance and return recommendations | `{"type":"object","properties":{"campaigns":{"type":"array","items":{"type":"object","properties":{"campaignId":{"type...` | structured JSON text (`structuredContent` / `content[].text`) |
| `optimize_budget` | AI Agent | Suggest budget reallocation across campaigns based on ROAS | `{"type":"object","properties":{"totalBudget":{"type":"number","exclusiveMinimum":0,"description":"Total budget to all...` | structured JSON text (`structuredContent` / `content[].text`) |
| `generate_report` | AI Agent | Generate an agent-scoped marketing performance report | `{"type":"object","properties":{"campaigns":{"type":"array","items":{"type":"object","properties":{"campaignId":{"type...` | structured JSON text (`structuredContent` / `content[].text`) |
| `analyze_customers` | AI Agent | Analyze customer segments and suggest targeting actions | `{"type":"object","properties":{"segmentId":{"type":"string","description":"Filter by segment ID"}},"additionalPropert...` | structured JSON text (`structuredContent` / `content[].text`) |
| `suggest_actions` | AI Agent | Suggest prioritized marketing actions based on campaign data | `{"type":"object","properties":{"limit":{"type":"integer","exclusiveMinimum":0,"maximum":50},"campaigns":{"type":"arra...` | structured JSON text (`structuredContent` / `content[].text`) |
| `summarize_account` | AI Agent | Summarize overall account performance metrics | `{"type":"object","properties":{"campaigns":{"type":"array","items":{"type":"object","properties":{"campaignId":{"type...` | structured JSON text (`structuredContent` / `content[].text`) |
| `marketing_chat` | AI Agent | Marketing-focused chat that delegates to the rule-based agent | `{"type":"object","properties":{"message":{"type":"string","description":"User message"},"sessionId":{"type":"string",...` | structured JSON text (`structuredContent` / `content[].text`) |

_Nenhum Prompt registado neste servidor._

_Nenhum Resource registado neste servidor._

## @mcp-marketing/workflows

**Status:** PASS (157ms)
**Tools:** 15 (expected 15)
**Prompts:** 0
**Resources:** 0

| Tool | Category | Description | Input schema | Output schema |
|------|----------|-------------|--------------|---------------|
| `list_workflows` | Workflows | List all marketing workflows | `{"type":"object","properties":{"status":{"type":"string","enum":["active","paused","draft","archived"]}},"additionalP...` | structured JSON text (`structuredContent` / `content[].text`) |
| `create_workflow` | Workflows | Create a new marketing workflow | `{"type":"object","properties":{"name":{"type":"string"},"description":{"type":"string"},"trigger":{"type":"object","p...` | structured JSON text (`structuredContent` / `content[].text`) |
| `update_workflow` | Workflows | Update an existing workflow | `{"type":"object","properties":{"workflowId":{"type":"string"},"name":{"type":"string"},"description":{"type":"string"...` | structured JSON text (`structuredContent` / `content[].text`) |
| `duplicate_workflow` | Workflows | Duplicate an existing workflow | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additionalProperties":false...` | structured JSON text (`structuredContent` / `content[].text`) |
| `pause_workflow` | Workflows | Pause an active workflow | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additionalProperties":false...` | structured JSON text (`structuredContent` / `content[].text`) |
| `delete_workflow` | Workflows | Delete a workflow | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additionalProperties":false...` | structured JSON text (`structuredContent` / `content[].text`) |
| `run_workflow` | Workflows | Execute a workflow immediately | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additionalProperties":false...` | structured JSON text (`structuredContent` / `content[].text`) |
| `execute_workflow` | Workflows | Execute a workflow immediately (alias of run_workflow) | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additionalProperties":false...` | structured JSON text (`structuredContent` / `content[].text`) |
| `resume_workflow` | Workflows | Resume a paused workflow (set status back to active) | `{"type":"object","properties":{"workflowId":{"type":"string"}},"required":["workflowId"],"additionalProperties":false...` | structured JSON text (`structuredContent` / `content[].text`) |
| `run_due_workflows` | Workflows | Run all scheduled workflows that are due | `{"type":"object","properties":{"asOf":{"type":"string","description":"ISO datetime to evaluate due workflows"}},"addi...` | structured JSON text (`structuredContent` / `content[].text`) |
| `recover_workflow_execution` | Workflows | Recover and re-run a failed workflow execution | `{"type":"object","properties":{"executionId":{"type":"string"}},"required":["executionId"],"additionalProperties":fal...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_workflow_templates` | Workflows | List available workflow templates (tpl-birthday, etc.) | `{"type":"object","properties":{"category":{"type":"string"}},"additionalProperties":false,"$schema":"http://json-sche...` | structured JSON text (`structuredContent` / `content[].text`) |
| `create_workflow_from_template` | Workflows | Create a workflow from a seed template | `{"type":"object","properties":{"templateId":{"type":"string","description":"Template ID, e.g. tpl-birthday"},"name":{...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_workflow_executions` | Workflows | List workflow execution history | `{"type":"object","properties":{"workflowId":{"type":"string"},"limit":{"type":"integer","exclusiveMinimum":0,"maximum...` | structured JSON text (`structuredContent` / `content[].text`) |
| `list_workflow_audit_logs` | Workflows | List workflow audit log entries | `{"type":"object","properties":{"workflowId":{"type":"string"},"limit":{"type":"integer","exclusiveMinimum":0,"maximum...` | structured JSON text (`structuredContent` / `content[].text`) |

_Nenhum Prompt registado neste servidor._

_Nenhum Resource registado neste servidor._

## Totals

| Metric | Count |
|--------|------:|
| Tools discovered | 71 |
| Prompts | 0 |
| Resources | 0 |
| Server failures | 0 |

## Catalog JSON

```json
[
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "list_campaigns",
    "category": "Google Ads",
    "description": "List all Google Ads campaigns for the configured customer",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "get_campaign",
    "category": "Google Ads",
    "description": "Get a Google Ads campaign by ID",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "create_campaign",
    "category": "Google Ads",
    "description": "Create a new Google Ads campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "pause_campaign",
    "category": "Google Ads",
    "description": "Pause a Google Ads campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "enable_campaign",
    "category": "Google Ads",
    "description": "Enable a paused Google Ads campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "update_budget",
    "category": "Google Ads",
    "description": "Update the daily budget for a Google Ads campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "campaign_report",
    "category": "Google Ads",
    "description": "Get performance report for Google Ads campaigns",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "search_keywords",
    "category": "Google Ads",
    "description": "Search keyword ideas for Google Ads",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "list_customers",
    "category": "Google Ads",
    "description": "List Google Ads customer accounts accessible to the configured credentials",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/google-ads",
    "tool": "account_info",
    "category": "Google Ads",
    "description": "Get Google Ads account information for the configured customer ID",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "list_accounts",
    "category": "Meta Ads",
    "description": "List Meta ad accounts accessible with the configured token",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "list_campaigns",
    "category": "Meta Ads",
    "description": "List all Meta (Facebook/Instagram) ad campaigns",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "get_campaign",
    "category": "Meta Ads",
    "description": "Get a Meta ad campaign by ID",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "create_campaign",
    "category": "Meta Ads",
    "description": "Create a new Meta ad campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "pause_campaign",
    "category": "Meta Ads",
    "description": "Pause a Meta ad campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "enable_campaign",
    "category": "Meta Ads",
    "description": "Enable a paused Meta ad campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "resume_campaign",
    "category": "Meta Ads",
    "description": "Resume a paused Meta ad campaign (legacy alias of enable_campaign)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "update_budget",
    "category": "Meta Ads",
    "description": "Update the daily budget for a Meta ad campaign",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "get_insights",
    "category": "Meta Ads",
    "description": "Get Meta campaign insights (impressions, clicks, spend, CTR)",
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Optional campaign ID filter"
        }
      },
      "additionalProperties": false,
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "get_metrics",
    "category": "Meta Ads",
    "description": "Get Meta campaign metrics (legacy alias of get_insights)",
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaign_id": {
          "type": "string",
          "description": "Optional campaign ID filter"
        }
      },
      "additionalProperties": false,
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "list_audiences",
    "category": "Meta Ads",
    "description": "List Meta custom audiences",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "create_audience",
    "category": "Meta Ads",
    "description": "Create a custom audience for Meta ads (legacy)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "create_ad",
    "category": "Meta Ads",
    "description": "Create a Meta ad (legacy)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/meta-ads",
    "tool": "account_info",
    "category": "Meta Ads",
    "description": "Get Meta ad account information",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "send_birthday_message",
    "category": "WhatsApp Business",
    "description": "Send a personalized birthday message via WhatsApp",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "send_birthday",
    "category": "WhatsApp Business",
    "description": "Send a birthday WhatsApp message (Master Prompt alias of send_birthday_message)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "send_coupon",
    "category": "WhatsApp Business",
    "description": "Send a coupon offer message via WhatsApp",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "send_campaign",
    "category": "WhatsApp Business",
    "description": "Send a marketing campaign message to a recipient",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "send_template",
    "category": "WhatsApp Business",
    "description": "Send a pre-approved WhatsApp template message",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "schedule_message",
    "category": "WhatsApp Business",
    "description": "Schedule a WhatsApp message for future delivery",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "order_confirmation",
    "category": "WhatsApp Business",
    "description": "Send an order confirmation message via WhatsApp",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "list_templates",
    "category": "WhatsApp Business",
    "description": "List WhatsApp message templates available to the business account",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "get_message_status",
    "category": "WhatsApp Business",
    "description": "Get delivery status for a previously sent WhatsApp message",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/whatsapp",
    "tool": "validate_webhook",
    "category": "WhatsApp Business",
    "description": "Validate Meta WhatsApp webhook verification challenge",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "analyze_insights",
    "category": "Insights / Analytics",
    "description": "Analyze campaign snapshots and return heuristic insights",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "get_health_scores",
    "category": "Insights / Analytics",
    "description": "Calculate health scores for campaigns",
    "inputSchema": {
      "type": "object",
      "properties": {
        "campaignId": {
          "type": "string"
        }
      },
      "additionalProperties": false,
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "list_recommendations",
    "category": "Insights / Analytics",
    "description": "List actionable recommendations from campaign heuristics",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "get_executive_dashboard",
    "category": "Insights / Analytics",
    "description": "Get executive summary dashboard for all campaigns",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "list_timeline_events",
    "category": "Insights / Analytics",
    "description": "List marketing timeline events",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "record_timeline_event",
    "category": "Insights / Analytics",
    "description": "Record a new timeline event in the JSON event store",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "get_health_center",
    "category": "Insights / Analytics",
    "description": "Get health center overview with grade distribution and alerts",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/insights",
    "tool": "generate_report",
    "category": "Insights / Analytics",
    "description": "Generate a comprehensive insights report",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "chat",
    "category": "AI Agent",
    "description": "Chat with the local rule-based marketing agent (no LLM)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "list_pending_approvals",
    "category": "AI Agent",
    "description": "List actions awaiting user approval",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "confirm_action",
    "category": "AI Agent",
    "description": "Confirm a pending agent action",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "cancel_action",
    "category": "AI Agent",
    "description": "Cancel a pending agent action",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "get_agent_history",
    "category": "AI Agent",
    "description": "Get chat history for a session",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "get_ai_summary",
    "category": "AI Agent",
    "description": "Get a summary of agent activity and pending approvals",
    "inputSchema": {
      "type": "object",
      "properties": {},
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "list_audit_logs",
    "category": "AI Agent",
    "description": "List agent audit log entries",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "analyze_campaigns",
    "category": "AI Agent",
    "description": "Analyze campaign performance and return recommendations",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "optimize_budget",
    "category": "AI Agent",
    "description": "Suggest budget reallocation across campaigns based on ROAS",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "generate_report",
    "category": "AI Agent",
    "description": "Generate an agent-scoped marketing performance report",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "analyze_customers",
    "category": "AI Agent",
    "description": "Analyze customer segments and suggest targeting actions",
    "inputSchema": {
      "type": "object",
      "properties": {
        "segmentId": {
          "type": "string",
          "description": "Filter by segment ID"
        }
      },
      "additionalProperties": false,
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "suggest_actions",
    "category": "AI Agent",
    "description": "Suggest prioritized marketing actions based on campaign data",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "summarize_account",
    "category": "AI Agent",
    "description": "Summarize overall account performance metrics",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/ai-agent",
    "tool": "marketing_chat",
    "category": "AI Agent",
    "description": "Marketing-focused chat that delegates to the rule-based agent",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "list_workflows",
    "category": "Workflows",
    "description": "List all marketing workflows",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "create_workflow",
    "category": "Workflows",
    "description": "Create a new marketing workflow",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "update_workflow",
    "category": "Workflows",
    "description": "Update an existing workflow",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "duplicate_workflow",
    "category": "Workflows",
    "description": "Duplicate an existing workflow",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "pause_workflow",
    "category": "Workflows",
    "description": "Pause an active workflow",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "delete_workflow",
    "category": "Workflows",
    "description": "Delete a workflow",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "run_workflow",
    "category": "Workflows",
    "description": "Execute a workflow immediately",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "execute_workflow",
    "category": "Workflows",
    "description": "Execute a workflow immediately (alias of run_workflow)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "resume_workflow",
    "category": "Workflows",
    "description": "Resume a paused workflow (set status back to active)",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "run_due_workflows",
    "category": "Workflows",
    "description": "Run all scheduled workflows that are due",
    "inputSchema": {
      "type": "object",
      "properties": {
        "asOf": {
          "type": "string",
          "description": "ISO datetime to evaluate due workflows"
        }
      },
      "additionalProperties": false,
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "recover_workflow_execution",
    "category": "Workflows",
    "description": "Recover and re-run a failed workflow execution",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "list_workflow_templates",
    "category": "Workflows",
    "description": "List available workflow templates (tpl-birthday, etc.)",
    "inputSchema": {
      "type": "object",
      "properties": {
        "category": {
          "type": "string"
        }
      },
      "additionalProperties": false,
      "$schema": "http://json-schema.org/draft-07/schema#"
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "create_workflow_from_template",
    "category": "Workflows",
    "description": "Create a workflow from a seed template",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "list_workflow_executions",
    "category": "Workflows",
    "description": "List workflow execution history",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  },
  {
    "pkg": "@mcp-marketing/workflows",
    "tool": "list_workflow_audit_logs",
    "category": "Workflows",
    "description": "List workflow audit log entries",
    "inputSchema": {
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
    },
    "outputSchema": "structured JSON text (`structuredContent` / `content[].text`)"
  }
]
```

