# TravelPay Agent App

Autonomous agent powered by Claude + Agents SDK that uses the TravelPay MCP server.

## Features

- 🤖 **Autonomous Agent** - Claude makes decisions and uses tools
- 🔧 **MCP Integration** - Connects to TravelPay MCP server
- 💬 **Interactive Mode** - Chat with the agent
- ⚡ **One-Shot Mode** - Ask single questions
- ✅ **Test Suite** - Automated testing

## Setup

```bash
cd agents-sdk-app
npm install
npm run build
```

## Environment Variables

```bash
# Anthropic API
export ANTHROPIC_API_KEY=your_anthropic_key

# TravelPay Sandbox
export TRAVELPAY_SANDBOX_API_KEY=your_key
export TRAVELPAY_SANDBOX_USERNAME=your_username
export TRAVELPAY_SANDBOX_PASSWORD=your_password
```

## Usage

### Interactive Mode

```bash
npm run ask
# Or
travelpay-agent interactive
```

### One-Shot Questions

```bash
travelpay-agent ask "Create a test payment for $50"
travelpay-agent ask "Generate a TypeScript SDK"
travelpay-agent ask "What's the payments documentation quality?"
```

### Test Suite

```bash
npm run test
```

## How It Works

```
┌──────────────┐
│     You      │ Ask question
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Agents SDK  │ Send to Claude + MCP config
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Claude    │ Decides which tools to use
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  MCP Server  │ Executes tools (download_spec, etc.)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Claude    │ Processes results
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     You      │ Receive answer
└──────────────┘
```

## Example Session

```
You: Download the TravelPay spec and analyze it

Agent: I'll download the spec and analyze its quality.

[Used 2 tool(s)]
  - download_spec({})
  - analyze_spec({"spec":"openapi.json"})

Downloaded TravelPay OpenAPI spec to openapi.json.

Quality Analysis:
- Overall score: 2/100
- Total issues: 152
- Routes needing work:
  1. customers (61 issues)
  2. payments (47 issues)
  3. preauths (35 issues)

Would you like me to enhance any of these routes?

You: Yes, enhance the payments route

Agent: I'll enhance the payments documentation.

[Used 1 tool(s)]
  - enhance_spec({"spec":"openapi.json","route":"payments","apply":true})

Enhanced payments route:
- Added 23 missing descriptions
- Added 15 examples
- Fixed 9 schema issues

The payments documentation is now much more complete!
```

## License

MIT
