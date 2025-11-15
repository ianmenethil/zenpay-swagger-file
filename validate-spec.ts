#!/usr/bin/env bun

/**
 * OpenAPI Specification Validator
 *
 * Validates OpenAPI 3.1 specs using Scalar's official parser.
 *
 * Features:
 * - Validates against official OpenAPI 3.1 schema
 * - Detailed error reporting
 * - Validates structure, required fields, types
 * - Checks references ($ref) integrity
 *
 * @example
 * bun run validate
 * bun run validate --file openapi-enhanced.json
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { validate, dereference } from "@scalar/openapi-parser";

// ============================================================================
// CONFIGURATION
// ============================================================================

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
// VALIDATION
// ============================================================================

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
  schemaErrors: any[],
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

  if (schemaErrors.length > 0) {
    console.log(colorize(`Schema Errors: ${schemaErrors.length}`, "red"));
  }

  if (refErrors.length > 0) {
    console.log(colorize(`Reference Errors: ${refErrors.length}`, "red"));
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

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI 3.1 Specification Validator (Scalar)           ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  // Load spec
  if (!existsSync(specFile)) {
    console.error(colorize(`✗ File not found: ${specFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run validate", "cyan"));
    console.error(colorize("  bun run validate --file openapi-enhanced.json\n", "cyan"));
    process.exit(1);
  }

  console.log(colorize(`📖 Loading spec: ${specFile}\n`, "cyan"));
  const specContent = await readFile(specFile, "utf-8");
  const spec = JSON.parse(specContent);

  // Verify it's OpenAPI 3.x
  if (!spec.openapi || !spec.openapi.startsWith("3.")) {
    console.error(colorize("✗ Not an OpenAPI 3.x specification", "red"));
    console.error(colorize(`  Found version: ${spec.openapi || spec.swagger || "unknown"}`, "dim"));
    console.error(colorize("\n  This validator is for OpenAPI 3.x specs only.", "yellow"));
    console.error(colorize("  Use swagger-downloader.ts to convert Swagger 2.0 → OpenAPI 3.1\n", "yellow"));
    process.exit(1);
  }

  console.log(colorize(`✓ OpenAPI version: ${spec.openapi}\n`, "green"));

  // Validate using Scalar
  console.log(colorize("🔍 Validating OpenAPI specification with Scalar...\n", "cyan"));

  const result = await validate(specContent);

  let schemaValid = result.valid;
  const schemaErrors: any[] = [];

  if (!result.valid) {
    console.log(colorize("❌ Schema validation failed!\n", "red"));

    if (result.errors && result.errors.length > 0) {
      console.log(colorize(`Found ${result.errors.length} error(s):\n`, "yellow"));

      for (const error of result.errors) {
        schemaErrors.push(error);

        const location = error.path || "unknown location";
        const message = error.message || "Unknown error";

        console.log(colorize(`  ✗ ${location}`, "red"));
        console.log(colorize(`    ${message}`, "dim"));
        console.log();
      }
    }
  } else {
    console.log(colorize("✅ Schema validation passed!", "green"));
    console.log(colorize("   Spec conforms to OpenAPI 3.1 standard\n", "dim"));
  }

  // Validate references using Scalar's dereference
  console.log(colorize("🔗 Validating $ref integrity with Scalar...\n", "cyan"));

  let refsValid = true;
  const refErrors: string[] = [];

  try {
    await dereference(specContent);
    console.log(colorize("✓ All references are valid and resolvable\n", "green"));
  } catch (error: any) {
    refsValid = false;
    console.log(colorize("✗ Reference validation failed!\n", "red"));

    const errorMsg = error.message || String(error);
    refErrors.push(errorMsg);

    console.log(colorize(`  ${errorMsg}`, "red"));
    console.log();
  }

  // Additional validation
  const { valid: additionalValid, warnings } = additionalValidation(spec);

  // Generate report
  const overallValid = generateReport(schemaValid, refsValid, additionalValid, schemaErrors, refErrors, warnings);

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
