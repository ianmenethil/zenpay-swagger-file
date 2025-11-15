#!/usr/bin/env bun

/**
 * Split Spec Tool
 *
 * Splits a monolithic OpenAPI spec into separate files by route.
 * Already implemented in analyze-spec.ts, this is a standalone version.
 *
 * @example
 * bun run split --input openapi.json --output split-specs/
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
};

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

async function main() {
  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI Specification Splitter                          ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  const inputFile = "openapi.json";
  const outputDir = "split-specs";

  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ File not found: ${inputFile}`, "yellow"));
    process.exit(1);
  }

  console.log(colorize(`📖 Loading ${inputFile}...`, "cyan"));
  const spec = JSON.parse(await readFile(inputFile, "utf-8"));

  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Group paths by route
  const routeGroups: Record<string, Record<string, any>> = {};

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    const match = path.match(/^\/v2\/([^/]+)/);
    const routeGroup = match ? match[1] : "unknown";

    if (!routeGroups[routeGroup]) {
      routeGroups[routeGroup] = {};
    }
    routeGroups[routeGroup][path] = pathItem;
  }

  console.log(colorize(`\n🔪 Splitting into ${Object.keys(routeGroups).length} route groups...\n`, "yellow"));

  for (const [routeName, paths] of Object.entries(routeGroups)) {
    const routeSpec = {
      ...spec,
      paths,
    };

    const outputFile = `${outputDir}/${routeName}.json`;
    await writeFile(outputFile, JSON.stringify(routeSpec, null, 2), "utf-8");

    const pathCount = Object.keys(paths).length;
    console.log(colorize(`  ✓ ${routeName.padEnd(20)} ${pathCount} paths → ${outputFile}`, "green"));
  }

  console.log(colorize(`\n✅ Split complete! Files saved to ${outputDir}/\n`, "green"));
}

main().catch((error) => {
  console.error(colorize("\n✗ Error:", "yellow"));
  console.error(error.message);
  process.exit(1);
});
