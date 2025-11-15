#!/usr/bin/env bun

/**
 * Bundle Spec Tool
 *
 * Bundles split OpenAPI specifications back into a single file.
 * Opposite of split-spec.ts
 *
 * @example
 * bun run bundle --input split-specs/payments.json --output bundled.json
 */

import { readFile, writeFile } from "fs/promises";

console.log("Bundle Spec Tool");
console.log("Bundles split OpenAPI specifications into a single file");
console.log("\nComing soon...");
console.log("\nCurrently, you can use the split specs in split-specs/ directory");
console.log("Each file is a complete OpenAPI spec for that route.\n");
