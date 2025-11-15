#!/usr/bin/env bun

/**
 * Bundle Spec Tool (Powered by Scalar)
 *
 * Bundles multiple OpenAPI specifications into a single file.
 * Uses Scalar's join() to merge specs intelligently.
 *
 * @example
 * bun run bundle --input split-specs/*.json --output bundled.json
 * bun run bundle --input "split-specs/payments.json,split-specs/customers.json" --output bundled.json
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { readdir } from "fs/promises";
import { join } from "@scalar/openapi-parser";

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_INPUT_DIR = "split-specs";
const DEFAULT_OUTPUT = "openapi-bundled.json";

// ============================================================================
// COLORS
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const inputIdx = args.indexOf("--input");
  const outputIdx = args.indexOf("--output");

  const inputArg = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : DEFAULT_INPUT_DIR;
  const outputFile = outputIdx >= 0 && outputIdx + 1 < args.length ? args[outputIdx + 1] : DEFAULT_OUTPUT;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Bundle Tool (Scalar)                            ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  // Determine input files
  let inputFiles: string[] = [];

  if (inputArg.includes(",")) {
    // Comma-separated list
    inputFiles = inputArg.split(",").map((f) => f.trim());
  } else if (existsSync(inputArg) && (await readdir(inputArg)).length > 0) {
    // Directory
    console.log(colorize(`📂 Reading directory: ${inputArg}`, "cyan"));
    const files = await readdir(inputArg);
    inputFiles = files
      .filter((f) => f.endsWith(".json"))
      .map((f) => `${inputArg}/${f}`);
    console.log(colorize(`✓ Found ${inputFiles.length} JSON files`, "green"));
  } else if (existsSync(inputArg)) {
    // Single file
    inputFiles = [inputArg];
  } else {
    console.error(colorize(`✗ Input not found: ${inputArg}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run bundle --input split-specs --output bundled.json", "cyan"));
    console.error(colorize("  bun run bundle --input \"file1.json,file2.json\" --output bundled.json\n", "cyan"));
    process.exit(1);
  }

  if (inputFiles.length === 0) {
    console.error(colorize("✗ No input files found", "red"));
    process.exit(1);
  }

  console.log(colorize(`\n📖 Loading ${inputFiles.length} specification(s):\n`, "cyan"));

  // Load all specs
  const specs: any[] = [];
  for (const file of inputFiles) {
    if (!existsSync(file)) {
      console.error(colorize(`  ✗ File not found: ${file}`, "red"));
      process.exit(1);
    }

    const content = await readFile(file, "utf-8");
    const spec = JSON.parse(content);
    specs.push(spec);
    console.log(colorize(`  ✓ ${file}`, "green"));
  }

  console.log();

  // Bundle using Scalar
  console.log(colorize("🔄 Bundling specifications with Scalar...\n", "cyan"));

  try {
    const result = await join(specs);

    // Check if join was successful
    if (!result.ok) {
      console.error(colorize("✗ Bundling failed due to conflicts!", "red"));
      console.error(colorize(`\nFound ${result.conflicts?.length || 0} conflict(s):\n`, "yellow"));

      for (const conflict of result.conflicts || []) {
        if (conflict.type === "path") {
          console.error(colorize(`  • Path conflict: ${conflict.method.toUpperCase()} ${conflict.path}`, "red"));
        } else if (conflict.type === "webhook") {
          console.error(colorize(`  • Webhook conflict: ${conflict.method.toUpperCase()} ${conflict.path}`, "red"));
        } else if (conflict.type === "component") {
          console.error(colorize(`  • Component conflict: ${conflict.componentType} "${conflict.name}"`, "red"));
        }
      }

      console.error();
      process.exit(1);
    }

    const bundledSpec = result.document;

    console.log(colorize("✓ Bundling complete!", "green"));

    // Count paths and schemas
    const pathCount = bundledSpec?.paths ? Object.keys(bundledSpec.paths).length : 0;
    const schemaCount = bundledSpec?.components?.schemas ? Object.keys(bundledSpec.components.schemas).length : 0;

    console.log(colorize(`  Paths: ${pathCount}`, "dim"));
    console.log(colorize(`  Schemas: ${schemaCount}`, "dim"));
    console.log();

    // Save output
    console.log(colorize(`💾 Writing: ${outputFile}`, "cyan"));
    await writeFile(outputFile, JSON.stringify(bundledSpec, null, 2), "utf-8");

    const outputSize = Buffer.byteLength(JSON.stringify(bundledSpec, null, 2), "utf-8");

    console.log(colorize(`✓ Saved ${outputFile}`, "green"));
    console.log(colorize(`  Size: ${(outputSize / 1024).toFixed(2)} KB`, "dim"));
    console.log();

    console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
    console.log(colorize("║  Summary                                                 ║", "cyan"));
    console.log(colorize("╚══════════════════════════════════════════════════════════╝", "cyan"));
    console.log(colorize(`  ✓ Merged ${inputFiles.length} specification(s)`, "green"));
    console.log(colorize(`  ✓ Combined ${pathCount} path(s)`, "green"));
    console.log(colorize(`  ✓ Combined ${schemaCount} schema(s)\n`, "green"));

  } catch (error: any) {
    console.error(colorize("\n✗ Bundling failed!", "red"));
    console.error(colorize(error.message || String(error), "red"));

    if (error.errors && Array.isArray(error.errors)) {
      console.error(colorize("\nErrors:", "yellow"));
      for (const err of error.errors) {
        console.error(colorize(`  • ${err.message || err}`, "red"));
      }
    }

    console.error();
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(colorize("\n✗ Unexpected error:", "red"));
  console.error(colorize(error.message, "red"));
  if (error.stack) {
    console.error(colorize(error.stack, "dim"));
  }
  process.exit(1);
});
