#!/usr/bin/env bun

/**
 * SDK Generator (OpenAPI Generator)
 *
 * Generates TypeScript and Python SDKs from OpenAPI specifications.
 * Uses the industry-standard OpenAPI Generator tool.
 *
 * @example
 * bun run sdk --input openapi.json --lang typescript
 * bun run sdk --input openapi.json --lang python
 * bun run sdk --input openapi.json --lang all
 */

import { readFile, mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { $ } from "bun";

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_INPUT = "openapi.json";
const DEFAULT_OUTPUT_DIR = "sdk";

const SUPPORTED_LANGUAGES = {
  typescript: {
    generator: "typescript-fetch",
    outputDir: "typescript",
    description: "TypeScript SDK with Fetch API",
  },
  python: {
    generator: "python",
    outputDir: "python",
    description: "Python SDK",
  },
} as const;

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
// SDK GENERATION
// ============================================================================

async function generateSDK(
  specFile: string,
  language: keyof typeof SUPPORTED_LANGUAGES,
  outputBaseDir: string
) {
  const config = SUPPORTED_LANGUAGES[language];
  const outputDir = `${outputBaseDir}/${config.outputDir}`;

  console.log(colorize(`\n📦 Generating ${language.toUpperCase()} SDK...`, "cyan"));
  console.log(colorize(`   Generator: ${config.generator}`, "dim"));
  console.log(colorize(`   Output: ${outputDir}`, "dim"));
  console.log();

  try {
    // Use npx to run openapi-generator-cli (no global install needed)
    const result = await $`npx --yes @openapitools/openapi-generator-cli generate \
      -i ${specFile} \
      -g ${config.generator} \
      -o ${outputDir} \
      --skip-validate-spec`.quiet();

    console.log(colorize(`✅ ${language.toUpperCase()} SDK generated successfully!`, "green"));
    console.log(colorize(`   Location: ${outputDir}`, "dim"));

    // Create a README in the SDK directory
    const readmeContent = `# ${language.toUpperCase()} SDK

Generated from OpenAPI specification using OpenAPI Generator.

## Installation

${language === "typescript" ? `\`\`\`bash
npm install
\`\`\`` : `\`\`\`bash
pip install -r requirements.txt
\`\`\``}

## Usage

${language === "typescript" ? `\`\`\`typescript
import { DefaultApi, Configuration } from './';

const config = new Configuration({
  basePath: 'https://api.example.com',
  apiKey: 'your-api-key'
});

const api = new DefaultApi(config);

// Make API calls
const result = await api.someMethod();
\`\`\`` : `\`\`\`python
from openapi_client import ApiClient, Configuration
from openapi_client.api import default_api

config = Configuration(
    host='https://api.example.com',
    api_key={'ApiKeyAuth': 'your-api-key'}
)

with ApiClient(config) as api_client:
    api = default_api.DefaultApi(api_client)
    result = api.some_method()
\`\`\``}

## Documentation

See the generated documentation in the \`docs/\` directory.

## Generated Files

- API client classes
- Model/schema classes
- Type definitions
- Documentation
`;

    await writeFile(`${outputDir}/README.md`, readmeContent, "utf-8");

    return { success: true, outputDir };
  } catch (error: any) {
    console.error(colorize(`\n✗ ${language.toUpperCase()} SDK generation failed!`, "red"));
    console.error(colorize(error.message || String(error), "red"));
    return { success: false, error: error.message };
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  const inputIdx = args.indexOf("--input");
  const langIdx = args.indexOf("--lang");
  const outputIdx = args.indexOf("--output");

  const inputFile = inputIdx >= 0 && inputIdx + 1 < args.length ? args[inputIdx + 1] : DEFAULT_INPUT;
  const language = langIdx >= 0 && langIdx + 1 < args.length ? args[langIdx + 1] : "all";
  const outputDir = outputIdx >= 0 && outputIdx + 1 < args.length ? args[outputIdx + 1] : DEFAULT_OUTPUT_DIR;

  console.log(colorize("\n╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  OpenAPI SDK Generator                                   ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝\n", "cyan"));

  // Validate input file
  if (!existsSync(inputFile)) {
    console.error(colorize(`✗ Input file not found: ${inputFile}`, "red"));
    console.error(colorize("\nUsage:", "yellow"));
    console.error(colorize("  bun run sdk --input openapi.json --lang typescript", "cyan"));
    console.error(colorize("  bun run sdk --input openapi.json --lang python", "cyan"));
    console.error(colorize("  bun run sdk --input openapi.json --lang all", "cyan"));
    console.error(colorize("\nSupported languages:", "yellow"));
    for (const [lang, config] of Object.entries(SUPPORTED_LANGUAGES)) {
      console.error(colorize(`  • ${lang}: ${config.description}`, "dim"));
    }
    console.error();
    process.exit(1);
  }

  // Validate language
  if (language !== "all" && !(language in SUPPORTED_LANGUAGES)) {
    console.error(colorize(`✗ Unsupported language: ${language}`, "red"));
    console.error(colorize("\nSupported languages: typescript, python, all\n", "yellow"));
    process.exit(1);
  }

  console.log(colorize(`📖 Reading spec: ${inputFile}`, "cyan"));
  const specContent = await readFile(inputFile, "utf-8");
  const spec = JSON.parse(specContent);

  console.log(colorize(`✓ Loaded: ${spec.info?.title || "OpenAPI Spec"}`, "green"));
  console.log(colorize(`  Version: ${spec.openapi || spec.swagger}`, "dim"));
  console.log();

  // Create output directory
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // Generate SDKs
  const results: Array<{ language: string; success: boolean; outputDir?: string }> = [];

  if (language === "all") {
    // Generate all supported SDKs
    for (const lang of Object.keys(SUPPORTED_LANGUAGES) as Array<keyof typeof SUPPORTED_LANGUAGES>) {
      const result = await generateSDK(inputFile, lang, outputDir);
      results.push({ language: lang, success: result.success, outputDir: result.outputDir });
    }
  } else {
    // Generate specific SDK
    const result = await generateSDK(inputFile, language as keyof typeof SUPPORTED_LANGUAGES, outputDir);
    results.push({ language, success: result.success, outputDir: result.outputDir });
  }

  // Summary
  console.log();
  console.log(colorize("╔══════════════════════════════════════════════════════════╗", "cyan"));
  console.log(colorize("║  Summary                                                 ║", "cyan"));
  console.log(colorize("╚══════════════════════════════════════════════════════════╝", "cyan"));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  if (successful.length > 0) {
    console.log(colorize(`\n✅ Successfully generated ${successful.length} SDK(s):`, "green"));
    for (const result of successful) {
      console.log(colorize(`  • ${result.language}: ${result.outputDir}`, "dim"));
    }
  }

  if (failed.length > 0) {
    console.log(colorize(`\n❌ Failed to generate ${failed.length} SDK(s):`, "red"));
    for (const result of failed) {
      console.log(colorize(`  • ${result.language}`, "dim"));
    }
  }

  console.log();
  console.log(colorize("Next steps:", "yellow"));
  console.log(colorize("  1. Review generated code in the sdk/ directory", "dim"));
  console.log(colorize("  2. Install dependencies (npm install / pip install -r requirements.txt)", "dim"));
  console.log(colorize("  3. Customize as needed", "dim"));
  console.log(colorize("  4. Build and distribute your SDK\n", "dim"));

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(colorize("\n✗ Unexpected error:", "red"));
  console.error(colorize(error.message, "red"));
  if (error.stack) {
    console.error(colorize(error.stack, "dim"));
  }
  process.exit(1);
});
