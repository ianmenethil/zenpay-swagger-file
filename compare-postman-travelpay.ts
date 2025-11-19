#!/usr/bin/env bun

/**
 * Unified Postman vs TravelPay API Comparison Tool
 *
 * Complete end-to-end workflow that:
 * 1. Downloads latest Postman collection (Zenpay/Zenith)
 * 2. Converts Postman → OpenAPI 3.1
 * 3. Downloads latest TravelPay API specification
 * 4. Runs 100% comprehensive field-by-field comparison
 * 5. Generates detailed comparison report
 *
 * This tool ensures you're always comparing the latest versions from both sources.
 *
 * @example
 * # Full comparison (download everything fresh)
 * bun run compare-postman-travelpay.ts
 *
 * # Use cached versions (skip downloads)
 * bun run compare-postman-travelpay.ts --use-cache
 *
 * # Only compare merchant APIs
 * bun run compare-postman-travelpay.ts --merchant-only
 *
 * # Custom output file
 * bun run compare-postman-travelpay.ts --output=my-report.md
 */

import { spawn } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { ComparisonEngine, ComprehensiveDiff, ComparisonStats, FieldDifference } from "./comprehensive-diff";

// ============================================================================
// CONFIGURATION
// ============================================================================

const POSTMAN_UNWRAPPED = "zenith-postman-collection-unwrapped.json";
const POSTMAN_OPENAPI = "zenith-openapi-31.json";
const TRAVELPAY_OPENAPI = "openapi.json";
const TRAVELPAY_MERCHANT_ONLY = "openapi-merchant-apis.json";
const DEFAULT_OUTPUT = "postman-vs-travelpay-comparison.md";

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
  magenta: "\x1b[35m",
  bold: "\x1b[1m",
};

function log(message: string, color: keyof typeof colors = "reset"): void {
  console.error(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    log(`\n▶️  Running: ${command} ${args.join(" ")}`, "blue");

    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

// ============================================================================
// WORKFLOW STEPS
// ============================================================================

async function step1_DownloadPostman(useCache: boolean): Promise<void> {
  log("\n" + "=".repeat(80), "cyan");
  log("  STEP 1: Download Postman Collection", "cyan");
  log("=".repeat(80), "cyan");

  if (useCache && existsSync(POSTMAN_UNWRAPPED)) {
    log(`✅ Using cached Postman collection: ${POSTMAN_UNWRAPPED}`, "green");
    return;
  }

  await runCommand("bun", ["run", "postman-download.ts"]);

  if (!existsSync(POSTMAN_UNWRAPPED)) {
    throw new Error(`Postman download failed: ${POSTMAN_UNWRAPPED} not found`);
  }

  log(`✅ Postman collection downloaded`, "green");
}

async function step2_ConvertPostmanToOpenAPI(useCache: boolean): Promise<void> {
  log("\n" + "=".repeat(80), "cyan");
  log("  STEP 2: Convert Postman → OpenAPI 3.1", "cyan");
  log("=".repeat(80), "cyan");

  if (useCache && existsSync(POSTMAN_OPENAPI)) {
    log(`✅ Using cached OpenAPI conversion: ${POSTMAN_OPENAPI}`, "green");
    return;
  }

  await runCommand("bun", ["run", "postman-to-openapi31.ts"]);

  if (!existsSync(POSTMAN_OPENAPI)) {
    throw new Error(`Postman conversion failed: ${POSTMAN_OPENAPI} not found`);
  }

  log(`✅ Postman converted to OpenAPI 3.1`, "green");
}

async function step3_DownloadTravelPay(useCache: boolean): Promise<void> {
  log("\n" + "=".repeat(80), "cyan");
  log("  STEP 3: Download TravelPay API", "cyan");
  log("=".repeat(80), "cyan");

  if (useCache && existsSync(TRAVELPAY_OPENAPI)) {
    log(`✅ Using cached TravelPay spec: ${TRAVELPAY_OPENAPI}`, "green");
    return;
  }

  await runCommand("bun", ["run", "swagger-downloader.ts"]);

  if (!existsSync(TRAVELPAY_OPENAPI)) {
    throw new Error(`TravelPay download failed: ${TRAVELPAY_OPENAPI} not found`);
  }

  log(`✅ TravelPay API downloaded and converted`, "green");
}

async function step4_ExtractMerchantAPIs(merchantOnly: boolean): Promise<void> {
  if (!merchantOnly) {
    log("\n⏭️  Skipping merchant extraction (comparing all APIs)", "yellow");
    return;
  }

  log("\n" + "=".repeat(80), "cyan");
  log("  STEP 4: Extract Merchant APIs", "cyan");
  log("=".repeat(80), "cyan");

  await runCommand("bun", ["run", "extract-merchant-apis.ts"]);

  if (!existsSync(TRAVELPAY_MERCHANT_ONLY)) {
    throw new Error(`Merchant extraction failed: ${TRAVELPAY_MERCHANT_ONLY} not found`);
  }

  log(`✅ Merchant APIs extracted`, "green");
}

async function step5_CompareSpecs(
  merchantOnly: boolean,
  outputFile: string
): Promise<ComprehensiveDiff> {
  log("\n" + "=".repeat(80), "cyan");
  log("  STEP 5: Comprehensive 100% Comparison", "cyan");
  log("=".repeat(80), "cyan");

  const travelPaySpec = merchantOnly ? TRAVELPAY_MERCHANT_ONLY : TRAVELPAY_OPENAPI;

  log(`\n📁 Loading specifications...`, "magenta");
  log(`   Postman: ${POSTMAN_OPENAPI}`, "reset");
  log(`   TravelPay: ${travelPaySpec}`, "reset");

  const postmanContent = await readFile(POSTMAN_OPENAPI, "utf-8");
  const travelPayContent = await readFile(travelPaySpec, "utf-8");

  const postmanSpec = JSON.parse(postmanContent);
  const travelPaySpec_parsed = JSON.parse(travelPayContent);

  log(`✅ Specifications loaded`, "green");

  // Run comprehensive comparison
  const engine = new ComparisonEngine(
    postmanSpec.info?.title || "Postman Collection",
    travelPaySpec_parsed.info?.title || "TravelPay API"
  );

  engine.compareSpecs(postmanSpec, travelPaySpec_parsed);

  const differences = engine.getDifferences();
  const stats = calculateStats(postmanSpec, travelPaySpec_parsed, differences);

  const comprehensiveDiff: ComprehensiveDiff = {
    spec1Name: postmanSpec.info?.title || "Postman Collection",
    spec2Name: travelPaySpec_parsed.info?.title || "TravelPay API",
    spec1File: POSTMAN_OPENAPI,
    spec2File: travelPaySpec,
    timestamp: new Date().toISOString(),
    stats,
    differences,
  };

  return comprehensiveDiff;
}

function calculateStats(
  spec1: any,
  spec2: any,
  differences: FieldDifference[]
): ComparisonStats {
  const countOperations = (spec: any): number => {
    let count = 0;
    const paths = spec.paths || {};
    const methods = ["get", "post", "put", "patch", "delete", "options", "head", "trace"];

    for (const path of Object.keys(paths)) {
      for (const method of methods) {
        if (paths[path][method]) count++;
      }
    }
    return count;
  };

  const countSchemas = (spec: any): number => {
    return Object.keys(spec.components?.schemas || {}).length;
  };

  const critical = differences.filter((d) => d.category === "critical").length;
  const important = differences.filter((d) => d.category === "important").length;
  const informational = differences.filter((d) => d.category === "informational").length;

  const spec1Ops = countOperations(spec1);
  const spec2Ops = countOperations(spec2);

  return {
    totalDifferences: differences.length,
    criticalDifferences: critical,
    importantDifferences: important,
    informationalDifferences: informational,
    spec1OperationCount: spec1Ops,
    spec2OperationCount: spec2Ops,
    spec1SchemaCount: countSchemas(spec1),
    spec2SchemaCount: countSchemas(spec2),
    matchedOperations: Math.min(spec1Ops, spec2Ops),
    matchedSchemas: 0,
  };
}

async function step6_GenerateReport(
  diff: ComprehensiveDiff,
  outputFile: string
): Promise<void> {
  log("\n" + "=".repeat(80), "cyan");
  log("  STEP 6: Generate Comparison Report", "cyan");
  log("=".repeat(80), "cyan");

  const report = generateEnhancedMarkdownReport(diff);

  await writeFile(outputFile, report);

  log(`\n💾 Report saved: ${outputFile}`, "green");

  // Display summary
  displaySummary(diff);
}

function generateEnhancedMarkdownReport(diff: ComprehensiveDiff): string {
  let md = `# Postman vs TravelPay API - Comprehensive Comparison Report\n\n`;
  md += `**Generated:** ${diff.timestamp}\n\n`;
  md += `**Purpose:** 100% field-by-field comparison to identify ALL differences between Postman collection and TravelPay API specification.\n\n`;

  md += `## 📊 Executive Summary\n\n`;
  md += `| Metric | Postman | TravelPay | Status |\n`;
  md += `|--------|---------|-----------|--------|\n`;
  md += `| **API Name** | ${diff.spec1Name} | ${diff.spec2Name} | - |\n`;
  md += `| **File** | ${diff.spec1File} | ${diff.spec2File} | - |\n`;
  md += `| **Operations** | ${diff.stats.spec1OperationCount} | ${diff.stats.spec2OperationCount} | ${diff.stats.spec1OperationCount === diff.stats.spec2OperationCount ? "✅" : "⚠️"} |\n`;
  md += `| **Schemas** | ${diff.stats.spec1SchemaCount} | ${diff.stats.spec2SchemaCount} | ${diff.stats.spec1SchemaCount === diff.stats.spec2SchemaCount ? "✅" : "⚠️"} |\n\n`;

  md += `## 🔍 Differences Summary\n\n`;
  md += `- **Total Differences Found:** ${diff.stats.totalDifferences}\n`;
  md += `- 🔴 **Critical:** ${diff.stats.criticalDifferences} (structure/compatibility issues)\n`;
  md += `- 🟡 **Important:** ${diff.stats.importantDifferences} (documentation/usability)\n`;
  md += `- ⚪ **Informational:** ${diff.stats.informationalDifferences} (minor differences)\n\n`;

  if (diff.stats.totalDifferences === 0) {
    md += `### ✅ Perfect Match!\n\n`;
    md += `Both specifications are identical across all fields. No differences detected.\n\n`;
    return md;
  }

  // Group differences by category
  const byCategory = {
    critical: diff.differences.filter((d) => d.category === "critical"),
    important: diff.differences.filter((d) => d.category === "important"),
    informational: diff.differences.filter((d) => d.category === "informational"),
  };

  // Critical Differences
  if (byCategory.critical.length > 0) {
    md += `## 🔴 Critical Differences (${byCategory.critical.length})\n\n`;
    md += `These differences affect API structure, compatibility, and functionality.\n\n`;
    md += `| # | Location | Field | Type | Postman | TravelPay |\n`;
    md += `|---|----------|-------|------|---------|----------|\n`;

    byCategory.critical.forEach((d, i) => {
      const val1 = formatValue(d.spec1Value);
      const val2 = formatValue(d.spec2Value);
      md += `| ${i + 1} | \`${d.location.path}\` | ${d.location.field} | ${d.differenceType} | ${val1} | ${val2} |\n`;
    });
    md += `\n`;
  }

  // Important Differences
  if (byCategory.important.length > 0) {
    md += `## 🟡 Important Differences (${byCategory.important.length})\n\n`;
    md += `These differences affect documentation quality and API usability.\n\n`;

    // Group important differences by type
    const descriptionDiffs = byCategory.important.filter(d =>
      d.location.field.toLowerCase().includes("description")
    );
    const summaryDiffs = byCategory.important.filter(d =>
      d.location.field.toLowerCase().includes("summary")
    );
    const exampleDiffs = byCategory.important.filter(d =>
      d.location.field.toLowerCase().includes("example")
    );
    const otherImportant = byCategory.important.filter(d =>
      !d.location.field.toLowerCase().includes("description") &&
      !d.location.field.toLowerCase().includes("summary") &&
      !d.location.field.toLowerCase().includes("example")
    );

    if (descriptionDiffs.length > 0) {
      md += `### 📝 Description Differences (${descriptionDiffs.length})\n\n`;
      md += `| Location | Postman | TravelPay |\n`;
      md += `|----------|---------|----------|\n`;
      descriptionDiffs.slice(0, 20).forEach((d) => {
        const val1 = formatValue(d.spec1Value, 80);
        const val2 = formatValue(d.spec2Value, 80);
        md += `| \`${d.location.path}\` | ${val1} | ${val2} |\n`;
      });
      if (descriptionDiffs.length > 20) {
        md += `\n*... and ${descriptionDiffs.length - 20} more description differences*\n`;
      }
      md += `\n`;
    }

    if (summaryDiffs.length > 0) {
      md += `### 📌 Summary Differences (${summaryDiffs.length})\n\n`;
      md += `| Location | Postman | TravelPay |\n`;
      md += `|----------|---------|----------|\n`;
      summaryDiffs.forEach((d) => {
        const val1 = formatValue(d.spec1Value, 60);
        const val2 = formatValue(d.spec2Value, 60);
        md += `| \`${d.location.path}\` | ${val1} | ${val2} |\n`;
      });
      md += `\n`;
    }

    if (exampleDiffs.length > 0) {
      md += `### 💡 Example Differences (${exampleDiffs.length})\n\n`;
      md += `| Location | Postman | TravelPay |\n`;
      md += `|----------|---------|----------|\n`;
      exampleDiffs.slice(0, 10).forEach((d) => {
        const val1 = formatValue(d.spec1Value, 50);
        const val2 = formatValue(d.spec2Value, 50);
        md += `| \`${d.location.path}\` | ${val1} | ${val2} |\n`;
      });
      if (exampleDiffs.length > 10) {
        md += `\n*... and ${exampleDiffs.length - 10} more example differences*\n`;
      }
      md += `\n`;
    }

    if (otherImportant.length > 0) {
      md += `### 🔧 Other Important Differences (${otherImportant.length})\n\n`;
      md += `| Location | Field | Type | Postman | TravelPay |\n`;
      md += `|----------|-------|------|---------|----------|\n`;
      otherImportant.forEach((d) => {
        const val1 = formatValue(d.spec1Value);
        const val2 = formatValue(d.spec2Value);
        md += `| \`${d.location.path}\` | ${d.location.field} | ${d.differenceType} | ${val1} | ${val2} |\n`;
      });
      md += `\n`;
    }
  }

  // Informational Differences (condensed)
  if (byCategory.informational.length > 0) {
    md += `## ⚪ Informational Differences (${byCategory.informational.length})\n\n`;
    md += `Minor differences that typically don't affect functionality:\n\n`;
    md += `<details>\n<summary>Click to expand</summary>\n\n`;
    md += `| Location | Field | Type |\n`;
    md += `|----------|-------|------|\n`;
    byCategory.informational.forEach((d) => {
      md += `| \`${d.location.path}\` | ${d.location.field} | ${d.differenceType} |\n`;
    });
    md += `\n</details>\n\n`;
  }

  // Recommendations
  md += `## 💡 Recommendations\n\n`;

  if (byCategory.critical.length > 0) {
    md += `### 🔴 Critical Actions Required\n\n`;
    md += `1. Review all ${byCategory.critical.length} critical differences\n`;
    md += `2. Align schema structures between Postman and TravelPay\n`;
    md += `3. Ensure API contracts match exactly\n`;
    md += `4. Update tests to cover discovered differences\n\n`;
  }

  if (byCategory.important.length > 0) {
    md += `### 🟡 Documentation Improvements\n\n`;
    md += `1. Sync descriptions between both specs\n`;
    md += `2. Add missing summaries and examples\n`;
    md += `3. Standardize documentation style\n`;
    md += `4. Review and update operation IDs\n\n`;
  }

  md += `---\n\n`;
  md += `*Generated by compare-postman-travelpay.ts - 100% comprehensive field-by-field comparison*\n`;
  md += `*Tool ensures complete coverage of all OpenAPI specification fields*\n`;

  return md;
}

function formatValue(value: any, maxLen: number = 100): string {
  if (value === undefined || value === null) {
    return "*(not set)*";
  }

  const str = typeof value === "string" ? value : JSON.stringify(value);

  if (str.length <= maxLen) {
    return str;
  }

  return str.substring(0, maxLen) + "...";
}

function displaySummary(diff: ComprehensiveDiff): void {
  log("\n" + "=".repeat(80), "green");
  log("  COMPARISON COMPLETE", "green");
  log("=".repeat(80) + "\n", "green");

  log(`📊 Summary:`, "cyan");
  log(`   Total Differences: ${diff.stats.totalDifferences}`, "reset");
  log(`   🔴 Critical: ${diff.stats.criticalDifferences}`, "red");
  log(`   🟡 Important: ${diff.stats.importantDifferences}`, "yellow");
  log(`   ⚪ Informational: ${diff.stats.informationalDifferences}`, "reset");

  log(`\n📈 Coverage:`, "cyan");
  log(`   Postman Operations: ${diff.stats.spec1OperationCount}`, "reset");
  log(`   TravelPay Operations: ${diff.stats.spec2OperationCount}`, "reset");
  log(`   Postman Schemas: ${diff.stats.spec1SchemaCount}`, "reset");
  log(`   TravelPay Schemas: ${diff.stats.spec2SchemaCount}`, "reset");

  if (diff.stats.criticalDifferences > 0) {
    log(`\n⚠️  WARNING: ${diff.stats.criticalDifferences} critical differences require attention!`, "red");
  } else if (diff.stats.importantDifferences > 0) {
    log(`\n✅ No critical issues, but ${diff.stats.importantDifferences} documentation improvements recommended`, "yellow");
  } else {
    log(`\n✅ Specifications match perfectly!`, "green");
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    // Parse arguments
    const args = process.argv.slice(2);
    const useCache = args.includes("--use-cache");
    const merchantOnly = args.includes("--merchant-only");
    const outputArg = args.find((arg) => arg.startsWith("--output="));
    const outputFile = outputArg ? outputArg.split("=")[1] : DEFAULT_OUTPUT;

    log("\n" + "=".repeat(80), "magenta");
    log("  🚀 POSTMAN vs TRAVELPAY API - COMPREHENSIVE COMPARISON", "magenta");
    log("=".repeat(80) + "\n", "magenta");

    log(`⚙️  Configuration:`, "cyan");
    log(`   Use Cache: ${useCache ? "Yes" : "No (download fresh)"}`, "reset");
    log(`   Scope: ${merchantOnly ? "Merchant APIs only" : "All APIs"}`, "reset");
    log(`   Output: ${outputFile}`, "reset");

    // Execute workflow
    await step1_DownloadPostman(useCache);
    await step2_ConvertPostmanToOpenAPI(useCache);
    await step3_DownloadTravelPay(useCache);
    await step4_ExtractMerchantAPIs(merchantOnly);

    const diff = await step5_CompareSpecs(merchantOnly, outputFile);
    await step6_GenerateReport(diff, outputFile);

    log("\n" + "=".repeat(80), "green");
    log("  ✅ ALL STEPS COMPLETED SUCCESSFULLY", "green");
    log("=".repeat(80) + "\n", "green");

    log(`📄 Full report: ${outputFile}`, "cyan");
    log(`💡 Tip: Use --use-cache to skip downloads on next run`, "yellow");

  } catch (error) {
    log("\n" + "=".repeat(80), "red");
    log(`  ❌ ERROR: ${error}`, "red");
    log("=".repeat(80) + "\n", "red");
    process.exit(1);
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (import.meta.main) {
  main();
}
