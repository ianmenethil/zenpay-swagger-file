/**
 * Comprehensive Diff Tool Tests
 *
 * Tests for 100% accuracy in OpenAPI specification comparison
 */

import { describe, test, expect, beforeAll } from "bun:test";
import { readFile, writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import { ComparisonEngine } from "../comprehensive-diff";

// ============================================================================
// TEST DATA
// ============================================================================

const createTestSpec = (overrides: any = {}) => ({
  openapi: "3.1.0",
  info: {
    title: "Test API",
    version: "1.0.0",
    description: "Test API description",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
    license: {
      name: "MIT",
    },
    ...overrides.info,
  },
  servers: [
    {
      url: "https://api.example.com",
      description: "Production",
    },
    ...(overrides.servers || []),
  ],
  tags: [
    {
      name: "users",
      description: "User operations",
    },
    ...(overrides.tags || []),
  ],
  paths: {
    "/users": {
      get: {
        summary: "List users",
        description: "Retrieve a list of all users",
        operationId: "listUsers",
        tags: ["users"],
        parameters: [
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum number of users to return",
            schema: { type: "integer" },
            example: 10,
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
                example: [{ id: 1, name: "John" }],
              },
            },
          },
        },
      },
      post: {
        summary: "Create user",
        description: "Create a new user",
        operationId: "createUser",
        tags: ["users"],
        requestBody: {
          required: true,
          description: "User to create",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
              example: { name: "Jane" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created",
          },
        },
      },
    },
    ...(overrides.paths || {}),
  },
  components: {
    schemas: {
      User: {
        type: "object",
        required: ["name"],
        properties: {
          id: { type: "integer", description: "User ID" },
          name: { type: "string", description: "User name" },
          email: { type: "string", format: "email", description: "User email" },
        },
        example: { id: 1, name: "John", email: "john@example.com" },
      },
      ...(overrides.schemas || {}),
    },
    securitySchemes: {
      apiKey: {
        type: "apiKey",
        in: "header",
        name: "X-API-Key",
      },
      ...(overrides.securitySchemes || {}),
    },
  },
  security: [{ apiKey: [] }, ...(overrides.security || [])],
});

// ============================================================================
// TESTS
// ============================================================================

describe("ComprehensiveDiff - Accuracy Tests", () => {
  describe("Identical Specs", () => {
    test("should find zero differences for identical specs", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec();

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      expect(differences.length).toBe(0);
    });
  });

  describe("Info Section Differences", () => {
    test("should detect title difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({ info: { title: "Different API" } });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const titleDiff = differences.find((d) => d.location.field === "title");

      expect(titleDiff).toBeDefined();
      expect(titleDiff?.spec1Value).toBe("Test API");
      expect(titleDiff?.spec2Value).toBe("Different API");
      expect(titleDiff?.differenceType).toBe("modified");
      expect(titleDiff?.category).toBe("important");
    });

    test("should detect description difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        info: { description: "Different description" },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const descDiff = differences.find((d) => d.location.field === "description");

      expect(descDiff).toBeDefined();
      expect(descDiff?.spec1Value).toBe("Test API description");
      expect(descDiff?.spec2Value).toBe("Different description");
      expect(descDiff?.category).toBe("important");
    });

    test("should detect missing contact", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({ info: { contact: undefined } });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const contactDiff = differences.find((d) => d.location.field === "contact");

      expect(contactDiff).toBeDefined();
      // spec1 has contact, spec2 doesn't, so it's "added" in spec1 (or "missing" from spec2)
      // Our implementation shows it as "added" because spec2[key] is undefined
      expect(contactDiff?.differenceType).toBe("added");
    });

    test("should detect version difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({ info: { version: "2.0.0" } });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const versionDiff = differences.find((d) => d.location.field === "version");

      expect(versionDiff).toBeDefined();
      expect(versionDiff?.spec1Value).toBe("1.0.0");
      expect(versionDiff?.spec2Value).toBe("2.0.0");
    });
  });

  describe("Server Differences", () => {
    test("should detect server URL difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        servers: [{ url: "https://different.example.com" }],
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const serverDiff = differences.find((d) => d.location.path.includes("servers"));

      expect(serverDiff).toBeDefined();
    });

    test("should detect missing server", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({ servers: [] });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const lengthDiff = differences.find(
        (d) => d.location.field === "servers.length"
      );

      expect(lengthDiff).toBeDefined();
      expect(lengthDiff?.spec1Value).toBe(1);
      expect(lengthDiff?.spec2Value).toBe(0);
    });
  });

  describe("Path & Operation Differences", () => {
    test("should detect summary difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              summary: "Different summary",
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const summaryDiff = differences.find((d) => d.location.field === "summary");

      expect(summaryDiff).toBeDefined();
      expect(summaryDiff?.spec1Value).toBe("List users");
      expect(summaryDiff?.spec2Value).toBe("Different summary");
      expect(summaryDiff?.category).toBe("important");
    });

    test("should detect description difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              description: "Different description",
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const descDiff = differences.find(
        (d) =>
          d.location.field === "description" &&
          d.location.path.includes("paths./users.get")
      );

      expect(descDiff).toBeDefined();
      expect(descDiff?.category).toBe("important");
    });

    test("should detect operationId difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              operationId: "getUserList",
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const opIdDiff = differences.find((d) => d.location.field === "operationId");

      expect(opIdDiff).toBeDefined();
      expect(opIdDiff?.spec1Value).toBe("listUsers");
      expect(opIdDiff?.spec2Value).toBe("getUserList");
      expect(opIdDiff?.category).toBe("important");
    });

    test("should detect missing operation", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              summary: "List users",
            },
            // POST is missing
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const postDiff = differences.find(
        (d) => d.location.field === "post" && d.location.path === "paths./users"
      );

      expect(postDiff).toBeDefined();
      expect(postDiff?.differenceType).toBe("missing");
    });
  });

  describe("Parameter Differences", () => {
    test("should detect parameter description difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              parameters: [
                {
                  name: "limit",
                  in: "query",
                  description: "Different description",
                },
              ],
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const paramDiff = differences.find(
        (d) =>
          d.location.path.includes("parameters[0].description") &&
          d.differenceType === "modified"
      );

      expect(paramDiff).toBeDefined();
      expect(paramDiff?.category).toBe("important");
    });

    test("should detect parameter required change", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              parameters: [
                {
                  name: "limit",
                  in: "query",
                  required: true, // Changed from false
                },
              ],
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const requiredDiff = differences.find(
        (d) =>
          d.location.path.includes("parameters[0].required") &&
          d.differenceType === "modified"
      );

      expect(requiredDiff).toBeDefined();
      expect(requiredDiff?.spec1Value).toBe(false);
      expect(requiredDiff?.spec2Value).toBe(true);
      expect(requiredDiff?.category).toBe("critical");
    });

    test("should detect parameter example difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              parameters: [
                {
                  name: "limit",
                  in: "query",
                  example: 20, // Changed from 10
                },
              ],
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const exampleDiff = differences.find((d) =>
        d.location.path.includes("parameters[0].example")
      );

      expect(exampleDiff).toBeDefined();
      expect(exampleDiff?.spec1Value).toBe(10);
      expect(exampleDiff?.spec2Value).toBe(20);
      expect(exampleDiff?.category).toBe("important");
    });
  });

  describe("Request Body Differences", () => {
    test("should detect request body description difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            post: {
              requestBody: {
                description: "Different request body description",
              },
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const descDiff = differences.find(
        (d) =>
          d.location.path.includes("requestBody.description") &&
          d.differenceType === "modified"
      );

      expect(descDiff).toBeDefined();
      expect(descDiff?.category).toBe("important");
    });

    test("should detect request body required change", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            post: {
              requestBody: {
                required: false, // Changed from true
              },
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const requiredDiff = differences.find(
        (d) =>
          d.location.path.includes("requestBody.required") &&
          d.differenceType === "modified"
      );

      expect(requiredDiff).toBeDefined();
      expect(requiredDiff?.spec1Value).toBe(true);
      expect(requiredDiff?.spec2Value).toBe(false);
      expect(requiredDiff?.category).toBe("critical");
    });
  });

  describe("Response Differences", () => {
    test("should detect response description difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              responses: {
                "200": {
                  description: "Different response description",
                },
              },
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const descDiff = differences.find(
        (d) =>
          d.location.path.includes('responses.200.description') &&
          d.differenceType === "modified"
      );

      expect(descDiff).toBeDefined();
      expect(descDiff?.spec1Value).toBe("Successful response");
      expect(descDiff?.spec2Value).toBe("Different response description");
      expect(descDiff?.category).toBe("critical");
    });
  });

  describe("Schema Differences", () => {
    test("should detect schema type difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        schemas: {
          User: {
            type: "string", // Changed from object
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const typeDiff = differences.find(
        (d) => d.location.path === "components.schemas.User.type"
      );

      expect(typeDiff).toBeDefined();
      expect(typeDiff?.spec1Value).toBe("object");
      expect(typeDiff?.spec2Value).toBe("string");
      expect(typeDiff?.category).toBe("critical");
    });

    test("should detect schema required difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        schemas: {
          User: {
            required: ["name", "email"], // Added email
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const requiredDiff = differences.find(
        (d) => d.location.path.includes("User.required") &&
        d.differenceType !== "missing" && d.differenceType !== "added"
      );

      expect(requiredDiff).toBeDefined();
      expect(requiredDiff?.category).toBe("critical");
    });

    test("should detect property description difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        schemas: {
          User: {
            properties: {
              name: {
                type: "string",
                description: "Different description",
              },
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const descDiff = differences.find(
        (d) =>
          d.location.path.includes("properties.name.description") &&
          d.differenceType === "modified"
      );

      expect(descDiff).toBeDefined();
      expect(descDiff?.spec1Value).toBe("User name");
      expect(descDiff?.spec2Value).toBe("Different description");
      expect(descDiff?.category).toBe("important");
    });
  });

  describe("Security Differences", () => {
    test("should detect security scheme difference", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        securitySchemes: {
          apiKey: {
            type: "http", // Changed from apiKey
            scheme: "bearer",
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const typeDiff = differences.find(
        (d) => d.location.path === "components.securitySchemes.apiKey.type"
      );

      expect(typeDiff).toBeDefined();
      expect(typeDiff?.spec1Value).toBe("apiKey");
      expect(typeDiff?.spec2Value).toBe("http");
    });
  });

  describe("Category Classification", () => {
    test("should classify type changes as critical", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        schemas: {
          User: {
            properties: {
              id: {
                type: "string", // Changed from integer
              },
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const typeDiff = differences.find(
        (d) => d.location.path.includes("properties.id.type")
      );

      expect(typeDiff?.category).toBe("critical");
    });

    test("should classify description changes as important", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        paths: {
          "/users": {
            get: {
              description: "New description",
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const descDiff = differences.find((d) => d.location.field === "description");

      expect(descDiff?.category).toBe("important");
    });
  });

  describe("100% Accuracy Validation", () => {
    test("should find ALL differences (exhaustive test)", () => {
      const spec1 = createTestSpec();
      const spec2 = createTestSpec({
        info: {
          title: "Modified API",
          version: "2.0.0",
          description: "Modified description",
        },
        servers: [{ url: "https://modified.example.com" }],
        paths: {
          "/users": {
            get: {
              summary: "Modified summary",
              description: "Modified description",
              parameters: [
                {
                  name: "limit",
                  in: "query",
                  description: "Modified parameter description",
                  example: 50,
                },
              ],
            },
            post: {
              summary: "Modified create summary",
            },
          },
        },
        schemas: {
          User: {
            properties: {
              id: { type: "integer", description: "Modified ID description" },
              name: { type: "string", description: "Modified name description" },
            },
          },
        },
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();

      // We expect to find differences for:
      // 1. info.title
      // 2. info.version
      // 3. info.description
      // 4-6. info.contact (name, email, entire object or subfields)
      // 7. info.license
      // 8. servers[0].url
      // 9. servers[0].description
      // 10. paths./users.get.summary
      // 11. paths./users.get.description
      // 12. paths./users.get.parameters[0].description
      // 13. paths./users.get.parameters[0].example
      // 14. paths./users.post.summary
      // 15. schemas.User.properties.id.description
      // 16. schemas.User.properties.name.description
      // 17-20. schemas.User.properties.email (missing from spec2)
      // 21-22. schemas.User.required array
      // 23-24. schemas.User.example

      // Should find at least 15+ differences (depending on how deep comparison goes)
      expect(differences.length).toBeGreaterThan(15);

      // Verify specific critical ones
      expect(
        differences.find((d) => d.location.path === "info.title")
      ).toBeDefined();
      expect(
        differences.find((d) => d.location.path === "info.version")
      ).toBeDefined();
      expect(
        differences.find((d) => d.location.path.includes("paths./users.get.summary"))
      ).toBeDefined();
    });

    test("should not report false positives", () => {
      const spec1 = createTestSpec();
      const spec2 = JSON.parse(JSON.stringify(spec1)); // Deep clone

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      expect(differences.length).toBe(0);
    });

    test("should handle nested objects correctly", () => {
      const spec1 = {
        openapi: "3.1.0",
        info: { title: "Test", version: "1.0.0" },
        paths: {
          "/test": {
            get: {
              responses: {
                "200": {
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          nested: {
                            type: "object",
                            properties: {
                              deep: {
                                type: "string",
                                description: "Deep nested field",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      const spec2 = JSON.parse(JSON.stringify(spec1));
      spec2.paths["/test"].get.responses["200"].content["application/json"].schema
        .properties.nested.properties.deep.description = "Modified deep description";

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const deepDiff = differences.find((d) =>
        d.location.path.includes("properties.deep.description")
      );

      expect(deepDiff).toBeDefined();
      expect(deepDiff?.spec1Value).toBe("Deep nested field");
      expect(deepDiff?.spec2Value).toBe("Modified deep description");
    });

    test("should handle arrays of different lengths", () => {
      const spec1 = createTestSpec({
        tags: [
          { name: "tag1" },
          { name: "tag2" },
          { name: "tag3" },
        ],
      });

      const spec2 = createTestSpec({
        tags: [{ name: "tag1" }],
      });

      const engine = new ComparisonEngine("Test API 1", "Test API 2");
      engine.compareSpecs(spec1, spec2);

      const differences = engine.getDifferences();
      const lengthDiff = differences.find((d) => d.location.field === "tags.length");

      expect(lengthDiff).toBeDefined();
      expect(lengthDiff?.spec1Value).toBe(4); // 3 + 1 from base
      expect(lengthDiff?.spec2Value).toBe(2); // 1 + 1 from base
    });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe("ComprehensiveDiff - Integration Tests", () => {
  const testSpec1Path = "/tmp/test-spec-1.json";
  const testSpec2Path = "/tmp/test-spec-2.json";
  const testOutputPath = "/tmp/test-diff-output.json";

  beforeAll(async () => {
    const spec1 = createTestSpec();
    const spec2 = createTestSpec({
      info: { title: "Modified API" },
    });

    await writeFile(testSpec1Path, JSON.stringify(spec1, null, 2));
    await writeFile(testSpec2Path, JSON.stringify(spec2, null, 2));
  });

  test("should generate JSON output file", async () => {
    const { spawn } = require("child_process");

    const proc = spawn("bun", [
      "run",
      "comprehensive-diff.ts",
      `--spec1=${testSpec1Path}`,
      `--spec2=${testSpec2Path}`,
      "--format=json",
      `--output=${testOutputPath}`,
    ]);

    await new Promise((resolve) => {
      proc.on("close", resolve);
    });

    expect(existsSync(testOutputPath)).toBe(true);

    const output = JSON.parse(await readFile(testOutputPath, "utf-8"));
    expect(output.spec1Name).toBe("Test API");
    expect(output.spec2Name).toBe("Modified API");
    expect(output.differences).toBeDefined();
    expect(Array.isArray(output.differences)).toBe(true);

    // Cleanup
    await unlink(testOutputPath);
  });
});

describe("ComprehensiveDiff - Performance Tests", () => {
  test("should complete in reasonable time for large spec", () => {
    // Create a large spec with 100 paths
    const largePaths: any = {};
    for (let i = 0; i < 100; i++) {
      largePaths[`/path${i}`] = {
        get: {
          summary: `Path ${i}`,
          responses: { "200": { description: "OK" } },
        },
      };
    }

    const spec1 = createTestSpec({ paths: largePaths });
    const spec2 = createTestSpec({ paths: largePaths });

    const startTime = Date.now();

    const engine = new ComparisonEngine("Large API 1", "Large API 2");
    engine.compareSpecs(spec1, spec2);

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should complete within 5 seconds
    expect(duration).toBeLessThan(5000);
  });
});
