# TravelPay API Documentation Tools - Guide for AI Assistants

**Repository:** `zenpay-swagger-file`
**Purpose:** Complete toolkit for managing, analyzing, and enhancing OpenAPI/Swagger API documentation
**Tech Stack:** TypeScript, Bun runtime, OpenAPI 3.1, Postman Collections

---

## 📋 Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Core Tools & Scripts](#core-tools--scripts)
4. [Development Workflows](#development-workflows)
5. [Key Conventions](#key-conventions)
6. [Claude Validation Protocol](#claude-validation-protocol)
7. [Common Tasks](#common-tasks)
8. [Testing & Quality](#testing--quality)

---

## Repository Overview

This is a **comprehensive API documentation quality system** for the TravelPay Payments API. It provides tools to:

- **Download** Swagger 2.0 specs from TravelPay API with smart caching
- **Convert** Swagger 2.0 → OpenAPI 3.1 automatically
- **Analyze** documentation quality and generate detailed reports
- **Enhance** docs automatically using pattern detection and templates
- **Validate** against official OpenAPI 3.1 JSON Schema
- **Compare** specifications to identify differences
- **Generate** TypeScript/Python SDKs
- **Integrate** with Postman collections
- **Serve** interactive API documentation

### Key Metrics

- **30** API paths
- **39** Operations
- **59** Schema definitions
- **9** Route groups
- **~5,900** lines of TypeScript code
- **Current Quality:** 2/100 (documentation needs enhancement)
- **Target Quality:** 85/100

---

## Codebase Structure

```
zenpay-swagger-file/
├── 📄 Core OpenAPI Files
│   ├── openapi.json                          # OpenAPI 3.1 spec (converted, main file)
│   ├── swagger.json                          # Swagger 2.0 spec (original from API)
│   ├── openapi-deref.json                    # Dereferenced OpenAPI spec
│   ├── openapi-merchant-apis.json            # Extracted merchant-specific APIs
│   ├── zenith-openapi-31.json                # Zenith variant
│   └── db.json                               # Download cache metadata
│
├── 📂 Postman Integration
│   ├── zenith-postman-collection.json        # Postman collection
│   ├── zenith-postman-collection-unwrapped.json
│   ├── zenith-postman-extracted.json         # Extracted sections
│   └── postman-db.json                       # Postman cache
│
├── 🔧 Core Tools (TypeScript)
│   ├── swagger-downloader.ts                 # Download & convert Swagger → OpenAPI
│   ├── analyze-spec.ts                       # Quality analysis & reporting
│   ├── enhance-spec.ts                       # Auto-enhance documentation
│   ├── validate-spec.ts                      # OpenAPI 3.1 validation
│   ├── show-diff.ts                          # Diff visualization
│   ├── compare-specs.ts                      # Basic spec comparison
│   ├── deep-compare-specs.ts                 # Deep spec comparison
│   ├── verify-comparison.ts                  # Verification agent
│   ├── generate-sdk.ts                       # SDK generation
│   ├── serve-docs.ts                         # Interactive docs server
│   └── show-help.ts                          # Help system
│
├── 🔄 Postman Tools
│   ├── postman-download.ts                   # Download from Postman API
│   ├── postman-upload.ts                     # Upload to Postman
│   ├── postman-to-openapi31.ts               # Convert collection → OpenAPI
│   ├── postman-direct-openapi31.ts           # Direct conversion
│   ├── postman-extract-section.ts            # Extract specific sections
│   └── extract-merchant-apis.ts              # Extract merchant APIs
│
├── 📊 Reports & Analysis
│   ├── reports/                              # Quality analysis reports
│   │   ├── SUMMARY.md                       # Overall quality summary
│   │   ├── payments.md                      # Per-route reports
│   │   ├── customers.md
│   │   └── ... (9 route reports)
│   └── spec-comparison-report.md            # Comparison results
│
├── 📂 Split Specifications
│   ├── paths/                               # Individual path definitions
│   │   ├── _v2_payments.json
│   │   ├── _v2_customers.json
│   │   └── ... (30 path files)
│   └── definitions/                         # Schema definitions
│       └── CustomerPaymentOption.json
│
├── 🧪 Testing
│   └── test/
│       ├── analyze-spec.test.ts
│       ├── enhance-spec.test.ts
│       ├── generate-sdk.test.ts
│       ├── integration.test.ts
│       └── validate-spec.test.ts
│
├── 🔌 Extensions
│   ├── mcp-server/                          # Model Context Protocol server
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   ├── agents/                              # Claude agents
│   │   └── travelpay-expert.md             # TravelPay domain expert
│   ├── commands/                            # Slash commands
│   │   ├── spec-download.md
│   │   ├── spec-analyze.md
│   │   └── sdk-generate.md
│   └── skills/                              # Claude skills
│
├── 📖 Documentation
│   ├── CLAUDE.md                            # This file (AI assistant guide)
│   ├── README.md                            # Project overview
│   ├── REPO-SUMMARY.md                      # Complete repository summary
│   ├── API-STYLE-GUIDE.md                   # Documentation standards
│   ├── ENHANCEMENT-WORKFLOW.md              # Step-by-step enhancement guide
│   ├── OPENAPI-PROPERTIES.md                # OpenAPI property reference
│   ├── POSTMAN-TOOLS.md                     # Postman integration guide
│   ├── PLUGIN_README.md                     # Plugin documentation
│   └── PLUGIN_TEST_REPORT.md                # Plugin test results
│
├── ⚙️ Configuration
│   ├── package.json                         # Bun scripts & dependencies
│   ├── .mcp.json                            # MCP server config
│   ├── .env.example                         # Environment variables template
│   ├── .gitignore                           # Git ignore rules
│   ├── openapitools.json                    # OpenAPI generator config
│   └── tsconfig.json                        # TypeScript config (in mcp-server/)
│
└── 📦 Build Artifacts
    ├── audit/                               # Audit results
    │   ├── split-audit.json
    │   └── wholefile-audit.json
    └── .claude-plugin/                      # Claude plugin artifacts
```

---

## Core Tools & Scripts

### 1. swagger-downloader.ts

**Purpose:** Download and convert TravelPay API specifications

**Features:**
- Downloads from 3 endpoints with automatic fallback
- SHA-256 hash-based caching (only downloads if changed)
- Converts Swagger 2.0 → OpenAPI 3.1
- Validates data preservation during conversion

**Endpoints (priority order):**
1. `https://api.sandbox.travelpay.com.au/v2.0/help`
2. `https://api.sandbox.b2bpay.com.au/v2.0/help`
3. `https://apiuat.travelpay.com.au/v2.0/help`

**Usage:**
```bash
bun run getspec
```

**Output:**
- `swagger.json` - Original Swagger 2.0
- `openapi.json` - Converted OpenAPI 3.1
- `db.json` - Cache metadata

---

### 2. analyze-spec.ts

**Purpose:** Analyze documentation quality and generate reports

**Checks:**
- ✅ Summaries presence (1-80 chars)
- ✅ Descriptions (detailed explanations)
- ✅ Operation IDs (unique identifiers)
- ✅ Parameter descriptions & examples
- ✅ Request body descriptions
- ✅ Response descriptions & examples
- ✅ Schema & property descriptions

**Usage:**
```bash
bun run analyze
cat reports/SUMMARY.md
cat reports/payments.md
```

**Output:**
- Quality scores (0-100 per route)
- Detailed issue categorization (critical/warning/info)
- Per-route reports in `reports/`

---

### 3. enhance-spec.ts

**Purpose:** Automatically enhance documentation quality

**Pattern Detection:**
- `get-by-id` - "Retrieve {resource} by {identifier}"
- `get-collection` - "List all {resources}"
- `post-create` - "Create a new {resource}"
- `post-action` - "Process {action} for {resource}"
- `put-update` - "Update {resource}"
- `delete` - "Delete {resource}"

**Generates:**
- Summaries (action verb + resource + context)
- Descriptions (2-5 sentences)
- Parameter descriptions with format & examples
- Response descriptions

**Usage:**
```bash
# Preview enhancements
bun run enhance --route payments

# Apply enhancements
bun run enhance --route payments --apply

# Enhance all routes
bun run enhance:all
```

---

### 4. validate-spec.ts

**Purpose:** Validate against official OpenAPI 3.1 schema

**Validation Types:**
1. Schema validation (conforms to OpenAPI 3.1)
2. Reference checking (all $ref resolve)
3. Best practices (contact, license, metadata)

**Usage:**
```bash
bun run validate
```

---

### 5. compare-specs.ts & deep-compare-specs.ts

**Purpose:** Compare two OpenAPI specifications

**Features:**
- Basic comparison: High-level differences
- Deep comparison: Detailed field-by-field analysis
- Identifies added/removed/modified operations
- Schema comparison

**Usage:**
```bash
bun run compare
bun run deep-compare
```

⚠️ **IMPORTANT:** Always use `verify-comparison.ts` to validate comparison claims!

---

### 6. verify-comparison.ts

**Purpose:** Verification agent to validate comparison claims

**Features:**
- Challenges comparison results
- Verifies source file provenance
- Ensures comparisons are meaningful
- Prevents false positives

**Usage:**
```bash
bun run verify
```

See [Claude Validation Protocol](#claude-validation-protocol) for details.

---

### 7. Postman Tools

**postman-download.ts** - Download collections from Postman API
**postman-upload.ts** - Upload/sync to Postman
**postman-to-openapi31.ts** - Convert collections to OpenAPI 3.1
**postman-extract-section.ts** - Extract specific API sections

**Usage:**
```bash
bun run postman:download
bun run postman:convert
bun run postman:upload
bun run postman:extract
bun run postman:full  # Download + convert in one step
```

See `POSTMAN-TOOLS.md` for detailed documentation.

---

### 8. generate-sdk.ts

**Purpose:** Generate TypeScript and Python SDKs

**Usage:**
```bash
bun run sdk
```

**Output:**
- `sdk/typescript/` - TypeScript SDK with types
- `sdk/python/` - Python SDK with type hints

---

### 9. serve-docs.ts

**Purpose:** Serve interactive API documentation

**Features:**
- Beautiful UI with Scalar
- Try-it-out functionality
- Code generation examples
- OAuth/authentication flows

**Usage:**
```bash
bun run docs
```

---

## Development Workflows

### Daily: Update Spec from API

```bash
bun run getspec       # Download & convert
bun run analyze       # Check quality
cat reports/SUMMARY.md
```

### Weekly: Improve Documentation

```bash
# 1. Analyze current state
bun run analyze

# 2. Choose route (priority order)
# - sessions (7 issues) ⭐ Quick win
# - diagnostics (2 issues) - Quick win
# - payments (47 issues) - High traffic
# - customers (61 issues) - Core feature

# 3. Preview enhancements
bun run enhance --route payments

# 4. Review changes
bun run diff --route payments

# 5. Apply changes
bun run enhance --route payments --apply

# 6. Validate
bun run validate

# 7. Commit
git add openapi.json reports/
git commit -m "enhance: improve payments route documentation

- Add detailed descriptions for all endpoints
- Add parameter examples and descriptions
- Improve response documentation
- Quality score: 0/100 → 85/100"
git push
```

### Before Release: Quality Check

```bash
bun run analyze       # Quality reports
bun run verify        # Data integrity
bun run validate      # Schema compliance
cat reports/SUMMARY.md
```

### Comparing Specifications

```bash
# Basic comparison
bun run compare

# Deep comparison
bun run deep-compare

# CRITICAL: Always verify claims
bun run verify
```

---

## Key Conventions

### File Naming

- **openapi.json** - Main OpenAPI 3.1 spec (authoritative)
- **swagger.json** - Original Swagger 2.0 from API
- **{name}-openapi-31.json** - Converted OpenAPI specs
- **{name}-postman-*.json** - Postman collections

### Documentation Standards

Follow `API-STYLE-GUIDE.md`:

**Summaries:**
- Format: `[Action Verb] [Resource] [Key Detail]`
- Length: 40-80 characters
- Example: "Retrieve payment details by payment reference"

**Descriptions:**
- Length: 2-5 sentences
- Tense: Present tense
- Voice: Active voice

**Examples:**
- Payment Reference: `PAY-20241115-ABC123` (not "string")
- Customer Reference: `CUST-2024-001` (not "123")
- Amount: `99.95` (not 100)

**Terminology:**
- ✅ "payment" (not "transaction", "charge")
- ✅ "customer" (not "user", "client")
- ✅ "pre-authorization" (not "auth", "hold")

### Git Workflow

**Branching:**
- Main branch: `main`
- Feature branches: `claude/claude-md-*` (auto-generated)

**Commit Messages:**
```
feat: add new feature
fix: fix bug
enhance: improve documentation
docs: update documentation
refactor: refactor code
test: add tests
```

**Before Commits:**
- Run `bun run analyze` to verify improvements
- Run `bun run validate` to check compliance
- Never commit secrets or credentials

---

## Claude Validation Protocol

### The Problem

Claude may make claims about "perfect comparison" without proper verification, comparing files to themselves or derivatives. This gives false confidence in meaningless results.

### Required Validation Checks

#### Before Making ANY Comparison Claim:

1. **State EXACTLY what is being compared:**
   - ❌ BAD: "Comparing specs"
   - ✅ GOOD: "Comparing TravelPay openapi.json (source: downloaded Swagger 2.0 converted to 3.1) vs openapi-merchant-apis.json (source: extracted from TravelPay openapi.json)"

2. **Explain WHY this comparison is meaningful:**
   - ❌ BAD: "To check differences"
   - ✅ GOOD: "This comparison is MEANINGLESS because both files have the same source. We need to compare Postman collection vs TravelPay spec."

3. **Before claiming "X matches Y perfectly":**
   - Show sample data from BOTH sources
   - Verify they are from DIFFERENT origins
   - Check at least 3 examples manually
   - State what was NOT checked

4. **Required Evidence for Claims:**
   - "All descriptions match" → Show 5+ actual description comparisons
   - "Schemas are identical" → Diff at least 3 schemas
   - "No differences" → List what was compared AND what was skipped

### Validation Checklist

Before claiming comparison results:

- [ ] Identified the SOURCE of each file being compared
- [ ] Confirmed sources are DIFFERENT (not derived from each other)
- [ ] Manually verified 3+ samples from actual data
- [ ] Listed what was NOT compared
- [ ] Stated confidence level with reasoning

### Red Flags (Stop Immediately)

- Comparing a file to a derivative of itself
- Claiming "perfect match" without showing examples
- Using terms like "all", "every", "none" without sampling
- Getting identical results when differences are expected

### Example: How to Report Properly

❌ **WRONG:**
"Deep comparison shows only 2 differences. Everything else is identical."

✅ **RIGHT:**
"Comparison: TravelPay openapi.json (extracted from merchant section) vs openapi-merchant-apis.json (also extracted from TravelPay).

⚠️ WARNING: These have the SAME SOURCE, so this comparison is meaningless.

What we SHOULD compare:
- Postman collection descriptions vs TravelPay openapi.json descriptions
- Postman converted spec vs TravelPay spec

Current findings:
- TravelPay: 0/39 operations have descriptions (all null)
- Postman: 11 requests have detailed descriptions
- CONCLUSION: Postman has documentation that TravelPay is missing"

### Self-Validation Questions

1. "If these files are identical, would that be surprising?" (If no, you're comparing wrong things)
2. "Can I show 3 actual examples from the data?" (If no, you don't have evidence)
3. "What am I NOT checking?" (Always state limitations)
4. "Where did each file come from?" (Know the provenance)

### When User Questions Results

DO NOT defend the results. Instead:
1. Re-examine the sources
2. Show actual data samples
3. Admit if comparison was wrong
4. Do the RIGHT comparison

---

## Common Tasks

### Task 1: Download Latest API Spec

```bash
bun run getspec
```

**What it does:**
- Checks cache (db.json) for changes via SHA-256 hash
- Downloads from TravelPay API if changed
- Converts Swagger 2.0 → OpenAPI 3.1
- Validates conversion (no data loss)

### Task 2: Analyze Documentation Quality

```bash
bun run analyze
cat reports/SUMMARY.md
cat reports/payments.md
```

**What it does:**
- Scans all endpoints for completeness
- Generates quality scores (0-100)
- Creates detailed per-route reports
- Identifies critical/warning/info issues

### Task 3: Enhance a Route

```bash
# Preview
bun run enhance --route payments

# Review
bun run diff --route payments

# Apply
bun run enhance --route payments --apply

# Verify
bun run analyze
```

**What it does:**
- Detects endpoint patterns
- Generates summaries, descriptions, examples
- Follows style guide automatically
- Non-destructive (preview first)

### Task 4: Generate SDKs

```bash
bun run sdk
```

**What it does:**
- Reads openapi.json
- Generates TypeScript SDK in sdk/typescript/
- Generates Python SDK in sdk/python/
- Includes types and API client

### Task 5: Serve Interactive Docs

```bash
bun run docs
```

**What it does:**
- Starts local server with Scalar UI
- Provides try-it-out functionality
- Shows code examples
- Displays authentication flows

### Task 6: Compare Specifications

```bash
# Basic comparison
bun run compare

# Deep comparison
bun run deep-compare

# Verify results (CRITICAL!)
bun run verify
```

**What it does:**
- Compares two OpenAPI specs
- Identifies differences
- **MUST** verify with verify-comparison.ts
- Follow validation protocol

### Task 7: Work with Postman

```bash
# List workspaces
bun run postman:workspaces

# List collections
bun run postman:collections

# Download collection
bun run postman:download

# Convert to OpenAPI
bun run postman:convert

# Extract section
bun run postman:extract
```

---

## Testing & Quality

### Running Tests

```bash
# Run all tests
bun test

# Watch mode
bun test:watch
```

### Test Coverage

- `analyze-spec.test.ts` - Analysis tool tests
- `enhance-spec.test.ts` - Enhancement tool tests
- `generate-sdk.test.ts` - SDK generation tests
- `integration.test.ts` - End-to-end tests
- `validate-spec.test.ts` - Validation tests

### Quality Standards

**Code Quality:**
- Full TypeScript/JSDoc comments
- DRY principles
- Simple, readable functions
- Modular architecture

**Documentation Quality:**
- Target: 85/100 average
- 0 critical issues
- < 10 warnings per route

**Validation:**
- 100% data preservation during conversion
- 0 validation errors against OpenAPI 3.1 schema
- All $ref references resolve

---

## Best Practices

### DO:

✅ **Work route-by-route** - Don't enhance everything at once
✅ **Preview before applying** - Always check changes first
✅ **Commit per route** - Granular changes for easy rollback
✅ **Re-analyze after changes** - Verify improvements
✅ **Follow style guide** - Use consistent language
✅ **Use realistic examples** - Help developers understand
✅ **Validate comparisons** - Use verification agent

### DON'T:

❌ **Change API behavior** - Documentation only
❌ **Batch commit** - Hard to review
❌ **Skip verification** - Especially for comparisons
❌ **Use generic examples** - "string", "123" are not helpful
❌ **Compare files to themselves** - Meaningless results
❌ **Claim "perfect match" without evidence** - Show samples

---

## Environment Variables

Create `.env` file (see `.env.example`):

```bash
# Postman API
POSTMAN_API_KEY=your-postman-api-key
POSTMAN_WORKSPACE_ID=your-workspace-id
POSTMAN_COLLECTION_ID=your-collection-id

# TravelPay API (for MCP server)
TRAVELPAY_API_KEY=your-travelpay-api-key
```

---

## MCP Server

**Purpose:** Model Context Protocol server for Claude integration

**Location:** `mcp-server/`

**Configuration:** `.mcp.json`

**Tools Provided:**
- `download_spec` - Download latest spec
- `analyze_spec` - Analyze quality
- `enhance_spec` - Auto-enhance
- `validate_spec` - Validate spec
- `generate_sdk` - Generate SDKs
- `travelpay_create_payment` - Create payment
- `travelpay_get_session` - Get session

---

## Agents & Commands

### Agents

**Location:** `agents/`

**travelpay-expert.md** - Domain expert for TravelPay API
- Helps with API calls
- Generates production-ready code
- Improves documentation
- Troubleshoots errors

### Slash Commands

**Location:** `commands/`

- `/spec-download` - Download API spec
- `/spec-analyze` - Analyze quality
- `/sdk-generate` - Generate SDKs

---

## External Resources

**OpenAPI Specification:**
- [OpenAPI 3.1 Spec](https://spec.openapis.org/oas/v3.1.0)
- [JSON Schema](https://json-schema.org/draft/2020-12/schema)

**TravelPay API:**
- Sandbox: https://api.sandbox.travelpay.com.au
- UAT: https://apiuat.travelpay.com.au
- Production: https://api.travelpay.com.au

**Postman API:**
- [Postman API Docs](https://www.postman.com/postman/workspace/postman-public-workspace/documentation/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a)

---

## Quick Reference

```bash
# Download & Convert
bun run getspec

# Analyze & Report
bun run analyze && cat reports/SUMMARY.md

# Enhance Single Route
bun run enhance --route sessions
bun run diff --route sessions
bun run enhance --route sessions --apply

# Validate
bun run validate
bun run verify

# Generate SDK
bun run sdk

# Serve Docs
bun run docs

# Help
bun run help
```

---

**This file must be read before working with this codebase. It contains critical validation protocols and conventions.**

**Last Updated:** 2025-11-16
**Version:** 2.0.0
**Status:** Production Ready
**Quality Score:** 2/100 → Target: 85/100
