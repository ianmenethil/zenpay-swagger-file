#!/usr/bin/env bun

/**
 * Postman Collection Uploader
 *
 * Uploads or updates Postman collections via Postman API with:
 * - Create new collection or update existing one
 * - Automatic validation before upload
 * - Workspace support
 * - Detailed error reporting
 *
 * Requires POSTMAN_API_KEY environment variable
 *
 * @example
 * # Create new collection
 * bun run postman-upload.ts --file=collection.json --workspace-id=YOUR_WORKSPACE_ID
 *
 * # Update existing collection
 * bun run postman-upload.ts --file=collection.json --collection-id=EXISTING_COLLECTION_ID
 *
 * # Create from unwrapped collection
 * bun run postman-upload.ts --file=zenith-postman-collection-unwrapped.json --workspace-id=YOUR_WORKSPACE_ID
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";

// ============================================================================
// CONFIGURATION
// ============================================================================

/** Postman API base URL */
const POSTMAN_API_BASE = "https://api.postman.com";

/** Maximum retry attempts */
const MAX_RETRIES = 3;

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
  item: any[];
  variable?: any[];
}

interface PostmanCollectionWrapper {
  collection: PostmanCollection;
}

interface UploadOptions {
  file: string;
  collectionId?: string;
  workspaceId?: string;
  apiKey: string;
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
// VALIDATION FUNCTIONS
// ============================================================================

function validateCollection(data: any): PostmanCollection {
  // Check if it's wrapped
  const collection = data.collection || data;

  if (!collection.info?.name) {
    throw new Error("Invalid collection: missing info.name");
  }

  if (!collection.item || !Array.isArray(collection.item)) {
    throw new Error("Invalid collection: missing or invalid items array");
  }

  // Ensure schema is set
  if (!collection.info.schema) {
    collection.info.schema =
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json";
    log(`   ✅ Added default schema version`, "yellow");
  }

  log(`\n📋 Collection Info:`, "cyan");
  log(`   Name: ${collection.info.name}`, "reset");
  log(`   Schema: ${collection.info.schema}`, "reset");
  log(`   Items: ${collection.item.length}`, "reset");

  return collection;
}

// ============================================================================
// UPLOAD FUNCTIONS
// ============================================================================

async function createCollection(
  collection: PostmanCollection,
  workspaceId: string,
  apiKey: string
): Promise<any> {
  log(`\n📤 Creating new collection in workspace ${workspaceId}...`, "cyan");

  const url = `${POSTMAN_API_BASE}/collections`;
  const params = workspaceId ? `?workspace=${workspaceId}` : "";

  const response = await fetch(url + params, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ collection }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to create collection: HTTP ${response.status}\n${errorText}`
    );
  }

  const result = await response.json();
  log(`✅ Collection created successfully!`, "green");
  log(`   Collection ID: ${result.collection?.uid || result.collection?.id}`, "reset");

  return result;
}

async function updateCollection(
  collection: PostmanCollection,
  collectionId: string,
  apiKey: string
): Promise<any> {
  log(`\n📤 Updating collection ${collectionId}...`, "cyan");

  const url = `${POSTMAN_API_BASE}/collections/${collectionId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({ collection }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update collection: HTTP ${response.status}\n${errorText}`
    );
  }

  const result = await response.json();
  log(`✅ Collection updated successfully!`, "green");

  return result;
}

async function listWorkspaces(apiKey: string): Promise<void> {
  log(`\n📋 Fetching your workspaces...`, "cyan");

  const url = `${POSTMAN_API_BASE}/workspaces`;

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch workspaces: HTTP ${response.status}\n${errorText}`
    );
  }

  const result = await response.json();

  if (result.workspaces && result.workspaces.length > 0) {
    log(`\n📁 Available Workspaces:`, "green");
    result.workspaces.forEach((workspace: any, index: number) => {
      log(`   ${index + 1}. ${workspace.name} (ID: ${workspace.id})`, "reset");
    });
  } else {
    log(`⚠️  No workspaces found`, "yellow");
  }
}

async function listCollections(apiKey: string): Promise<void> {
  log(`\n📋 Fetching your collections...`, "cyan");

  const url = `${POSTMAN_API_BASE}/collections`;

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch collections: HTTP ${response.status}\n${errorText}`
    );
  }

  const result = await response.json();

  if (result.collections && result.collections.length > 0) {
    log(`\n📚 Available Collections:`, "green");
    result.collections.forEach((collection: any, index: number) => {
      log(
        `   ${index + 1}. ${collection.name} (ID: ${collection.uid})`,
        "reset"
      );
    });
  } else {
    log(`⚠️  No collections found`, "yellow");
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  try {
    log("\n" + "=".repeat(70), "cyan");
    log("  Postman Collection Uploader", "cyan");
    log("=".repeat(70) + "\n", "cyan");

    // Check for API key
    const apiKey = process.env.POSTMAN_API_KEY;
    if (!apiKey) {
      throw new Error(
        "POSTMAN_API_KEY environment variable is required.\n" +
          "Get your API key from: https://web.postman.co/settings/me/api-keys"
      );
    }

    // Parse CLI arguments
    const args = process.argv.slice(2);
    const fileArg = args.find((arg) => arg.startsWith("--file="));
    const collectionIdArg = args.find((arg) =>
      arg.startsWith("--collection-id=")
    );
    const workspaceIdArg = args.find((arg) =>
      arg.startsWith("--workspace-id=")
    );
    const listWorkspacesArg = args.includes("--list-workspaces");
    const listCollectionsArg = args.includes("--list-collections");

    // List workspaces
    if (listWorkspacesArg) {
      await listWorkspaces(apiKey);
      return;
    }

    // List collections
    if (listCollectionsArg) {
      await listCollections(apiKey);
      return;
    }

    // Validate arguments
    if (!fileArg) {
      log(`\n❌ Missing required argument: --file=<path>`, "red");
      log(`\nUsage:`, "yellow");
      log(`  # List workspaces and collections`, "reset");
      log(`  bun run postman-upload.ts --list-workspaces`, "cyan");
      log(`  bun run postman-upload.ts --list-collections`, "cyan");
      log(`\n  # Create new collection`, "reset");
      log(
        `  bun run postman-upload.ts --file=collection.json --workspace-id=WORKSPACE_ID`,
        "cyan"
      );
      log(`\n  # Update existing collection`, "reset");
      log(
        `  bun run postman-upload.ts --file=collection.json --collection-id=COLLECTION_ID`,
        "cyan"
      );
      process.exit(1);
    }

    const file = fileArg.split("=")[1];
    const collectionId = collectionIdArg?.split("=")[1];
    const workspaceId = workspaceIdArg?.split("=")[1];

    // Check if we're updating or creating
    if (!collectionId && !workspaceId) {
      log(
        `\n❌ Must provide either --collection-id (to update) or --workspace-id (to create)`,
        "red"
      );
      process.exit(1);
    }

    // Load and validate file
    log(`📁 Loading collection from: ${file}`, "cyan");

    if (!existsSync(file)) {
      throw new Error(`File not found: ${file}`);
    }

    const fileContent = await readFile(file, "utf-8");
    const data = JSON.parse(fileContent);
    const collection = validateCollection(data);

    // Upload or update
    let result: any;

    if (collectionId) {
      result = await updateCollection(collection, collectionId, apiKey);
    } else {
      result = await createCollection(collection, workspaceId!, apiKey);
    }

    log(`\n${"=".repeat(70)}`, "green");
    log(`✅ Upload Complete!`, "green");
    log(`${"=".repeat(70)}\n`, "green");

    if (result.collection) {
      const id = result.collection.uid || result.collection.id;
      log(`📋 Collection Details:`, "cyan");
      log(`   ID: ${id}`, "reset");
      log(`   Name: ${result.collection.name}`, "reset");

      if (id) {
        log(`\n🔗 View in Postman:`, "yellow");
        log(`   https://www.postman.com/collection/${id}`, "reset");
      }
    }
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
