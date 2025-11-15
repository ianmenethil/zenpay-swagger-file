# API Documentation Enhancement Workflow

**Systematic approach to fixing API documentation quality issues**

---

## Overview

This repository provides a complete toolkit for systematically enhancing OpenAPI documentation:

1. **Style Guide** - Standardized language and templates
2. **Analysis Tools** - Identify quality issues
3. **Enhancement Tools** - Apply fixes automatically
4. **Validation** - Ensure consistency

---

## Quick Start

### 1. Analyze Current Quality

```bash
# Generate quality reports for all routes
bun run analyze-spec.ts

# View summary
cat reports/SUMMARY.md

# Review specific route report
cat reports/payments.md
```

### 2. Enhance Documentation

```bash
# Preview enhancements for a specific route (dry run)
bun run enhance-spec.ts --route payments

# Review the preview
code openapi-enhanced.json

# Apply enhancements
bun run enhance-spec.ts --route payments --apply

# Or enhance all routes at once
bun run enhance-spec.ts --all --apply
```

### 3. Verify Improvements

```bash
# Re-run analysis to see improvements
bun run analyze-spec.ts

# Check the updated quality scores
cat reports/SUMMARY.md
```

---

## Systematic Fix Process

### Step-by-Step Workflow

#### Phase 1: Initial Analysis (Done ✅)

```bash
bun run analyze-spec.ts
```

**Current State:**
- 190 total issues identified
- 9 route groups analyzed
- Average quality score: 2/100
- Detailed reports generated for each route

#### Phase 2: Route-by-Route Enhancement

Fix routes in priority order (start with highest traffic or most critical):

**Recommended Order:**
1. `payments` (most critical, 47 issues)
2. `customers` (high usage, 61 issues)
3. `sessions` (authentication, 7 issues)
4. `preauths` (35 issues)
5. `cardproxies` (13 issues)
6. `batchpayments` (9 issues)
7. `requestpays` (9 issues)
8. `proxies` (7 issues)
9. `diagnostics` (2 issues)

**For Each Route:**

```bash
# 1. Preview automatic enhancements
bun run enhance-spec.ts --route payments

# 2. Review generated changes
git diff openapi-enhanced.json

# 3. Apply if satisfied
bun run enhance-spec.ts --route payments --apply

# 4. Re-analyze to verify
bun run analyze-spec.ts

# 5. Check improvement
cat reports/payments.md

# 6. Manual review for complex cases
# (Edit openapi.json directly for nuanced improvements)

# 7. Commit changes
git add openapi.json reports/
git commit -m "enhance: improve payments route documentation

- Add detailed descriptions for all endpoints
- Add parameter examples and descriptions
- Improve response documentation
- Quality score: 0/100 → 85/100"

git push
```

#### Phase 3: Manual Fine-Tuning

After automatic enhancement, manually review for:

**Complex Business Logic:**
- Payment flows with 3D Secure
- Refund eligibility rules
- Batch payment validation

**Domain-Specific Examples:**
- Use realistic merchant scenarios
- Add edge case examples
- Include error handling examples

**Consistency Checks:**
- Verify terminology matches style guide
- Check cross-references between endpoints
- Ensure schema descriptions are complete

#### Phase 4: Validation & Testing

```bash
# Run full analysis
bun run analyze-spec.ts

# Verify no data loss
node verify-conversion.js

# Check for inconsistencies
bun run validate-style.ts  # (TODO: create this)
```

---

## What Gets Enhanced Automatically

### ✅ Automatic Enhancements

The `enhance-spec.ts` script automatically adds:

| Issue Type | Auto-Fix | Example |
|------------|----------|---------|
| **Missing Summary** | ✅ Yes | "Get payment" → "Retrieve payment by payment reference" |
| **Poor Summary** | ✅ Yes | "Not supported" → "Retrieve session by sessionId" |
| **Missing Description** | ✅ Yes | Generates 2-5 sentence description based on pattern |
| **Missing Parameter Descriptions** | ✅ Yes | Adds format and purpose descriptions |
| **Missing Parameter Examples** | ✅ Yes | Adds realistic example values |
| **Missing Request Body Description** | ✅ Yes | Explains what fields are required |
| **Missing Response Descriptions** | ✅ Yes | Standard descriptions for each status code |

### ⚠️ Manual Review Needed

These require human judgment:

| Issue Type | Why Manual? |
|------------|-------------|
| **Complex Business Logic** | Requires domain knowledge |
| **Request/Response Examples** | Need realistic, complete examples |
| **Error Conditions** | Specific validation rules |
| **Schema Descriptions** | Complex object structures |
| **Deprecated Warnings** | Requires roadmap knowledge |

---

## Enhancement Script Capabilities

### Pattern Detection

The script automatically detects endpoint patterns:

```typescript
// GET /v2/payments/{paymentReference}
// Detected as: "get-by-id" pattern
// Generates:
{
  summary: "Retrieve payment by payment reference",
  description: "Retrieves complete payment details including...",
  parameters: [{
    name: "paymentReference",
    description: "Unique payment identifier. Format: Alphanumeric string.",
    example: "PAY-20241115-ABC123"
  }]
}

// POST /v2/customers
// Detected as: "post-create" pattern
// Generates:
{
  summary: "Create a new customer",
  description: "Creates a new customer with the provided details...",
  requestBody: {
    description: "Customer creation object containing required and optional fields..."
  }
}
```

### Supported Patterns

- **get-by-id** - Retrieve single resource
- **get-collection** - List multiple resources
- **post-create** - Create new resource
- **post-action** - Perform action (refund, capture, void)
- **put-update** - Full update
- **patch-update** - Partial update
- **delete** - Delete resource

---

## Style Guide Compliance

All enhancements follow [`API-STYLE-GUIDE.md`](./API-STYLE-GUIDE.md):

### Language Standards

✅ **Correct:**
```yaml
summary: Retrieve payment details by payment reference
description: |
  Retrieves complete payment details including transaction status,
  payment method, customer reference, and all associated metadata.
```

❌ **Incorrect:**
```yaml
summary: Get payment
description: Gets the payment
```

### Terminology

Always use standardized terms:
- ✅ "payment" (not "transaction", "charge")
- ✅ "customer" (not "user", "client")
- ✅ "pre-authorization" (not "auth", "hold")

### Examples

Always use realistic values:
- ✅ `"PAY-20241115-ABC123"` (not `"string"`, `"12345"`)
- ✅ `99.95` (not `100`, `0`)
- ✅ `"john.smith@example.com"` (not `"user@example.com"`)

---

## Metrics & Goals

### Current State (Before Enhancement)

| Route | Score | Critical | Warnings | Info | Total Issues |
|-------|-------|----------|----------|------|--------------|
| batchpayments | 0/100 | 0 | 6 | 3 | 9 |
| cardproxies | 0/100 | 0 | 9 | 4 | 13 |
| customers | 0/100 | 0 | 38 | 23 | 61 |
| diagnostics | 0/100 | 0 | 1 | 1 | 2 |
| payments | 0/100 | 2 | 29 | 16 | 47 |
| preauths | 0/100 | 0 | 25 | 10 | 35 |
| proxies | 21/100 | 0 | 6 | 1 | 7 |
| requestpays | 0/100 | 0 | 6 | 3 | 9 |
| sessions | 0/100 | 0 | 6 | 1 | 7 |

**Totals:**
- **Average Score:** 2/100
- **Total Issues:** 190
- **Critical:** 2
- **Warnings:** 126
- **Info:** 62

### Target Goals

**Phase 1 (Automatic Enhancement):**
- Average Score: **60/100**
- Fix all critical issues (2 → 0)
- Fix 80% of warnings (126 → 25)

**Phase 2 (Manual Fine-Tuning):**
- Average Score: **85/100**
- Fix remaining warnings
- Add comprehensive examples

**Phase 3 (Gold Standard):**
- Average Score: **95/100**
- Complete, tested examples
- Full schema documentation
- Error handling guides

---

## Commands Reference

### Analysis

```bash
# Analyze entire spec
bun run analyze-spec.ts

# View summary report
cat reports/SUMMARY.md

# View specific route report
cat reports/<route-name>.md
```

### Enhancement

```bash
# Preview changes (dry run)
bun run enhance-spec.ts --route <route-name>

# Apply changes to specific route
bun run enhance-spec.ts --route <route-name> --apply

# Enhance all routes at once
bun run enhance-spec.ts --all --apply

# View what changed
git diff openapi.json
```

### Validation

```bash
# Verify no data loss from conversion
node verify-conversion.js

# Download latest spec and convert
bun run swagger-downloader.ts

# Re-analyze after changes
bun run analyze-spec.ts
```

---

## Best Practices

### DO:

✅ **Work route-by-route** - Don't enhance everything at once
✅ **Review before applying** - Always check the preview first
✅ **Commit per route** - One route per commit for easy rollback
✅ **Re-analyze after each route** - Verify improvements
✅ **Follow style guide** - Use consistent language
✅ **Add realistic examples** - Help developers understand usage
✅ **Test API calls** - Verify examples actually work

### DON'T:

❌ **Change API behavior** - Documentation only, no functional changes
❌ **Batch commit** - Keep changes granular for review
❌ **Skip manual review** - Auto-enhancement is a starting point
❌ **Use generic examples** - "string", "123" are not helpful
❌ **Invent features** - Document what exists, not what should exist
❌ **Override good content** - The script preserves existing good docs

---

## Examples

### Before Enhancement

```yaml
/v2/sessions/{sessionId}:
  get:
    summary: Not supported
    parameters:
      - name: sessionId
        in: path
        required: true
        schema:
          type: string
    responses:
      '200':
        description: OK
```

### After Automatic Enhancement

```yaml
/v2/sessions/{sessionId}:
  get:
    summary: Retrieve session by sessionId
    description: |
      Retrieves complete session details including all associated
      metadata and current status.

      The sessionId is a unique identifier assigned when the session
      was created. Returns a 404 error if the sessionId is not found
      or does not belong to your merchant account.
    operationId: Sessions_Get
    tags:
      - Sessions
    parameters:
      - name: sessionId
        in: path
        required: true
        description: Unique session identifier. Format: Alphanumeric string.
        schema:
          type: string
        example: "SESSION-20241115-XYZ789"
    responses:
      '200':
        description: Successfully retrieved session details.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SessionResponse'
      '404':
        description: |
          Session not found. The specified identifier does not exist
          or does not belong to your merchant account.
```

### After Manual Fine-Tuning

```yaml
/v2/sessions/{sessionId}:
  get:
    summary: Retrieve payment session details
    description: |
      Retrieves the current state of a payment session, including the
      secure token, expiry time, and plugin endpoint URL.

      Sessions are created for secure payment processing and expire
      after a configured time period (default: 30 minutes). Once
      expired, a new session must be created.

      Use this endpoint to check session status before initializing
      the payment plugin or to retrieve session details for debugging.
    operationId: Sessions_Get
    tags:
      - Sessions
    parameters:
      - name: sessionId
        in: path
        required: true
        description: |
          Unique session identifier returned when the session was created.
          Format: Alphanumeric string, 32-64 characters.
        schema:
          type: string
          minLength: 32
          maxLength: 64
          pattern: '^[A-Za-z0-9-]+$'
        example: "sess_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
    responses:
      '200':
        description: Successfully retrieved session details.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SessionResponse'
            example:
              secureToken: "tok_abc123def456ghi789jkl012mno345"
              expiresAt: "2024-11-15T11:00:00Z"
              endpointUrl: "https://checkout.travelpay.com.au/plugin/v2"
              status: "active"
              createdAt: "2024-11-15T10:30:00Z"
      '404':
        description: |
          Session not found. The session may have expired, been used,
          or the sessionId is invalid.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ErrorResponse'
            example:
              error: "session_not_found"
              message: "Session not found or has expired"
              sessionId: "sess_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

---

## Next Steps

1. **Start with highest priority route** (e.g., `payments`)
2. **Preview enhancements** using the script
3. **Review and apply** changes
4. **Manually add examples** for complex scenarios
5. **Commit and push** changes
6. **Move to next route**
7. **Repeat until all routes are at 85%+ quality**

---

## Support & Questions

- **Style Guide:** [`API-STYLE-GUIDE.md`](./API-STYLE-GUIDE.md)
- **Quality Reports:** `reports/<route-name>.md`
- **Enhancement Script:** `enhance-spec.ts`
- **Analysis Script:** `analyze-spec.ts`
