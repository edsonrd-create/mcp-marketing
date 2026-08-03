# Changelog

## [1.1.0] - 2026-08-03 — LTS + Master Prompt v2.0

### Added
- Marketing Brain CLI (`marketing-brain`) with doctor, start, validate, live, status, update, version
- `create-marketing-brain` project scaffolder
- Operational scripts: build-info, package-release, system-validation, mcp-smoke, mcp-tools, live-validation, compat-init, health, validate:meta
- Core MCP Framework (`src/core`): ToolRegistry, ProviderRegistry, Bootstrap, HealthService, DoctorService
- Google Ads provider (`src/providers/google-ads`) with OAuth2, retry, 10 tools
- Meta Ads provider (`src/providers/meta-ads`) — 10 Master tools + 4 legacy aliases
- WhatsApp Master tools: `send_birthday`, `list_templates`, `get_message_status`, `validate_webhook`
- AI Agent modules: Planner, ConversationMemory, RecommendationEngine, PromptManager + 7 Master tools
- Workflows: `execute_workflow`, `resume_workflow` (additive)
- Insights: CPC alongside ROAS/CPA/CTR
- Release engineering: `VERSION`, `BUILD_INFO.json`, `RELEASE_MANIFEST.json`
- Docker / GitHub / licensing artifacts
- Docs: INSTALL, API, CONFIGURATION, CORE_FRAMEWORK, GOOGLE_ADS, META_ADS, WHATSAPP, `PRODUCTION_READINESS_REPORT.md`

### MCP Servers (71 tools)
- Google Ads (10), Meta Ads (14), WhatsApp (10), Insights (8), AI Agent (14), Workflows (15)

### Requirements
- Node.js >= 22
- TypeScript ESM monorepo
- Cross-platform: Windows, Linux, macOS
