#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
const envPath = resolve(__dirname, '.env');
const envContent = readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  }
});

console.log('🧪 Testing MCP Server...\n');

const mcpServer = spawn('node', ['mcp-server/dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: process.env
});

let responseBuffer = '';
let requestId = 1;

mcpServer.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach(line => {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        console.log('📥 Response:', JSON.stringify(response, null, 2));
      } catch (e) {
        // Not JSON, probably a log message
        console.log('📝 Log:', line);
      }
    }
  });
});

mcpServer.stderr.on('data', (data) => {
  console.log('🔍 Server:', data.toString().trim());
});

mcpServer.on('close', (code) => {
  console.log(`\n✅ MCP Server exited with code ${code}`);
});

// Wait for server to start
setTimeout(() => {
  console.log('\n1️⃣ Testing: Initialize connection\n');
  sendRequest({
    jsonrpc: '2.0',
    id: requestId++,
    method: 'initialize',
    params: {
      protocolVersion: '1.0.0',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    }
  });

  setTimeout(() => {
    console.log('\n2️⃣ Testing: List available tools\n');
    sendRequest({
      jsonrpc: '2.0',
      id: requestId++,
      method: 'tools/list',
      params: {}
    });

    setTimeout(() => {
      console.log('\n3️⃣ Testing: Call validate_spec tool\n');
      sendRequest({
        jsonrpc: '2.0',
        id: requestId++,
        method: 'tools/call',
        params: {
          name: 'validate_spec',
          arguments: {
            spec: 'openapi.json'
          }
        }
      });

      setTimeout(() => {
        console.log('\n🎉 Test complete! Shutting down...\n');
        mcpServer.kill();
      }, 5000);
    }, 2000);
  }, 2000);
}, 1000);

function sendRequest(request) {
  const message = JSON.stringify(request) + '\n';
  console.log('📤 Request:', JSON.stringify(request, null, 2));
  mcpServer.stdin.write(message);
}
