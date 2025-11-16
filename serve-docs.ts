#!/usr/bin/env bun

/**
 * Serve Interactive API Docs (Powered by @scalar/api-reference)
 *
 * Generates and serves beautiful interactive API documentation
 * using Scalar's API Reference UI.
 *
 * Features:
 * - Beautiful, modern UI
 * - Try-it-out functionality
 * - Code generation in multiple languages
 * - OAuth/authentication flows
 * - Customizable themes
 *
 * @example
 * bun run docs
 * bun run docs --input openapi.json --port 3000
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";

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
// HTML TEMPLATE
// ============================================================================

function generateHtml(specContent: string, title: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title} - API Documentation</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <!-- Scalar API Reference -->
    <script
      id="api-reference"
      data-url="./openapi.json"></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  const inputIdx = args.indexOf("--input");
  const portIdx = args.indexOf("--port");

  const inputFile = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : "openapi.json";
  const port = portIdx >= 0 && portIdx + 1 < args.length ? parseInt(args[portIdx + 1]) : 3000;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  Scalar API Reference - Interactive Docs                 ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ Input file not found: ${inputFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run docs", "cyan"));
    console.error(colorize("  bun run docs --input openapi.json --port 3000\n", "cyan"));
    process.exit(1);
  }

  console.log(colorize(`📖 Loading spec: ${inputFile}`, "cyan"));
  const specContent = await readFile(inputFile, "utf-8");
  const spec = JSON.parse(specContent);

  const title = spec.info?.title || "API Documentation";
  console.log(colorize(`✓ Loaded: ${title}`, "green"));
  console.log();

  // Create simple HTTP server
  console.log(colorize("🚀 Starting documentation server...", "cyan"));
  console.log();

  const server = Bun.serve({
    port,
    fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === "/") {
        return new Response(generateHtml(specContent, title), {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }

      if (url.pathname === "/openapi.json") {
        return new Response(specContent, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(colorize("╔══════════════════════════════════════════════════════════╗", "green"));
  console.log(colorize("║  🎉 Documentation Server Running!                        ║", "green"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝", "green"));
  console.log();
  console.log(colorize(`  📚 API Docs:  ${colorize(`http://localhost:${port}`, "bold")}`, "cyan"));
  console.log(colorize(`  📄 OpenAPI:   http://localhost:${port}/openapi.json`, "dim"));
  console.log();
  console.log(colorize("  Features:", "yellow"));
  console.log(colorize("  • Beautiful, modern UI", "dim"));
  console.log(colorize("  • Try-it-out functionality", "dim"));
  console.log(colorize("  • Code generation examples", "dim"));
  console.log(colorize("  • OAuth/authentication flows", "dim"));
  console.log();
  console.log(colorize("  Press Ctrl+C to stop\n", "yellow"));

  // Keep server running
  await new Promise(() => {});
}

main().catch((error) => {
  console.error(colorize("\n✗ Unexpected error:", "red"));
  console.error(colorize(error.message, "red"));
  if (error.stack) {
    console.error(colorize(error.stack, "dim"));
  }
  process.exit(1);
});
