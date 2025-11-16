#!/usr/bin/env bun

/**
 * Deep OpenAPI Specification Comparer
 *
 * Performs detailed comparison including:
 * - Descriptions, summaries, examples
 * - Parameter details
 * - Request/response schemas
 * - Tags, operation IDs
 * - Everything in the spec
 *
 * @example
 * bun run deep-compare-specs.ts
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_SPEC1 = "openapi.json";
const DEFAULT_SPEC2 = "openapi-merchant-apis.json";
const REPORT_FILE = "spec-comparison-report.md";

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
};

function log(message: string, color: keyof typeof colors = "reset"): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

interface Difference {
  location: string;
  field: string;
  spec1Value: any;
  spec2Value: any;
  type: "missing" | "different" | "extra";
}

let differences: Difference[] = [];

// ============================================================================
// DEEP COMPARISON FUNCTIONS
// ============================================================================

function deepCompareObjects(
  obj1: any,
  obj2: any,
  path: string = "",
  spec1Name: string,
  spec2Name: string
): void {
  // Handle null/undefined
  if (obj1 === null || obj1 === undefined) {
    if (obj2 !== null && obj2 !== undefined) {
      differences.push({
        location: path,
        field: "entire object",
        spec1Value: obj1,
        spec2Value: obj2,
        type: "different",
      });
    }
    return;
  }

  if (obj2 === null || obj2 === undefined) {
    differences.push({
      location: path,
      field: "entire object",
      spec1Value: obj1,
      spec2Value: obj2,
      type: "different",
    });
    return;
  }

  // Handle primitives
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    if (obj1 !== obj2) {
      differences.push({
        location: path,
        field: "value",
        spec1Value: obj1,
        spec2Value: obj2,
        type: "different",
      });
    }
    return;
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      differences.push({
        location: path,
        field: "array length",
        spec1Value: obj1.length,
        spec2Value: obj2.length,
        type: "different",
      });
    }

    const maxLen = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLen; i++) {
      deepCompareObjects(
        obj1[i],
        obj2[i],
        `${path}[${i}]`,
        spec1Name,
        spec2Name
      );
    }
    return;
  }

  // Handle objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check for missing keys in spec2
  for (const key of keys1) {
    if (!(key in obj2)) {
      differences.push({
        location: path,
        field: key,
        spec1Value: obj1[key],
        spec2Value: undefined,
        type: "missing",
      });
    }
  }

  // Check for extra keys in spec2
  for (const key of keys2) {
    if (!(key in obj1)) {
      differences.push({
        location: path,
        field: key,
        spec1Value: undefined,
        spec2Value: obj2[key],
        type: "extra",
      });
    }
  }

  // Compare common keys
  const commonKeys = keys1.filter((k) => k in obj2);
  for (const key of commonKeys) {
    const newPath = path ? `${path}.${key}` : key;
    deepCompareObjects(obj1[key], obj2[key], newPath, spec1Name, spec2Name);
  }
}

function comparePathOperations(
  spec1: any,
  spec2: any,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n🔍 Deep comparing path operations...`, "cyan");

  const paths1 = spec1.paths || {};
  const paths2 = spec2.paths || {};

  const commonPaths = Object.keys(paths1).filter((p) => p in paths2);

  let checkedOperations = 0;

  for (const path of commonPaths) {
    const methods = ["get", "post", "put", "patch", "delete", "options", "head"];

    for (const method of methods) {
      if (paths1[path][method] && paths2[path][method]) {
        deepCompareObjects(
          paths1[path][method],
          paths2[path][method],
          `paths.${path}.${method}`,
          spec1Name,
          spec2Name
        );
        checkedOperations++;
      }
    }
  }

  log(`   ✅ Checked ${checkedOperations} operations in detail`, "green");
}

function compareSchemas(
  spec1: any,
  spec2: any,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n🔍 Deep comparing schemas...`, "cyan");

  const schemas1 = spec1.components?.schemas || {};
  const schemas2 = spec2.components?.schemas || {};

  const commonSchemas = Object.keys(schemas1).filter((s) => s in schemas2);

  for (const schemaName of commonSchemas) {
    deepCompareObjects(
      schemas1[schemaName],
      schemas2[schemaName],
      `components.schemas.${schemaName}`,
      spec1Name,
      spec2Name
    );
  }

  log(`   ✅ Checked ${commonSchemas.length} schemas in detail`, "green");
}

function compareComponents(
  spec1: any,
  spec2: any,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n🔍 Deep comparing components...`, "cyan");

  if (spec1.components && spec2.components) {
    deepCompareObjects(
      spec1.components,
      spec2.components,
      "components",
      spec1Name,
      spec2Name
    );
  }

  log(`   ✅ Components comparison complete`, "green");
}

function compareInfo(
  spec1: any,
  spec2: any,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n🔍 Deep comparing info section...`, "cyan");

  if (spec1.info && spec2.info) {
    deepCompareObjects(spec1.info, spec2.info, "info", spec1Name, spec2Name);
  }

  log(`   ✅ Info comparison complete`, "green");
}

// ============================================================================
// CATEGORIZE DIFFERENCES
// ============================================================================

function categorizeDifferences(spec1Name: string, spec2Name: string): {
  critical: Difference[];
  important: Difference[];
  minor: Difference[];
} {
  const critical: Difference[] = [];
  const important: Difference[] = [];
  const minor: Difference[] = [];

  for (const diff of differences) {
    // Critical: Schema structure differences
    if (
      diff.location.includes("components.schemas") ||
      diff.location.includes("parameters") ||
      diff.location.includes("requestBody") ||
      diff.location.includes("responses")
    ) {
      if (diff.field === "type" || diff.field === "required" || diff.field === "properties") {
        critical.push(diff);
        continue;
      }
    }

    // Important: Documentation differences
    if (
      diff.field === "description" ||
      diff.field === "summary" ||
      diff.field === "example" ||
      diff.field === "examples"
    ) {
      important.push(diff);
      continue;
    }

    // Important: Operation differences
    if (
      diff.field === "operationId" ||
      diff.field === "tags" ||
      diff.location.includes("paths.")
    ) {
      important.push(diff);
      continue;
    }

    // Everything else is minor
    minor.push(diff);
  }

  return { critical, important, minor };
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

function generateMarkdownReport(
  spec1Name: string,
  spec2Name: string,
  categorized: { critical: Difference[]; important: Difference[]; minor: Difference[] }
): string {
  let report = `# OpenAPI Specification Deep Comparison Report\n\n`;
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `**Spec 1:** ${spec1Name}\n`;
  report += `**Spec 2:** ${spec2Name}\n\n`;

  report += `## Summary\n\n`;
  report += `- 🔴 Critical Differences: ${categorized.critical.length}\n`;
  report += `- 🟡 Important Differences: ${categorized.important.length}\n`;
  report += `- ⚪ Minor Differences: ${categorized.minor.length}\n`;
  report += `- **Total:** ${differences.length} differences found\n\n`;

  if (categorized.critical.length > 0) {
    report += `## 🔴 Critical Differences\n\n`;
    report += `These affect API structure and compatibility:\n\n`;
    for (const diff of categorized.critical.slice(0, 50)) {
      report += `### ${diff.location}\n`;
      report += `- **Field:** \`${diff.field}\`\n`;
      report += `- **Type:** ${diff.type}\n`;
      report += `- **${spec1Name}:** \`${JSON.stringify(diff.spec1Value)}\`\n`;
      report += `- **${spec2Name}:** \`${JSON.stringify(diff.spec2Value)}\`\n\n`;
    }
    if (categorized.critical.length > 50) {
      report += `\n_... and ${categorized.critical.length - 50} more critical differences_\n\n`;
    }
  }

  if (categorized.important.length > 0) {
    report += `## 🟡 Important Differences\n\n`;
    report += `These affect documentation and usability:\n\n`;
    for (const diff of categorized.important.slice(0, 30)) {
      report += `### ${diff.location}\n`;
      report += `- **Field:** \`${diff.field}\`\n`;
      report += `- **Type:** ${diff.type}\n`;
      if (diff.spec1Value) {
        report += `- **${spec1Name}:** \`${String(diff.spec1Value).substring(0, 100)}${String(diff.spec1Value).length > 100 ? "..." : ""}\`\n`;
      }
      if (diff.spec2Value) {
        report += `- **${spec2Name}:** \`${String(diff.spec2Value).substring(0, 100)}${String(diff.spec2Value).length > 100 ? "..." : ""}\`\n`;
      }
      report += `\n`;
    }
    if (categorized.important.length > 30) {
      report += `\n_... and ${categorized.important.length - 30} more important differences_\n\n`;
    }
  }

  if (categorized.minor.length > 0) {
    report += `## ⚪ Minor Differences\n\n`;
    report += `${categorized.minor.length} minor differences detected:\n\n`;
    for (const diff of categorized.minor) {
      report += `### ${diff.location}\n`;
      report += `- **Field:** \`${diff.field}\`\n`;
      report += `- **Type:** ${diff.type}\n`;
      report += `- **${spec1Name}:** \`${JSON.stringify(diff.spec1Value)}\`\n`;
      report += `- **${spec2Name}:** \`${JSON.stringify(diff.spec2Value)}\`\n\n`;
    }
  }

  return report;
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Deep OpenAPI Specification Comparison", "cyan");
    log("=".repeat(70) + "\n", "cyan");

    // Parse CLI arguments
    const args = process.argv.slice(2);
    const spec1Arg = args.find((arg) => arg.startsWith("--spec1="));
    const spec2Arg = args.find((arg) => arg.startsWith("--spec2="));

    const spec1Path = spec1Arg ? spec1Arg.split("=")[1] : DEFAULT_SPEC1;
    const spec2Path = spec2Arg ? spec2Arg.split("=")[1] : DEFAULT_SPEC2;

    // Load specs
    if (!existsSync(spec1Path)) {
      throw new Error(`Spec 1 not found: ${spec1Path}`);
    }
    if (!existsSync(spec2Path)) {
      throw new Error(`Spec 2 not found: ${spec2Path}`);
    }

    log(`📁 Loading specifications...`, "cyan");
    log(`   Spec 1: ${spec1Path}`, "reset");
    log(`   Spec 2: ${spec2Path}`, "reset");

    const spec1Content = await readFile(spec1Path, "utf-8");
    const spec2Content = await readFile(spec2Path, "utf-8");

    const spec1 = JSON.parse(spec1Content);
    const spec2 = JSON.parse(spec2Content);

    const spec1Name = spec1.info?.title || "Spec 1";
    const spec2Name = spec2.info?.title || "Spec 2";

    log(`✅ Loaded both specifications`, "green");

    // Deep comparison
    differences = []; // Reset

    compareInfo(spec1, spec2, spec1Name, spec2Name);
    comparePathOperations(spec1, spec2, spec1Name, spec2Name);
    compareSchemas(spec1, spec2, spec1Name, spec2Name);
    compareComponents(spec1, spec2, spec1Name, spec2Name);

    log(`\n📊 Analysis complete`, "cyan");
    log(`   Total differences found: ${differences.length}`, "reset");

    // Categorize
    const categorized = categorizeDifferences(spec1Name, spec2Name);

    log(`\n📈 Categorized results:`, "blue");
    log(`   🔴 Critical: ${categorized.critical.length}`, "red");
    log(`   🟡 Important: ${categorized.important.length}`, "yellow");
    log(`   ⚪ Minor: ${categorized.minor.length}`, "reset");

    // Generate report
    const report = generateMarkdownReport(spec1Name, spec2Name, categorized);
    await writeFile(REPORT_FILE, report);

    log(`\n💾 Detailed report saved: ${REPORT_FILE}`, "green");

    // Show sample differences
    if (categorized.critical.length > 0) {
      log(`\n🔴 Sample Critical Differences:`, "red");
      categorized.critical.slice(0, 5).forEach((diff, i) => {
        log(`   ${i + 1}. ${diff.location} -> ${diff.field}`, "reset");
        log(`      Type: ${diff.type}`, "yellow");
      });
    }

    if (categorized.important.length > 0) {
      log(`\n🟡 Sample Important Differences:`, "yellow");
      categorized.important.slice(0, 5).forEach((diff, i) => {
        log(`   ${i + 1}. ${diff.location} -> ${diff.field}`, "reset");
      });
    }

    if (categorized.minor.length > 0) {
      log(`\n⚪ Minor Differences:`, "reset");
      categorized.minor.forEach((diff, i) => {
        log(`   ${i + 1}. ${diff.location} -> ${diff.field}`, "reset");
        log(`      ${spec1Name}: ${JSON.stringify(diff.spec1Value)}`, "cyan");
        log(`      ${spec2Name}: ${JSON.stringify(diff.spec2Value)}`, "magenta");
      });
    }

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Deep Comparison Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    log(`📄 Review the full report: ${REPORT_FILE}`, "cyan");
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
