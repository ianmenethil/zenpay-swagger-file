#!/usr/bin/env bun

/**
 * OpenAPI Specification Comparer
 *
 * Compares two OpenAPI specifications and reports differences in:
 * - Paths and operations
 * - Component schemas
 * - Security schemes
 * - Servers
 * - Overall structure
 *
 * @example
 * # Compare full spec with merchant-only spec
 * bun run compare-specs.ts
 *
 * # Compare custom specs
 * bun run compare-specs.ts --spec1=openapi.json --spec2=openapi-merchant-apis.json
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_SPEC1 = "openapi.json";
const DEFAULT_SPEC2 = "openapi-merchant-apis.json";

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

// ============================================================================
// COMPARISON FUNCTIONS
// ============================================================================

interface SpecStats {
  openapi: string;
  title: string;
  version: string;
  paths: string[];
  operations: Map<string, string[]>; // path -> methods
  schemas: string[];
  securitySchemes: string[];
  servers: string[];
}

function extractStats(spec: any): SpecStats {
  const stats: SpecStats = {
    openapi: spec.openapi || "unknown",
    title: spec.info?.title || "Unknown",
    version: spec.info?.version || "Unknown",
    paths: [],
    operations: new Map(),
    schemas: [],
    securitySchemes: [],
    servers: [],
  };

  // Extract paths and operations
  if (spec.paths) {
    stats.paths = Object.keys(spec.paths).sort();
    const methods = ["get", "post", "put", "patch", "delete", "options", "head"];

    for (const [path, pathItem] of Object.entries(spec.paths)) {
      const pathMethods: string[] = [];
      for (const method of methods) {
        if ((pathItem as any)[method]) {
          pathMethods.push(method.toUpperCase());
        }
      }
      stats.operations.set(path, pathMethods);
    }
  }

  // Extract schemas
  if (spec.components?.schemas) {
    stats.schemas = Object.keys(spec.components.schemas).sort();
  }

  // Extract security schemes
  if (spec.components?.securitySchemes) {
    stats.securitySchemes = Object.keys(spec.components.securitySchemes).sort();
  }

  // Extract servers
  if (spec.servers) {
    stats.servers = spec.servers.map((s: any) => s.url);
  }

  return stats;
}

function comparePaths(
  spec1Stats: SpecStats,
  spec2Stats: SpecStats,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n${"=".repeat(70)}`, "cyan");
  log(`📍 PATH COMPARISON`, "cyan");
  log(`${"=".repeat(70)}`, "cyan");

  const onlyInSpec1 = spec1Stats.paths.filter((p) => !spec2Stats.paths.includes(p));
  const onlyInSpec2 = spec2Stats.paths.filter((p) => !spec1Stats.paths.includes(p));
  const inBoth = spec1Stats.paths.filter((p) => spec2Stats.paths.includes(p));

  log(`\n📊 Summary:`, "blue");
  log(`   ${spec1Name}: ${spec1Stats.paths.length} paths`, "reset");
  log(`   ${spec2Name}: ${spec2Stats.paths.length} paths`, "reset");
  log(`   Common: ${inBoth.length} paths`, "green");

  if (onlyInSpec1.length > 0) {
    log(`\n❌ Only in ${spec1Name} (${onlyInSpec1.length} paths):`, "red");
    onlyInSpec1.forEach((path) => {
      const methods = spec1Stats.operations.get(path) || [];
      log(`   ${path} [${methods.join(", ")}]`, "reset");
    });
  }

  if (onlyInSpec2.length > 0) {
    log(`\n✅ Only in ${spec2Name} (${onlyInSpec2.length} paths):`, "green");
    onlyInSpec2.forEach((path) => {
      const methods = spec2Stats.operations.get(path) || [];
      log(`   ${path} [${methods.join(", ")}]`, "reset");
    });
  }

  // Check for operation differences in common paths
  const operationDiffs: string[] = [];
  for (const path of inBoth) {
    const methods1 = spec1Stats.operations.get(path) || [];
    const methods2 = spec2Stats.operations.get(path) || [];

    const methods1Str = methods1.sort().join(",");
    const methods2Str = methods2.sort().join(",");

    if (methods1Str !== methods2Str) {
      operationDiffs.push(
        `   ${path}\n` +
          `     ${spec1Name}: [${methods1.join(", ")}]\n` +
          `     ${spec2Name}: [${methods2.join(", ")}]`
      );
    }
  }

  if (operationDiffs.length > 0) {
    log(`\n⚠️  Operation differences in common paths:`, "yellow");
    operationDiffs.forEach((diff) => log(diff, "reset"));
  } else if (inBoth.length > 0) {
    log(`\n✅ All common paths have identical operations`, "green");
  }
}

function compareSchemas(
  spec1Stats: SpecStats,
  spec2Stats: SpecStats,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n${"=".repeat(70)}`, "cyan");
  log(`📦 SCHEMA COMPARISON`, "cyan");
  log(`${"=".repeat(70)}`, "cyan");

  const onlyInSpec1 = spec1Stats.schemas.filter((s) => !spec2Stats.schemas.includes(s));
  const onlyInSpec2 = spec2Stats.schemas.filter((s) => !spec1Stats.schemas.includes(s));
  const inBoth = spec1Stats.schemas.filter((s) => spec2Stats.schemas.includes(s));

  log(`\n📊 Summary:`, "blue");
  log(`   ${spec1Name}: ${spec1Stats.schemas.length} schemas`, "reset");
  log(`   ${spec2Name}: ${spec2Stats.schemas.length} schemas`, "reset");
  log(`   Common: ${inBoth.length} schemas`, "green");

  if (onlyInSpec1.length > 0) {
    log(`\n❌ Only in ${spec1Name} (${onlyInSpec1.length} schemas):`, "red");
    onlyInSpec1.slice(0, 20).forEach((schema) => {
      log(`   ${schema}`, "reset");
    });
    if (onlyInSpec1.length > 20) {
      log(`   ... and ${onlyInSpec1.length - 20} more`, "yellow");
    }
  }

  if (onlyInSpec2.length > 0) {
    log(`\n✅ Only in ${spec2Name} (${onlyInSpec2.length} schemas):`, "green");
    onlyInSpec2.forEach((schema) => {
      log(`   ${schema}`, "reset");
    });
  }

  if (inBoth.length === spec1Stats.schemas.length && spec1Stats.schemas.length > 0) {
    log(`\n✅ All schemas are identical`, "green");
  }
}

function compareMetadata(
  spec1Stats: SpecStats,
  spec2Stats: SpecStats,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n${"=".repeat(70)}`, "cyan");
  log(`📋 METADATA COMPARISON`, "cyan");
  log(`${"=".repeat(70)}`, "cyan");

  log(`\n🔖 OpenAPI Version:`, "blue");
  log(`   ${spec1Name}: ${spec1Stats.openapi}`, "reset");
  log(`   ${spec2Name}: ${spec2Stats.openapi}`, "reset");
  if (spec1Stats.openapi === spec2Stats.openapi) {
    log(`   ✅ Match`, "green");
  } else {
    log(`   ❌ Different`, "red");
  }

  log(`\n📄 Title:`, "blue");
  log(`   ${spec1Name}: ${spec1Stats.title}`, "reset");
  log(`   ${spec2Name}: ${spec2Stats.title}`, "reset");
  if (spec1Stats.title === spec2Stats.title) {
    log(`   ✅ Match`, "green");
  } else {
    log(`   ℹ️  Different (expected for filtered specs)`, "yellow");
  }

  log(`\n🔢 Version:`, "blue");
  log(`   ${spec1Name}: ${spec1Stats.version}`, "reset");
  log(`   ${spec2Name}: ${spec2Stats.version}`, "reset");
  if (spec1Stats.version === spec2Stats.version) {
    log(`   ✅ Match`, "green");
  } else {
    log(`   ⚠️  Different`, "yellow");
  }

  log(`\n🔐 Security Schemes:`, "blue");
  log(`   ${spec1Name}: ${spec1Stats.securitySchemes.join(", ") || "none"}`, "reset");
  log(`   ${spec2Name}: ${spec2Stats.securitySchemes.join(", ") || "none"}`, "reset");
  const sameSecurity =
    JSON.stringify(spec1Stats.securitySchemes.sort()) ===
    JSON.stringify(spec2Stats.securitySchemes.sort());
  if (sameSecurity) {
    log(`   ✅ Match`, "green");
  } else {
    log(`   ❌ Different`, "red");
  }

  log(`\n🌐 Servers:`, "blue");
  log(
    `   ${spec1Name}: ${spec1Stats.servers.join(", ") || "none"}`,
    "reset"
  );
  log(
    `   ${spec2Name}: ${spec2Stats.servers.join(", ") || "none"}`,
    "reset"
  );
  const sameServers =
    JSON.stringify(spec1Stats.servers.sort()) ===
    JSON.stringify(spec2Stats.servers.sort());
  if (sameServers) {
    log(`   ✅ Match`, "green");
  } else {
    log(`   ⚠️  Different`, "yellow");
  }
}

function generateSummary(
  spec1Stats: SpecStats,
  spec2Stats: SpecStats,
  spec1Name: string,
  spec2Name: string
): void {
  log(`\n${"=".repeat(70)}`, "magenta");
  log(`📊 FINAL SUMMARY`, "magenta");
  log(`${"=".repeat(70)}`, "magenta");

  const pathsRemoved = spec1Stats.paths.length - spec2Stats.paths.length;
  const pathsAdded = spec2Stats.paths.length - spec1Stats.paths.length;
  const schemasRemoved = spec1Stats.schemas.length - spec2Stats.schemas.length;
  const schemasAdded = spec2Stats.schemas.length - spec1Stats.schemas.length;

  const totalOps1 = Array.from(spec1Stats.operations.values()).reduce(
    (sum, ops) => sum + ops.length,
    0
  );
  const totalOps2 = Array.from(spec2Stats.operations.values()).reduce(
    (sum, ops) => sum + ops.length,
    0
  );

  log(`\n📈 Comparison Overview:`, "blue");
  log(`   Specification: ${spec1Stats.openapi === spec2Stats.openapi ? "✅" : "❌"}`, "reset");
  log(`   Title: ${spec1Stats.title} → ${spec2Stats.title}`, "reset");
  log(``, "reset");
  log(`   Paths:`, "reset");
  log(`     ${spec1Name}: ${spec1Stats.paths.length}`, "reset");
  log(`     ${spec2Name}: ${spec2Stats.paths.length}`, "reset");
  log(
    `     Change: ${pathsRemoved > 0 ? `-${pathsRemoved}` : pathsAdded > 0 ? `+${pathsAdded}` : "no change"}`,
    pathsRemoved > 0 ? "red" : pathsAdded > 0 ? "green" : "reset"
  );
  log(``, "reset");
  log(`   Operations:`, "reset");
  log(`     ${spec1Name}: ${totalOps1}`, "reset");
  log(`     ${spec2Name}: ${totalOps2}`, "reset");
  log(
    `     Change: ${totalOps1 - totalOps2 > 0 ? `-${totalOps1 - totalOps2}` : totalOps2 - totalOps1 > 0 ? `+${totalOps2 - totalOps1}` : "no change"}`,
    totalOps1 - totalOps2 > 0 ? "red" : totalOps2 - totalOps1 > 0 ? "green" : "reset"
  );
  log(``, "reset");
  log(`   Schemas:`, "reset");
  log(`     ${spec1Name}: ${spec1Stats.schemas.length}`, "reset");
  log(`     ${spec2Name}: ${spec2Stats.schemas.length}`, "reset");
  log(
    `     Change: ${schemasRemoved > 0 ? `-${schemasRemoved}` : schemasAdded > 0 ? `+${schemasAdded}` : "no change"}`,
    schemasRemoved > 0 ? "red" : schemasAdded > 0 ? "green" : "reset"
  );

  const percentPaths =
    spec1Stats.paths.length > 0
      ? ((spec2Stats.paths.length / spec1Stats.paths.length) * 100).toFixed(1)
      : 0;
  const percentOps = totalOps1 > 0 ? ((totalOps2 / totalOps1) * 100).toFixed(1) : 0;

  log(`\n📉 Coverage:`, "blue");
  log(`   Paths: ${percentPaths}% of original`, "reset");
  log(`   Operations: ${percentOps}% of original`, "reset");
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  OpenAPI Specification Comparer", "cyan");
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

    log(`✅ Both specifications loaded`, "green");

    // Extract stats
    const spec1Stats = extractStats(spec1);
    const spec2Stats = extractStats(spec2);

    const spec1Name = spec1Stats.title;
    const spec2Name = spec2Stats.title;

    // Compare
    compareMetadata(spec1Stats, spec2Stats, spec1Name, spec2Name);
    comparePaths(spec1Stats, spec2Stats, spec1Name, spec2Name);
    compareSchemas(spec1Stats, spec2Stats, spec1Name, spec2Name);
    generateSummary(spec1Stats, spec2Stats, spec1Name, spec2Name);

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Comparison Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");
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
