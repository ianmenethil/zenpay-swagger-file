#!/usr/bin/env bun

/**
 * Traverse Spec Tool (Powered by Scalar)
 *
 * Traverses OpenAPI spec tree using Scalar's traverse function.
 * Useful for searching, analyzing, or transforming spec content.
 *
 * @example
 * bun run traverse --input openapi.json --search "payment"
 * bun run traverse --input openapi.json --count-operations
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { traverse } from "@scalar/openapi-parser";

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
  const searchIdx = args.indexOf("--search");
  const countOps = args.includes("--count-operations");
  const listPaths = args.includes("--list-paths");

  const inputFile = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : "openapi.json";
  const searchTerm = searchIdx >= 0 && searchIdx + 1 < args.length ? args[searchIdx + 1] : null;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Spec Traverser (Scalar)                         ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ Input file not found: ${inputFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run traverse --input openapi.json --search payment", "cyan"));
    console.error(colorize("  bun run traverse --input openapi.json --count-operations", "cyan"));
    console.error(colorize("  bun run traverse --input openapi.json --list-paths\n", "cyan"));
    process.exit(1);
  }

  console.log(colorize(`📖 Reading: ${inputFile}`, "cyan"));
  const inputContent = await readFile(inputFile, "utf-8");
  const spec = JSON.parse(inputContent);

  console.log(colorize(`✓ Loaded ${inputFile}`, "green"));
  console.log();

  try {
    if (searchTerm) {
      // Search for term
      console.log(colorize(`🔍 Searching for: "${searchTerm}"`, "cyan"));
      console.log();

      const matches: Array<{ path: string; value: any }> = [];

      traverse(spec, (node, path) => {
        const pathStr = path.join(".");
        const nodeStr = JSON.stringify(node).toLowerCase();
        if (nodeStr.includes(searchTerm.toLowerCase())) {
          matches.push({ path: pathStr, value: node });
        }
      });

      console.log(colorize(`Found ${matches.length} match(es):`, "green"));
      console.log();

      for (const match of matches.slice(0, 20)) {
        console.log(colorize(`  • ${match.path}`, "yellow"));
        console.log(colorize(`    ${JSON.stringify(match.value).substring(0, 100)}...`, "dim"));
      }

      if (matches.length > 20) {
        console.log();
        console.log(colorize(`  ... and ${matches.length - 20} more`, "dim"));
      }
      console.log();

    } else if (countOps) {
      // Count operations
      console.log(colorize("📊 Counting operations...", "cyan"));
      console.log();

      let operationCount = 0;
      const methods = new Map<string, number>();

      traverse(spec, (node, path) => {
        const lastSegment = path[path.length - 1];
        if (typeof lastSegment === "string" && ["get", "post", "put", "delete", "patch", "options", "head", "trace"].includes(lastSegment)) {
          if (path[path.length - 2] && typeof path[path.length - 2] === "string" && path[path.length - 2] !== "paths") {
            return; // Skip if not under paths
          }
          operationCount++;
          methods.set(lastSegment, (methods.get(lastSegment) || 0) + 1);
        }
      });

      console.log(colorize(`Total operations: ${operationCount}`, "green"));
      console.log();
      console.log(colorize("By method:", "cyan"));
      for (const [method, count] of Array.from(methods.entries()).sort((a, b) => b[1] - a[1])) {
        console.log(colorize(`  ${method.toUpperCase()}: ${count}`, "dim"));
      }
      console.log();

    } else if (listPaths) {
      // List all paths
      console.log(colorize("📋 Listing all paths...", "cyan"));
      console.log();

      const paths: string[] = [];

      traverse(spec, (node, path) => {
        if (path[0] === "paths" && typeof path[1] === "string" && path.length === 2) {
          paths.push(path[1]);
        }
      });

      console.log(colorize(`Found ${paths.length} path(s):`, "green"));
      console.log();

      for (const p of paths.sort()) {
        console.log(colorize(`  ${p}`, "cyan"));
      }
      console.log();

    } else {
      // Generic traversal stats
      console.log(colorize("🔄 Traversing spec tree...", "cyan"));
      console.log();

      let nodeCount = 0;
      let maxDepth = 0;

      traverse(spec, (node, path) => {
        nodeCount++;
        maxDepth = Math.max(maxDepth, path.length);
      });

      console.log(colorize("Traversal complete!", "green"));
      console.log(colorize(`  Total nodes: ${nodeCount}`, "dim"));
      console.log(colorize(`  Max depth: ${maxDepth}`, "dim"));
      console.log();

      console.log(colorize("Use --search, --count-operations, or --list-paths for more specific analysis\n", "yellow"));
    }

  } catch (error: any) {
    console.error(colorize("\n✗ Traversal failed!", "red"));
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
