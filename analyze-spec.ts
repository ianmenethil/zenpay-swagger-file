#!/usr/bin/env bun

/**
 * OpenAPI Specification Analyzer & Reporter
 *
 * Splits OpenAPI spec by route groups and generates detailed quality reports
 * for each route, checking for:
 * - Examples, descriptions, summaries
 * - OpenAPI best practices
 * - Language standardization
 * - Missing or confusing documentation
 *
 * @example
 * bun run analyze-spec.ts
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Input OpenAPI specification file */
const OPENAPI_FILE = "openapi.json";

/** Output directory for split specs */
const SPLIT_DIR = "split-specs";

/** Output directory for analysis reports */
const REPORTS_DIR = "reports";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Quality issue found in the spec
 */
interface QualityIssue {
  /** Severity level */
  severity: "critical" | "warning" | "info";
  /** Issue category */
  category: string;
  /** Affected endpoint or schema */
  location: string;
  /** Description of the issue */
  message: string;
  /** Suggested fix */
  suggestion?: string;
}

/**
 * Analysis result for a route group
 */
interface RouteAnalysis {
  /** Route group name */
  routeName: string;
  /** Number of endpoints */
  endpointCount: number;
  /** Total operations */
  operationCount: number;
  /** Quality issues found */
  issues: QualityIssue[];
  /** Quality score (0-100) */
  score: number;
  /** Endpoints in this route */
  endpoints: EndpointAnalysis[];
}

/**
 * Analysis result for a single endpoint
 */
interface EndpointAnalysis {
  /** HTTP method */
  method: string;
  /** Path */
  path: string;
  /** Operation ID */
  operationId?: string;
  /** Has summary */
  hasSummary: boolean;
  /** Has description */
  hasDescription: boolean;
  /** Has examples */
  hasExamples: boolean;
  /** Has request body examples */
  hasRequestExamples: boolean;
  /** Has response examples */
  hasResponseExamples: boolean;
  /** Number of parameters */
  parameterCount: number;
  /** Parameters with descriptions */
  parametersWithDescriptions: number;
  /** Issues specific to this endpoint */
  issues: QualityIssue[];
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
  bold: "\x1b[1m",
};

/**
 * Colorize text for terminal output
 */
function colorize(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Extract route group from path
 *
 * @param path - API path like "/v2/payments/{id}"
 * @returns Route group name like "payments"
 */
function extractRouteGroup(path: string): string {
  const match = path.match(/^\/v2\/([^/]+)/);
  return match ? match[1] : "unknown";
}

/**
 * Check if an object has examples
 */
function hasExamples(obj: any): boolean {
  if (!obj) return false;
  if (obj.example) return true;
  if (obj.examples) return true;
  if (obj.content) {
    return Object.values(obj.content).some((c: any) => c.example || c.examples);
  }
  return false;
}

// ============================================================================
// ANALYSIS FUNCTIONS
// ============================================================================

/**
 * Analyze a single endpoint operation
 */
function analyzeEndpoint(
  path: string,
  method: string,
  operation: any
): EndpointAnalysis {
  const issues: QualityIssue[] = [];
  const location = `${method.toUpperCase()} ${path}`;

  // Check summary
  const hasSummary = !!operation.summary;
  if (!hasSummary) {
    issues.push({
      severity: "critical",
      category: "Documentation",
      location,
      message: "Missing summary",
      suggestion: "Add a concise summary describing what this endpoint does",
    });
  }

  // Check description
  const hasDescription = !!operation.description;
  if (!hasDescription) {
    issues.push({
      severity: "warning",
      category: "Documentation",
      location,
      message: "Missing description",
      suggestion: "Add a detailed description explaining the endpoint's purpose, behavior, and usage",
    });
  }

  // Check operationId
  if (!operation.operationId) {
    issues.push({
      severity: "warning",
      category: "OpenAPI Best Practice",
      location,
      message: "Missing operationId",
      suggestion: "Add a unique operationId for SDK generation and API tooling",
    });
  }

  // Check tags
  if (!operation.tags || operation.tags.length === 0) {
    issues.push({
      severity: "info",
      category: "Organization",
      location,
      message: "Missing tags",
      suggestion: "Add tags to group related operations",
    });
  }

  // Analyze parameters
  const parameters = operation.parameters || [];
  const parameterCount = parameters.length;
  let parametersWithDescriptions = 0;

  for (const param of parameters) {
    if (param.description) {
      parametersWithDescriptions++;
    } else {
      issues.push({
        severity: "warning",
        category: "Documentation",
        location: `${location} - parameter "${param.name}"`,
        message: `Parameter "${param.name}" missing description`,
        suggestion: "Add a description explaining the parameter's purpose and expected values",
      });
    }

    // Check for examples in parameters
    if (!param.example && !param.examples) {
      issues.push({
        severity: "info",
        category: "Examples",
        location: `${location} - parameter "${param.name}"`,
        message: `Parameter "${param.name}" missing example`,
        suggestion: "Add an example value to help API consumers",
      });
    }
  }

  // Check request body
  let hasRequestExamples = false;
  if (operation.requestBody) {
    if (!operation.requestBody.description) {
      issues.push({
        severity: "warning",
        category: "Documentation",
        location: `${location} - request body`,
        message: "Request body missing description",
        suggestion: "Add a description explaining the request body structure",
      });
    }

    hasRequestExamples = hasExamples(operation.requestBody);
    if (!hasRequestExamples) {
      issues.push({
        severity: "warning",
        category: "Examples",
        location: `${location} - request body`,
        message: "Request body missing examples",
        suggestion: "Add example request bodies to help developers understand the expected format",
      });
    }
  }

  // Check responses
  let hasResponseExamples = false;
  if (operation.responses) {
    for (const [statusCode, response] of Object.entries(operation.responses as any)) {
      if (!response.description) {
        issues.push({
          severity: "warning",
          category: "Documentation",
          location: `${location} - response ${statusCode}`,
          message: `Response ${statusCode} missing description`,
          suggestion: "Add a description explaining what this response means",
        });
      }

      if (hasExamples(response)) {
        hasResponseExamples = true;
      }
    }

    if (!hasResponseExamples) {
      issues.push({
        severity: "warning",
        category: "Examples",
        location: `${location} - responses`,
        message: "No response examples provided",
        suggestion: "Add example responses to show the expected response structure",
      });
    }
  }

  const hasExamplesAny = hasRequestExamples || hasResponseExamples;

  return {
    method,
    path,
    operationId: operation.operationId,
    hasSummary,
    hasDescription,
    hasExamples: hasExamplesAny,
    hasRequestExamples,
    hasResponseExamples,
    parameterCount,
    parametersWithDescriptions,
    issues,
  };
}

/**
 * Analyze a route group
 */
function analyzeRouteGroup(
  routeName: string,
  paths: Record<string, any>
): RouteAnalysis {
  const endpoints: EndpointAnalysis[] = [];
  const allIssues: QualityIssue[] = [];

  for (const [path, pathItem] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!["get", "post", "put", "patch", "delete", "options", "head", "trace"].includes(method)) {
        continue;
      }

      const endpointAnalysis = analyzeEndpoint(path, method, operation);
      endpoints.push(endpointAnalysis);
      allIssues.push(...endpointAnalysis.issues);
    }
  }

  // Calculate quality score
  const totalChecks = endpoints.reduce((sum, e) => {
    return sum + 3 + e.parameterCount * 2; // summary, description, examples + param checks
  }, 0);

  const criticalIssues = allIssues.filter((i) => i.severity === "critical").length;
  const warningIssues = allIssues.filter((i) => i.severity === "warning").length;
  const infoIssues = allIssues.filter((i) => i.severity === "info").length;

  // Score calculation: critical = -5, warning = -2, info = -0.5
  const deductions = criticalIssues * 5 + warningIssues * 2 + infoIssues * 0.5;
  const score = Math.max(0, Math.min(100, 100 - (deductions / totalChecks) * 100));

  return {
    routeName,
    endpointCount: Object.keys(paths).length,
    operationCount: endpoints.length,
    issues: allIssues,
    score: Math.round(score),
    endpoints,
  };
}

// ============================================================================
// REPORT GENERATION
// ============================================================================

/**
 * Generate markdown report for a route group
 */
function generateMarkdownReport(analysis: RouteAnalysis): string {
  const { routeName, endpointCount, operationCount, issues, score, endpoints } = analysis;

  const criticalCount = issues.filter((i) => i.severity === "critical").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const infoCount = issues.filter((i) => i.severity === "info").length;

  let md = `# API Quality Report: ${routeName}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `---\n\n`;

  // Summary
  md += `## Summary\n\n`;
  md += `- **Route Group:** \`/v2/${routeName}\`\n`;
  md += `- **Endpoints:** ${endpointCount}\n`;
  md += `- **Operations:** ${operationCount}\n`;
  md += `- **Quality Score:** ${score}/100 `;

  if (score >= 90) md += `✅ Excellent\n`;
  else if (score >= 75) md += `🟢 Good\n`;
  else if (score >= 60) md += `🟡 Fair\n`;
  else md += `🔴 Needs Improvement\n`;

  md += `\n`;

  // Issue summary
  md += `### Issues Found\n\n`;
  md += `- 🔴 **Critical:** ${criticalCount}\n`;
  md += `- 🟡 **Warning:** ${warningCount}\n`;
  md += `- ℹ️ **Info:** ${infoCount}\n`;
  md += `- **Total:** ${issues.length}\n\n`;

  md += `---\n\n`;

  // Endpoints overview
  md += `## Endpoints Overview\n\n`;
  md += `| Method | Path | Summary | Description | Examples | Issues |\n`;
  md += `|--------|------|---------|-------------|----------|--------|\n`;

  for (const endpoint of endpoints) {
    const summaryIcon = endpoint.hasSummary ? "✅" : "❌";
    const descIcon = endpoint.hasDescription ? "✅" : "❌";
    const exampleIcon = endpoint.hasExamples ? "✅" : "❌";
    const issueCount = endpoint.issues.length;

    md += `| ${endpoint.method.toUpperCase()} | \`${endpoint.path}\` | ${summaryIcon} | ${descIcon} | ${exampleIcon} | ${issueCount} |\n`;
  }

  md += `\n---\n\n`;

  // Detailed endpoint analysis
  md += `## Detailed Analysis\n\n`;

  for (const endpoint of endpoints) {
    const location = `${endpoint.method.toUpperCase()} ${endpoint.path}`;
    md += `### ${location}\n\n`;

    if (endpoint.operationId) {
      md += `**Operation ID:** \`${endpoint.operationId}\`\n\n`;
    }

    md += `**Quality Checks:**\n\n`;
    md += `- Summary: ${endpoint.hasSummary ? "✅ Present" : "❌ Missing"}\n`;
    md += `- Description: ${endpoint.hasDescription ? "✅ Present" : "❌ Missing"}\n`;
    md += `- Request Examples: ${endpoint.hasRequestExamples ? "✅ Present" : "❌ Missing"}\n`;
    md += `- Response Examples: ${endpoint.hasResponseExamples ? "✅ Present" : "❌ Missing"}\n`;
    md += `- Parameters: ${endpoint.parameterCount} total, ${endpoint.parametersWithDescriptions} with descriptions\n`;
    md += `\n`;

    if (endpoint.issues.length > 0) {
      md += `**Issues (${endpoint.issues.length}):**\n\n`;

      const endpointIssues = endpoint.issues;
      const criticals = endpointIssues.filter((i) => i.severity === "critical");
      const warnings = endpointIssues.filter((i) => i.severity === "warning");
      const infos = endpointIssues.filter((i) => i.severity === "info");

      if (criticals.length > 0) {
        md += `#### 🔴 Critical Issues\n\n`;
        for (const issue of criticals) {
          md += `- **${issue.category}:** ${issue.message}\n`;
          if (issue.suggestion) {
            md += `  - *Suggestion:* ${issue.suggestion}\n`;
          }
        }
        md += `\n`;
      }

      if (warnings.length > 0) {
        md += `#### 🟡 Warnings\n\n`;
        for (const issue of warnings) {
          md += `- **${issue.category}:** ${issue.message}\n`;
          if (issue.suggestion) {
            md += `  - *Suggestion:* ${issue.suggestion}\n`;
          }
        }
        md += `\n`;
      }

      if (infos.length > 0) {
        md += `#### ℹ️ Recommendations\n\n`;
        for (const issue of infos) {
          md += `- **${issue.category}:** ${issue.message}\n`;
          if (issue.suggestion) {
            md += `  - *Suggestion:* ${issue.suggestion}\n`;
          }
        }
        md += `\n`;
      }
    } else {
      md += `✅ **No issues found** - This endpoint meets all quality standards!\n\n`;
    }

    md += `---\n\n`;
  }

  // Recommendations summary
  md += `## Recommendations\n\n`;

  if (criticalCount > 0) {
    md += `### 🔴 Critical Actions Required\n\n`;
    md += `${criticalCount} critical issue(s) must be addressed:\n\n`;

    const criticalsByCategory = issues
      .filter((i) => i.severity === "critical")
      .reduce((acc, issue) => {
        if (!acc[issue.category]) acc[issue.category] = [];
        acc[issue.category].push(issue);
        return acc;
      }, {} as Record<string, QualityIssue[]>);

    for (const [category, categoryIssues] of Object.entries(criticalsByCategory)) {
      md += `**${category}** (${categoryIssues.length} issues)\n`;
      for (const issue of categoryIssues.slice(0, 3)) {
        md += `- ${issue.location}: ${issue.message}\n`;
      }
      if (categoryIssues.length > 3) {
        md += `- ... and ${categoryIssues.length - 3} more\n`;
      }
      md += `\n`;
    }
  }

  if (warningCount > 0) {
    md += `### 🟡 Important Improvements\n\n`;
    md += `${warningCount} warning(s) should be addressed to improve API quality.\n\n`;
  }

  if (infoCount > 0) {
    md += `### ℹ️ Optional Enhancements\n\n`;
    md += `${infoCount} recommendation(s) to further enhance documentation and developer experience.\n\n`;
  }

  if (issues.length === 0) {
    md += `### ✅ Excellent Work!\n\n`;
    md += `This route group meets all quality standards. No issues found.\n\n`;
  }

  return md;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

/**
 * Main execution function
 */
async function main(): Promise<void> {
  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "green"));
  console.log(colorize("║  OpenAPI Specification Analyzer & Reporter              ║", "green"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "green"));

  // Load OpenAPI spec
  console.log(colorize("📖 Loading OpenAPI specification...\n", "cyan"));
  const openapiContent = await readFile(OPENAPI_FILE, "utf-8");
  const openapi = JSON.parse(openapiContent);

  // Create output directory for reports
  if (!existsSync(REPORTS_DIR)) {
    await mkdir(REPORTS_DIR, { recursive: true });
  }

  // Group paths by route
  console.log(colorize("🔍 Grouping paths by route...\n", "cyan"));
  const routeGroups: Record<string, Record<string, any>> = {};

  for (const [path, pathItem] of Object.entries(openapi.paths)) {
    const routeGroup = extractRouteGroup(path);
    if (!routeGroups[routeGroup]) {
      routeGroups[routeGroup] = {};
    }
    routeGroups[routeGroup][path] = pathItem;
  }

  console.log(colorize(`Found ${Object.keys(routeGroups).length} route groups:\n`, "green"));
  for (const routeName of Object.keys(routeGroups).sort()) {
    const pathCount = Object.keys(routeGroups[routeName]).length;
    console.log(colorize(`  • ${routeName.padEnd(20)} (${pathCount} paths)`, "cyan"));
  }
  console.log();

  // Analyze and generate reports
  console.log(colorize("📊 Analyzing routes and generating reports...\n", "yellow"));

  const allAnalyses: RouteAnalysis[] = [];

  for (const [routeName, paths] of Object.entries(routeGroups).sort()) {
    console.log(colorize(`\n  Analyzing: ${routeName}`, "cyan"));

    // Split spec for this route
    // Analyze route
    const analysis = analyzeRouteGroup(routeName, paths);
    allAnalyses.push(analysis);

    // Generate report
    const report = generateMarkdownReport(analysis);
    await writeFile(`${REPORTS_DIR}/${routeName}.md`, report, "utf-8");

    // Print summary
    const scoreColor = analysis.score >= 75 ? "green" : analysis.score >= 60 ? "yellow" : "red";
    console.log(colorize(`    Score: ${analysis.score}/100`, scoreColor));
    console.log(colorize(`    Issues: ${analysis.issues.length}`, "cyan"));
  }

  // Generate summary report
  console.log(colorize("\n\n📋 Generating summary report...\n", "yellow"));

  let summaryMd = `# API Quality Summary Report\n\n`;
  summaryMd += `**Generated:** ${new Date().toISOString()}\n\n`;
  summaryMd += `---\n\n`;

  summaryMd += `## Overview\n\n`;
  summaryMd += `| Route | Endpoints | Operations | Score | Issues |\n`;
  summaryMd += `|-------|-----------|------------|-------|--------|\n`;

  for (const analysis of allAnalyses.sort((a, b) => b.score - a.score)) {
    const scoreIcon = analysis.score >= 75 ? "🟢" : analysis.score >= 60 ? "🟡" : "🔴";
    summaryMd += `| [${analysis.routeName}](./reports/${analysis.routeName}.md) | ${analysis.endpointCount} | ${analysis.operationCount} | ${scoreIcon} ${analysis.score}/100 | ${analysis.issues.length} |\n`;
  }

  summaryMd += `\n`;

  await writeFile(`${REPORTS_DIR}/SUMMARY.md`, summaryMd, "utf-8");

  // Final summary
  console.log(colorize("╔══════════════════════════════════════════════════════════╗", "green"));
  console.log(colorize("║  Analysis Complete                                       ║", "green"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "green"));

  console.log(colorize(`📊 Reports saved to: ${REPORTS_DIR}/`, "green"));
  console.log(colorize(`📋 Summary: ${REPORTS_DIR}/SUMMARY.md\n`, "green"));

  const avgScore = Math.round(
    allAnalyses.reduce((sum, a) => sum + a.score, 0) / allAnalyses.length
  );
  const totalIssues = allAnalyses.reduce((sum, a) => sum + a.issues.length, 0);

  console.log(colorize(`Average Quality Score: ${avgScore}/100`, "cyan"));
  console.log(colorize(`Total Issues Found: ${totalIssues}\n`, "cyan"));
}

// Run main function
main().catch((error) => {
  console.error(colorize("\n✗ Error:", "red"));
  console.error(colorize(error instanceof Error ? error.message : String(error), "red"));
  process.exit(1);
});
