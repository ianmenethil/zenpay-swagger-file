#!/usr/bin/env bun

/**
 * OpenAPI Specification Validator
 *
 * Validates OpenAPI 3.1 specs against the official JSON Schema.
 * Downloads the latest schema from OpenAPI Initiative if not cached.
 *
 * Features:
 * - Validates against official OpenAPI 3.1 schema
 * - Caches schema locally for performance
 * - Detailed error reporting
 * - Validates structure, required fields, types
 * - Checks references ($ref) integrity
 *
 * @example
 * bun run validate
 * bun run validate --file openapi-enhanced.json
 * bun run validate --strict
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Official OpenAPI 3.1 JSON Schema URL */
const OPENAPI_SCHEMA_URL = "https://spec.openapis.org/oas/3.1/schema/2022-10-07";

/** Local cache for schema */
const SCHEMA_CACHE_FILE = ".cache/openapi-3.1-schema.json";

/** Default file to validate */
const DEFAULT_SPEC_FILE = "openapi.json";

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
// SCHEMA DOWNLOAD & CACHE
// ============================================================================

/**
 * Download OpenAPI 3.1 JSON Schema
 */
async function downloadSchema(): Promise<any> {
  console.log(colorize("📥 Downloading official OpenAPI 3.1 JSON Schema...", "cyan"));

  try {
    const response = await fetch(OPENAPI_SCHEMA_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const schema = await response.json();
    console.log(colorize("✓ Downloaded schema successfully\n", "green"));

    return schema;
  } catch (error) {
    console.error(colorize("✗ Failed to download schema", "red"));
    console.error(colorize(`  ${error instanceof Error ? error.message : String(error)}`, "dim"));
    throw error;
  }
}

/**
 * Load schema from cache or download if not cached
 */
async function loadSchema(): Promise<any> {
  // Check cache first
  if (existsSync(SCHEMA_CACHE_FILE)) {
    console.log(colorize("📦 Loading cached OpenAPI schema...", "cyan"));
    const cached = await readFile(SCHEMA_CACHE_FILE, "utf-8");
    console.log(colorize("✓ Loaded from cache\n", "green"));
    return JSON.parse(cached);
  }

  // Download and cache
  const schema = await downloadSchema();

  // Save to cache
  const cacheDir = SCHEMA_CACHE_FILE.split("/").slice(0, -1).join("/");
  if (!existsSync(cacheDir)) {
    await Bun.spawn(["mkdir", "-p", cacheDir]).exited;
  }

  await writeFile(SCHEMA_CACHE_FILE, JSON.stringify(schema, null, 2), "utf-8");
  console.log(colorize(`✓ Cached schema to ${SCHEMA_CACHE_FILE}\n`, "dim"));

  return schema;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate OpenAPI spec against JSON Schema
 */
async function validateSpec(spec: any, schema: any, strict = false): Promise<boolean> {
  console.log(colorize("🔍 Validating OpenAPI specification...\n", "cyan"));

  // Initialize AJV with JSON Schema 2020-12 support
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: strict,
    validateFormats: true,
    allowUnionTypes: true,
  });

  // Add format validators (email, uri, date-time, etc.)
  addFormats(ajv);

  // Add JSON Schema 2020-12 meta-schema support
  // OpenAPI 3.1 uses JSON Schema 2020-12
  const draft202012 = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: "https://json-schema.org/draft/2020-12/schema",
    $vocabulary: {
      "https://json-schema.org/draft/2020-12/vocab/core": true,
      "https://json-schema.org/draft/2020-12/vocab/applicator": true,
      "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
      "https://json-schema.org/draft/2020-12/vocab/validation": true,
      "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
      "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
      "https://json-schema.org/draft/2020-12/vocab/content": true,
    },
    $dynamicAnchor: "meta",
    title: "Core and Validation vocabulary meta-schema",
    type: ["object", "boolean"],
  };

  try {
    ajv.addMetaSchema(draft202012);
  } catch (e) {
    // Ignore if already added
  }

  // Compile schema
  const validate = ajv.compile(schema);

  // Validate
  const valid = validate(spec);

  if (valid) {
    console.log(colorize("✅ Validation passed!", "green"));
    console.log(colorize("   Spec conforms to OpenAPI 3.1 standard\n", "dim"));
    return true;
  }

  // Show errors
  console.log(colorize("❌ Validation failed!\n", "red"));

  if (validate.errors) {
    console.log(colorize(`Found ${validate.errors.length} error(s):\n`, "yellow"));

    for (const error of validate.errors) {
      const location = error.instancePath || "root";
      const message = error.message || "Unknown error";

      console.log(colorize(`  ✗ ${location}`, "red"));
      console.log(colorize(`    ${message}`, "dim"));

      if (error.params) {
        const params = JSON.stringify(error.params);
        console.log(colorize(`    ${params}`, "dim"));
      }

      console.log();
    }
  }

  return false;
}

/**
 * Validate $ref integrity
 */
function validateReferences(spec: any): { valid: boolean; errors: string[] } {
  console.log(colorize("🔗 Checking $ref integrity...\n", "cyan"));

  const errors: string[] = [];
  const refs = new Set<string>();

  // Collect all $ref values
  function collectRefs(obj: any, path = "") {
    if (obj && typeof obj === "object") {
      if (obj.$ref && typeof obj.$ref === "string") {
        refs.add(obj.$ref);
      }

      for (const [key, value] of Object.entries(obj)) {
        collectRefs(value, path ? `${path}.${key}` : key);
      }
    }
  }

  collectRefs(spec);

  console.log(colorize(`  Found ${refs.size} references to validate\n`, "dim"));

  // Validate each reference
  for (const ref of refs) {
    // Internal reference
    if (ref.startsWith("#/")) {
      const path = ref.substring(2).split("/");
      let target: any = spec;

      for (const segment of path) {
        if (target && typeof target === "object") {
          target = target[segment];
        } else {
          errors.push(`Invalid reference: ${ref} (${segment} not found)`);
          break;
        }
      }

      if (!target) {
        errors.push(`Invalid reference: ${ref} (target not found)`);
      }
    }
    // External reference (just warn, don't validate)
    else {
      console.log(colorize(`  ⚠ External reference: ${ref}`, "yellow"));
    }
  }

  if (errors.length === 0) {
    console.log(colorize("✓ All references are valid\n", "green"));
    return { valid: true, errors: [] };
  } else {
    console.log(colorize(`✗ Found ${errors.length} broken reference(s):\n`, "red"));
    for (const error of errors) {
      console.log(colorize(`  • ${error}`, "red"));
    }
    console.log();
    return { valid: false, errors };
  }
}

/**
 * Additional validation checks
 */
function additionalValidation(spec: any): { valid: boolean; warnings: string[] } {
  console.log(colorize("📋 Running additional checks...\n", "cyan"));

  const warnings: string[] = [];

  // Check for empty descriptions
  if (spec.info && !spec.info.description) {
    warnings.push("API description is missing (info.description)");
  }

  // Check for contact info
  if (spec.info && !spec.info.contact) {
    warnings.push("Contact information is missing (info.contact)");
  }

  // Check for license
  if (spec.info && !spec.info.license) {
    warnings.push("License information is missing (info.license)");
  }

  // Check for servers
  if (!spec.servers || spec.servers.length === 0) {
    warnings.push("No servers defined");
  }

  // Check for tags descriptions
  if (spec.tags) {
    for (const tag of spec.tags) {
      if (!tag.description) {
        warnings.push(`Tag "${tag.name}" missing description`);
      }
    }
  }

  // Check paths
  if (!spec.paths || Object.keys(spec.paths).length === 0) {
    warnings.push("No paths defined");
  }

  // Check components
  if (!spec.components) {
    warnings.push("No components defined");
  }

  if (warnings.length === 0) {
    console.log(colorize("✓ No warnings\n", "green"));
  } else {
    console.log(colorize(`⚠ ${warnings.length} warning(s):\n`, "yellow"));
    for (const warning of warnings) {
      console.log(colorize(`  • ${warning}`, "yellow"));
    }
    console.log();
  }

  return { valid: warnings.length === 0, warnings };
}

/**
 * Generate validation report
 */
function generateReport(
  schemaValid: boolean,
  refsValid: boolean,
  additionalValid: boolean,
  refErrors: string[],
  warnings: string[]
) {
  console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  Validation Report                                       ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  console.log(colorize("Schema Validation:  ", "dim") + (schemaValid ? colorize("✓ PASSED", "green") : colorize("✗ FAILED", "red")));
  console.log(colorize("Reference Check:    ", "dim") + (refsValid ? colorize("✓ PASSED", "green") : colorize("✗ FAILED", "red")));
  console.log(colorize("Additional Checks:  ", "dim") + (additionalValid ? colorize("✓ PASSED", "green") : colorize("⚠ WARNINGS", "yellow")));

  console.log();

  if (refErrors.length > 0) {
    console.log(colorize(`Broken References: ${refErrors.length}`, "red"));
  }

  if (warnings.length > 0) {
    console.log(colorize(`Warnings: ${warnings.length}`, "yellow"));
  }

  console.log();

  const overallValid = schemaValid && refsValid;

  if (overallValid && additionalValid) {
    console.log(colorize("🎉 Specification is fully valid!", "green"));
  } else if (overallValid) {
    console.log(colorize("✅ Specification is valid (with warnings)", "yellow"));
  } else {
    console.log(colorize("❌ Specification has errors", "red"));
  }

  console.log();

  return overallValid;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  const fileIdx = args.indexOf("--file");
  const specFile = fileIdx >= 0 && fileIdx + 1 < args.length ? args[fileIdx + 1] : DEFAULT_SPEC_FILE;
  const strict = args.includes("--strict");
  const skipCache = args.includes("--no-cache");

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI 3.1 Specification Validator                    ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  // Load spec
  if (!existsSync(specFile)) {
    console.error(colorize(`✗ File not found: ${specFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run validate", "cyan"));
    console.error(colorize("  bun run validate --file openapi-enhanced.json", "cyan"));
    console.error(colorize("  bun run validate --strict", "cyan"));
    console.error(colorize("  bun run validate --no-cache\n", "cyan"));
    process.exit(1);
  }

  console.log(colorize(`📖 Loading spec: ${specFile}\n`, "cyan"));
  const spec = JSON.parse(await readFile(specFile, "utf-8"));

  // Verify it's OpenAPI 3.x
  if (!spec.openapi || !spec.openapi.startsWith("3.")) {
    console.error(colorize("✗ Not an OpenAPI 3.x specification", "red"));
    console.error(colorize(`  Found version: ${spec.openapi || spec.swagger || "unknown"}`, "dim"));
    console.error(colorize("\n  This validator is for OpenAPI 3.x specs only.", "yellow"));
    console.error(colorize("  Use swagger-downloader.ts to convert Swagger 2.0 → OpenAPI 3.1\n", "yellow"));
    process.exit(1);
  }

  console.log(colorize(`✓ OpenAPI version: ${spec.openapi}\n`, "green"));

  // Load schema
  let schema: any;
  if (skipCache) {
    schema = await downloadSchema();
  } else {
    schema = await loadSchema();
  }

  // Validate against schema
  const schemaValid = await validateSpec(spec, schema, strict);

  // Validate references
  const { valid: refsValid, errors: refErrors } = validateReferences(spec);

  // Additional validation
  const { valid: additionalValid, warnings } = additionalValidation(spec);

  // Generate report
  const overallValid = generateReport(schemaValid, refsValid, additionalValid, refErrors, warnings);

  // Exit with appropriate code
  process.exit(overallValid ? 0 : 1);
}

main().catch((error) => {
  console.error(colorize("\n✗ Unexpected error:", "red"));
  console.error(colorize(error.message, "red"));
  if (error.stack) {
    console.error(colorize(error.stack, "dim"));
  }
  process.exit(1);
});
