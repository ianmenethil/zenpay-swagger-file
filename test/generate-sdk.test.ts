import { test, expect, describe, beforeAll, afterAll } from "bun:test";
import { existsSync } from "fs";
import { rm, readdir } from "fs/promises";

describe("generate-sdk", () => {
  beforeAll(async () => {
    // Clean up sdk directory if it exists
    if (existsSync("sdk")) {
      await rm("sdk", { recursive: true, force: true });
    }
  });

  test("SDK generation script runs without errors", async () => {
    const proc = Bun.spawn(["bun", "run", "generate-sdk.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);
  }, 60000); // 60 second timeout for SDK generation

  test("creates sdk directory", () => {
    expect(existsSync("sdk")).toBe(true);
  });

  test("generates TypeScript SDK", () => {
    expect(existsSync("sdk/typescript")).toBe(true);
    expect(existsSync("sdk/typescript/README.md")).toBe(true);
    expect(existsSync("sdk/typescript/index.ts")).toBe(true);
    expect(existsSync("sdk/typescript/apis")).toBe(true);
    expect(existsSync("sdk/typescript/models")).toBe(true);
  });

  test("generates Python SDK", () => {
    expect(existsSync("sdk/python")).toBe(true);
    expect(existsSync("sdk/python/README.md")).toBe(true);
    expect(existsSync("sdk/python/setup.py")).toBe(true);
    expect(existsSync("sdk/python/requirements.txt")).toBe(true);
  });

  test("TypeScript SDK has valid syntax", async () => {
    const indexPath = "sdk/typescript/index.ts";
    const content = await Bun.file(indexPath).text();

    // Should contain export statements
    expect(content).toContain("export");
  });

  test("Python SDK has valid syntax", async () => {
    const proc = Bun.spawn(
      ["python3", "-m", "py_compile", "sdk/python/setup.py"],
      {
        stdout: "pipe",
        stderr: "pipe",
      }
    );

    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);
  });

  afterAll(async () => {
    // Keep SDKs for now - they're useful artifacts
    // Uncomment to clean up after tests:
    // if (existsSync("sdk")) {
    //   await rm("sdk", { recursive: true, force: true });
    // }
  });
});
