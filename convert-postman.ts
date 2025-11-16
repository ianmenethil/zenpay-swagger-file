#!/usr/bin/env bun
/**
 * Convert Postman Collection to OpenAPI 3.1 Specification
 */

const postmanToOpenApi = require('postman-to-openapi');

async function convertPostmanToOpenAPI() {
  try {
    console.log('🔄 Converting Postman collection to OpenAPI...');

    const result = await postmanToOpenApi(
      './zenith-postman-collection-unwrapped.json',
      './zenith-openapi.json',
      {
        outputFormat: 'json',
        defaultTag: 'Zenith Payments',
        info: {
          title: 'Zenith Payments API',
          version: '2.0.0',
          description: 'OpenAPI specification generated from Postman collection'
        }
      }
    );

    console.log('✅ Conversion successful!');
    console.log('📄 Output file: zenith-openapi.json');

    return result;
  } catch (error) {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  }
}

convertPostmanToOpenAPI();
