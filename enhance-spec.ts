#!/usr/bin/env bun

/**
 * OpenAPI Specification Enhancement Tool
 *
 * Automatically applies standardized language, descriptions, and examples
 * to OpenAPI specifications following the API Style Guide.
 *
 * Features:
 * - Detects endpoint patterns (GET by ID, POST create, LIST, etc.)
 * - Generates descriptions based on templates
 * - Adds missing examples with realistic data
 * - Preserves existing content (non-destructive)
 * - Creates enhanced spec for review before applying
 *
 * @example
 * bun run enhance-spec.ts --route payments --preview
 * bun run enhance-spec.ts --route payments --apply
 * bun run enhance-spec.ts --all --apply
 */

import { readFile, writeFile } from "fs/promises";

// ============================================================================
// CONFIGURATION
// ============================================================================

const OPENAPI_FILE = "openapi.json";
const ENHANCED_FILE = "openapi-enhanced.json";

// ============================================================================
// TEMPLATES & PATTERNS
// ============================================================================

/**
 * Resource name mappings for consistent terminology
 */
const RESOURCE_NAMES: Record<string, { singular: string; plural: string }> = {
  payments: { singular: "payment", plural: "payments" },
  customers: { singular: "customer", plural: "customers" },
  sessions: { singular: "session", plural: "sessions" },
  preauths: { singular: "pre-authorization", plural: "pre-authorizations" },
  cardproxies: { singular: "card proxy", plural: "card proxies" },
  proxies: { singular: "payment proxy", plural: "payment proxies" },
  batchpayments: { singular: "batch payment", plural: "batch payments" },
  requestpays: { singular: "request pay", plural: "request pays" },
  diagnostics: { singular: "diagnostic", plural: "diagnostics" },
};

/**
 * Endpoint pattern detection
 */
interface EndpointPattern {
  type: "get-by-id" | "get-collection" | "post-create" | "post-action" | "put-update" | "patch-update" | "delete" | "unknown";
  resource: string;
  identifier?: string;
  subResource?: string;
}

/**
 * Detect endpoint pattern from path and method
 */
function detectPattern(path: string, method: string): EndpointPattern {
  const segments = path.split("/").filter((s) => s);

  // Extract route group (e.g., "payments" from "/v2/payments/{id}")
  const routeGroup = segments[1] || "unknown";
  const resourceInfo = RESOURCE_NAMES[routeGroup] || {
    singular: routeGroup,
    plural: routeGroup,
  };

  // Detect pattern
  const hasPathParam = path.includes("{");
  const segmentCount = segments.length;

  if (method === "get") {
    if (hasPathParam) {
      // Check if it's a sub-resource collection
      if (segmentCount > 3) {
        const subResource = segments[segments.length - 1];
        return {
          type: "get-collection",
          resource: resourceInfo.singular,
          subResource: subResource,
        };
      }
      return {
        type: "get-by-id",
        resource: resourceInfo.singular,
        identifier: path.match(/\{([^}]+)\}/)?.[1] || "id",
      };
    } else {
      return {
        type: "get-collection",
        resource: resourceInfo.singular,
      };
    }
  } else if (method === "post") {
    if (hasPathParam) {
      // POST to a resource with ID is usually an action
      const subResource = segments[segments.length - 1];
      return {
        type: "post-action",
        resource: resourceInfo.singular,
        subResource: subResource,
      };
    } else {
      return {
        type: "post-create",
        resource: resourceInfo.singular,
      };
    }
  } else if (method === "put") {
    return {
      type: "put-update",
      resource: resourceInfo.singular,
      identifier: path.match(/\{([^}]+)\}/)?.[1] || "id",
    };
  } else if (method === "patch") {
    return {
      type: "patch-update",
      resource: resourceInfo.singular,
      identifier: path.match(/\{([^}]+)\}/)?.[1] || "id",
    };
  } else if (method === "delete") {
    return {
      type: "delete",
      resource: resourceInfo.singular,
      identifier: path.match(/\{([^}]+)\}/)?.[1] || "id",
    };
  }

  return { type: "unknown", resource: resourceInfo.singular };
}

/**
 * Generate summary based on pattern
 */
function generateSummary(pattern: EndpointPattern, existingSummary?: string): string | null {
  // Don't override good existing summaries
  if (existingSummary && existingSummary.length > 20) {
    return null;
  }

  const { type, resource, identifier, subResource } = pattern;

  switch (type) {
    case "get-by-id":
      return `Retrieve ${resource} by ${identifier || "identifier"}`;

    case "get-collection":
      if (subResource) {
        return `List all ${subResource} for ${resource}`;
      }
      return `List all ${resource}s`;

    case "post-create":
      return `Create a new ${resource}`;

    case "post-action":
      if (subResource === "captures") {
        return `Capture ${resource} for settlement`;
      } else if (subResource === "voids") {
        return `Void ${resource} before settlement`;
      } else if (subResource === "refundrequests" || subResource === "refunds") {
        return `Create refund request for ${resource}`;
      }
      return `Process ${subResource} for ${resource}`;

    case "put-update":
      return `Update ${resource} with new details`;

    case "patch-update":
      return `Update ${resource} fields`;

    case "delete":
      return `Delete ${resource} by ${identifier || "identifier"}`;

    default:
      return null;
  }
}

/**
 * Generate description based on pattern
 */
function generateDescription(
  pattern: EndpointPattern,
  existingDescription?: string
): string | null {
  // Don't override good existing descriptions
  if (existingDescription && existingDescription.length > 50) {
    return null;
  }

  const { type, resource, identifier, subResource } = pattern;

  switch (type) {
    case "get-by-id":
      return `Retrieves complete ${resource} details including all associated metadata and current status.\n\nThe ${identifier || "identifier"} is a unique identifier assigned when the ${resource} was created. Returns a 404 error if the ${identifier || "identifier"} is not found or does not belong to your merchant account.`;

    case "get-collection":
      if (subResource) {
        return `Retrieves a list of all ${subResource} associated with the specified ${resource}.\n\nResults are returned in descending order by creation date. Returns an empty array if no ${subResource} are found.`;
      }
      return `Retrieves a paginated list of ${resource}s for your merchant account.\n\nResults are ordered by creation date in descending order. Use pagination parameters to navigate through large result sets.`;

    case "post-create":
      return `Creates a new ${resource} with the provided details.\n\nAll required fields must be provided in the request body. Upon successful creation, the ${resource} is immediately available for use and a unique identifier is returned.`;

    case "post-action":
      if (subResource === "captures") {
        return `Captures a previously authorized ${resource} for settlement.\n\nThe capture amount can be less than or equal to the original authorization amount. Once captured, the funds will be transferred during the next settlement cycle.`;
      } else if (subResource === "voids") {
        return `Voids a ${resource} before it has been settled.\n\nVoiding a ${resource} cancels the authorization and releases the hold on the customer's payment method. A ${resource} can only be voided before settlement occurs.`;
      } else if (subResource === "refundrequests" || subResource === "refunds") {
        return `Creates a refund request for a previously completed ${resource}.\n\nRefunds can be for the full amount or a partial amount. The refund is processed asynchronously and the status can be checked using the refund request identifier returned in the response.`;
      }
      return `Processes ${subResource} for the specified ${resource}.\n\nThe operation is executed immediately and returns the result status. Check the response for any errors or validation issues.`;

    case "put-update":
      return `Updates the ${resource} with the provided details, replacing all fields.\n\nAll fields must be provided in the request, even if unchanged. Missing fields will be set to null or default values.`;

    case "patch-update":
      return `Updates specific fields of the ${resource}.\n\nOnly the provided fields will be updated. Omitted fields remain unchanged. At least one field must be provided in the request.`;

    case "delete":
      return `Deletes the ${resource} identified by ${identifier || "identifier"}.\n\nThis operation is permanent and cannot be undone. Returns a 404 error if the ${resource} is not found. Some ${resource}s may not be deletable due to business rules or compliance requirements.`;

    default:
      return null;
  }
}

/**
 * Generate parameter description
 */
function generateParameterDescription(
  paramName: string,
  paramLocation: string,
  resource: string
): string {
  // Common parameter patterns
  if (paramName.toLowerCase().includes("reference") || paramName.toLowerCase().includes("id")) {
    return `Unique ${resource} identifier. Format: Alphanumeric string.`;
  }

  if (paramName.toLowerCase().includes("status")) {
    return `Filter by ${resource} status. Comma-separated list of statuses.`;
  }

  if (paramName.toLowerCase().includes("page")) {
    if (paramName.toLowerCase().includes("size")) {
      return `Number of results to return per page. Valid range: 1-100. Defaults to 20.`;
    }
    return `Page number to retrieve. Starts at 1. Defaults to 1.`;
  }

  if (paramName.toLowerCase().includes("from") || paramName.toLowerCase().includes("start")) {
    return `Filter ${resource}s created/updated on or after this date. Format: ISO 8601 (YYYY-MM-DD).`;
  }

  if (paramName.toLowerCase().includes("to") || paramName.toLowerCase().includes("end")) {
    return `Filter ${resource}s created/updated on or before this date. Format: ISO 8601 (YYYY-MM-DD).`;
  }

  // Generic fallback
  return `${paramName} parameter for ${resource} operation.`;
}

/**
 * Generate example value for parameter
 */
function generateParameterExample(paramName: string, paramType: string, resource: string): any {
  // Reference/ID patterns
  if (paramName.toLowerCase().includes("reference")) {
    if (resource === "payment") return "PAY-20241115-ABC123";
    if (resource === "customer") return "CUST-2024-001";
    if (resource === "session") return "SESSION-20241115-XYZ789";
    if (resource === "preauth") return "AUTH-20241115-DEF456";
    return `REF-${Date.now()}`;
  }

  if (paramName.toLowerCase().includes("id")) {
    return `${resource.toUpperCase()}-123456`;
  }

  // Status
  if (paramName.toLowerCase().includes("status")) {
    return "successful,pending";
  }

  // Pagination
  if (paramName.toLowerCase().includes("page")) {
    if (paramName.toLowerCase().includes("size")) return 20;
    return 1;
  }

  // Dates
  if (paramName.toLowerCase().includes("date") || paramName.toLowerCase().includes("from") || paramName.toLowerCase().includes("to")) {
    return "2024-11-15";
  }

  // Type-based fallback
  if (paramType === "integer" || paramType === "number") return 1;
  if (paramType === "boolean") return true;

  return "example-value";
}

/**
 * Generate response description
 */
function generateResponseDescription(statusCode: string, pattern: EndpointPattern): string {
  const { resource, type } = pattern;

  switch (statusCode) {
    case "200":
      if (type === "get-by-id") {
        return `Successfully retrieved ${resource} details.`;
      } else if (type === "get-collection") {
        return `Successfully retrieved ${resource} list.`;
      } else if (type === "put-update" || type === "patch-update") {
        return `Successfully updated ${resource}.`;
      }
      return `Request completed successfully.`;

    case "201":
      return `Successfully created ${resource}. Returns the new ${resource} details with assigned identifiers.`;

    case "204":
      return `Successfully deleted ${resource}. No content returned.`;

    case "400":
      return `Invalid request. The request body contains validation errors or missing required fields.`;

    case "401":
      return `Authentication failed. API key is missing or invalid.`;

    case "403":
      return `Forbidden. The API key does not have permission to access this resource.`;

    case "404":
      return `${capitalizeFirst(resource)} not found. The specified identifier does not exist or does not belong to your merchant account.`;

    case "409":
      return `Conflict. A ${resource} with this identifier already exists.`;

    case "422":
      return `Unprocessable entity. The request is valid but cannot be processed due to business rule constraints.`;

    case "500":
      return `Internal server error. An unexpected error occurred. Please contact support if this persists.`;

    default:
      return `Response status ${statusCode}.`;
  }
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================================================
// ENHANCEMENT LOGIC
// ============================================================================

/**
 * Enhance a single operation
 */
function enhanceOperation(
  path: string,
  method: string,
  operation: any
): { enhanced: any; changes: string[] } {
  const changes: string[] = [];
  const enhanced = { ...operation };
  const pattern = detectPattern(path, method);

  // Enhance summary
  if (!enhanced.summary || enhanced.summary.length < 20) {
    const newSummary = generateSummary(pattern, enhanced.summary);
    if (newSummary) {
      enhanced.summary = newSummary;
      changes.push(`Added summary: "${newSummary}"`);
    }
  }

  // Enhance description
  if (!enhanced.description || enhanced.description.length < 50) {
    const newDescription = generateDescription(pattern, enhanced.description);
    if (newDescription) {
      enhanced.description = newDescription;
      changes.push(`Added description (${newDescription.length} chars)`);
    }
  }

  // Enhance parameters
  if (enhanced.parameters) {
    enhanced.parameters = enhanced.parameters.map((param: any) => {
      const enhancedParam = { ...param };

      // Add description if missing
      if (!enhancedParam.description || enhancedParam.description.length < 10) {
        enhancedParam.description = generateParameterDescription(
          param.name,
          param.in,
          pattern.resource
        );
        changes.push(`Added description for parameter "${param.name}"`);
      }

      // Add example if missing
      if (!enhancedParam.example && !enhancedParam.examples) {
        enhancedParam.example = generateParameterExample(
          param.name,
          param.schema?.type || param.type,
          pattern.resource
        );
        changes.push(`Added example for parameter "${param.name}"`);
      }

      return enhancedParam;
    });
  }

  // Enhance request body description
  if (enhanced.requestBody && (!enhanced.requestBody.description || enhanced.requestBody.description.length < 20)) {
    if (pattern.type === "post-create") {
      enhanced.requestBody.description = `${capitalizeFirst(pattern.resource)} creation object containing required and optional fields.\n\nAll required fields must be provided. The ${pattern.resource} is created immediately upon successful validation.`;
      changes.push(`Added request body description`);
    } else if (pattern.type === "put-update" || pattern.type === "patch-update") {
      enhanced.requestBody.description = `${capitalizeFirst(pattern.resource)} update object containing fields to modify.\n\nOnly provided fields will be updated. Omitted fields remain unchanged.`;
      changes.push(`Added request body description`);
    }
  }

  // Enhance responses
  if (enhanced.responses) {
    for (const [statusCode, response] of Object.entries(enhanced.responses as Record<string, any>)) {
      if (!response.description || response.description.length < 10) {
        response.description = generateResponseDescription(statusCode, pattern);
        changes.push(`Added description for response ${statusCode}`);
      }
    }
  }

  return { enhanced, changes };
}

/**
 * Enhance entire specification
 */
function enhanceSpec(spec: any, routeFilter?: string): { enhanced: any; summary: any } {
  const enhanced = JSON.parse(JSON.stringify(spec)); // Deep clone
  const summary = {
    totalEndpoints: 0,
    enhancedEndpoints: 0,
    totalChanges: 0,
    changesByType: {} as Record<string, number>,
  };

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    // Filter by route if specified
    if (routeFilter) {
      const routeGroup = path.split("/")[2]; // Extract route from /v2/payments/...
      if (routeGroup !== routeFilter) {
        continue;
      }
    }

    for (const [method, operation] of Object.entries(pathItem as any)) {
      if (!["get", "post", "put", "patch", "delete", "options", "head", "trace"].includes(method)) {
        continue;
      }

      summary.totalEndpoints++;

      const { enhanced: enhancedOp, changes } = enhanceOperation(path, method, operation);

      if (changes.length > 0) {
        summary.enhancedEndpoints++;
        summary.totalChanges += changes.length;

        // Track changes by type
        for (const change of changes) {
          const changeType = change.split(":")[0];
          summary.changesByType[changeType] = (summary.changesByType[changeType] || 0) + 1;
        }

        enhanced.paths[path][method] = enhancedOp;

        console.log(`\n${method.toUpperCase()} ${path}:`);
        for (const change of changes) {
          console.log(`  ✓ ${change}`);
        }
      }
    }
  }

  return { enhanced, summary };
}

// ============================================================================
// CLI
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  bold: "\x1b[1m",
};

function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

async function main() {
  const args = process.argv.slice(2);
  const routeIndex = args.indexOf("--route");
  const route = routeIndex >= 0 ? args[routeIndex + 1] : undefined;
  const apply = args.includes("--apply");
  const all = args.includes("--all");

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "green"));
  console.log(colorize("║  OpenAPI Specification Enhancement Tool                 ║", "green"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "green"));

  if (!apply && !all && !route) {
    console.log(colorize("Usage:", "yellow"));
    console.log(colorize("  bun run enhance-spec.ts --route <route> --preview", "cyan"));
    console.log(colorize("  bun run enhance-spec.ts --route <route> --apply", "cyan"));
    console.log(colorize("  bun run enhance-spec.ts --all --apply\n", "cyan"));
    console.log(colorize("Options:", "yellow"));
    console.log(colorize("  --route <name>   Enhance specific route (e.g., payments, customers)", "cyan"));
    console.log(colorize("  --all            Enhance all routes", "cyan"));
    console.log(colorize("  --apply          Apply changes (default: preview only)\n", "cyan"));
    process.exit(0);
  }

  // Load spec
  console.log(colorize("📖 Loading OpenAPI specification...\n", "cyan"));
  const spec = JSON.parse(await readFile(OPENAPI_FILE, "utf-8"));

  // Enhance
  console.log(colorize(`🔧 Enhancing ${route || "all routes"}...\n`, "yellow"));
  const { enhanced, summary } = enhanceSpec(spec, all ? undefined : route);

  // Summary
  console.log(colorize("\n\n╔══════════════════════════════════════════════════════════╗", "green"));
  console.log(colorize("║  Enhancement Summary                                     ║", "green"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "green"));

  console.log(colorize(`Total Endpoints: ${summary.totalEndpoints}`, "cyan"));
  console.log(colorize(`Enhanced Endpoints: ${summary.enhancedEndpoints}`, "green"));
  console.log(colorize(`Total Changes: ${summary.totalChanges}\n`, "green"));

  if (Object.keys(summary.changesByType).length > 0) {
    console.log(colorize("Changes by Type:", "yellow"));
    for (const [type, count] of Object.entries(summary.changesByType)) {
      console.log(colorize(`  • ${type}: ${count}`, "cyan"));
    }
    console.log();
  }

  if (apply) {
    // Write enhanced spec
    await writeFile(OPENAPI_FILE, JSON.stringify(enhanced, null, 2), "utf-8");
    console.log(colorize(`✅ Changes applied to ${OPENAPI_FILE}\n`, "green"));
  } else {
    // Write preview
    await writeFile(ENHANCED_FILE, JSON.stringify(enhanced, null, 2), "utf-8");
    console.log(colorize(`📝 Preview saved to ${ENHANCED_FILE}`, "yellow"));
    console.log(colorize(`   Review the changes, then run with --apply to apply them.\n`, "yellow"));
  }
}

main().catch((error) => {
  console.error(colorize("\n✗ Error:", "red"));
  console.error(colorize(error.message, "red"));
  process.exit(1);
});
