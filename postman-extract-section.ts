#!/usr/bin/env bun

/**
 * Postman Collection Section Extractor
 *
 * Extracts specific folders/sections from a Postman collection and saves them
 * as a new collection, ready for conversion to OpenAPI 3.1
 *
 * @example
 * # Extract Merchant APIs section
 * bun run postman-extract-section.ts --section="Merchant APIs"
 *
 * # List all available sections
 * bun run postman-extract-section.ts --list
 *
 * # Extract and convert to OpenAPI in one command
 * bun run postman:extract --section="Merchant APIs"
 */

import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Default input file (unwrapped Postman collection) */
const DEFAULT_INPUT = "zenith-postman-collection-unwrapped.json";

/** Output file for extracted section */
const EXTRACTED_OUTPUT = "zenith-postman-extracted.json";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface PostmanCollection {
  info: {
    _postman_id?: string;
    name: string;
    description?: string;
    schema: string;
  };
  item: PostmanItem[];
  variable?: any[];
}

interface PostmanItem {
  name: string;
  description?: string;
  item?: PostmanItem[];
  request?: any;
  response?: any[];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
};

function log(message: string, color: keyof typeof colors = "reset"): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ============================================================================
// EXTRACTION FUNCTIONS
// ============================================================================

function listSections(collection: PostmanCollection): void {
  log(`\n📋 Available Sections in "${collection.info.name}":`, "cyan");
  log("", "reset");

  collection.item.forEach((item, index) => {
    const isFolder = item.item && item.item.length > 0;
    const type = isFolder ? "folder" : "request";
    const count = isFolder ? ` (${item.item!.length} items)` : "";
    const icon = isFolder ? "📁" : "📄";

    log(`   ${index + 1}. ${icon} ${item.name}${count}`, "reset");

    // Show sub-items if it's a folder
    if (isFolder && item.item) {
      item.item.forEach((subItem, subIndex) => {
        const subIsFolder = subItem.item && subItem.item.length > 0;
        const subIcon = subIsFolder ? "📁" : "📄";
        const subCount = subIsFolder ? ` (${subItem.item!.length} items)` : "";
        log(`      ${subIndex + 1}. ${subIcon} ${subItem.name}${subCount}`, "reset");
      });
    }
  });

  log("", "reset");
}

function findSection(
  collection: PostmanCollection,
  sectionName: string
): PostmanItem | null {
  // Case-insensitive search
  const normalizedName = sectionName.toLowerCase().trim();

  return (
    collection.item.find(
      (item) => item.name.toLowerCase().trim() === normalizedName
    ) || null
  );
}

function extractSection(
  collection: PostmanCollection,
  sectionName: string
): PostmanCollection {
  const section = findSection(collection, sectionName);

  if (!section) {
    throw new Error(
      `Section "${sectionName}" not found in collection.\nUse --list to see available sections.`
    );
  }

  log(`\n✅ Found section: "${section.name}"`, "green");

  // Count items
  const itemCount = section.item?.length || 0;
  const requestCount = countRequests(section);

  log(`   Items: ${itemCount}`, "reset");
  log(`   Requests: ${requestCount}`, "reset");

  // Create new collection with just this section
  const extracted: PostmanCollection = {
    info: {
      ...collection.info,
      name: `${collection.info.name} - ${section.name}`,
      description: section.description || `Extracted section: ${section.name}`,
    },
    item: section.item || [],
    variable: collection.variable,
  };

  return extracted;
}

function countRequests(item: PostmanItem): number {
  let count = 0;

  if (item.request) {
    count = 1;
  }

  if (item.item) {
    for (const subItem of item.item) {
      count += countRequests(subItem);
    }
  }

  return count;
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Postman Collection Section Extractor", "cyan");
    log("=".repeat(70) + "\n", "cyan");

    // Parse CLI arguments
    const args = process.argv.slice(2);
    const inputArg = args.find((arg) => arg.startsWith("--input="));
    const sectionArg = args.find((arg) => arg.startsWith("--section="));
    const outputArg = args.find((arg) => arg.startsWith("--output="));
    const listArg = args.includes("--list");

    const inputFile = inputArg ? inputArg.split("=")[1] : DEFAULT_INPUT;
    const outputFile = outputArg ? outputArg.split("=")[1] : EXTRACTED_OUTPUT;

    // Load collection
    if (!existsSync(inputFile)) {
      throw new Error(
        `Collection file not found: ${inputFile}\n` +
          `Run: bun run postman:download`
      );
    }

    log(`📁 Loading collection: ${inputFile}`, "cyan");
    const collectionData = JSON.parse(await readFile(inputFile, "utf-8"));
    const collection = collectionData as PostmanCollection;

    log(`✅ Loaded: ${collection.info.name}`, "green");
    log(`   Total sections: ${collection.item.length}`, "reset");

    // List sections
    if (listArg) {
      listSections(collection);
      return;
    }

    // Extract section
    if (!sectionArg) {
      log(`\n❌ Missing required argument: --section="Section Name"`, "red");
      log(`\nUsage:`, "yellow");
      log(`  # List available sections`, "reset");
      log(`  bun run postman-extract-section.ts --list`, "cyan");
      log(`\n  # Extract a section`, "reset");
      log(
        `  bun run postman-extract-section.ts --section="Merchant APIs"`,
        "cyan"
      );
      log(`\n  # Custom output file`, "reset");
      log(
        `  bun run postman-extract-section.ts --section="Merchant APIs" --output=merchant.json`,
        "cyan"
      );
      process.exit(1);
    }

    const sectionName = sectionArg.split("=")[1].replace(/^["']|["']$/g, "");

    // Extract
    const extracted = extractSection(collection, sectionName);

    // Save
    await writeFile(outputFile, JSON.stringify(extracted, null, 2));
    log(`\n💾 Saved extracted section: ${outputFile}`, "green");

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Extraction Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    log(`📊 Extracted Section Details:`, "cyan");
    log(`   Name: ${extracted.info.name}`, "reset");
    log(`   Folders: ${extracted.item.length}`, "reset");
    log(
      `   Total Requests: ${extracted.item.reduce((sum, item) => sum + countRequests(item), 0)}`,
      "reset"
    );

    log(`\n💡 Next steps:`, "yellow");
    log(
      `   bun run postman-to-openapi31.ts --input=${outputFile}`,
      "reset"
    );
  } catch (error) {
    log(`\n${"=".repeat(70)}`, "red");
    log(`❌ Error: ${error}`, "red");
    log(`${"=".repeat(70)}\n`, "red");
    process.exit(1);
  }
}

// ============================================================================
// ENTRY POINT
// ============================================================================

if (import.meta.main) {
  main();
}
