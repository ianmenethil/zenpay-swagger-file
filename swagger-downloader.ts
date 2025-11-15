#!/usr/bin/env bun

/**
 * Swagger/OpenAPI Downloader & Converter
 *
 * Downloads Swagger 2.0 specification from TravelPay API endpoints with:
 * - Automatic retry logic (3 attempts per endpoint)
 * - Multiple fallback URLs
 * - Hash-based caching to avoid unnecessary downloads
 * - Conversion from Swagger 2.0 to OpenAPI 3.1 using Scalar
 * - Data integrity validation
 *
 * @example
 * bun run swagger-downloader.ts
 */

import { createHash } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { upgrade } from "@scalar/openapi-parser";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** API endpoints to try in order (with fallback) */
const API_ENDPOINTS = [
  "https://api.sandbox.travelpay.com.au/v2.0/help",
  "https://api.sandbox.b2bpay.com.au/v2.0/help",
  "https://apiuat.travelpay.com.au/v2.0/help",
] as const;

/** Maximum retry attempts per endpoint */
const MAX_RETRIES = 3;

/** Database file for caching metadata */
const DB_FILE = "db.json";

/** Output file for Swagger 2.0 spec */
const SWAGGER_FILE = "swagger.json";

/** Output file for OpenAPI 3.1 spec */
const OPENAPI_FILE = "openapi.json";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Cache database structure
 */
interface CacheDatabase {
  /** ISO 8601 timestamp of last successful download */
  lastDownload: string;
  /** SHA-256 hash of the spec content */
  hash: string;
  /** URL that was successfully fetched */
  sourceUrl: string;
  /** File size in bytes */
  size: number;
  /** Server's Last-Modified header if available */
  lastModified?: string;
  /** Server's ETag header if available */
  etag?: string;
}

/**
 * Validation result for data integrity check
 */
interface ValidationResult {
  /** Whether validation passed */
  success: boolean;
  /** Summary of findings */
  summary: {
    /** Total number of paths checked */
    paths: number;
    /** Total number of operations checked */
    operations: number;
    /** Total number of definitions/schemas checked */
    schemas: number;
  };
  /** Issues found during validation */
  issues: string[];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * ANSI color codes for terminal output
 */
const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

/**
 * Colorize text for terminal output
 *
 * @param text - Text to colorize
 * @param color - Color name
 * @returns Colored text
 */
function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Calculate SHA-256 hash of a string
 *
 * @param content - String content to hash
 * @returns Hex-encoded hash string
 */
function calculateHash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

/**
 * Load cache database from disk
 *
 * @returns Cached metadata or null if file doesn't exist
 */
async function loadCache(): Promise<CacheDatabase | null> {
  try {
    if (!existsSync(DB_FILE)) {
      return null;
    }
    const content = await readFile(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Save cache database to disk
 *
 * @param cache - Cache metadata to save
 */
async function saveCache(cache: CacheDatabase): Promise<void> {
  await writeFile(DB_FILE, JSON.stringify(cache, null, 2), "utf-8");
}

/**
 * Fetch content from URL with retry logic
 *
 * @param url - URL to fetch from
 * @param retries - Number of retry attempts remaining
 * @returns Response text content
 * @throws Error if all retries exhausted
 */
async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(colorize(`  → Attempt ${attempt}/${retries}: ${url}`, "cyan"));

      const response = await fetch(url, {
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);

      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts: ${errorMsg}`);
      }

      console.log(colorize(`  ⚠ Attempt ${attempt} failed: ${errorMsg}`, "yellow"));

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(colorize(`  ⏳ Waiting ${delay}ms before retry...`, "yellow"));
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached due to throw above, but TypeScript needs it
  throw new Error("Unexpected error in fetchWithRetry");
}

/**
 * Download spec from API endpoints with fallback logic
 *
 * @returns Object containing spec content and successful URL
 * @throws Error if all endpoints fail
 */
async function downloadSpec(): Promise<{ content: string; url: string }> {
  console.log(colorize("\n📥 Downloading API specification...\n", "green"));

  for (const url of API_ENDPOINTS) {
    try {
      const content = await fetchWithRetry(url);
      console.log(colorize(`✓ Successfully downloaded from: ${url}\n`, "green"));
      return { content, url };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.log(colorize(`✗ Failed to download from ${url}`, "red"));
      console.log(colorize(`  Error: ${errorMsg}\n`, "red"));
    }
  }

  throw new Error("All API endpoints failed. Please check network connectivity.");
}

/**
 * Check if cached spec is still valid
 *
 * @param content - Current spec content
 * @param cache - Cached metadata
 * @returns True if cache is valid (content unchanged)
 */
function isCacheValid(content: string, cache: CacheDatabase): boolean {
  const currentHash = calculateHash(content);
  return currentHash === cache.hash;
}

// ============================================================================
// CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert Swagger 2.0 to OpenAPI 3.1 specification using Scalar
 *
 * Uses @scalar/openapi-parser to handle conversion automatically.
 * Preserves all metadata including summaries, descriptions, examples, etc.
 *
 * @param swaggerContent - Swagger 2.0 specification as string
 * @returns OpenAPI 3.1 specification object
 */
async function convertToOpenAPI(swaggerContent: string): Promise<any> {
  console.log(colorize("\n🔄 Converting Swagger 2.0 → OpenAPI 3.1 (Scalar)...\n", "cyan"));

  try {
    // Scalar's upgrade function automatically converts Swagger 2.0 to OpenAPI 3.1
    const result = await upgrade(swaggerContent);

    // The result contains the converted OpenAPI spec
    const openapi = result.specification;

    console.log(colorize("✓ Conversion complete\n", "green"));
    return openapi;
  } catch (error) {
    console.error(colorize("✗ Conversion failed:", "red"));
    throw error;
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate data integrity after conversion
 *
 * Checks that no summaries, descriptions, examples, or other metadata was lost
 * during the Swagger 2.0 → OpenAPI 3.1 conversion.
 *
 * @param swagger - Original Swagger 2.0 spec
 * @param openapi - Converted OpenAPI 3.1 spec
 * @returns Validation result with detailed findings
 */
function validateConversion(swagger: any, openapi: any): ValidationResult {
  console.log(colorize("\n🔍 Validating data integrity...\n", "cyan"));

  const issues: string[] = [];
  let pathCount = 0;
  let operationCount = 0;
  let schemaCount = 0;

  // Check paths and operations
  if (swagger.paths) {
    for (const [path, pathItem] of Object.entries(swagger.paths as any)) {
      pathCount++;

      if (!openapi.paths[path]) {
        issues.push(`Missing path: ${path}`);
        continue;
      }

      for (const [method, operation] of Object.entries(pathItem as any)) {
        if (!["get", "put", "post", "delete", "options", "head", "patch", "trace"].includes(method)) {
          continue;
        }

        operationCount++;
        const openapiOp = openapi.paths[path][method];

        if (!openapiOp) {
          issues.push(`Missing operation: ${method.toUpperCase()} ${path}`);
          continue;
        }

        // Check summary
        if (operation.summary && !openapiOp.summary) {
          issues.push(`Lost summary in ${method.toUpperCase()} ${path}`);
        }

        // Check description
        if (operation.description && !openapiOp.description) {
          issues.push(`Lost description in ${method.toUpperCase()} ${path}`);
        }

        // Check operationId
        if (operation.operationId && !openapiOp.operationId) {
          issues.push(`Lost operationId in ${method.toUpperCase()} ${path}`);
        }

        // Check tags
        if (operation.tags && !openapiOp.tags) {
          issues.push(`Lost tags in ${method.toUpperCase()} ${path}`);
        }

        // Check deprecated flag
        if (operation.deprecated && !openapiOp.deprecated) {
          issues.push(`Lost deprecated flag in ${method.toUpperCase()} ${path}`);
        }

        // Check responses
        if (operation.responses) {
          for (const [statusCode, response] of Object.entries(operation.responses as any)) {
            const openapiResp = openapiOp.responses?.[statusCode];

            if (!openapiResp) {
              issues.push(`Lost response ${statusCode} in ${method.toUpperCase()} ${path}`);
              continue;
            }

            // Check response description
            if (response.description && !openapiResp.description) {
              issues.push(`Lost response description for ${statusCode} in ${method.toUpperCase()} ${path}`);
            }

            // Check examples
            if (response.examples) {
              const hasExamples = openapiResp.content &&
                Object.values(openapiResp.content as any).some((c: any) => c.example || c.examples);

              if (!hasExamples) {
                issues.push(`Lost examples for ${statusCode} in ${method.toUpperCase()} ${path}`);
              }
            }
          }
        }

        // Check parameters
        if (operation.parameters) {
          for (const param of operation.parameters) {
            if (param.in === "body" || param.in === "formData") {
              // These are converted to requestBody
              if (!openapiOp.requestBody) {
                issues.push(`Lost ${param.in} parameter "${param.name}" in ${method.toUpperCase()} ${path}`);
              }
            } else {
              // Path, query, header params should still be in parameters
              const found = openapiOp.parameters?.find((p: any) => p.name === param.name && p.in === param.in);
              if (!found) {
                issues.push(`Lost parameter "${param.name}" (${param.in}) in ${method.toUpperCase()} ${path}`);
              } else {
                // Check parameter description
                if (param.description && !found.description) {
                  issues.push(`Lost description for parameter "${param.name}" in ${method.toUpperCase()} ${path}`);
                }
              }
            }
          }
        }
      }
    }
  }

  // Check definitions/schemas
  if (swagger.definitions) {
    for (const [name, schema] of Object.entries(swagger.definitions as any)) {
      schemaCount++;

      if (!openapi.components?.schemas?.[name]) {
        issues.push(`Missing schema: ${name}`);
        continue;
      }

      const openapiSchema = openapi.components.schemas[name];

      // Check description
      if (schema.description && !openapiSchema.description) {
        issues.push(`Lost description in schema: ${name}`);
      }

      // Check example
      if (schema.example && !openapiSchema.example) {
        issues.push(`Lost example in schema: ${name}`);
      }

      // Check title
      if (schema.title && !openapiSchema.title) {
        issues.push(`Lost title in schema: ${name}`);
      }

      // Check property descriptions
      if (schema.properties && openapiSchema.properties) {
        for (const [propName, prop] of Object.entries(schema.properties as any)) {
          const openapiProp = openapiSchema.properties[propName];

          if (!openapiProp) {
            issues.push(`Lost property "${propName}" in schema: ${name}`);
          } else if (prop.description && !openapiProp.description) {
            issues.push(`Lost description for property "${propName}" in schema: ${name}`);
          }
        }
      }
    }
  }

  // Print validation results
  if (issues.length === 0) {
    console.log(colorize("✓ All data validated successfully!", "green"));
    console.log(colorize(`  • ${pathCount} paths`, "green"));
    console.log(colorize(`  • ${operationCount} operations`, "green"));
    console.log(colorize(`  • ${schemaCount} schemas\n`, "green"));
  } else {
    console.log(colorize(`⚠ Found ${issues.length} potential issue(s):\n`, "yellow"));
    for (const issue of issues) {
      console.log(colorize(`  • ${issue}`, "yellow"));
    }
    console.log();
  }

  return {
    success: issues.length === 0,
    summary: {
      paths: pathCount,
      operations: operationCount,
      schemas: schemaCount,
    },
    issues,
  };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

/**
 * Main execution function
 */
async function main(): Promise<void> {
  try {
    console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "green"));
    console.log(colorize("║  TravelPay API Specification Downloader & Converter     ║", "green"));
    console.log(colorize("║  (Powered by Scalar)                                     ║", "green"));
    console.log(colorize("╚══════════════════════════════════════════════════════════╝", "green"));

    // Load existing cache
    const cache = await loadCache();
    if (cache) {
      console.log(colorize("\n📦 Found existing cache:", "cyan"));
      console.log(colorize(`  • Last download: ${cache.lastDownload}`, "cyan"));
      console.log(colorize(`  • Source: ${cache.sourceUrl}`, "cyan"));
      console.log(colorize(`  • Size: ${cache.size.toLocaleString()} bytes`, "cyan"));
      console.log(colorize(`  • Hash: ${cache.hash.substring(0, 16)}...`, "cyan"));
    }

    // Download spec
    const { content, url } = await downloadSpec();
    const currentHash = calculateHash(content);

    // Check if cache is valid
    if (cache && cache.hash === currentHash) {
      console.log(colorize("\n✓ Cache hit! Spec unchanged, skipping download.\n", "green"));
      console.log(colorize(`Using cached version from ${cache.lastDownload}\n`, "cyan"));
      return;
    }

    // Save Swagger 2.0 spec
    await writeFile(SWAGGER_FILE, content, "utf-8");
    console.log(colorize(`✓ Saved Swagger 2.0 spec → ${SWAGGER_FILE}`, "green"));

    // Parse and convert using Scalar
    const swagger = JSON.parse(content);
    const openapi = await convertToOpenAPI(content);

    // Save OpenAPI 3.1 spec
    await writeFile(OPENAPI_FILE, JSON.stringify(openapi, null, 2), "utf-8");
    console.log(colorize(`✓ Saved OpenAPI 3.1 spec → ${OPENAPI_FILE}`, "green"));

    // Validate conversion
    const validation = validateConversion(swagger, openapi);

    // Update cache
    const newCache: CacheDatabase = {
      lastDownload: new Date().toISOString(),
      hash: currentHash,
      sourceUrl: url,
      size: content.length,
    };

    await saveCache(newCache);
    console.log(colorize(`✓ Updated cache → ${DB_FILE}\n`, "green"));

    // Summary
    console.log(colorize("╔══════════════════════════════════════════════════════════╗", "green"));
    console.log(colorize("║  Summary                                                 ║", "green"));
    console.log(colorize("╚══════════════════════════════════════════════════════════╝", "green"));
    console.log(colorize(`  Downloaded: ${content.length.toLocaleString()} bytes`, "cyan"));
    console.log(colorize(`  Paths: ${validation.summary.paths}`, "cyan"));
    console.log(colorize(`  Operations: ${validation.summary.operations}`, "cyan"));
    console.log(colorize(`  Schemas: ${validation.summary.schemas}`, "cyan"));
    console.log(colorize(`  Validation: ${validation.success ? colorize("✓ PASSED", "green") : colorize("⚠ WARNINGS", "yellow")}`, "cyan"));
    console.log();

  } catch (error) {
    console.error(colorize("\n✗ Error:", "red"));
    console.error(colorize(error instanceof Error ? error.message : String(error), "red"));
    console.error();
    process.exit(1);
  }
}

// Run main function
main();
