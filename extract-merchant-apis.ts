#!/usr/bin/env bun

/**
 * Extract Merchant APIs from TravelPay OpenAPI 3.1 Specification
 *
 * Creates a focused Merchant APIs spec from the full TravelPay openapi.json
 * Preserves all schemas, security schemes, and proper OpenAPI 3.1 structure
 *
 * @example
 * bun run extract-merchant-apis.ts
 */

import { readFile, writeFile } from "fs/promises";

// ============================================================================
// CONFIGURATION
// ============================================================================

const INPUT_SPEC = "openapi.json";
const OUTPUT_SPEC = "openapi-merchant-apis.json";

// Merchant API paths (excluding customer-facing APIs)
const MERCHANT_API_PATTERNS = [
  "/v2/batchpayments",
  "/v2/cardproxies",
  "/v2/customers",
  "/v2/diagnostics",
  "/v2/payments",
  "/v2/preauths",
  "/v2/proxies",
  "/v2/requestpays",
  "/v2/refundrequests",
  // v3 is customer-facing, so we exclude it
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function log(message: string, color: keyof typeof colors = "reset"): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function isMerchantPath(path: string): boolean {
  return MERCHANT_API_PATTERNS.some((pattern) => path.startsWith(pattern));
}

// ============================================================================
// EXTRACTION FUNCTIONS
// ============================================================================

async function extractMerchantAPIs(): Promise<any> {
  log(`\n📁 Loading: ${INPUT_SPEC}`, "cyan");

  const content = await readFile(INPUT_SPEC, "utf-8");
  const spec = JSON.parse(content);

  log(`✅ Loaded OpenAPI ${spec.openapi}`, "green");
  log(`   Total paths: ${Object.keys(spec.paths || {}).length}`, "reset");

  // Filter paths to merchant APIs only
  const merchantPaths: Record<string, any> = {};
  let excludedCount = 0;

  for (const [path, methods] of Object.entries(spec.paths || {})) {
    if (isMerchantPath(path)) {
      merchantPaths[path] = methods;
    } else {
      excludedCount++;
    }
  }

  log(`\n🔍 Filtering paths...`, "cyan");
  log(`   ✅ Included: ${Object.keys(merchantPaths).length} paths`, "green");
  log(`   ⏭️  Excluded: ${excludedCount} paths`, "yellow");

  // Create new spec with filtered paths
  const merchantSpec = {
    ...spec,
    info: {
      ...spec.info,
      title: "Merchant APIs",
      description:
        "Merchant-facing APIs for payments, customers, and account management",
    },
    paths: merchantPaths,
  };

  // Keep all components (schemas, security schemes, etc.) as they may be referenced
  // The spec validator will warn about unused components, but it's safer to keep them

  return merchantSpec;
}

function analyzeSpec(spec: any): void {
  log(`\n📊 Specification Analysis:`, "cyan");
  log(`   OpenAPI: ${spec.openapi}`, "reset");
  log(`   Title: ${spec.info.title}`, "reset");
  log(`   Version: ${spec.info.version}`, "reset");

  const pathCount = Object.keys(spec.paths || {}).length;
  const methods = ["get", "post", "put", "patch", "delete"];
  let operationCount = 0;

  for (const path in spec.paths) {
    for (const method in spec.paths[path]) {
      if (methods.includes(method)) {
        operationCount++;
      }
    }
  }

  log(`   Paths: ${pathCount}`, "reset");
  log(`   Operations: ${operationCount}`, "reset");

  if (spec.components) {
    log(`\n   Components:`, "reset");
    if (spec.components.schemas) {
      log(
        `     Schemas: ${Object.keys(spec.components.schemas).length}`,
        "reset"
      );
    }
    if (spec.components.securitySchemes) {
      log(
        `     Security Schemes: ${Object.keys(spec.components.securitySchemes).join(", ")}`,
        "reset"
      );
    }
  }

  if (spec.servers) {
    log(`\n   Servers:`, "reset");
    spec.servers.forEach((server: any) => {
      log(`     - ${server.url}`, "reset");
    });
  }

  // List paths
  log(`\n   Merchant API Paths:`, "reset");
  Object.keys(spec.paths)
    .sort()
    .forEach((path) => {
      const methodsList = Object.keys(spec.paths[path])
        .filter((m) => methods.includes(m))
        .map((m) => m.toUpperCase())
        .join(", ");
      log(`     ${path} [${methodsList}]`, "reset");
    });
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Extract Merchant APIs from TravelPay OpenAPI 3.1", "cyan");
    log("=".repeat(70), "cyan");

    // Extract merchant APIs
    const merchantSpec = await extractMerchantAPIs();

    // Analyze
    analyzeSpec(merchantSpec);

    // Save
    await writeFile(OUTPUT_SPEC, JSON.stringify(merchantSpec, null, 2));
    log(`\n💾 Saved: ${OUTPUT_SPEC}`, "green");

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Extraction Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    log(`💡 Next steps:`, "yellow");
    log(`   bun run validate ${OUTPUT_SPEC}`, "reset");
    log(`   bun run docs ${OUTPUT_SPEC}`, "reset");
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
