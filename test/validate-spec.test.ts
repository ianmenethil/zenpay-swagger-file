import { test, expect, describe } from "bun:test";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

describe("validate-spec", () => {
  test("openapi.json exists", () => {
    expect(existsSync("openapi.json")).toBe(true);
  });

  test("openapi.json is valid JSON", async () => {
    const content = await readFile("openapi.json", "utf-8");
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test("openapi.json has required OpenAPI 3.1 fields", async () => {
    const content = await readFile("openapi.json", "utf-8");
    const spec = JSON.parse(content);

    expect(spec.openapi).toBe("3.1.1");
    expect(spec.info).toBeDefined();
    expect(spec.info.title).toBeDefined();
    expect(spec.info.version).toBeDefined();
    expect(spec.paths).toBeDefined();
  });

  test("validation script runs without errors", async () => {
    const proc = Bun.spawn(["bun", "run", "validate-spec.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);
  });

  test("spec has no validation errors (only warnings allowed)", async () => {
    const proc = Bun.spawn(["bun", "run", "validate-spec.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(proc.stdout).text();
    await proc.exited;

    // Should have "Schema validation passed"
    expect(output).toContain("Schema validation passed");
    // Should NOT contain error messages (warnings are OK)
    expect(output).not.toContain("error(s):");
  });
});
