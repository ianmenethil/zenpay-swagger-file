#!/usr/bin/env bun

/**
 * Postman to OpenAPI 3.1 Converter
 *
 * Converts Postman collections to OpenAPI 3.1 specification with:
 * - Initial conversion using postman-to-openapi (generates 3.0)
 * - Automatic upgrade to OpenAPI 3.1 using @scalar/openapi-parser
 * - Validation and error reporting
 * - Clean JSON output
 *
 * @example
 * bun run postman-to-openapi31.ts
 * bun run postman-to-openapi31.ts --input=custom-collection.json
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { upgrade } from "@scalar/openapi-parser";

const postmanToOpenApi = require("postman-to-openapi");

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Default input file (unwrapped Postman collection) */
const DEFAULT_INPUT = "zenith-postman-collection-unwrapped.json";

/** Temporary file for OpenAPI 3.0 output */
const TEMP_OPENAPI_30 = "zenith-openapi-30-temp.json";

/** Final output file for OpenAPI 3.1 */
const OPENAPI_31_OUTPUT = "zenith-openapi-31.json";

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
// CONVERSION FUNCTIONS
// ============================================================================

async function convertPostmanToOpenAPI30(
  inputFile: string
): Promise<string> {
  log(`\n🔄 Step 1: Converting Postman to OpenAPI 3.0...`, "cyan");

  if (!existsSync(inputFile)) {
    throw new Error(`Input file not found: ${inputFile}`);
  }

  // Read collection to get info
  const collectionData = JSON.parse(await readFile(inputFile, "utf-8"));
  const collectionName = collectionData.info?.name || "Converted API";

  await postmanToOpenApi(inputFile, TEMP_OPENAPI_30, {
    outputFormat: "json",
    defaultTag: "General",
    info: {
      title: collectionName,
      version: "2.0.0",
      description: `OpenAPI specification generated from Postman collection: ${collectionName}`,
    },
  });

  log(`✅ OpenAPI 3.0 generated: ${TEMP_OPENAPI_30}`, "green");

  return TEMP_OPENAPI_30;
}

async function upgradeToOpenAPI31(
  openapi30File: string
): Promise<any> {
  log(`\n🔄 Step 2: Upgrading to OpenAPI 3.1...`, "cyan");

  const openapi30Content = await readFile(openapi30File, "utf-8");

  // The upgrade function expects the content as a string
  const result = await upgrade(openapi30Content);

  if (!result.valid) {
    log(`\n⚠️  Validation warnings found:`, "yellow");
    if (result.errors && result.errors.length > 0) {
      result.errors.forEach((error: any, index: number) => {
        log(`   ${index + 1}. ${error.message || JSON.stringify(error)}`, "yellow");
      });
    }
  }

  // Scalar returns result.specification, not result.schema
  const upgraded = result.specification;

  if (!upgraded) {
    throw new Error("Upgrade failed: no specification returned");
  }

  // Verify it's actually 3.1
  if (!upgraded.openapi || !upgraded.openapi.startsWith("3.1")) {
    log(`⚠️  Warning: Upgraded version is ${upgraded.openapi}, expected 3.1.x`, "yellow");
  } else {
    log(`✅ Successfully upgraded to OpenAPI ${upgraded.openapi}`, "green");
  }

  return upgraded;
}

async function cleanAndValidate(spec: any): Promise<any> {
  log(`\n🔄 Step 3: Cleaning and validating...`, "cyan");

  let issuesFound = 0;

  // Fix common issues
  if (spec.servers) {
    spec.servers = spec.servers
      .map((server: any) => {
        // Remove invalid server URLs
        if (server.url?.includes("undefined://") || server.url?.includes("{{")) {
          log(`   ⚠️  Removing invalid server URL: ${server.url}`, "yellow");
          issuesFound++;
          return null;
        }
        return server;
      })
      .filter(Boolean);

    // Add default server if none left
    if (spec.servers.length === 0) {
      spec.servers = [
        {
          url: "https://api.sandbox.travelpay.com.au",
          description: "Sandbox Environment",
        },
      ];
      log(`   ✅ Added default server URL`, "green");
    }
  }

  // Count endpoints and operations
  const pathCount = Object.keys(spec.paths || {}).length;
  let operationCount = 0;

  for (const path in spec.paths) {
    for (const method in spec.paths[path]) {
      if (["get", "post", "put", "patch", "delete", "options", "head"].includes(method)) {
        operationCount++;
      }
    }
  }

  log(`\n📊 Specification Stats:`, "cyan");
  log(`   OpenAPI Version: ${spec.openapi}`, "reset");
  log(`   Title: ${spec.info?.title}`, "reset");
  log(`   Paths: ${pathCount}`, "reset");
  log(`   Operations: ${operationCount}`, "reset");
  log(`   Schemas: ${Object.keys(spec.components?.schemas || {}).length}`, "reset");
  log(`   Issues fixed: ${issuesFound}`, "reset");

  return spec;
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Postman to OpenAPI 3.1 Converter", "cyan");
    log("=".repeat(70) + "\n", "cyan");

    // Parse CLI arguments
    const args = process.argv.slice(2);
    const inputArg = args.find((arg) => arg.startsWith("--input="));
    const inputFile = inputArg ? inputArg.split("=")[1] : DEFAULT_INPUT;

    log(`📁 Input: ${inputFile}`, "cyan");

    // Step 1: Convert Postman to OpenAPI 3.0
    const openapi30File = await convertPostmanToOpenAPI30(inputFile);

    // Step 2: Upgrade to OpenAPI 3.1
    const openapi31 = await upgradeToOpenAPI31(openapi30File);

    // Step 3: Clean and validate
    const cleaned = await cleanAndValidate(openapi31);

    // Save final output
    await writeFile(OPENAPI_31_OUTPUT, JSON.stringify(cleaned, null, 2));
    log(`\n💾 Saved OpenAPI 3.1: ${OPENAPI_31_OUTPUT}`, "green");

    // Clean up temp file
    const fs = await import("fs/promises");
    try {
      await fs.unlink(TEMP_OPENAPI_30);
      log(`🗑️  Cleaned up temp file`, "reset");
    } catch (error) {
      // Ignore cleanup errors
    }

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Conversion Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    log(`📁 Output file:`, "cyan");
    log(`   ${OPENAPI_31_OUTPUT}`, "reset");

    log(`\n💡 Next steps:`, "yellow");
    log(`   bun run validate-spec.ts ${OPENAPI_31_OUTPUT}`, "reset");
    log(`   bun run serve-docs.ts ${OPENAPI_31_OUTPUT}`, "reset");
  } catch (error) {
    log(`\n${"=".repeat(70)}`, "red");
    log(`❌ Error: ${error}`, "red");
    log(`${"=".repeat(70)}\n`, "red");
    process.exit(1);
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (import.meta.main) {
  main();
}
