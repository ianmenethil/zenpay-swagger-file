#!/usr/bin/env bun

/**
 * Convert Spec Tool (Powered by Scalar)
 *
 * Converts between JSON and YAML formats using Scalar.
 * Auto-detects input format and converts to desired output format.
 *
 * @example
 * bun run convert --input openapi.json --output openapi.yaml
 * bun run convert --input swagger.yaml --output swagger.json
 * bun run convert --input openapi.json --format yaml
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { toJson, toYaml, isJson, isYaml } from "@scalar/openapi-parser";

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
  const formatIdx = args.indexOf("--format");

  const inputFile = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : null;
  const outputFile = outputIdx >= 0 && outputIdx + 1 < args.length ? args[outputIdx + 1] : null;
  const format = formatIdx >= 0 && formatIdx + 1 < args.length ? args[formatIdx + 1] : null;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Format Converter (Scalar)                       ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  if (!inputFile) {
    console.error(colorize("✗ No input file specified", "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run convert --input openapi.json --output openapi.yaml", "cyan"));
    console.error(colorize("  bun run convert --input swagger.yaml --output swagger.json", "cyan"));
    console.error(colorize("  bun run convert --input openapi.json --format yaml\n", "cyan"));
    process.exit(1);
  }

  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ Input file not found: ${inputFile}`, "red"));
    process.exit(1);
  }

  console.log(colorize(`📖 Reading: ${inputFile}`, "cyan"));
  const inputContent = await readFile(inputFile, "utf-8");

  // Auto-detect input format using Scalar
  const inputIsJson = isJson(inputContent);
  const inputIsYaml = isYaml(inputContent);

  console.log(colorize(`✓ Loaded ${inputFile}`, "green"));
  console.log(colorize(`  Format: ${inputIsJson ? "JSON" : inputIsYaml ? "YAML" : "Unknown"}`, "dim"));

  const inputSize = Buffer.byteLength(inputContent, "utf-8");
  console.log(colorize(`  Size: ${(inputSize / 1024).toFixed(2)} KB`, "dim"));
  console.log();

  // Determine output format
  let targetFormat: "json" | "yaml";

  if (format) {
    targetFormat = format.toLowerCase() as "json" | "yaml";
  } else if (outputFile) {
    targetFormat = outputFile.endsWith(".yaml") || outputFile.endsWith(".yml") ? "yaml" : "json";
  } else {
    // Default to opposite of input
    targetFormat = inputIsJson ? "yaml" : "json";
  }

  if (!["json", "yaml"].includes(targetFormat)) {
    console.error(colorize(`✗ Invalid format: ${targetFormat}`, "red"));
    console.error(colorize("  Must be 'json' or 'yaml'\n", "yellow"));
    process.exit(1);
  }

  console.log(colorize(`🔄 Converting to ${targetFormat.toUpperCase()}...`, "cyan"));
  console.log();

  try {
    let outputContent: string;

    if (targetFormat === "json") {
      outputContent = await toJson(inputContent);
    } else {
      outputContent = await toYaml(inputContent);
    }

    console.log(colorize("✓ Conversion complete!", "green"));

    const outputSize = Buffer.byteLength(outputContent, "utf-8");
    console.log(colorize(`  Output size: ${(outputSize / 1024).toFixed(2)} KB`, "dim"));

    const diff = outputSize - inputSize;
    const diffPercent = ((diff / inputSize) * 100).toFixed(1);
    console.log(colorize(`  Difference: ${(diff / 1024).toFixed(2)} KB (${diffPercent}%)`, "dim"));
    console.log();

    // Save output
    const finalOutput = outputFile || inputFile.replace(/\.(json|yaml|yml)$/, `.${targetFormat}`);
    console.log(colorize(`💾 Saving to: ${finalOutput}`, "cyan"));
    await writeFile(finalOutput, outputContent, "utf-8");

    console.log(colorize(`✓ Saved ${finalOutput}`, "green"));
    console.log();

    console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
    console.log(colorize("║  Summary                                                 ║", "cyan"));
    console.log(colorize("╚══════════════════════════════════════════════════════════╝", "cyan"));
    console.log(colorize(`  Input: ${inputFile} (${inputIsJson ? "JSON" : "YAML"})`, "green"));
    console.log(colorize(`  Output: ${finalOutput} (${targetFormat.toUpperCase()})`, "green"));
    console.log(colorize(`  ✓ Format conversion successful\n`, "green"));

  } catch (error: any) {
    console.error(colorize("\n✗ Conversion failed!", "red"));
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
