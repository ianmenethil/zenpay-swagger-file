#!/usr/bin/env bun

/**
 * Help Documentation
 *
 * Shows all available commands and their usage
 */

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m",
};

function c(text: string, color: keyof typeof colors): string {
  return `${colors[color]}${text}${colors.reset}`;
}

console.log(c("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
console.log(c("║  TravelPay API Documentation Tools                       ║", "cyan"));
console.log(c("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

console.log(c("QUICK START", "bold"));
console.log(c("─".repeat(60), "dim"));

console.log(c("\n1. Download latest spec from API:", "yellow"));
console.log("   " + c("bun run getspec", "green"));

console.log(c("\n2. Analyze quality:", "yellow"));
console.log("   " + c("bun run analyze", "green"));
console.log("   " + c("cat reports/SUMMARY.md", "dim"));

console.log(c("\n3. Enhance documentation:", "yellow"));
console.log("   " + c("bun run enhance --route payments", "green"));
console.log("   " + c("bun run diff --route payments", "green"));
console.log("   " + c("bun run enhance --route payments --apply", "green"));

console.log(c("\n\nAVAILABLE COMMANDS", "bold"));
console.log(c("─".repeat(60), "dim"));

const commands = [
  {
    category: "Spec Management",
    commands: [
      { name: "getspec", desc: "Download latest Swagger spec and convert to OpenAPI 3.1", example: "bun run getspec" },
      { name: "validate", desc: "Validate OpenAPI 3.1 specification with Scalar", example: "bun run validate" },
      { name: "docs", desc: "Serve interactive API documentation", example: "bun run docs" },
    ],
  },
  {
    category: "Quality Analysis",
    commands: [
      { name: "analyze", desc: "Analyze spec quality and generate reports", example: "bun run analyze" },
    ],
  },
  {
    category: "Documentation Enhancement",
    commands: [
      { name: "enhance", desc: "Auto-enhance documentation with preview", example: "bun run enhance --route payments" },
      { name: "enhance --apply", desc: "Apply enhancements without preview", example: "bun run enhance --route payments --apply" },
      { name: "enhance:all", desc: "Enhance all routes at once", example: "bun run enhance:all" },
      { name: "diff", desc: "Show differences before/after enhancement", example: "bun run diff --route payments" },
    ],
  },
  {
    category: "SDK Generation",
    commands: [
      { name: "sdk", desc: "Generate TypeScript and Python SDKs from OpenAPI spec", example: "bun run sdk" },
    ],
  },
];

for (const { category, commands: cmds } of commands) {
  console.log(c(`\n${category}:`, "yellow"));

  for (const cmd of cmds) {
    console.log(`\n  ${c(cmd.name.padEnd(20), "green")} ${cmd.desc}`);
    console.log(`  ${c("Example:", "dim")} ${c(cmd.example, "cyan")}`);
  }
}

console.log(c("\n\nCOMMON WORKFLOWS", "bold"));
console.log(c("─".repeat(60), "dim"));

console.log(c("\n🔄 Update spec from API:", "yellow"));
console.log(c(`
  bun run getspec               # Downloads & converts
  bun run analyze               # Checks quality
  cat reports/SUMMARY.md        # View results
`, "cyan"));

console.log(c("📊 Analyze & improve quality:", "yellow"));
console.log(c(`
  bun run analyze               # Find issues
  bun run enhance --route payments    # Preview fixes
  bun run diff --route payments       # See changes
  bun run enhance --route payments --apply  # Apply
  git add . && git commit -m "enhance: payments docs"
`, "cyan"));

console.log(c("🔍 Route-specific operations:", "yellow"));
console.log(c(`
  bun run enhance --route sessions
  bun run diff --route sessions --detailed
  bun run enhance --route sessions --apply
`, "cyan"));

console.log(c("\n\nFILES & DIRECTORIES", "bold"));
console.log(c("─".repeat(60), "dim"));

const files = [
  { name: "swagger.json", desc: "Original Swagger 2.0 spec from API" },
  { name: "openapi.json", desc: "Converted OpenAPI 3.1 spec" },
  { name: "db.json", desc: "Download cache metadata" },
  { name: "split-specs/", desc: "Per-route OpenAPI specs" },
  { name: "reports/", desc: "Quality analysis reports" },
  { name: "API-STYLE-GUIDE.md", desc: "Documentation standards" },
  { name: "ENHANCEMENT-WORKFLOW.md", desc: "Step-by-step guide" },
];

console.log();
for (const { name, desc } of files) {
  console.log(`  ${c(name.padEnd(30), "green")} ${c(desc, "dim")}`);
}

console.log(c("\n\nDOCUMENTATION", "bold"));
console.log(c("─".repeat(60), "dim"));
console.log(`
  ${c("API-STYLE-GUIDE.md", "cyan")}       - Language standards & templates
  ${c("ENHANCEMENT-WORKFLOW.md", "cyan")}  - Systematic improvement process
  ${c("README.md", "cyan")}                - Project overview
  ${c("reports/SUMMARY.md", "cyan")}       - Quality analysis summary
`);

console.log(c("\nFor detailed help on any command, run:", "yellow"));
console.log(c("  bun run <command> --help\n", "cyan"));
