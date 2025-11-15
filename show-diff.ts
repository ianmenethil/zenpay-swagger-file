#!/usr/bin/env bun

/**
 * Show Diff Tool
 *
 * Displays a clear, color-coded diff between original and enhanced OpenAPI specs.
 * Shows exactly what will change when enhancements are applied.
 *
 * @example
 * bun run diff --route payments
 * bun run diff --path "/v2/payments/{paymentReference}"
 * bun run diff --file openapi-enhanced.json
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// TYPES
// ============================================================================

interface DiffOptions {
  route?: string;
  path?: string;
  file?: string;
  detailed?: boolean;
}

interface Change {
  type: "added" | "removed" | "modified";
  location: string;
  field: string;
  before?: any;
  after?: any;
}

// ============================================================================
// COLORS
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",

  // Foreground
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  // Background
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
};

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

// ============================================================================
// DIFF LOGIC
// ============================================================================

/**
 * Deep diff two objects
 */
function diffObjects(
  before: any,
  after: any,
  path: string = ""
): Change[] {
  const changes: Change[] = [];

  // Get all unique keys
  const beforeKeys = new Set(Object.keys(before || {}));
  const afterKeys = new Set(Object.keys(after || {}));
  const allKeys = new Set([...beforeKeys, ...afterKeys]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const beforeValue = before?.[key];
    const afterValue = after?.[key];

    // Added
    if (!beforeKeys.has(key)) {
      changes.push({
        type: "added",
        location: path,
        field: key,
        after: afterValue,
      });
      continue;
    }

    // Removed
    if (!afterKeys.has(key)) {
      changes.push({
        type: "removed",
        location: path,
        field: key,
        before: beforeValue,
      });
      continue;
    }

    // Modified
    if (JSON.stringify(beforeValue) !== JSON.stringify(afterValue)) {
      // If both are objects, recurse
      if (
        typeof beforeValue === "object" &&
        typeof afterValue === "object" &&
        beforeValue !== null &&
        afterValue !== null &&
        !Array.isArray(beforeValue) &&
        !Array.isArray(afterValue)
      ) {
        changes.push(...diffObjects(beforeValue, afterValue, currentPath));
      } else {
        changes.push({
          type: "modified",
          location: path,
          field: key,
          before: beforeValue,
          after: afterValue,
        });
      }
    }
  }

  return changes;
}

/**
 * Format a value for display
 */
function formatValue(value: any, maxLength: number = 80): string {
  if (value === null) return colorize("null", "dim");
  if (value === undefined) return colorize("undefined", "dim");

  const str = typeof value === "string" ? value : JSON.stringify(value);

  if (str.length > maxLength) {
    return str.substring(0, maxLength) + colorize("...", "dim");
  }

  return str;
}

/**
 * Display a single change
 */
function displayChange(change: Change, index: number, total: number) {
  const location = change.location || "root";

  console.log(colorize(`\n[${ index + 1}/${total}] ${location}`, "bold"));

  if (change.type === "added") {
    console.log(colorize(`  + ${change.field}`, "green"));
    console.log(colorize(`    ${formatValue(change.after)}`, "dim"));
  } else if (change.type === "removed") {
    console.log(colorize(`  - ${change.field}`, "red"));
    console.log(colorize(`    ${formatValue(change.before)}`, "dim"));
  } else if (change.type === "modified") {
    console.log(colorize(`  ~ ${change.field}`, "yellow"));
    console.log(colorize(`    - ${formatValue(change.before)}`, "red"));
    console.log(colorize(`    + ${formatValue(change.after)}`, "green"));
  }
}

/**
 * Display diff summary
 */
function displaySummary(changes: Change[]) {
  const added = changes.filter((c) => c.type === "added").length;
  const removed = changes.filter((c) => c.type === "removed").length;
  const modified = changes.filter((c) => c.type === "modified").length;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  Diff Summary                                            ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  console.log(colorize(`  Added:    ${added}`, "green"));
  console.log(colorize(`  Removed:  ${removed}`, "red"));
  console.log(colorize(`  Modified: ${modified}`, "yellow"));
  console.log(colorize(`  Total:    ${changes.length}`, "bold"));
  console.log();
}

/**
 * Display side-by-side comparison
 */
function displaySideBySide(before: any, after: any, title: string) {
  const width = 60;
  const separator = " │ ";

  console.log(colorize(`\n${"═".repeat(width * 2 + 3)}`, "cyan"));
  console.log(colorize(`${title.padEnd(width)}${separator}${title.padEnd(width)}`, "bold"));
  console.log(colorize(`${"BEFORE".padEnd(width)}${separator}${"AFTER".padEnd(width)}`, "dim"));
  console.log(colorize(`${"─".repeat(width * 2 + 3)}`, "cyan"));

  const beforeStr = JSON.stringify(before, null, 2);
  const afterStr = JSON.stringify(after, null, 2);

  const beforeLines = beforeStr.split("\n");
  const afterLines = afterStr.split("\n");

  const maxLines = Math.max(beforeLines.length, afterLines.length);

  for (let i = 0; i < Math.min(maxLines, 30); i++) {
    const beforeLine = (beforeLines[i] || "").substring(0, width).padEnd(width);
    const afterLine = (afterLines[i] || "").substring(0, width).padEnd(width);

    if (beforeLine.trim() !== afterLine.trim()) {
      console.log(
        colorize(beforeLine, "red") +
        colorize(separator, "dim") +
        colorize(afterLine, "green")
      );
    } else {
      console.log(
        colorize(beforeLine, "dim") +
        colorize(separator, "dim") +
        colorize(afterLine, "dim")
      );
    }
  }

  if (maxLines > 30) {
    console.log(colorize(`\n... ${maxLines - 30} more lines ...`, "dim"));
  }

  console.log(colorize(`${"═".repeat(width * 2 + 3)}\n`, "cyan"));
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const routeIdx = args.indexOf("--route");
  const pathIdx = args.indexOf("--path");
  const fileIdx = args.indexOf("--file");

  const options: DiffOptions = {
    route: routeIdx >= 0 && routeIdx + 1 < args.length ? args[routeIdx + 1] : undefined,
    path: pathIdx >= 0 && pathIdx + 1 < args.length ? args[pathIdx + 1] : undefined,
    file: fileIdx >= 0 && fileIdx + 1 < args.length ? args[fileIdx + 1] : undefined,
    detailed: args.includes("--detailed"),
  };

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Specification Diff Tool                        ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  // Load specs
  const beforeFile = "openapi.json";
  const afterFile = options.file || "openapi-enhanced.json";

  if (!existsSync(beforeFile)) {
    console.error(colorize(`✗ File not found: ${beforeFile}`, "red"));
    process.exit(1);
  }

  if (!existsSync(afterFile)) {
    console.error(colorize(`✗ File not found: ${afterFile}`, "red"));
    console.error(colorize(`  Run enhancement first: bun run enhance --route <route>`, "yellow"));
    process.exit(1);
  }

  const before = JSON.parse(await readFile(beforeFile, "utf-8"));
  const after = JSON.parse(await readFile(afterFile, "utf-8"));

  // Filter by route or path if specified
  let beforeData = before;
  let afterData = after;
  let scope = "entire specification";

  if (options.path) {
    scope = options.path;
    beforeData = before.paths?.[options.path];
    afterData = after.paths?.[options.path];

    if (!beforeData && !afterData) {
      console.error(colorize(`✗ Path not found: ${options.path}`, "red"));
      process.exit(1);
    }
  } else if (options.route) {
    scope = `/v2/${options.route}/**`;

    // Filter paths by route
    const filteredBefore: any = { paths: {} };
    const filteredAfter: any = { paths: {} };

    for (const [path, pathItem] of Object.entries(before.paths)) {
      if (path.startsWith(`/v2/${options.route}`)) {
        filteredBefore.paths[path] = pathItem;
      }
    }

    for (const [path, pathItem] of Object.entries(after.paths)) {
      if (path.startsWith(`/v2/${options.route}`)) {
        filteredAfter.paths[path] = pathItem;
      }
    }

    beforeData = filteredBefore;
    afterData = filteredAfter;
  }

  console.log(colorize(`Comparing: ${scope}`, "cyan"));
  console.log(colorize(`Before: ${beforeFile}`, "dim"));
  console.log(colorize(`After:  ${afterFile}\n`, "dim"));

  // Calculate diff
  const changes = diffObjects(beforeData, afterData);

  if (changes.length === 0) {
    console.log(colorize("\n✓ No changes detected\n", "green"));
    return;
  }

  // Display changes
  if (options.detailed) {
    displaySideBySide(beforeData, afterData, scope);
  } else {
    for (let i = 0; i < changes.length; i++) {
      displayChange(changes[i], i, changes.length);
    }
  }

  // Display summary
  displaySummary(changes);

  // Group changes by endpoint
  const byEndpoint: Record<string, Change[]> = {};
  for (const change of changes) {
    const endpoint = change.location.split(".").slice(0, 2).join(".");
    if (!byEndpoint[endpoint]) {
      byEndpoint[endpoint] = [];
    }
    byEndpoint[endpoint].push(change);
  }

  console.log(colorize("Changes by Endpoint:", "bold"));
  for (const [endpoint, endpointChanges] of Object.entries(byEndpoint)) {
    const added = endpointChanges.filter((c) => c.type === "added").length;
    const modified = endpointChanges.filter((c) => c.type === "modified").length;
    const removed = endpointChanges.filter((c) => c.type === "removed").length;

    console.log(colorize(`\n  ${endpoint}`, "cyan"));
    if (added > 0) console.log(colorize(`    + ${added} added`, "green"));
    if (modified > 0) console.log(colorize(`    ~ ${modified} modified`, "yellow"));
    if (removed > 0) console.log(colorize(`    - ${removed} removed`, "red"));
  }

  console.log();
}

// Show usage if no enhanced file exists
const args = process.argv.slice(2);
if (args.length === 0 && !existsSync("openapi-enhanced.json")) {
  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Specification Diff Tool                        ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  console.log(colorize("Usage:", "yellow"));
  console.log(colorize("  bun run diff                           # Show all changes", "cyan"));
  console.log(colorize("  bun run diff --route payments          # Changes for specific route", "cyan"));
  console.log(colorize("  bun run diff --path \"/v2/payments\"     # Changes for specific path", "cyan"));
  console.log(colorize("  bun run diff --detailed                # Side-by-side view", "cyan"));
  console.log(colorize("  bun run diff --file custom.json        # Compare with custom file\n", "cyan"));

  console.log(colorize("First, generate an enhanced spec:", "yellow"));
  console.log(colorize("  bun run enhance --route payments\n", "cyan"));

  process.exit(0);
}

main().catch((error) => {
  console.error(colorize("\n✗ Error:", "red"));
  console.error(colorize(error.message, "red"));
  process.exit(1);
});
