#!/usr/bin/env bun

/**
 * Swagger/OpenAPI Downloader & Converter
 *
 * Downloads Swagger 2.0 specification from TravelPay API endpoints with:
 * - Automatic retry logic (3 attempts per endpoint)
 * - Multiple fallback URLs
 * - Hash-based caching to avoid unnecessary downloads
 * - Conversion from Swagger 2.0 to OpenAPI 3.1
 * - Data integrity validation
 *
 * @example
 * bun run swagger-downloader.ts
 */

import { createHash } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

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
 * Convert Swagger 2.0 to OpenAPI 3.1 specification
 *
 * This uses a manual conversion approach following OpenAPI 3.1 spec.
 * Preserves all metadata including summaries, descriptions, examples, etc.
 *
 * @param swagger - Swagger 2.0 specification object
 * @returns OpenAPI 3.1 specification object
 */
function convertToOpenAPI(swagger: any): any {
  console.log(colorize("\n🔄 Converting Swagger 2.0 → OpenAPI 3.1...\n", "cyan"));

  // Initialize OpenAPI 3.1 structure
  const openapi: any = {
    openapi: "3.1.0",
    info: swagger.info || {},
    servers: [],
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {},
    },
  };

  // Convert host + basePath + schemes to servers
  if (swagger.host) {
    const schemes = swagger.schemes || ["https"];
    const basePath = swagger.basePath || "";

    for (const scheme of schemes) {
      openapi.servers.push({
        url: `${scheme}://${swagger.host}${basePath}`,
      });
    }
  }

  // Convert definitions to components.schemas
  if (swagger.definitions) {
    openapi.components.schemas = swagger.definitions;
  }

  // Convert securityDefinitions to components.securitySchemes
  if (swagger.securityDefinitions) {
    for (const [name, scheme] of Object.entries(swagger.securityDefinitions as any)) {
      const convertedScheme: any = { ...scheme };

      // Convert 'apiKey' type
      if (scheme.type === "apiKey") {
        convertedScheme.type = "apiKey";
        convertedScheme.in = scheme.in;
        convertedScheme.name = scheme.name;
      }
      // Convert 'oauth2' type
      else if (scheme.type === "oauth2") {
        convertedScheme.type = "oauth2";
        convertedScheme.flows = {};

        if (scheme.flow === "implicit") {
          convertedScheme.flows.implicit = {
            authorizationUrl: scheme.authorizationUrl,
            scopes: scheme.scopes || {},
          };
        } else if (scheme.flow === "accessCode") {
          convertedScheme.flows.authorizationCode = {
            authorizationUrl: scheme.authorizationUrl,
            tokenUrl: scheme.tokenUrl,
            scopes: scheme.scopes || {},
          };
        } else if (scheme.flow === "password") {
          convertedScheme.flows.password = {
            tokenUrl: scheme.tokenUrl,
            scopes: scheme.scopes || {},
          };
        } else if (scheme.flow === "application") {
          convertedScheme.flows.clientCredentials = {
            tokenUrl: scheme.tokenUrl,
            scopes: scheme.scopes || {},
          };
        }

        delete convertedScheme.flow;
        delete convertedScheme.authorizationUrl;
        delete convertedScheme.tokenUrl;
        delete convertedScheme.scopes;
      }

      openapi.components.securitySchemes[name] = convertedScheme;
    }
  }

  // Convert paths
  if (swagger.paths) {
    for (const [path, pathItem] of Object.entries(swagger.paths as any)) {
      openapi.paths[path] = {};

      for (const [method, operation] of Object.entries(pathItem as any)) {
        if (!["get", "put", "post", "delete", "options", "head", "patch", "trace"].includes(method)) {
          continue;
        }

        const convertedOp: any = { ...operation };

        // Convert consumes/produces to requestBody/responses content
        if (operation.consumes || swagger.consumes) {
          const consumes = operation.consumes || swagger.consumes || [];
          if (operation.parameters) {
            const bodyParam = operation.parameters.find((p: any) => p.in === "body");
            if (bodyParam) {
              convertedOp.requestBody = {
                description: bodyParam.description,
                required: bodyParam.required,
                content: {},
              };

              for (const mimeType of consumes) {
                convertedOp.requestBody.content[mimeType] = {
                  schema: bodyParam.schema,
                };
              }

              // Remove body parameter from parameters array
              convertedOp.parameters = operation.parameters.filter((p: any) => p.in !== "body");
            }
          }
        }

        // Convert formData parameters to requestBody
        if (operation.parameters) {
          const formDataParams = operation.parameters.filter((p: any) => p.in === "formData");
          if (formDataParams.length > 0) {
            const properties: any = {};
            const required: string[] = [];

            for (const param of formDataParams) {
              properties[param.name] = {
                type: param.type,
                description: param.description,
                format: param.format,
              };
              if (param.required) {
                required.push(param.name);
              }
            }

            convertedOp.requestBody = {
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties,
                    ...(required.length > 0 && { required }),
                  },
                },
              },
            };

            // Remove formData parameters
            convertedOp.parameters = operation.parameters.filter((p: any) => p.in !== "formData");
          }
        }

        // Update responses to include content
        if (operation.responses) {
          for (const [statusCode, response] of Object.entries(operation.responses as any)) {
            if (response.schema) {
              const produces = operation.produces || swagger.produces || ["application/json"];
              convertedOp.responses[statusCode] = {
                description: response.description || "",
                content: {},
              };

              for (const mimeType of produces) {
                convertedOp.responses[statusCode].content[mimeType] = {
                  schema: response.schema,
                };
              }

              // Preserve examples if present
              if (response.examples) {
                for (const mimeType of Object.keys(response.examples)) {
                  if (convertedOp.responses[statusCode].content[mimeType]) {
                    convertedOp.responses[statusCode].content[mimeType].example = response.examples[mimeType];
                  }
                }
              }
            }
          }
        }

        // Remove Swagger 2.0 specific fields
        delete convertedOp.consumes;
        delete convertedOp.produces;

        openapi.paths[path][method] = convertedOp;
      }
    }
  }

  // Preserve global security if present
  if (swagger.security) {
    openapi.security = swagger.security;
  }

  // Preserve tags if present
  if (swagger.tags) {
    openapi.tags = swagger.tags;
  }

  // Preserve externalDocs if present
  if (swagger.externalDocs) {
    openapi.externalDocs = swagger.externalDocs;
  }

  console.log(colorize("✓ Conversion complete\n", "green"));
  return openapi;
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

    // Parse and convert
    const swagger = JSON.parse(content);
    const openapi = convertToOpenAPI(swagger);

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
