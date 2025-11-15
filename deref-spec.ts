#!/usr/bin/env bun

/**
 * Dereference Spec Tool
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
 * bun run deref --input openapi.json --output openapi-deref.json
 */

import { readFile, writeFile } from "fs/promises";

console.log("Dereference Spec Tool");
console.log("Resolves all $ref pointers to create self-contained spec");
console.log("\nComing soon...");
console.log("\nFor now, the spec uses $ref for schemas:");
console.log('  "$ref": "#/components/schemas/PaymentResponse"');
console.log("\nThis is standard OpenAPI and supported by most tools.\n");
