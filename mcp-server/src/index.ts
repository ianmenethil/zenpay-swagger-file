#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import * as path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const exec = promisify(execCallback);

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment configuration
const ENVIRONMENTS = {
  production: "https://api.travelpay.com.au",
  sandbox: "https://api.sandbox.travelpay.com.au",
  uat: "https://apiuat.travelpay.com.au",
};

const REPO_ROOT = path.resolve(__dirname, "../..");

// Tool definitions
const TOOLS: Tool[] = [
  {
    name: "download_spec",
    description:
      "Download OpenAPI specification from a URL or TravelPay default endpoints. Converts Swagger 2.0 to OpenAPI 3.1 automatically.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "URL to download the OpenAPI spec from. If not provided, downloads TravelPay spec.",
        },
        output: {
          type: "string",
          description: "Output file path (default: openapi.json)",
        },
      },
    },
  },
  {
    name: "generate_sdk",
    description:
      "Generate TypeScript or Python SDK from an OpenAPI specification using OpenAPI Generator.",
    inputSchema: {
      type: "object",
      properties: {
        spec: {
          type: "string",
          description: "Path to OpenAPI spec file (default: openapi.json)",
        },
        languages: {
          type: "array",
          items: { type: "string", enum: ["typescript", "python"] },
          description: "Languages to generate SDKs for (default: both)",
        },
        outputDir: {
          type: "string",
          description: "Output directory for SDKs (default: sdk/)",
        },
      },
    },
  },
  {
    name: "analyze_spec",
    description:
      "Analyze OpenAPI specification quality, find issues, and generate detailed reports with scoring.",
    inputSchema: {
      type: "object",
      properties: {
        spec: {
          type: "string",
          description: "Path to OpenAPI spec file to analyze (default: openapi.json)",
        },
      },
      required: [],
    },
  },
  {
    name: "enhance_spec",
    description:
      "Auto-enhance OpenAPI specification by adding summaries and descriptions based on detected patterns.",
    inputSchema: {
      type: "object",
      properties: {
        spec: {
          type: "string",
          description: "Path to OpenAPI spec file (default: openapi.json)",
        },
        preview: {
          type: "boolean",
          description: "Preview changes without applying (default: false)",
        },
        apply: {
          type: "boolean",
          description: "Apply all enhancements automatically (default: false)",
        },
      },
    },
  },
  {
    name: "validate_spec",
    description:
      "Validate OpenAPI specification against JSON Schema 2020-12 and check reference integrity using Scalar.",
    inputSchema: {
      type: "object",
      properties: {
        spec: {
          type: "string",
          description: "Path to OpenAPI spec file (default: openapi.json)",
        },
      },
    },
  },
  {
    name: "travelpay_create_payment",
    description:
      "Create a payment session using the TravelPay API. Requires TRAVELPAY_API_KEY environment variable.",
    inputSchema: {
      type: "object",
      properties: {
        amount: {
          type: "number",
          description: "Payment amount in cents (e.g., 1000 = $10.00)",
        },
        currency: {
          type: "string",
          description: "Currency code (e.g., USD, EUR)",
        },
        environment: {
          type: "string",
          enum: ["production", "sandbox", "uat"],
          description: "TravelPay environment to use (default: sandbox)",
        },
        description: {
          type: "string",
          description: "Payment description",
        },
      },
      required: ["amount", "currency"],
    },
  },
  {
    name: "travelpay_get_session",
    description:
      "Get payment session details from TravelPay API. Requires TRAVELPAY_API_KEY environment variable.",
    inputSchema: {
      type: "object",
      properties: {
        sessionId: {
          type: "string",
          description: "Payment session ID",
        },
        environment: {
          type: "string",
          enum: ["production", "sandbox", "uat"],
          description: "TravelPay environment to use (default: sandbox)",
        },
      },
      required: ["sessionId"],
    },
  },
  {
    name: "comprehensive_diff",
    description:
      "Perform comprehensive field-by-field comparison of two OpenAPI specifications. Compares ALL fields including info, servers, paths, operations, parameters, request bodies, responses, schemas, security, tags, and more. Returns categorized differences (critical/important/informational) with 100% accuracy.",
    inputSchema: {
      type: "object",
      properties: {
        spec1: {
          type: "string",
          description: "Path to first OpenAPI spec file (default: openapi.json)",
        },
        spec2: {
          type: "string",
          description: "Path to second OpenAPI spec file (default: openapi-merchant-apis.json)",
        },
        format: {
          type: "string",
          enum: ["console", "json", "markdown"],
          description: "Output format (default: console)",
        },
        output: {
          type: "string",
          description: "Output file path (optional, if not provided outputs to console)",
        },
      },
    },
  },
];

// Helper function to run bun commands
async function runBunScript(
  script: string,
  args: string[] = [],
  cwd: string = REPO_ROOT
): Promise<{ stdout: string; stderr: string }> {
  const command = `bun run ${script} ${args.join(" ")}`;
  console.error(`[MCP] Running: ${command}`);

  try {
    const { stdout, stderr } = await exec(command, { cwd });
    return { stdout, stderr };
  } catch (error: any) {
    throw new Error(`Command failed: ${error.message}\nStdout: ${error.stdout}\nStderr: ${error.stderr}`);
  }
}

// Helper function to make HTTP requests to TravelPay API
// TravelPay requires BOTH api-key header AND HTTP basic auth
async function makeApiRequest<T>(
  endpoint: string,
  environment: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  params?: any
): Promise<T> {
  try {
    const envUpper = environment.toUpperCase();
    const apiKey = process.env[`TRAVELPAY_${envUpper}_API_KEY`];
    const username = process.env[`TRAVELPAY_${envUpper}_USERNAME`];
    const password = process.env[`TRAVELPAY_${envUpper}_PASSWORD`];

    if (!apiKey || !username || !password) {
      throw new Error(
        `Missing credentials for ${environment} environment. ` +
        `Required: TRAVELPAY_${envUpper}_API_KEY, TRAVELPAY_${envUpper}_USERNAME, TRAVELPAY_${envUpper}_PASSWORD`
      );
    }

    const baseUrl = ENVIRONMENTS[environment as keyof typeof ENVIRONMENTS];

    console.error(`[MCP] TravelPay API: ${method} ${baseUrl}/${endpoint}`);

    // TravelPay requires BOTH api-key header AND basic auth
    const response = await axios({
      method,
      url: `${baseUrl}/${endpoint}`,
      data,
      params,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-key": apiKey, // Custom TravelPay header
      },
      auth: {
        username,
        password,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `TravelPay API error: ${error.response.status} ${error.response.statusText}\n` +
        `${JSON.stringify(error.response.data, null, 2)}`
      );
    }
    throw error;
  }
}

// Tool handlers
async function handleDownloadSpec(args: any): Promise<string> {
  const scriptArgs: string[] = [];

  if (args.url) {
    scriptArgs.push(`--url="${args.url}"`);
  }
  if (args.output) {
    scriptArgs.push(`--output="${args.output}"`);
  }

  const { stdout, stderr } = await runBunScript("swagger-downloader.ts", scriptArgs);
  return `✅ Spec downloaded successfully\n\n${stdout}\n${stderr}`;
}

async function handleGenerateSdk(args: any): Promise<string> {
  const scriptArgs: string[] = [];

  if (args.spec) {
    scriptArgs.push(args.spec);
  }
  if (args.languages) {
    scriptArgs.push(...args.languages);
  }
  if (args.outputDir) {
    scriptArgs.push(`--output="${args.outputDir}"`);
  }

  const { stdout, stderr } = await runBunScript("generate-sdk.ts", scriptArgs);
  return `✅ SDK generation complete\n\n${stdout}\n${stderr}`;
}

async function handleAnalyzeSpec(args: any): Promise<string> {
  const scriptArgs: string[] = [];

  if (args.spec) {
    scriptArgs.push(args.spec);
  }

  const { stdout, stderr } = await runBunScript("analyze-spec.ts", scriptArgs);
  return `📊 Analysis complete\n\n${stdout}\n${stderr}`;
}

async function handleEnhanceSpec(args: any): Promise<string> {
  const scriptArgs: string[] = [];

  if (args.spec) {
    scriptArgs.push(args.spec);
  }
  if (args.preview) {
    scriptArgs.push("--preview");
  }
  if (args.apply) {
    scriptArgs.push("--all", "--apply");
  }

  const { stdout, stderr } = await runBunScript("enhance-spec.ts", scriptArgs);
  return `✨ Enhancement complete\n\n${stdout}\n${stderr}`;
}

async function handleValidateSpec(args: any): Promise<string> {
  const scriptArgs: string[] = [];

  if (args.spec) {
    scriptArgs.push(args.spec);
  }

  const { stdout, stderr } = await runBunScript("validate-spec.ts", scriptArgs);
  return `✅ Validation complete\n\n${stdout}\n${stderr}`;
}

async function handleTravelPayCreatePayment(args: any): Promise<string> {
  const environment = args.environment || "sandbox";

  const payload = {
    amount: args.amount,
    currency: args.currency,
    description: args.description || "Payment via MCP",
  };

  const result = await makeApiRequest<any>("v1/payment-sessions", environment, "POST", payload);

  return `✅ Payment session created\n\nSession ID: ${result.id}\nAmount: ${args.amount} ${args.currency}\nStatus: ${result.status}\nEnvironment: ${environment}\n\nFull response:\n${JSON.stringify(result, null, 2)}`;
}

async function handleTravelPayGetSession(args: any): Promise<string> {
  const environment = args.environment || "sandbox";
  const sessionId = args.sessionId;

  const result = await makeApiRequest<any>(`v1/payment-sessions/${sessionId}`, environment, "GET");

  return `✅ Payment session retrieved\n\nSession ID: ${result.id}\nAmount: ${result.amount} ${result.currency}\nStatus: ${result.status}\nEnvironment: ${environment}\n\nFull response:\n${JSON.stringify(result, null, 2)}`;
}

async function handleComprehensiveDiff(args: any): Promise<string> {
  const scriptArgs: string[] = [];

  if (args.spec1) {
    scriptArgs.push(`--spec1=${args.spec1}`);
  }
  if (args.spec2) {
    scriptArgs.push(`--spec2=${args.spec2}`);
  }
  if (args.format) {
    scriptArgs.push(`--format=${args.format}`);
  }
  if (args.output) {
    scriptArgs.push(`--output=${args.output}`);
  }

  const { stdout, stderr } = await runBunScript("comprehensive-diff.ts", scriptArgs);
  return `🔍 Comprehensive diff complete\n\n${stdout}\n${stderr}`;
}

// Main server setup
const server = new Server(
  {
    name: "openapi-travelpay-toolkit",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;

    switch (name) {
      case "download_spec":
        result = await handleDownloadSpec(args || {});
        break;
      case "generate_sdk":
        result = await handleGenerateSdk(args || {});
        break;
      case "analyze_spec":
        result = await handleAnalyzeSpec(args || {});
        break;
      case "enhance_spec":
        result = await handleEnhanceSpec(args || {});
        break;
      case "validate_spec":
        result = await handleValidateSpec(args || {});
        break;
      case "travelpay_create_payment":
        result = await handleTravelPayCreatePayment(args || {});
        break;
      case "travelpay_get_session":
        result = await handleTravelPayGetSession(args || {});
        break;
      case "comprehensive_diff":
        result = await handleComprehensiveDiff(args || {});
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: "text", text: result }],
    };
  } catch (error: any) {
    const errorMessage = error.message || String(error);
    console.error(`[MCP] Error in ${name}:`, errorMessage);

    return {
      content: [{ type: "text", text: `❌ Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  console.error("[MCP] OpenAPI TravelPay Toolkit MCP Server starting...");
  console.error(`[MCP] Repository root: ${REPO_ROOT}`);

  // Check credentials for each environment
  const checkEnv = (env: string) => {
    const upper = env.toUpperCase();
    const hasKey = !!process.env[`TRAVELPAY_${upper}_API_KEY`];
    const hasUser = !!process.env[`TRAVELPAY_${upper}_USERNAME`];
    const hasPass = !!process.env[`TRAVELPAY_${upper}_PASSWORD`];
    const allPresent = hasKey && hasUser && hasPass;
    console.error(`[MCP] ${env} credentials: ${allPresent ? "✅" : "❌"}`);
  };

  checkEnv("sandbox");
  checkEnv("uat");
  checkEnv("production");

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("[MCP] Server ready and listening on stdio");
}

main().catch((error) => {
  console.error("[MCP] Fatal error:", error);
  process.exit(1);
});
