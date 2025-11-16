#!/usr/bin/env bun

/**
 * Comparison Verification Tool
 *
 * Validates comparison claims before they are presented to users.
 * Forces evidence-based validation with random sampling.
 */

import { readFile } from "fs/promises";
import { existsSync } from "fs";

const colors = {
  reset: "\x1b[0m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
};

function log(message: string, color: keyof typeof colors = "reset"): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

interface VerificationResult {
  pass: boolean;
  confidence: "high" | "medium" | "low";
  issues: string[];
  evidence: string[];
  recommendation: string;
}

async function verifyComparison(
  file1Path: string,
  file2Path: string,
  claim: string
): Promise<VerificationResult> {
  const result: VerificationResult = {
    pass: true,
    confidence: "high",
    issues: [],
    evidence: [],
    recommendation: "",
  };

  log(`\n${"=".repeat(70)}`, "cyan");
  log(`VERIFICATION AGENT - CHALLENGING CLAIM`, "cyan");
  log(`${"=".repeat(70)}\n`, "cyan");

  log(`Claim: "${claim}"`, "yellow");
  log(`\n1. Source Validation...`, "blue");

  // Check if files exist
  if (!existsSync(file1Path)) {
    result.pass = false;
    result.issues.push(`File 1 not found: ${file1Path}`);
    return result;
  }
  if (!existsSync(file2Path)) {
    result.pass = false;
    result.issues.push(`File 2 not found: ${file2Path}`);
    return result;
  }

  // Check if files are the same
  if (file1Path === file2Path) {
    result.pass = false;
    result.confidence = "low";
    result.issues.push("❌ SAME FILE - Cannot compare file to itself");
    result.recommendation = "REJECT: Meaningless comparison";
    return result;
  }

  // Check for derivation by name
  const file1Name = file1Path.split("/").pop() || "";
  const file2Name = file2Path.split("/").pop() || "";

  if (
    (file1Name.includes("merchant") && file2Name.includes("openapi")) ||
    (file2Name.includes("merchant") && file1Name.includes("openapi")) ||
    file1Name.replace("-merchant", "") === file2Name ||
    file2Name.replace("-merchant", "") === file1Name
  ) {
    result.confidence = "low";
    result.issues.push(
      "⚠️  WARNING: Filenames suggest one may be derived from the other"
    );
    result.evidence.push(`File 1: ${file1Name}`);
    result.evidence.push(`File 2: ${file2Name}`);
  }

  log(`   File 1: ${file1Path}`, "reset");
  log(`   File 2: ${file2Path}`, "reset");

  // Load and parse files
  const content1 = await readFile(file1Path, "utf-8");
  const content2 = await readFile(file2Path, "utf-8");

  const spec1 = JSON.parse(content1);
  const spec2 = JSON.parse(content2);

  log(`\n2. Document Origins...`, "blue");
  log(`   Spec 1: ${spec1.info?.title || "Unknown"}`, "reset");
  log(`   Spec 2: ${spec2.info?.title || "Unknown"}`, "reset");

  // Check if one is subset of the other
  const paths1 = Object.keys(spec1.paths || {});
  const paths2 = Object.keys(spec2.paths || {});

  const paths1Set = new Set(paths1);
  const paths2Set = new Set(paths2);

  const allPaths2InPaths1 = paths2.every((p) => paths1Set.has(p));
  const allPaths1InPaths2 = paths1.every((p) => paths2Set.has(p));

  if (allPaths2InPaths1 && paths1.length > paths2.length) {
    result.confidence = "low";
    result.issues.push(
      "⚠️  DERIVATION DETECTED: All paths in Spec 2 exist in Spec 1 (subset)"
    );
    result.evidence.push(
      `Spec 1 has ${paths1.length} paths, Spec 2 has ${paths2.length} paths`
    );
    result.evidence.push("Spec 2 appears to be extracted from Spec 1");
  }

  if (allPaths1InPaths2 && paths2.length > paths1.length) {
    result.confidence = "low";
    result.issues.push(
      "⚠️  DERIVATION DETECTED: All paths in Spec 1 exist in Spec 2 (subset)"
    );
    result.evidence.push(
      `Spec 1 has ${paths1.length} paths, Spec 2 has ${paths2.length} paths`
    );
    result.evidence.push("Spec 1 appears to be extracted from Spec 2");
  }

  log(`\n3. Random Sample Verification (5 samples)...`, "blue");

  // Get common paths
  const commonPaths = paths1.filter((p) => paths2Set.has(p));

  if (commonPaths.length === 0) {
    result.issues.push("No common paths found - specs are completely different");
    result.pass = false;
    return result;
  }

  // Random sample 5 paths
  const sampleSize = Math.min(5, commonPaths.length);
  const sampledPaths: string[] = [];

  for (let i = 0; i < sampleSize; i++) {
    const randomIndex = Math.floor(Math.random() * commonPaths.length);
    sampledPaths.push(commonPaths[randomIndex]);
  }

  let descriptionDifferences = 0;
  let exampleDifferences = 0;
  let schemaDifferences = 0;

  for (const path of sampledPaths) {
    const methods = ["get", "post", "put", "delete", "patch"];

    for (const method of methods) {
      const op1 = spec1.paths[path]?.[method];
      const op2 = spec2.paths[path]?.[method];

      if (op1 && op2) {
        // Check description
        const desc1 = op1.description || null;
        const desc2 = op2.description || null;

        if (desc1 !== desc2) {
          descriptionDifferences++;
          result.evidence.push(
            `${method.toUpperCase()} ${path}:\n` +
              `  Spec 1 description: ${desc1 ? `"${desc1.substring(0, 100)}..."` : "null"}\n` +
              `  Spec 2 description: ${desc2 ? `"${desc2.substring(0, 100)}..."` : "null"}`
          );
        }

        // Check for examples in request body
        const reqBody1 = op1.requestBody?.content?.["application/json"]?.example;
        const reqBody2 = op2.requestBody?.content?.["application/json"]?.example;

        if (JSON.stringify(reqBody1) !== JSON.stringify(reqBody2)) {
          exampleDifferences++;
        }
      }
    }
  }

  log(`   Sampled paths: ${sampledPaths.length}`, "reset");
  log(`   Description differences: ${descriptionDifferences}`, descriptionDifferences > 0 ? "yellow" : "green");
  log(`   Example differences: ${exampleDifferences}`, exampleDifferences > 0 ? "yellow" : "green");

  // Check schemas
  const schemas1 = Object.keys(spec1.components?.schemas || {});
  const schemas2 = Object.keys(spec2.components?.schemas || {});

  log(`\n4. Schema Comparison...`, "blue");
  log(`   Spec 1 schemas: ${schemas1.length}`, "reset");
  log(`   Spec 2 schemas: ${schemas2.length}`, "reset");

  if (schemas1.length !== schemas2.length) {
    result.issues.push(
      `Schema count mismatch: ${schemas1.length} vs ${schemas2.length}`
    );
    result.confidence = "medium";
  }

  // Overall assessment
  log(`\n5. Overall Assessment...`, "blue");

  if (result.issues.length > 0) {
    log(`\n⚠️  Issues Found (${result.issues.length}):`, "yellow");
    result.issues.forEach((issue) => {
      log(`   - ${issue}`, "yellow");
    });
  }

  if (descriptionDifferences > 0) {
    result.issues.push(
      `Found ${descriptionDifferences} description differences in random sample`
    );
    result.pass = false;
  }

  if (result.confidence === "low") {
    result.recommendation =
      "⚠️  REVISE: Sources appear related. Verify they are from truly different origins.";
  } else if (result.issues.length > 0) {
    result.recommendation = `⚠️  PARTIAL: Claim needs qualification. Found ${result.issues.length} issues.`;
  } else {
    result.recommendation = "✅ APPROVE: Claim appears valid based on sampling";
  }

  return result;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    log(`\nUsage: bun run verify-comparison.ts <file1> <file2> "<claim>"`, "yellow");
    log(`\nExample:`, "cyan");
    log(`  bun run verify-comparison.ts openapi.json openapi-merchant-apis.json "Files are identical"`, "reset");
    process.exit(1);
  }

  const [file1, file2, claim] = args;

  const result = await verifyComparison(file1, file2, claim);

  log(`\n${"=".repeat(70)}`, "magenta");
  log(`VERIFICATION RESULT`, "magenta");
  log(`${"=".repeat(70)}\n`, "magenta");

  log(`Confidence: ${result.confidence.toUpperCase()}`, result.confidence === "high" ? "green" : result.confidence === "medium" ? "yellow" : "red");
  log(`Pass: ${result.pass ? "✅ YES" : "❌ NO"}`, result.pass ? "green" : "red");

  if (result.evidence.length > 0) {
    log(`\nEvidence:`, "blue");
    result.evidence.forEach((e) => {
      log(`${e}`, "reset");
    });
  }

  log(`\n${result.recommendation}`, result.recommendation.includes("✅") ? "green" : "yellow");

  log(`\n${"=".repeat(70)}\n`, "magenta");

  process.exit(result.pass ? 0 : 1);
}

if (import.meta.main) {
  main();
}
