# TravelPay API Specification Tools

Complete toolkit for managing, analyzing, and enhancing TravelPay Payments API documentation.

## ✨ Features

- 📥 **Smart Downloads**: Automatic Swagger 2.0 → OpenAPI 3.1 conversion with caching
- 📊 **Quality Analysis**: Comprehensive reports on documentation completeness
- ✏️ **Auto-Enhancement**: Systematically improve docs with standardized language
- 🔍 **Diff Viewer**: See exactly what changes before applying
- ✅ **Validation**: OpenAPI 3.1 schema validation with Scalar
- 🚀 **SDK Generation**: Generate TypeScript and Python SDKs
- 📚 **Interactive Docs**: Serve beautiful API documentation with Scalar

## 🚀 Quick Start

```bash
# 1. Download latest API spec
bun run getspec

# 2. Analyze documentation quality
bun run analyze
cat reports/SUMMARY.md

# 3. Enhance a route
bun run enhance --route sessions
bun run diff --route sessions
bun run enhance --route sessions --apply

# 4. View all commands
bun run help
```

## 📋 Available Commands

### Spec Management
```bash
bun run getspec          # Download & convert latest spec from API
bun run validate         # Validate OpenAPI 3.1 specification with Scalar
bun run docs             # Serve interactive API documentation
```

### Quality Analysis
```bash
bun run analyze          # Generate quality reports for all routes
```

### Documentation Enhancement
```bash
bun run enhance --route <name>         # Preview enhancements
bun run enhance --route <name> --apply # Apply enhancements
bun run enhance:all                    # Enhance all routes
bun run diff --route <name>            # Show before/after diff
bun run diff --path "/v2/payments"    # Diff specific path
bun run diff --detailed                # Side-by-side view
```

### SDK Generation
```bash
bun run sdk              # Generate TypeScript and Python SDKs
```

### Utilities
```bash
bun run help             # Show all commands and usage
```

## 📊 Current Quality Metrics

**Overall Score:** 2/100 (190 issues identified)

| Route | Score | Issues | Priority |
|-------|-------|--------|----------|
| sessions | 0/100 | 7 | ⭐ Start here |
| diagnostics | 0/100 | 2 | Quick win |
| payments | 0/100 | 47 | High traffic |
| customers | 0/100 | 61 | Core feature |
| preauths | 0/100 | 35 | Important |
| Others | 0/100 | 38 | Standard |

See `reports/SUMMARY.md` for detailed breakdown.

## 🎯 Enhancement Workflow

```bash
# Step 1: Analyze current state
bun run analyze

# Step 2: Preview improvements for a route
bun run enhance --route payments

# Step 3: Review changes
bun run diff --route payments

# Step 4: Apply if satisfied
bun run enhance --route payments --apply

# Step 5: Verify improvement
bun run analyze
cat reports/payments.md

# Step 6: Commit
git add openapi.json reports/
git commit -m "enhance: improve payments documentation"
git push
```

## 📁 Project Structure

```
├── openapi.json              # OpenAPI 3.1 spec (converted)
├── swagger.json              # Swagger 2.0 spec (original)
├── db.json                   # Download cache metadata
├── reports/                  # Quality analysis reports
├── sdk/                      # Generated SDKs (TypeScript, Python)
│   ├── typescript/          # TypeScript SDK
│   └── python/              # Python SDK
├── API-STYLE-GUIDE.md       # Documentation standards
├── ENHANCEMENT-WORKFLOW.md  # Step-by-step guide
└── package.json             # Bun scripts & commands
```

## 🔧 How It Works

### 1. Smart Downloads (`getspec`)
- Fetches from 3 endpoints with automatic fallback
- SHA-256 hash comparison for caching
- Only downloads when spec changes
- Converts Swagger 2.0 → OpenAPI 3.1 using Scalar

### 2. Validation (`validate`)
- Validates against OpenAPI 3.1 schema using Scalar
- Checks all $ref reference integrity
- Reports schema errors and warnings
- Ensures spec compliance

### 3. Quality Analysis (`analyze`)
- Scans all endpoints for completeness
- Checks summaries, descriptions, examples
- Validates parameter documentation
- Generates detailed reports by route
- Scores quality (0-100)

### 4. Auto-Enhancement (`enhance`)
- Detects endpoint patterns automatically
- Generates standardized descriptions
- Adds realistic examples
- Non-destructive (preview mode)
- Follows style guide

### 5. Diff Viewer (`diff`)
- Shows before/after changes
- Color-coded additions/modifications
- Route or path-specific views
- Side-by-side comparison mode

### 6. SDK Generation (`sdk`)
- Generates TypeScript SDK with types and API client
- Generates Python SDK with type hints
- Uses OpenAPI Generator under the hood
- Output to `sdk/typescript/` and `sdk/python/`

### 7. Interactive Docs (`docs`)
- Serves beautiful API documentation using Scalar
- Try-it-out functionality for all endpoints
- Code generation examples
- OAuth/authentication flows

## 📖 Documentation

- **[API Style Guide](./API-STYLE-GUIDE.md)** - Language standards & templates
- **[Enhancement Workflow](./ENHANCEMENT-WORKFLOW.md)** - Systematic improvement process
- **[Quality Reports](./reports/SUMMARY.md)** - Current analysis results

## 🎨 Enhancement Features

### Pattern Detection
Automatically recognizes:
- GET by ID - "Retrieve {resource} by {identifier}"
- GET collection - "List all {resources}"
- POST create - "Create a new {resource}"
- POST action - "Process {action} for {resource}"
- PUT/PATCH - "Update {resource}"
- DELETE - "Delete {resource}"

### Standardized Language
- Consistent action verbs (Retrieve, Create, Process)
- Unified terminology (payment, customer, session)
- Realistic examples (PAY-20241115-ABC123, not "string")
- Professional, developer-friendly tone

### Before → After Example

**Before:**
```yaml
summary: Not supported
parameters:
  - name: sessionId
    schema:
      type: string
```

**After:**
```yaml
summary: Retrieve session by sessionId
description: |
  Retrieves complete session details including all associated
  metadata and current status.
parameters:
  - name: sessionId
    description: Unique session identifier. Format: Alphanumeric string.
    example: "SESSION-20241115-XYZ789"
```

## 🏆 Goals

- **Phase 1:** Automatic enhancement → 60/100 average
- **Phase 2:** Manual fine-tuning → 85/100 average
- **Phase 3:** Complete examples → 95/100 average

## 🔗 API Endpoints

Downloads from (in order):
1. `https://api.sandbox.travelpay.com.au/v2.0/help`
2. `https://api.sandbox.b2bpay.com.au/v2.0/help`
3. `https://apiuat.travelpay.com.au/v2.0/help`

## 📈 Stats

- **30** API paths
- **39** Operations
- **59** Schema definitions
- **9** Route groups
