#!/usr/bin/env bun

/**
 * Normalize and Diff OpenAPI Specs
 *
 * This tool:
 * 1. Reads both OpenAPI specs directly
 * 2. Extracts ALL documentation fields in a normalized structure
 * 3. Performs a complete field-by-field comparison
 * 4. Outputs a comprehensive diff
 */

import { writeFileSync } from 'fs';

interface NormalizedOperation {
  path: string;
  method: string;
  summary: string | null;
  description: string | null;
  operationId: string | null;
  tags: string[];
  deprecated: boolean;
  parameters: Array<{
    name: string;
    in: string;
    required: boolean;
    description: string | null;
    example: any;
    examples: any;
    schema: any;
  }>;
  requestBody: {
    description: string | null;
    required: boolean;
    content: Record<string, {
      example: any;
      examples: any;
      schema: any;
    }>;
  } | null;
  responses: Record<string, {
    description: string | null;
    content: Record<string, {
      example: any;
      examples: any;
      schema: any;
    }>;
  }>;
  security: any[];
}

interface NormalizedSpec {
  info: {
    title: string;
    version: string;
    description: string | null;
  };
  operations: NormalizedOperation[];
  schemas: Record<string, any>;
}

function normalizePath(path: string): string {
  return path.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, '{$1}');
}

async function normalizeSpec(filePath: string): Promise<NormalizedSpec> {
  console.error(`\n📖 Reading: ${filePath}`);

  // Read the file directly
  const spec = await Bun.file(filePath).json();

  console.error(`✅ Loaded successfully`);

  const normalized: NormalizedSpec = {
    info: {
      title: spec.info?.title || '',
      version: spec.info?.version || '',
      description: spec.info?.description || null
    },
    operations: [],
    schemas: spec.components?.schemas || {}
  };

  // Extract all operations
  for (const [path, pathItem] of Object.entries(spec.paths || {})) {
    const normalizedPath = normalizePath(path);

    for (const [method, operation] of Object.entries(pathItem as any)) {
      if (typeof operation !== 'object' || !operation) continue;
      if (['parameters', 'summary', 'description', '$ref', 'servers'].includes(method)) continue;

      const op: any = operation;

      // Extract parameters
      const parameters = [];
      if (op.parameters) {
        for (const param of op.parameters) {
          parameters.push({
            name: param.name,
            in: param.in,
            required: param.required || false,
            description: param.description || null,
            example: param.example || null,
            examples: param.examples || null,
            schema: param.schema || null
          });
        }
      }

      // Extract request body
      let requestBody = null;
      if (op.requestBody) {
        const rb = op.requestBody;
        const content: Record<string, any> = {};

        if (rb.content) {
          for (const [contentType, mediaType] of Object.entries(rb.content)) {
            const mt: any = mediaType;
            content[contentType] = {
              example: mt.example || null,
              examples: mt.examples || null,
              schema: mt.schema || null
            };
          }
        }

        requestBody = {
          description: rb.description || null,
          required: rb.required || false,
          content
        };
      }

      // Extract responses
      const responses: Record<string, any> = {};
      if (op.responses) {
        for (const [statusCode, response] of Object.entries(op.responses)) {
          const resp: any = response;
          const content: Record<string, any> = {};

          if (resp.content) {
            for (const [contentType, mediaType] of Object.entries(resp.content)) {
              const mt: any = mediaType;
              content[contentType] = {
                example: mt.example || null,
                examples: mt.examples || null,
                schema: mt.schema || null
              };
            }
          }

          responses[statusCode] = {
            description: resp.description || null,
            content
          };
        }
      }

      normalized.operations.push({
        path: normalizedPath,
        method: method.toUpperCase(),
        summary: op.summary || null,
        description: op.description || null,
        operationId: op.operationId || null,
        tags: op.tags || [],
        deprecated: op.deprecated || false,
        parameters,
        requestBody,
        responses,
        security: op.security || []
      });
    }
  }

  // Sort operations by path then method
  normalized.operations.sort((a, b) => {
    if (a.path !== b.path) return a.path.localeCompare(b.path);
    return a.method.localeCompare(b.method);
  });

  console.error(`✅ Normalized ${normalized.operations.length} operations`);

  return normalized;
}

function compareOperations(
  travelpay: NormalizedOperation | undefined,
  zenith: NormalizedOperation | undefined
): string {
  if (!travelpay && !zenith) return '';

  const path = travelpay?.path || zenith?.path || '';
  const method = travelpay?.method || zenith?.method || '';

  let output = `\n## ${method} ${path}\n\n`;

  // Summary
  if (travelpay?.summary || zenith?.summary) {
    output += '### Summary\n\n';
    output += '| Source | Value |\n';
    output += '|--------|-------|\n';
    output += `| TravelPay | ${travelpay?.summary || '(none)'} |\n`;
    output += `| Zenith | ${zenith?.summary || '(none)'} |\n`;
    output += `| **Match** | ${travelpay?.summary === zenith?.summary ? '✅ YES' : '❌ NO'} |\n\n`;
  }

  // Description
  if (travelpay?.description || zenith?.description) {
    output += '### Description\n\n';
    output += '| Source | Value |\n';
    output += '|--------|-------|\n';
    output += `| TravelPay | ${travelpay?.description || '(none)'} |\n`;
    output += `| Zenith | ${zenith?.description || '(none)'} |\n`;
    output += `| **Match** | ${travelpay?.description === zenith?.description ? '✅ YES' : '❌ NO'} |\n\n`;
  }

  // OperationId
  output += '### OperationId\n\n';
  output += '| Source | Value |\n';
  output += '|--------|-------|\n';
  output += `| TravelPay | ${travelpay?.operationId || '(none)'} |\n`;
  output += `| Zenith | ${zenith?.operationId || '(none)'} |\n`;
  output += `| **Match** | ${travelpay?.operationId === zenith?.operationId ? '✅ YES' : '❌ NO'} |\n\n`;

  // Tags
  const tTags = (travelpay?.tags || []).join(', ');
  const zTags = (zenith?.tags || []).join(', ');
  if (tTags || zTags) {
    output += '### Tags\n\n';
    output += '| Source | Value |\n';
    output += '|--------|-------|\n';
    output += `| TravelPay | ${tTags || '(none)'} |\n`;
    output += `| Zenith | ${zTags || '(none)'} |\n`;
    output += `| **Match** | ${tTags === zTags ? '✅ YES' : '❌ NO'} |\n\n`;
  }

  // Parameters
  const tParams = travelpay?.parameters || [];
  const zParams = zenith?.parameters || [];
  const allParamNames = new Set([
    ...tParams.map(p => p.name),
    ...zParams.map(p => p.name)
  ]);

  if (allParamNames.size > 0) {
    output += '### Parameters\n\n';
    output += '| Parameter | Source | In | Required | Description | Example | Examples | Schema |\n';
    output += '|-----------|--------|-------|----------|-------------|---------|----------|--------|\n';

    for (const paramName of allParamNames) {
      const tParam = tParams.find(p => p.name === paramName);
      const zParam = zParams.find(p => p.name === paramName);

      if (tParam) {
        const examplesStr = tParam.examples ? JSON.stringify(tParam.examples).substring(0, 50) : '(none)';
        const schemaStr = tParam.schema ? JSON.stringify(tParam.schema).substring(0, 50) : '(none)';
        output += `| ${paramName} | TravelPay | ${tParam.in} | ${tParam.required} | ${tParam.description || '(none)'} | ${tParam.example || '(none)'} | ${examplesStr} | ${schemaStr} |\n`;
      }
      if (zParam) {
        const examplesStr = zParam.examples ? JSON.stringify(zParam.examples).substring(0, 50) : '(none)';
        const schemaStr = zParam.schema ? JSON.stringify(zParam.schema).substring(0, 50) : '(none)';
        output += `| ${paramName} | Zenith | ${zParam.in} | ${zParam.required} | ${zParam.description || '(none)'} | ${zParam.example || '(none)'} | ${examplesStr} | ${schemaStr} |\n`;
      }
    }
    output += '\n';
  }

  // Request Body
  if (travelpay?.requestBody || zenith?.requestBody) {
    output += '### Request Body\n\n';
    output += '| Source | Required | Description | Example | Examples | Schema (first 200 chars) |\n';
    output += '|--------|----------|-------------|---------|----------|--------|\n';

    if (travelpay?.requestBody) {
      const example = travelpay.requestBody.content?.['application/json']?.example || '(none)';
      const examples = travelpay.requestBody.content?.['application/json']?.examples || null;
      const schema = travelpay.requestBody.content?.['application/json']?.schema || null;
      const exampleStr = typeof example === 'object' ? JSON.stringify(example, null, 2).substring(0, 100) : example;
      const examplesStr = examples ? JSON.stringify(examples).substring(0, 100) : '(none)';
      const schemaStr = schema ? JSON.stringify(schema).substring(0, 200) : '(none)';
      output += `| TravelPay | ${travelpay.requestBody.required} | ${travelpay.requestBody.description || '(none)'} | ${exampleStr} | ${examplesStr} | ${schemaStr} |\n`;
    } else {
      output += `| TravelPay | - | (none) | (none) | (none) | (none) |\n`;
    }

    if (zenith?.requestBody) {
      const example = zenith.requestBody.content?.['application/json']?.example || '(none)';
      const examples = zenith.requestBody.content?.['application/json']?.examples || null;
      const schema = zenith.requestBody.content?.['application/json']?.schema || null;
      const exampleStr = typeof example === 'object' ? JSON.stringify(example, null, 2).substring(0, 100) : example;
      const examplesStr = examples ? JSON.stringify(examples).substring(0, 100) : '(none)';
      const schemaStr = schema ? JSON.stringify(schema).substring(0, 200) : '(none)';
      output += `| Zenith | ${zenith.requestBody.required} | ${zenith.requestBody.description || '(none)'} | ${exampleStr} | ${examplesStr} | ${schemaStr} |\n`;
    } else {
      output += `| Zenith | - | (none) | (none) | (none) | (none) |\n`;
    }
    output += '\n';
  }

  // Responses
  const allStatusCodes = new Set([
    ...Object.keys(travelpay?.responses || {}),
    ...Object.keys(zenith?.responses || {})
  ]);

  if (allStatusCodes.size > 0) {
    output += '### Responses\n\n';
    output += '| Status | Source | Description | Example | Examples | Schema (first 200 chars) |\n';
    output += '|--------|--------|-------------|---------|----------|--------|\n';

    for (const code of Array.from(allStatusCodes).sort()) {
      const tResp = travelpay?.responses?.[code];
      const zResp = zenith?.responses?.[code];

      if (tResp) {
        const example = tResp.content?.['application/json']?.example || '(none)';
        const examples = tResp.content?.['application/json']?.examples || null;
        const schema = tResp.content?.['application/json']?.schema || null;
        const exampleStr = typeof example === 'object' ? JSON.stringify(example, null, 2).substring(0, 100) : example;
        const examplesStr = examples ? JSON.stringify(examples).substring(0, 100) : '(none)';
        const schemaStr = schema ? JSON.stringify(schema).substring(0, 200) : '(none)';
        output += `| ${code} | TravelPay | ${tResp.description || '(none)'} | ${exampleStr} | ${examplesStr} | ${schemaStr} |\n`;
      }

      if (zResp) {
        const example = zResp.content?.['application/json']?.example || '(none)';
        const examples = zResp.content?.['application/json']?.examples || null;
        const schema = zResp.content?.['application/json']?.schema || null;
        const exampleStr = typeof example === 'object' ? JSON.stringify(example, null, 2).substring(0, 100) : example;
        const examplesStr = examples ? JSON.stringify(examples).substring(0, 100) : '(none)';
        const schemaStr = schema ? JSON.stringify(schema).substring(0, 200) : '(none)';
        output += `| ${code} | Zenith | ${zResp.description || '(none)'} | ${exampleStr} | ${examplesStr} | ${schemaStr} |\n`;
      }
    }
    output += '\n';
  }

  // Security
  const tSec = JSON.stringify(travelpay?.security || []);
  const zSec = JSON.stringify(zenith?.security || []);
  if (tSec !== '[]' || zSec !== '[]') {
    output += '### Security\n\n';
    output += '| Source | Value |\n';
    output += '|--------|-------|\n';
    output += `| TravelPay | ${tSec} |\n`;
    output += `| Zenith | ${zSec} |\n`;
    output += `| **Match** | ${tSec === zSec ? '✅ YES' : '❌ NO'} |\n\n`;
  }

  return output;
}

async function main() {
  const travelpayFile = '/home/user/zenpay-swagger-file/openapi.json';
  const zenithFile = '/home/user/zenpay-swagger-file/zenith-openapi-31.json';

  console.error('\n🔍 NORMALIZING AND COMPARING OPENAPI SPECS\n');
  console.error('='.repeat(80));

  // Normalize both specs
  const travelpay = await normalizeSpec(travelpayFile);
  const zenith = await normalizeSpec(zenithFile);

  // Save normalized specs for inspection
  writeFileSync(
    '/home/user/zenpay-swagger-file/travelpay-normalized.json',
    JSON.stringify(travelpay, null, 2)
  );
  writeFileSync(
    '/home/user/zenpay-swagger-file/zenith-normalized.json',
    JSON.stringify(zenith, null, 2)
  );

  console.error(`\n✅ Saved normalized specs:`);
  console.error(`   - travelpay-normalized.json`);
  console.error(`   - zenith-normalized.json`);

  // Build operation lookup
  const tOps = new Map<string, NormalizedOperation>();
  const zOps = new Map<string, NormalizedOperation>();

  for (const op of travelpay.operations) {
    tOps.set(`${op.method} ${op.path}`, op);
  }

  for (const op of zenith.operations) {
    zOps.set(`${op.method} ${op.path}`, op);
  }

  // Find all unique operation keys
  const allKeys = new Set([...tOps.keys(), ...zOps.keys()]);

  console.error(`\n📊 Comparison Stats:`);
  console.error(`   - TravelPay operations: ${tOps.size}`);
  console.error(`   - Zenith operations: ${zOps.size}`);
  console.error(`   - Total unique operations: ${allKeys.size}`);
  console.error(`   - Shared operations: ${[...allKeys].filter(k => tOps.has(k) && zOps.has(k)).length}`);

  // Generate comparison report
  let report = '# Complete OpenAPI Comparison: TravelPay vs Zenith\n\n';
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `**TravelPay:** ${travelpay.info.title} v${travelpay.info.version}\n`;
  report += `**Zenith:** ${zenith.info.title} v${zenith.info.version}\n\n`;
  report += '---\n\n';
  report += '# Operations Comparison\n';

  for (const key of Array.from(allKeys).sort()) {
    const tOp = tOps.get(key);
    const zOp = zOps.get(key);

    if (!tOp && zOp) {
      report += `\n## ${key}\n\n`;
      report += `**Status:** ⚠️ Only in Zenith\n`;
    } else if (tOp && !zOp) {
      report += `\n## ${key}\n\n`;
      report += `**Status:** ⚠️ Only in TravelPay\n`;
    }

    report += compareOperations(tOp, zOp);
  }

  // Write report
  const outputFile = '/home/user/zenpay-swagger-file/NORMALIZED-DIFF.md';
  writeFileSync(outputFile, report);

  console.error(`\n✅ Comparison complete!`);
  console.error(`   📄 Report: NORMALIZED-DIFF.md`);
  console.error(`\n`);

  // Print to stdout
  console.log(report);
}

main().catch(console.error);
