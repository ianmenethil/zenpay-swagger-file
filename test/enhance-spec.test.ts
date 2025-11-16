import { test, expect, describe, beforeAll, afterAll } from "bun:test";
import { existsSync } from "fs";
import { readFile, rm, copyFile } from "fs/promises";

describe("enhance-spec", () => {
  beforeAll(async () => {
    // Backup openapi.json
    if (existsSync("openapi.json")) {
      await copyFile("openapi.json", "openapi.json.backup");
    }

    // Remove enhanced file if exists
    if (existsSync("openapi-enhanced.json")) {
      await rm("openapi-enhanced.json");
    }
  });

  test("enhance preview mode runs without errors", async () => {
    const proc = Bun.spawn(
      ["bun", "run", "enhance-spec.ts", "--route", "sessions"],
      {
        stdout: "pipe",
        stderr: "pipe",
      }
    );

    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);
  });

  test("preview mode creates enhanced file", () => {
    expect(existsSync("openapi-enhanced.json")).toBe(true);
  });

  test("preview mode does NOT modify original spec", async () => {
    const original = await readFile("openapi.json", "utf-8");
    const backup = await readFile("openapi.json.backup", "utf-8");

    expect(original).toBe(backup);
  });

  test("enhanced file is valid JSON", async () => {
    const content = await readFile("openapi-enhanced.json", "utf-8");
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test("enhanced file has OpenAPI structure", async () => {
    const content = await readFile("openapi-enhanced.json", "utf-8");
    const spec = JSON.parse(content);

    expect(spec.openapi).toBeDefined();
    expect(spec.paths).toBeDefined();
  });

  test("apply mode modifies original spec", async () => {
    // Run enhance with --apply flag
    const proc = Bun.spawn(
      ["bun", "run", "enhance-spec.ts", "--route", "diagnostics", "--apply"],
      {
        stdout: "pipe",
        stderr: "pipe",
      }
    );

    await proc.exited;

    // Check if spec was modified
    const current = await readFile("openapi.json", "utf-8");
    const backup = await readFile("openapi.json.backup", "utf-8");

    // Should be different after apply
    expect(current).not.toBe(backup);
  });

  test("enhanced spec is still valid", async () => {
    const proc = Bun.spawn(["bun", "run", "validate-spec.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    expect(exitCode).toBe(0);
    expect(output).toContain("Schema validation passed");
  });

  afterAll(async () => {
    // Restore original spec
    if (existsSync("openapi.json.backup")) {
      await copyFile("openapi.json.backup", "openapi.json");
      await rm("openapi.json.backup");
    }

    // Clean up enhanced file
    if (existsSync("openapi-enhanced.json")) {
      await rm("openapi-enhanced.json");
    }
  });
});
