#!/usr/bin/env node

/**
 * Verify that no data was lost during Swagger 2.0 → OpenAPI 3.1 conversion
 */

const fs = require('fs');

const swagger = JSON.parse(fs.readFileSync('swagger.json', 'utf8'));
const openapi = JSON.parse(fs.readFileSync('openapi.json', 'utf8'));

console.log('\n🔍 Detailed Conversion Verification\n');
console.log('='.repeat(60));

let issues = 0;
let checks = 0;

// Check a few specific operations for data loss
const testPaths = [
  { path: '/v2/payments', method: 'post' },
  { path: '/v2/customers', method: 'post' },
  { path: '/v2/payments/{paymentReference}', method: 'get' }
];

console.log('\n📋 Checking Operations:\n');

for (const { path, method } of testPaths) {
  const swaggerOp = swagger.paths[path]?.[method];
  const openapiOp = openapi.paths[path]?.[method];

  if (!swaggerOp || !openapiOp) continue;

  console.log(`\n${method.toUpperCase()} ${path}:`);

  checks++;
  if (swaggerOp.summary === openapiOp.summary) {
    console.log(`  ✓ Summary preserved: "${swaggerOp.summary}"`);
  } else {
    console.log(`  ✗ Summary LOST!`);
    console.log(`    Swagger: "${swaggerOp.summary}"`);
    console.log(`    OpenAPI: "${openapiOp.summary}"`);
    issues++;
  }

  checks++;
  if (swaggerOp.operationId === openapiOp.operationId) {
    console.log(`  ✓ OperationId preserved: "${swaggerOp.operationId}"`);
  } else {
    console.log(`  ✗ OperationId LOST!`);
    issues++;
  }

  checks++;
  if (swaggerOp.description === openapiOp.description) {
    console.log(`  ✓ Description preserved`);
  } else {
    console.log(`  ✗ Description MISMATCH!`);
    issues++;
  }

  // Check parameters
  if (swaggerOp.parameters) {
    const swaggerParams = swaggerOp.parameters.filter(p => p.in !== 'body');
    const openapiParams = openapiOp.parameters || [];

    checks++;
    if (swaggerParams.length === openapiParams.length) {
      console.log(`  ✓ Parameters count: ${swaggerParams.length}`);

      for (const swaggerParam of swaggerParams) {
        const openapiParam = openapiParams.find(p => p.name === swaggerParam.name);
        checks++;
        if (openapiParam && swaggerParam.description === openapiParam.description) {
          console.log(`    ✓ Parameter "${swaggerParam.name}" description preserved`);
        } else if (!openapiParam) {
          console.log(`    ✗ Parameter "${swaggerParam.name}" MISSING!`);
          issues++;
        } else if (swaggerParam.description !== openapiParam.description) {
          console.log(`    ✗ Parameter "${swaggerParam.name}" description LOST!`);
          issues++;
        }
      }
    } else {
      console.log(`  ✗ Parameter count mismatch: ${swaggerParams.length} → ${openapiParams.length}`);
      issues++;
    }
  }
}

// Check schemas
console.log('\n\n📦 Checking Schemas:\n');

const testSchemas = ['PaymentRequest', 'PaymentResponse', 'CustomerProfile'];

for (const schemaName of testSchemas) {
  const swaggerSchema = swagger.definitions[schemaName];
  const openapiSchema = openapi.components.schemas[schemaName];

  if (!swaggerSchema || !openapiSchema) continue;

  console.log(`\n${schemaName}:`);

  checks++;
  if (swaggerSchema.description === openapiSchema.description) {
    console.log(`  ✓ Description: ${swaggerSchema.description || '(none)'}`);
  } else {
    console.log(`  ✗ Description LOST!`);
    issues++;
  }

  // Check property descriptions
  if (swaggerSchema.properties && openapiSchema.properties) {
    const swaggerProps = Object.keys(swaggerSchema.properties);
    const openapiProps = Object.keys(openapiSchema.properties);

    checks++;
    if (swaggerProps.length === openapiProps.length) {
      console.log(`  ✓ Property count: ${swaggerProps.length}`);

      let propDescLost = 0;
      for (const propName of swaggerProps) {
        const swaggerProp = swaggerSchema.properties[propName];
        const openapiProp = openapiSchema.properties[propName];

        if (swaggerProp.description && !openapiProp.description) {
          propDescLost++;
        }
      }

      checks++;
      if (propDescLost === 0) {
        console.log(`  ✓ All property descriptions preserved`);
      } else {
        console.log(`  ✗ ${propDescLost} property descriptions LOST!`);
        issues++;
      }
    } else {
      console.log(`  ✗ Property count mismatch: ${swaggerProps.length} → ${openapiProps.length}`);
      issues++;
    }
  }
}

// Summary
console.log('\n' + '='.repeat(60));
console.log(`\n📊 Results: ${checks} checks, ${issues} issues found\n`);

if (issues === 0) {
  console.log('✅ NO DATA LOSS DETECTED!\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${issues} potential data loss issues found\n`);
  process.exit(1);
}
