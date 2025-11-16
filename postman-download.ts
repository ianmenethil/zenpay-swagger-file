#!/usr/bin/env bun

/**
 * Postman Collection Downloader
 *
 * Downloads Postman collections from Postman API with:
 * - Automatic retry logic (3 attempts)
 * - Hash-based caching to avoid unnecessary downloads
 * - Support for both private collections (API key) and public collections (access key)
 * - Data integrity validation
 * - Automatic unwrapping of API response format
 *
 * @example
 * bun run postman-download.ts
 * bun run postman-download.ts --collection-id=YOUR_COLLECTION_ID
 * bun run postman-download.ts --public-url=https://api.postman.com/collections/xxx?access_key=yyy
 */

import { createHash } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Default collection ID (Zenith Payments) */
const DEFAULT_COLLECTION_ID = "10633263-1a62cdcb-e9a0-4990-89eb-6762de8ab7b7";

/** Default public access key (override with POSTMAN_ACCESS_KEY env var) */
const DEFAULT_ACCESS_KEY = process.env.POSTMAN_ACCESS_KEY || "";

/** Postman API base URL */
const POSTMAN_API_BASE = "https://api.postman.com";

/** Maximum retry attempts */
const MAX_RETRIES = 3;

/** Database file for caching metadata */
const DB_FILE = "postman-db.json";

/** Output file for wrapped collection (as received from API) */
const WRAPPED_OUTPUT = "zenith-postman-collection.json";

/** Output file for unwrapped collection (ready for conversion) */
const UNWRAPPED_OUTPUT = "zenith-postman-collection-unwrapped.json";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CacheDatabase {
  lastDownload: string;
  hash: string;
  collectionId: string;
  size: number;
  collectionName?: string;
}

interface PostmanCollectionWrapper {
  collection: PostmanCollection;
}

interface PostmanCollection {
  info: {
    _postman_id: string;
    name: string;
    description?: string;
    schema: string;
  };
  item: any[];
  variable?: any[];
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

function calculateHash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

async function loadCache(): Promise<CacheDatabase | null> {
  try {
    if (!existsSync(DB_FILE)) return null;
    const data = await readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    log(`⚠️  Failed to load cache: ${error}`, "yellow");
    return null;
  }
}

async function saveCache(cache: CacheDatabase): Promise<void> {
  await writeFile(DB_FILE, JSON.stringify(cache, null, 2));
}

// ============================================================================
// DOWNLOAD FUNCTIONS
// ============================================================================

async function downloadWithRetry(
  url: string,
  headers: Record<string, string>,
  retries: number = MAX_RETRIES
): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      log(`📡 Attempt ${attempt}/${retries}: ${url}`, "cyan");

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText}\n${errorText}`
        );
      }

      const content = await response.text();
      log(`✅ Successfully downloaded (${content.length} bytes)`, "green");
      return content;
    } catch (error) {
      log(`❌ Attempt ${attempt} failed: ${error}`, "red");

      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts: ${error}`);
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      log(`⏳ Waiting ${delay}ms before retry...`, "yellow");
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Unexpected: retry loop completed without success or throw");
}

async function downloadFromPrivateAPI(
  collectionId: string,
  apiKey: string
): Promise<string> {
  const url = `${POSTMAN_API_BASE}/collections/${collectionId}`;
  const headers = {
    "X-Api-Key": apiKey,
  };

  log(`\n🔐 Downloading from Postman API (private)`, "blue");
  return await downloadWithRetry(url, headers);
}

async function downloadFromPublicURL(
  collectionId: string,
  accessKey: string
): Promise<string> {
  const url = `${POSTMAN_API_BASE}/collections/${collectionId}?access_key=${accessKey}`;
  const headers = {};

  log(`\n🌐 Downloading from Postman API (public)`, "blue");
  return await downloadWithRetry(url, headers);
}

// ============================================================================
// VALIDATION & PROCESSING
// ============================================================================

function validateCollection(data: any): PostmanCollectionWrapper {
  if (!data.collection) {
    throw new Error("Invalid response: missing 'collection' property");
  }

  const collection = data.collection;

  if (!collection.info?.name) {
    throw new Error("Invalid collection: missing info.name");
  }

  if (!collection.item || !Array.isArray(collection.item)) {
    throw new Error("Invalid collection: missing or invalid items array");
  }

  log(`\n📋 Collection Info:`, "cyan");
  log(`   Name: ${collection.info.name}`, "reset");
  log(`   ID: ${collection.info._postman_id}`, "reset");
  log(`   Schema: ${collection.info.schema}`, "reset");
  log(`   Items: ${collection.item.length}`, "reset");

  return data as PostmanCollectionWrapper;
}

async function processAndSaveCollection(
  content: string,
  collectionId: string
): Promise<void> {
  const hash = calculateHash(content);

  // Parse and validate
  const data = JSON.parse(content);
  const validated = validateCollection(data);

  // Save wrapped version (as received from API)
  await writeFile(WRAPPED_OUTPUT, JSON.stringify(validated, null, 2));
  log(`\n💾 Saved wrapped collection: ${WRAPPED_OUTPUT}`, "green");

  // Save unwrapped version (ready for conversion tools)
  await writeFile(
    UNWRAPPED_OUTPUT,
    JSON.stringify(validated.collection, null, 2)
  );
  log(`💾 Saved unwrapped collection: ${UNWRAPPED_OUTPUT}`, "green");

  // Update cache
  const cache: CacheDatabase = {
    lastDownload: new Date().toISOString(),
    hash,
    collectionId,
    size: content.length,
    collectionName: validated.collection.info.name,
  };

  await saveCache(cache);
  log(`💾 Cache updated: ${DB_FILE}`, "green");
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Postman Collection Downloader", "cyan");
    log("=".repeat(70) + "\n", "cyan");

    // Parse CLI arguments
    const args = process.argv.slice(2);
    const collectionIdArg = args.find((arg) =>
      arg.startsWith("--collection-id=")
    );
    const publicUrlArg = args.find((arg) => arg.startsWith("--public-url="));
    const forceArg = args.includes("--force");

    let collectionId = DEFAULT_COLLECTION_ID;
    let accessKey = DEFAULT_ACCESS_KEY;
    let usePublic = true;

    // Handle public URL argument
    if (publicUrlArg) {
      const url = publicUrlArg.split("=")[1];
      const match = url.match(/collections\/([^?]+)\?access_key=(.+)/);
      if (match) {
        collectionId = match[1];
        accessKey = match[2];
        log(`📍 Using public URL`, "cyan");
        log(`   Collection: ${collectionId}`, "reset");
      }
    } else if (collectionIdArg) {
      collectionId = collectionIdArg.split("=")[1];
      log(`📍 Using collection ID: ${collectionId}`, "cyan");

      // Check for API key in environment
      if (process.env.POSTMAN_API_KEY) {
        usePublic = false;
        log(`🔐 Using POSTMAN_API_KEY from environment`, "cyan");
      }
    }

    // Check cache
    if (!forceArg) {
      const cache = await loadCache();
      if (cache && cache.collectionId === collectionId) {
        log(`\n📦 Cache found:`, "yellow");
        log(`   Last download: ${cache.lastDownload}`, "reset");
        log(`   Collection: ${cache.collectionName}`, "reset");
        log(`   Size: ${cache.size} bytes`, "reset");
        log(`\n💡 Use --force to download again`, "yellow");

        if (
          existsSync(WRAPPED_OUTPUT) &&
          existsSync(UNWRAPPED_OUTPUT)
        ) {
          log(`✅ Collection files already exist, skipping download`, "green");
          return;
        }
      }
    }

    // Validate credentials
    if (usePublic && !accessKey) {
      throw new Error(
        "Public access key required. Either:\n" +
        "  1. Set POSTMAN_ACCESS_KEY environment variable\n" +
        "  2. Use --public-url with full URL including access_key\n" +
        "  3. Use POSTMAN_API_KEY for private API access"
      );
    }

    // Download collection
    let content: string;

    if (usePublic) {
      content = await downloadFromPublicURL(collectionId, accessKey);
    } else {
      const apiKey = process.env.POSTMAN_API_KEY!;
      content = await downloadFromPrivateAPI(collectionId, apiKey);
    }

    // Process and save
    await processAndSaveCollection(content, collectionId);

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Download Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    log(`📁 Output files:`, "cyan");
    log(`   ${WRAPPED_OUTPUT} (original API response)`, "reset");
    log(`   ${UNWRAPPED_OUTPUT} (ready for conversion)`, "reset");

    log(`\n💡 Next steps:`, "yellow");
    log(`   bun run postman-to-openapi31.ts`, "reset");
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
