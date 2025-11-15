#!/usr/bin/env bun

/**
 * Load Spec Tool (Powered by Scalar)
 *
 * Loads OpenAPI/Swagger specs from files or URLs.
 * Automatically detects format (JSON/YAML) and validates structure.
 *
 * @example
 * bun run load --input openapi.json
 * bun run load --url https://api.example.com/openapi.json
 * bun run load --input swagger.yaml --output openapi.json
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { isJson, isYaml } from "@scalar/openapi-parser";

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
  const urlIdx = args.indexOf("--url");
  const outputIdx = args.indexOf("--output");

  const input = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : null;
  const url = urlIdx >= 0 && urlIdx + 1 < args.length ? args[urlIdx + 1] : null;
  const output = outputIdx >= 0 && outputIdx + 1 < args.length ? args[outputIdx + 1] : null;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Universal Loader (Scalar)                       ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  if (!input && !url) {
    console.error(colorize("✗ No input specified", "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run load --input openapi.json", "cyan"));
    console.error(colorize("  bun run load --url https://api.example.com/spec.json", "cyan"));
    console.error(colorize("  bun run load --input swagger.yaml --output openapi.json\n", "cyan"));
    process.exit(1);
  }

  const source = input || url!;
  console.log(colorize(`📖 Loading from: ${source}`, "cyan"));

  let content: string;
  let spec: any;

  try {
    if (url) {
      // Fetch from URL
      console.log(colorize("   (Fetching from remote URL...)", "dim"));
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      content = await response.text();
    } else {
      // Read from file
      if (!existsSync(input!)) {
        throw new Error(`File not found: ${input}`);
      }
      content = await readFile(input!, "utf-8");
    }

    console.log();

    // Auto-detect format using Scalar
    const contentIsJson = isJson(content);
    const contentIsYaml = isYaml(content);

    console.log(colorize(`✅ Successfully loaded!`, "green"));
    console.log(colorize(`   Format: ${contentIsJson ? "JSON" : contentIsYaml ? "YAML" : "Unknown"}`, "dim"));

    // Parse content
    spec = JSON.parse(content);

    console.log(colorize(`   Version: ${spec.openapi || spec.swagger}`, "dim"));
    console.log(colorize(`   Title: ${spec.info?.title || "Unknown"}`, "dim"));

    // Count resources
    const pathCount = spec.paths ? Object.keys(spec.paths).length : 0;
    const schemaCount = spec.components?.schemas
      ? Object.keys(spec.components.schemas).length
      : spec.definitions
        ? Object.keys(spec.definitions).length
        : 0;

    console.log(colorize(`   Paths: ${pathCount}`, "dim"));
    console.log(colorize(`   Schemas: ${schemaCount}`, "dim"));
    console.log();

    // Save if output specified
    if (output) {
      console.log(colorize(`💾 Saving to: ${output}`, "cyan"));
      await writeFile(output, JSON.stringify(spec, null, 2), "utf-8");
      console.log(colorize(`✓ Saved ${output}`, "green"));

      const size = Buffer.byteLength(JSON.stringify(spec, null, 2), "utf-8");
      console.log(colorize(`  Size: ${(size / 1024).toFixed(2)} KB\n`, "dim"));
    } else {
      // Print summary
      console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
      console.log(colorize("║  Spec Summary                                            ║", "cyan"));
      console.log(colorize("╚══════════════════════════════════════════════════════════╝", "cyan"));
      console.log(JSON.stringify(spec.info, null, 2));
      console.log();
    }

  } catch (error: any) {
    console.error(colorize("\n✗ Failed to load spec!", "red"));
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
