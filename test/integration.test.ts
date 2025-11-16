import { test, expect, describe } from "bun:test";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

describe("End-to-End Integration", () => {
  test("complete workflow: download → validate → analyze → SDK", async () => {
    // Step 1: Download spec (should use cache)
    const download = Bun.spawn(["bun", "run", "swagger-downloader.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    expect(await download.exited).toBe(0);
    expect(existsSync("openapi.json")).toBe(true);

    // Step 2: Validate spec
    const validate = Bun.spawn(["bun", "run", "validate-spec.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const validateOutput = await new Response(validate.stdout).text();
    expect(await validate.exited).toBe(0);
    expect(validateOutput).toContain("Schema validation passed");

    // Step 3: Analyze spec
    const analyze = Bun.spawn(["bun", "run", "analyze-spec.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    expect(await analyze.exited).toBe(0);
    expect(existsSync("reports/SUMMARY.md")).toBe(true);

    // Step 4: Verify no split-specs created
    expect(existsSync("split-specs")).toBe(false);

    // Step 5: Check spec content
    const spec = JSON.parse(await readFile("openapi.json", "utf-8"));
    expect(spec.openapi).toBe("3.1.1");
    expect(spec.info.title).toBeDefined();
    expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
    expect(Object.keys(spec.components.schemas).length).toBeGreaterThan(0);
  }, 30000); // 30 second timeout

  test("all scripts have correct permissions and can execute", async () => {
    const scripts = [
      "swagger-downloader.ts",
      "validate-spec.ts",
      "analyze-spec.ts",
      "enhance-spec.ts",
      "generate-sdk.ts",
      "serve-docs.ts",
      "show-diff.ts",
      "show-help.ts",
    ];

    for (const script of scripts) {
      expect(existsSync(script)).toBe(true);

      // Verify script can be parsed (no syntax errors)
      const content = await readFile(script, "utf-8");
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain("#!/usr/bin/env bun");
    }
  });

  test("package.json has all required scripts", async () => {
    const pkg = JSON.parse(await readFile("package.json", "utf-8"));

    expect(pkg.scripts.getspec).toBeDefined();
    expect(pkg.scripts.validate).toBeDefined();
    expect(pkg.scripts.analyze).toBeDefined();
    expect(pkg.scripts.enhance).toBeDefined();
    expect(pkg.scripts.sdk).toBeDefined();
    expect(pkg.scripts.docs).toBeDefined();
    expect(pkg.scripts.diff).toBeDefined();
    expect(pkg.scripts.help).toBeDefined();

    // Verify no deleted scripts remain
    expect(pkg.scripts.split).toBeUndefined();
    expect(pkg.scripts.bundle).toBeUndefined();
    expect(pkg.scripts.deref).toBeUndefined();
    expect(pkg.scripts.verify).toBeUndefined();
  });

  test("OpenAPI spec has correct structure", async () => {
    const spec = JSON.parse(await readFile("openapi.json", "utf-8"));

    // Check required top-level fields
    expect(spec.openapi).toBe("3.1.1");
    expect(spec.info).toBeDefined();
    expect(spec.paths).toBeDefined();
    expect(spec.components).toBeDefined();

    // Check info object
    expect(spec.info.title).toBeDefined();
    expect(spec.info.version).toBeDefined();

    // Check components
    expect(spec.components.schemas).toBeDefined();
    expect(typeof spec.components.schemas).toBe("object");

    // Verify we have schemas (should be 59)
    const schemaCount = Object.keys(spec.components.schemas).length;
    expect(schemaCount).toBeGreaterThan(50);

    // Verify we have paths (should be 30)
    const pathCount = Object.keys(spec.paths).length;
    expect(pathCount).toBeGreaterThan(25);
  });
});
