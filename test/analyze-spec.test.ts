import { test, expect, describe, beforeAll, afterAll } from "bun:test";
import { existsSync } from "fs";
import { readdir, rm } from "fs/promises";

describe("analyze-spec", () => {
  beforeAll(async () => {
    // Clean up reports directory if it exists
    if (existsSync("reports")) {
      await rm("reports", { recursive: true, force: true });
    }
  });

  test("analyze script runs without errors", async () => {
    const proc = Bun.spawn(["bun", "run", "analyze-spec.ts"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const exitCode = await proc.exited;
    expect(exitCode).toBe(0);
  });

  test("creates reports directory", () => {
    expect(existsSync("reports")).toBe(true);
  });

  test("does NOT create split-specs directory", () => {
    expect(existsSync("split-specs")).toBe(false);
  });

  test("generates SUMMARY.md report", () => {
    expect(existsSync("reports/SUMMARY.md")).toBe(true);
  });

  test("generates individual route reports", async () => {
    const files = await readdir("reports");
    const routeReports = files.filter(f => f.endsWith(".md") && f !== "SUMMARY.md");

    // Should have multiple route reports (at least 5)
    expect(routeReports.length).toBeGreaterThan(5);

    // Check for specific routes
    expect(files).toContain("payments.md");
    expect(files).toContain("customers.md");
    expect(files).toContain("sessions.md");
  });

  test("reports contain quality scores", async () => {
    const summaryContent = await Bun.file("reports/SUMMARY.md").text();

    // Should contain score indicators
    expect(summaryContent).toMatch(/\d+\/100/); // Score format: XX/100
    expect(summaryContent).toContain("Issues");
  });

  afterAll(async () => {
    // Clean up
    if (existsSync("reports")) {
      await rm("reports", { recursive: true, force: true });
    }
  });
});
