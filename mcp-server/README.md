# OpenAPI TravelPay MCP Server

Model Context Protocol (MCP) server providing OpenAPI toolkit capabilities with TravelPay domain expertise.

## Features

This MCP server exposes 7 tools for working with OpenAPI specifications and the TravelPay API:

### OpenAPI Toolkit Tools

1. **download_spec** - Download OpenAPI specs from URLs or TravelPay default endpoints
   - Auto-converts Swagger 2.0 to OpenAPI 3.1
   - SHA-256 caching support

2. **generate_sdk** - Generate TypeScript/Python SDKs from OpenAPI specs
   - Uses industry-standard OpenAPI Generator
   - Supports both TypeScript (fetch-based) and Python clients

3. **analyze_spec** - Analyze OpenAPI spec quality
   - Quality scoring
   - Issue detection and reporting
   - Detailed analysis of paths, operations, schemas

4. **enhance_spec** - Auto-enhance OpenAPI specs
   - Pattern-based summary generation
   - Auto-add descriptions
   - Preview or apply changes

5. **validate_spec** - Validate OpenAPI specifications
   - JSON Schema 2020-12 validation
   - Reference integrity checking with Scalar
   - Detailed error reporting

### TravelPay API Tools

6. **travelpay_create_payment** - Create payment sessions
   - Supports production, sandbox, and UAT environments
   - Requires API key authentication

7. **travelpay_get_session** - Retrieve payment session details
   - Multi-environment support
   - Full session information

## Installation

### 1. Install dependencies

```bash
cd mcp-server
npm install
```

### 2. Build the server

```bash
npm run build
```

### 3. Configure environment variables

Create a `.env` file in the repository root:

```bash
# TravelPay API Configuration
TRAVELPAY_API_KEY=your_api_key_here

# Optional: Custom API URLs
TRAVELPAY_API_URL_PROD=https://api.travelpay.com
TRAVELPAY_API_URL_SANDBOX=https://sandbox-api.travelpay.com
TRAVELPAY_API_URL_UAT=https://uat-api.travelpay.com
```

### 4. Configure Claude Code

Add the MCP server to your Claude Code configuration in `.mcp.json`:

```json
{
  "mcpServers": {
    "openapi-travelpay-toolkit": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"],
      "env": {
        "TRAVELPAY_API_KEY": "${TRAVELPAY_API_KEY}"
      }
    }
  }
}
```

Or use the npm package directly:

```json
{
  "mcpServers": {
    "openapi-travelpay-toolkit": {
      "command": "npx",
      "args": ["-y", "openapi-travelpay-mcp-server"],
      "env": {
        "TRAVELPAY_API_KEY": "${TRAVELPAY_API_KEY}"
      }
    }
  }
}
```

## Usage

Once configured, the tools will be available in Claude Code. Here are some example use cases:

### Download and Validate TravelPay Spec

```
User: Download the TravelPay OpenAPI spec and validate it
Claude: [Uses download_spec tool, then validate_spec tool]
```

### Generate SDKs

```
User: Generate TypeScript and Python SDKs from the spec
Claude: [Uses generate_sdk tool with both languages]
```

### Create Payment Session

```
User: Create a $50 USD payment in the sandbox environment
Claude: [Uses travelpay_create_payment with amount=5000, currency=USD, environment=sandbox]
```

### Analyze Spec Quality

```
User: Analyze the OpenAPI spec and show me quality issues
Claude: [Uses analyze_spec tool to generate quality report]
```

## Development

### Watch mode

```bash
npm run watch
```

### Project structure

```
mcp-server/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Requirements

- Node.js >= 18.0.0
- Bun runtime (for executing OpenAPI toolkit scripts in parent repo)
- TravelPay API key (for TravelPay-specific tools)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TRAVELPAY_API_KEY` | For TravelPay tools | API key for TravelPay authentication |
| `TRAVELPAY_API_URL_PROD` | No | Production API URL (default: https://api.travelpay.com) |
| `TRAVELPAY_API_URL_SANDBOX` | No | Sandbox API URL (default: https://sandbox-api.travelpay.com) |
| `TRAVELPAY_API_URL_UAT` | No | UAT API URL (default: https://uat-api.travelpay.com) |

## How It Works

The MCP server acts as a bridge between Claude and the OpenAPI toolkit scripts in the parent repository. Each tool:

1. Receives structured input from Claude via MCP protocol
2. Translates parameters to appropriate command-line arguments
3. Executes the corresponding `bun run` script from the parent repo
4. Returns formatted output back to Claude

For TravelPay API tools, the server makes direct HTTP requests using the configured API key and environment URLs.

## Troubleshooting

### "Command failed" errors

- Ensure Bun is installed and available in PATH
- Check that all toolkit scripts exist in the parent repository
- Verify you're running the MCP server from the correct directory

### TravelPay API errors

- Verify `TRAVELPAY_API_KEY` is set correctly
- Check you're using the correct environment (production/sandbox/uat)
- Ensure API key has proper permissions

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Check Node.js version is >= 18.0.0
- Delete `dist/` and `node_modules/` and rebuild

## License

MIT
