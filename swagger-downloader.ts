#!/usr/bin/env -S deno run --allow-net --allow-read --allow-write
/**
 * Swagger Downloader with Smart Caching
 * Downloads the latest Swagger/OpenAPI spec from TravelPay API and caches it.
 * Only downloads if the remote content has changed (based on hash comparison).
 *
 * Usage: deno run --allow-net --allow-read --allow-write swagger-downloader.ts
 * Or: chmod +x swagger-downloader.ts && ./swagger-downloader.ts
 */

// Configuration
const API_URL = "https://api.sandbox.travelpay.com.au/v2.0/help";
const OUTPUT_FILE = "swagger.json";
const DB_FILE = "swagger-download-history.json";

interface DownloadRecord {
  timestamp: string;
  hash: string;
  file: string;
  url: string;
  size_bytes: number;
}

interface Database {
  downloads: DownloadRecord[];
}

/**
 * Calculate SHA256 hash of content
 */
async function calculateHash(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Load the download history database
 */
async function loadDb(): Promise<Database> {
  try {
    const content = await Deno.readTextFile(DB_FILE);
    return JSON.parse(content);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return { downloads: [] };
    }
    throw error;
  }
}

/**
 * Save the download history database
 */
async function saveDb(db: Database): Promise<void> {
  await Deno.writeTextFile(DB_FILE, JSON.stringify(db, null, 2));
}

/**
 * Fetch the Swagger spec from the API
 */
async function fetchSwagger(): Promise<string> {
  console.log(`Fetching Swagger spec from ${API_URL}...`);
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.text();
}

/**
 * Get the hash of the most recent download
 */
function getCurrentHash(db: Database): string | null {
  if (db.downloads.length > 0) {
    return db.downloads[db.downloads.length - 1].hash;
  }
  return null;
}

/**
 * Save the Swagger spec and update the database
 */
async function saveSwagger(
  content: string,
  contentHash: string,
  db: Database
): Promise<void> {
  // Save the swagger file
  await Deno.writeTextFile(OUTPUT_FILE, content);

  // Update the database
  const downloadRecord: DownloadRecord = {
    timestamp: new Date().toISOString(),
    hash: contentHash,
    file: OUTPUT_FILE,
    url: API_URL,
    size_bytes: content.length,
  };

  db.downloads.push(downloadRecord);
  await saveDb(db);

  console.log(`✓ Downloaded and saved to ${OUTPUT_FILE}`);
  console.log(`  Size: ${content.length.toLocaleString()} bytes`);
  console.log(`  Hash: ${contentHash.substring(0, 16)}...`);
  console.log(`  Time: ${downloadRecord.timestamp}`);
}

/**
 * Main execution function
 */
async function main(): Promise<number> {
  try {
    // Load download history
    const db = await loadDb();
    const currentHash = getCurrentHash(db);

    if (currentHash) {
      console.log(`Last download hash: ${currentHash.substring(0, 16)}...`);
    } else {
      console.log("No previous downloads found.");
    }

    // Fetch remote content
    const content = await fetchSwagger();
    const remoteHash = await calculateHash(content);
    console.log(`Remote content hash: ${remoteHash.substring(0, 16)}...`);

    // Compare hashes
    if (currentHash === remoteHash) {
      console.log("✓ No changes detected. Using cached version.");
      console.log(`  Last updated: ${db.downloads[db.downloads.length - 1].timestamp}`);
      return 0;
    }

    // Content has changed, save it
    if (currentHash) {
      console.log("⚠ Content has changed! Downloading new version...");
    } else {
      console.log("⚠ First download, saving...");
    }

    await saveSwagger(content, remoteHash, db);
    return 0;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`✗ Error: ${error.message}`);
    } else {
      console.error(`✗ Unexpected error: ${error}`);
    }
    return 1;
  }
}

// Run the script
if (import.meta.main) {
  const exitCode = await main();
  Deno.exit(exitCode);
}
