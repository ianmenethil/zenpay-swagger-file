#!/usr/bin/env bun

/**
 * Normalize Spec Tool (Powered by Scalar)
 *
 * Normalizes OpenAPI specifications to a consistent structure using Scalar.
 * Useful for cleaning up specs from different sources or generators.
 *
 * @example
 * bun run normalize --input openapi.json --output openapi-normalized.json
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { normalize } from "@scalar/openapi-parser";

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

  const inputIdx = args.indexOf("--input");
  const outputIdx = args.indexOf("--output");

  const inputFile = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : "openapi.json";
  const outputFile = outputIdx >= 0 && outputIdx + 1 < args.length ? args[outputIdx + 1] : "openapi-normalized.json";

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Normalizer (Scalar)                             ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ Input file not found: ${inputFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run normalize --input openapi.json --output openapi-normalized.json\n", "cyan"));
    process.exit(1);
  }

  console.log(colorize(`📖 Reading: ${inputFile}`, "cyan"));
  const inputContent = await readFile(inputFile, "utf-8");

  console.log(colorize(`✓ Loaded ${inputFile}`, "green"));
  console.log();

  try {
    console.log(colorize("🔄 Normalizing spec structure with Scalar...", "cyan"));
    console.log();

    // Normalize using Scalar
    const normalized = normalize(inputContent);

    console.log(colorize("✓ Normalization complete!", "green"));
    console.log();

    // Save output
    console.log(colorize(`💾 Saving to: ${outputFile}`, "cyan"));
    await writeFile(outputFile, JSON.stringify(normalized, null, 2), "utf-8");

    const outputSize = Buffer.byteLength(JSON.stringify(normalized, null, 2), "utf-8");
    console.log(colorize(`✓ Saved ${outputFile}`, "green"));
    console.log(colorize(`  Size: ${(outputSize / 1024).toFixed(2)} KB`, "dim"));
    console.log();

    console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
    console.log(colorize("║  Summary                                                 ║", "cyan"));
    console.log(colorize("╚══════════════════════════════════════════════════════════╝", "cyan"));
    console.log(colorize("  ✓ Spec normalized to consistent structure", "green"));
    console.log(colorize("  ✓ Ready for consistent processing\n", "green"));

  } catch (error: any) {
    console.error(colorize("\n✗ Normalization failed!", "red"));
    console.error(colorize(error.message || String(error), "red"));
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
