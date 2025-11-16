#!/usr/bin/env node

/**
 * TravelPay Agent CLI
 *
 * Autonomous agent powered by Claude + MCP server
 */

import Anthropic from '@anthropic-ai/sdk';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// MCP Server configuration
const MCP_SERVER_CONFIG = {
  name: 'travelpay-openapi-toolkit',
  transport: 'stdio' as const,
  command: 'bun',
  args: ['run', path.join(process.cwd(), '../mcp-server/src/index.ts')],
  env: {
    TRAVELPAY_SANDBOX_API_KEY: process.env.TRAVELPAY_SANDBOX_API_KEY,
    TRAVELPAY_SANDBOX_USERNAME: process.env.TRAVELPAY_SANDBOX_USERNAME,
    TRAVELPAY_SANDBOX_PASSWORD: process.env.TRAVELPAY_SANDBOX_PASSWORD,
    TRAVELPAY_PROD_API_KEY: process.env.TRAVELPAY_PROD_API_KEY,
    TRAVELPAY_PROD_USERNAME: process.env.TRAVELPAY_PROD_USERNAME,
    TRAVELPAY_PROD_PASSWORD: process.env.TRAVELPAY_PROD_PASSWORD,
  }
};

// System prompt
const SYSTEM_PROMPT = `You are an expert on the TravelPay payment processing API.

You have access to tools via MCP server for:
- Downloading and analyzing OpenAPI specs
- Generating SDKs
- Making API calls (sandbox by default)

CRITICAL: TravelPay requires BOTH api-key header AND basic auth (username:password).

Always use sandbox environment unless user explicitly requests production.

When making API calls:
1. Confirm environment
2. Validate parameters
3. Use tools via MCP
4. Explain results

When generating code:
1. Include proper authentication (api-key + basic auth)
2. Add error handling
3. Use environment variables
4. Make it production-ready`;

// Interactive mode
async function interactiveMode() {
  console.log(chalk.blue.bold('TravelPay Agent - Interactive Mode'));
  console.log(chalk.gray('NOTE: MCP server integration coming soon'));
  console.log(chalk.gray('Type "exit" to quit\n'));

  const conversationHistory: Array<any> = [];

  while (true) {
    const answers: any = await inquirer.prompt([
      {
        type: 'input',
        name: 'question',
        message: 'You:'
      }
    ]);

    const question = answers.question;

    if (question.toLowerCase() === 'exit') {
      console.log(chalk.blue('Goodbye!'));
      break;
    }

    if (!question.trim()) continue;

    conversationHistory.push({
      role: 'user',
      content: question
    });

    const spinner = ora('Thinking...').start();

    try {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
        // NOTE: MCP server integration (mcp_servers parameter)
        // will be available in future SDK versions
        // When available, uncomment:
        // mcp_servers: [MCP_SERVER_CONFIG]
      });

      spinner.stop();

      // Extract assistant response
      const assistantMessage = response.content
        .filter(block => block.type === 'text')
        .map(block => (block as any).text)
        .join('\n');

      console.log(chalk.cyan('\nAgent:'), assistantMessage);

      // Check for tool use
      const toolUses = response.content.filter(block => block.type === 'tool_use');
      if (toolUses.length > 0) {
        console.log(chalk.yellow(`\n[Used ${toolUses.length} tool(s)]`));
        toolUses.forEach((tool: any) => {
          console.log(chalk.gray(`  - ${tool.name}(${JSON.stringify(tool.input)})`));
        });
      }

      conversationHistory.push({
        role: 'assistant',
        content: response.content
      });

      console.log('');
    } catch (error) {
      spinner.stop();
      console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
    }
  }
}

// One-shot mode
async function oneShot(question: string) {
  const spinner = ora('Processing...').start();

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: question }]
      // NOTE: MCP server integration coming in future SDK version
      // mcp_servers: [MCP_SERVER_CONFIG]
    });

    spinner.stop();

    const assistantMessage = response.content
      .filter(block => block.type === 'text')
      .map(block => (block as any).text)
      .join('\n');

    console.log(assistantMessage);
  } catch (error) {
    spinner.stop();
    console.error(chalk.red('Error:'), error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Test mode - run predefined tests
async function testMode() {
  const tests = [
    'Download the TravelPay spec',
    'What\'s the quality score for payments?',
    'Generate a TypeScript SDK',
    'Create a test payment for $10 in sandbox'
  ];

  console.log(chalk.blue.bold('Running Test Suite\n'));

  for (const test of tests) {
    console.log(chalk.yellow(`Test: ${test}`));
    await oneShot(test);
    console.log('---\n');
  }
}

// CLI commands
program
  .name('travelpay-agent')
  .description('TravelPay API autonomous agent')
  .version('1.0.0');

program
  .command('interactive')
  .alias('i')
  .description('Start interactive conversation mode')
  .action(interactiveMode);

program
  .command('ask <question>')
  .description('Ask a single question')
  .action(oneShot);

program
  .command('test')
  .description('Run test suite')
  .action(testMode);

// Default: interactive mode
program.parse();

if (process.argv.length === 2) {
  interactiveMode();
}
