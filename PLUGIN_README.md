# TravelPay OpenAPI Toolkit Plugin

Complete toolkit for working with TravelPay payment API including spec management, SDK generation, and domain expertise.

## Features

✅ **MCP Server** - 7 tools for spec management and API operations
✅ **TravelPay Expert Skill** - Auto-invoked domain knowledge (1200+ lines)
✅ **TravelPay Expert Agent** - Explicit invocation for complex tasks
✅ **Slash Commands** - Quick access to common operations
✅ **Multi-Environment** - Sandbox, UAT, Production support
✅ **SDK Generation** - TypeScript and Python SDKs
✅ **Quality Analysis** - Comprehensive spec analysis and enhancement

## Installation

### Via Claude Code Marketplace (Coming Soon)

```
Install "TravelPay OpenAPI Toolkit" from marketplace
```

### Manual Installation

1. Copy plugin to Claude Code plugins directory:

```bash
cp -r travelpay-openapi-toolkit ~/.claude/plugins/
```

2. Set environment variables in `.env`:

```bash
# Sandbox (safe for testing)
export TRAVELPAY_SANDBOX_API_KEY=your_key
export TRAVELPAY_SANDBOX_USERNAME=your_username
export TRAVELPAY_SANDBOX_PASSWORD=your_password

# Production (use carefully!)
export TRAVELPAY_PROD_API_KEY=your_key
export TRAVELPAY_PROD_USERNAME=your_username
export TRAVELPAY_PROD_PASSWORD=your_password
```

3. Reload Claude Code

## Quick Start

### Download TravelPay Spec

```
/travelpay:spec-download
```

### Analyze Documentation Quality

```
/travelpay:spec-analyze
```

### Generate TypeScript SDK

```
/travelpay:sdk-generate typescript
```

### Create Test Payment

Just ask: "Create a test payment for $25 in sandbox"

## Components

### 🔧 MCP Server Tools

**Spec Management:**
- `download_spec` - Download latest spec
- `analyze_spec` - Quality analysis
- `enhance_spec` - Auto-improve docs
- `validate_spec` - OpenAPI validation
- `generate_sdk` - SDK generation

**API Operations:**
- `travelpay_create_payment` - Create payment
- `travelpay_get_session` - Get session

### 🤖 Agents & Skills

**TravelPay Expert Skill** - Auto-invoked when discussing:
- Payment processing
- API integration
- OpenAPI specs
- SDK generation

**TravelPay Expert Agent** - Invoke explicitly:

```
@travelpay-expert how do I implement recurring payments?
```

### ⚡ Slash Commands

- `/travelpay:spec-download` - Download spec
- `/travelpay:spec-analyze` - Analyze quality
- `/travelpay:sdk-generate` - Generate SDK

## Usage Examples

### Example 1: Download and Analyze Spec

```
User: Download the TravelPay spec and tell me what needs improvement

→ Uses download_spec tool
→ Uses analyze_spec tool
→ Shows quality report with recommendations
```

### Example 2: Generate SDK and Create Payment

```
User: Generate a TypeScript SDK and create a test payment

→ Uses generate_sdk tool
→ Generates SDK in sdk/typescript/
→ Uses travelpay_create_payment tool
→ Shows payment URL and code example
```

### Example 3: Improve Documentation

```
User: What's wrong with the sessions documentation?

→ Uses analyze_spec for sessions route
→ Shows 7 issues found
→ Suggests enhancements
→ User confirms
→ Uses enhance_spec to fix
→ Shows before/after diff
```

## Authentication

TravelPay requires **BOTH**:
1. **api-key header:** `api-key: your-api-key`
2. **HTTP Basic Auth:** `username:password`

Set these in environment variables (never hardcode!):

```bash
TRAVELPAY_[ENV]_API_KEY=...
TRAVELPAY_[ENV]_USERNAME=...
TRAVELPAY_[ENV]_PASSWORD=...
```

## Environments

| Environment | URL | Safety |
|-------------|-----|--------|
| **Sandbox** | https://api.sandbox.travelpay.com.au | ✅ Safe for testing |
| **UAT** | https://apiuat.travelpay.com.au | ⚠️ Pre-production |
| **Production** | https://api.travelpay.com.au | 🚨 Real money! |

**Default:** Sandbox (all operations use sandbox unless you explicitly request production)

## Directory Structure

```
travelpay-openapi-toolkit/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── commands/
│   ├── spec-download.md         # Download spec command
│   ├── spec-analyze.md          # Analyze spec command
│   └── sdk-generate.md          # Generate SDK command
├── agents/
│   └── travelpay-expert.md      # Expert agent
├── skills/
│   └── travelpay-expert/
│       └── SKILL.md             # Expert skill (1200+ lines)
├── mcp-server/
│   ├── src/index.ts             # MCP server implementation
│   ├── package.json
│   └── tsconfig.json
├── agents-sdk-app/
│   ├── src/cli.ts               # Agents SDK wrapper
│   ├── package.json
│   └── README.md
├── .mcp.json                    # MCP server config
└── README.md                    # This file
```

## Development

### Build MCP Server

```bash
cd mcp-server
npm install
npm run build
```

### Test Tools

```bash
# Test download
echo '{}' | node mcp-server/dist/index.js  # Should see tools list
```

### Build Agents SDK App

```bash
cd agents-sdk-app
npm install
npm run build
```

## Autonomous Agent (Agents SDK)

The plugin includes an autonomous agent wrapper using Anthropic's Agents SDK:

```bash
cd agents-sdk-app

# Interactive mode
npm run ask

# One-shot questions
travelpay-agent ask "Create a test payment for $50"

# Test suite
npm run test
```

The agent connects to the MCP server and can autonomously use all 7 tools.

## Troubleshooting

**MCP server not starting:**
- Check `bun` is installed
- Verify mcp-server is built (`npm run build`)
- Check environment variables are set

**Authentication errors:**
- Verify all 3 credentials per environment (api-key, username, password)
- Check credentials are correct
- Try sandbox first before production

**SDK generation fails:**
- Ensure `openapi.json` exists
- Run `bun run validate` first
- Check OpenAPI Generator is installed

## License

MIT

## Support

Issues: https://github.com/yourusername/zenpay-swagger-file/issues
