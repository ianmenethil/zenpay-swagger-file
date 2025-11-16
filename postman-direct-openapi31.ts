#!/usr/bin/env bun

/**
 * Postman to OpenAPI 3.1 Converter (Direct Transformations API)
 *
 * Uses Postman's native transformations API to get OpenAPI 3.0,
 * then upgrades to 3.1 using @scalar/openapi-parser
 *
 * Benefits over postman-to-openapi:
 * - Better schema extraction
 * - Preserves component definitions
 * - Official Postman conversion
 *
 * @example
 * bun run postman-direct-openapi31.ts --collection-id=YOUR_ID
 */

import { readFile, writeFile } from "fs/promises";
import { upgrade } from "@scalar/openapi-parser";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Postman API base URL */
const POSTMAN_API_BASE = "https://api.postman.com";

/** Default collection ID (Zenith Payments) */
const DEFAULT_COLLECTION_ID = "10633263-1a62cdcb-e9a0-4990-89eb-6762de8ab7b7";

/** Output file for OpenAPI 3.1 */
const OPENAPI_31_OUTPUT = "zenith-merchant-apis-openapi31.json";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
};

function log(message: string, color: keyof typeof colors = "reset"): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ============================================================================
// POSTMAN API FUNCTIONS
// ============================================================================

async function getOpenAPI30FromPostman(
  collectionId: string,
  apiKey: string
): Promise<string> {
  log(`\n🔄 Step 1: Fetching OpenAPI 3.0 from Postman API...`, "cyan");

  const url = `${POSTMAN_API_BASE}/collections/${collectionId}/transformations`;

  log(`   Endpoint: ${url}`, "reset");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Postman API error (${response.status}):\n${errorText}\n\n` +
        `Note: The transformations endpoint only works for collections in YOUR workspace.\n` +
        `Public collections must be forked/imported to your workspace first.`
    );
  }

  const data = await response.json();

  log(`✅ Received response from Postman`, "green");

  // The transformations endpoint wraps the response in an "output" array
  let openApiSpec: any;

  if (data.output && Array.isArray(data.output) && data.output.length > 0) {
    // Find the OpenAPI output (usually the first item)
    openApiSpec = data.output.find(
      (item: any) => item.type === "openapi3" || item.openapi
    );

    if (!openApiSpec && data.output[0]) {
      // Fallback: use first output item
      openApiSpec = data.output[0];
    }
  } else if (data.openapi) {
    // Direct OpenAPI spec (older API format)
    openApiSpec = data;
  } else {
    log(`⚠️  Unexpected response format`, "yellow");
    log(`   Response keys: ${Object.keys(data).join(", ")}`, "reset");
    throw new Error("Could not find OpenAPI spec in transformations response");
  }

  if (!openApiSpec || !openApiSpec.openapi) {
    throw new Error("Invalid OpenAPI specification in response");
  }

  log(`   OpenAPI Version: ${openApiSpec.openapi}`, "reset");
  log(`   Title: ${openApiSpec.info?.title || "Unknown"}`, "reset");
  log(`   Paths: ${Object.keys(openApiSpec.paths || {}).length}`, "reset");
  log(
    `   Schemas: ${Object.keys(openApiSpec.components?.schemas || {}).length}`,
    "reset"
  );

  return JSON.stringify(openApiSpec, null, 2);
}

async function upgradeToOpenAPI31(openapi30Content: string): Promise<any> {
  log(`\n🔄 Step 2: Upgrading to OpenAPI 3.1 (Scalar)...`, "cyan");

  const result = await upgrade(openapi30Content);

  if (!result.valid) {
    log(`\n⚠️  Validation warnings:`, "yellow");
    if (result.errors && result.errors.length > 0) {
      result.errors.slice(0, 5).forEach((error: any, index: number) => {
        log(
          `   ${index + 1}. ${error.message || JSON.stringify(error)}`,
          "yellow"
        );
      });
      if (result.errors.length > 5) {
        log(`   ... and ${result.errors.length - 5} more`, "yellow");
      }
    }
  }

  const upgraded = result.specification;

  if (!upgraded) {
    throw new Error("Upgrade failed: no specification returned");
  }

  if (!upgraded.openapi || !upgraded.openapi.startsWith("3.1")) {
    log(
      `⚠️  Warning: Version is ${upgraded.openapi}, expected 3.1.x`,
      "yellow"
    );
  } else {
    log(`✅ Successfully upgraded to OpenAPI ${upgraded.openapi}`, "green");
  }

  return upgraded;
}

async function enhanceSpec(spec: any): Promise<any> {
  log(`\n🔄 Step 3: Enhancing specification...`, "cyan");

  // Update info to match TravelPay style
  if (spec.info) {
    spec.info.title = spec.info.title.replace(
      "Zenith Payments Developer Guide - ",
      ""
    );
    log(`   ✅ Updated title: ${spec.info.title}`, "green");
  }

  // Ensure servers are set correctly
  if (!spec.servers || spec.servers.length === 0) {
    spec.servers = [
      {
        url: "https://api.sandbox.travelpay.com.au",
        description: "Sandbox Environment",
      },
    ];
    log(`   ✅ Added server URL`, "green");
  }

  // Stats
  const pathCount = Object.keys(spec.paths || {}).length;
  const schemaCount = Object.keys(spec.components?.schemas || {}).length;
  const securitySchemes = Object.keys(
    spec.components?.securitySchemes || {}
  );

  log(`\n📊 Final Specification Stats:`, "cyan");
  log(`   OpenAPI: ${spec.openapi}`, "reset");
  log(`   Title: ${spec.info.title}`, "reset");
  log(`   Paths: ${pathCount}`, "reset");
  log(`   Operations: ${countOperations(spec)}`, "reset");
  log(`   Schemas: ${schemaCount}`, "reset");
  log(`   Security Schemes: ${securitySchemes.join(", ") || "none"}`, "reset");

  return spec;
}

function countOperations(spec: any): number {
  let count = 0;
  const methods = ["get", "post", "put", "patch", "delete", "options", "head"];

  for (const path in spec.paths || {}) {
    for (const method in spec.paths[path]) {
      if (methods.includes(method.toLowerCase())) {
        count++;
      }
    }
  }

  return count;
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Postman → OpenAPI 3.1 (Direct Transformations API)", "cyan");
    log("=".repeat(70) + "\n", "cyan");

    // Check for API key
    const apiKey = process.env.POSTMAN_API_KEY;
    if (!apiKey) {
      throw new Error(
        "POSTMAN_API_KEY environment variable is required.\n" +
          "Get your API key from: https://web.postman.co/settings/me/api-keys"
      );
    }

    // Parse CLI arguments
    const args = process.argv.slice(2);
    const collectionIdArg = args.find((arg) =>
      arg.startsWith("--collection-id=")
    );
    const outputArg = args.find((arg) => arg.startsWith("--output="));

    const collectionId = collectionIdArg
      ? collectionIdArg.split("=")[1]
      : DEFAULT_COLLECTION_ID;
    const outputFile = outputArg
      ? outputArg.split("=")[1]
      : OPENAPI_31_OUTPUT;

    log(`📋 Collection ID: ${collectionId}`, "cyan");
    log(`📁 Output: ${outputFile}`, "cyan");

    // Step 1: Get OpenAPI 3.0 from Postman transformations API
    const openapi30 = await getOpenAPI30FromPostman(collectionId, apiKey);

    // Step 2: Upgrade to OpenAPI 3.1
    const openapi31 = await upgradeToOpenAPI31(openapi30);

    // Step 3: Enhance specification
    const enhanced = await enhanceSpec(openapi31);

    // Save
    await writeFile(outputFile, JSON.stringify(enhanced, null, 2));
    log(`\n💾 Saved: ${outputFile}`, "green");

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Conversion Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    log(`💡 Next steps:`, "yellow");
    log(`   bun run validate ${outputFile}`, "reset");
    log(`   bun run docs ${outputFile}`, "reset");
  } catch (error) {
    log(`\n${"=".repeat(70)}`, "red");
    log(`❌ Error: ${error}`, "red");
    log(`${"=".repeat(70)}\n`, "red");

    log(`\n💡 Troubleshooting:`, "yellow");
    log(
      `   1. Make sure the collection is in YOUR Postman workspace`,
      "reset"
    );
    log(`   2. Check your POSTMAN_API_KEY is valid`, "reset");
    log(`   3. For public collections, fork them to your workspace first`, "reset");

    process.exit(1);
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (import.meta.main) {
  main();
}
