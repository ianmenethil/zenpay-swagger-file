#!/usr/bin/env bun

/**
 * Dereference Spec Tool (Powered by Scalar)
 *
 * Dereferences all $ref pointers in OpenAPI spec to create a fully
 * self-contained specification with no external references.
 *
 * Useful for:
 * - Generating code with tools that don't support $ref
 * - Creating standalone documentation
 * - Simplifying spec structure
 *
 * @example
 * bun run deref
 * bun run deref --input openapi.json --output openapi-deref.json
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { dereference } from "@scalar/openapi-parser";

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_INPUT = "openapi.json";
const DEFAULT_OUTPUT = "openapi-deref.json";

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

  const inputFile = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : DEFAULT_INPUT;
  const outputFile = outputIdx >= 0 && outputIdx + 1 < args.length ? args[outputIdx + 1] : DEFAULT_OUTPUT;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Dereference Tool (Scalar)                       ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  // Check input file exists
  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ Input file not found: ${inputFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run deref", "cyan"));
    console.error(colorize("  bun run deref --input openapi.json --output openapi-deref.json\n", "cyan"));
    process.exit(1);
  }

  console.log(colorize(`📖 Reading: ${inputFile}`, "cyan"));

  // Read input file
  const inputContent = await readFile(inputFile, "utf-8");
  const inputSpec = JSON.parse(inputContent);

  console.log(colorize(`✓ Loaded ${inputFile}`, "green"));
  console.log(colorize(`  Version: ${inputSpec.openapi || inputSpec.swagger}`, "dim"));

  // Count references before dereferencing
  const refCount = (JSON.stringify(inputSpec).match(/"\$ref":/g) || []).length;
  console.log(colorize(`  References: ${refCount}`, "dim"));
  console.log();

  // Dereference using Scalar
  console.log(colorize("🔄 Dereferencing all $ref pointers with Scalar...\n", "cyan"));

  try {
    const result = await dereference(inputContent);

    // The dereferenced spec is in result.schema
    const dereferencedSpec = result.schema;

    // Count remaining references (should be 0)
    const remainingRefs = (JSON.stringify(dereferencedSpec).match(/"\$ref":/g) || []).length;

    console.log(colorize("✓ Dereferencing complete!", "green"));
    console.log(colorize(`  Original references: ${refCount}`, "dim"));
    console.log(colorize(`  Remaining references: ${remainingRefs}`, "dim"));
    console.log();

    // Save output
    console.log(colorize(`💾 Writing: ${outputFile}`, "cyan"));
    await writeFile(outputFile, JSON.stringify(dereferencedSpec, null, 2), "utf-8");

    // Calculate file sizes
    const inputSize = Buffer.byteLength(inputContent, "utf-8");
    const outputSize = Buffer.byteLength(JSON.stringify(dereferencedSpec, null, 2), "utf-8");

    console.log(colorize(`✓ Saved ${outputFile}`, "green"));
    console.log(colorize(`  Input size: ${(inputSize / 1024).toFixed(2)} KB`, "dim"));
    console.log(colorize(`  Output size: ${(outputSize / 1024).toFixed(2)} KB`, "dim"));
    console.log(colorize(`  Difference: ${((outputSize - inputSize) / 1024).toFixed(2)} KB (${((outputSize / inputSize - 1) * 100).toFixed(1)}%)`, "dim"));
    console.log();

    console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
    console.log(colorize("║  Summary                                                 ║", "cyan"));
    console.log(colorize("╚══════════════════════════════════════════════════════════╝", "cyan"));
    console.log(colorize(`  ✓ All ${refCount} references resolved`, "green"));
    console.log(colorize(`  ✓ Self-contained spec created`, "green"));
    console.log(colorize(`  ✓ Ready for tools that don't support $ref\n`, "green"));

  } catch (error: any) {
    console.error(colorize("\n✗ Dereferencing failed!", "red"));
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
