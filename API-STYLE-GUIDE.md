# TravelPay API Documentation Style Guide

**Version:** 1.0
**Last Updated:** 2025-11-15

This guide defines standardized language, patterns, and templates for documenting the TravelPay Payments API to ensure consistency, clarity, and completeness.

---

## Table of Contents

1. [Writing Principles](#writing-principles)
2. [Standardized Language](#standardized-language)
3. [Operation Summaries](#operation-summaries)
4. [Descriptions](#descriptions)
5. [Parameters](#parameters)
6. [Request Bodies](#request-bodies)
7. [Responses](#responses)
8. [Examples](#examples)
9. [Common Patterns](#common-patterns)

---

## Writing Principles

### DO:
- ✅ Use **clear, concise, active voice**
- ✅ Start with **action verbs** (Retrieve, Create, Update, Delete, Process)
- ✅ Be **specific** about what the endpoint does
- ✅ Use **consistent terminology** across all endpoints
- ✅ Provide **practical examples** that developers can copy
- ✅ Explain **error conditions** and how to handle them
- ✅ Use **present tense** for descriptions

### DON'T:
- ❌ Use vague language ("handles", "manages", "deals with")
- ❌ Change the actual API behavior or meaning
- ❌ Add implementation details not relevant to API consumers
- ❌ Use passive voice
- ❌ Assume prior knowledge of domain concepts

---

## Standardized Language

### Action Verbs by HTTP Method

| Method | Preferred Verbs | Examples |
|--------|----------------|----------|
| **GET** | Retrieve, List, Get, Fetch, Query | "Retrieve payment details", "List all customers" |
| **POST** | Create, Submit, Process, Generate, Request | "Create a new customer", "Process a payment" |
| **PUT** | Update, Replace, Modify | "Update customer profile", "Replace payment method" |
| **PATCH** | Update, Modify, Change | "Update customer status", "Modify payment amount" |
| **DELETE** | Delete, Remove, Cancel, Void | "Delete customer account", "Void a payment" |

### Resource Terminology

Use consistent names for resources:

- **Payment** (not "transaction", "charge", "pay")
- **Customer** (not "user", "client", "account holder")
- **Pre-authorization** or **Preauth** (not "auth", "hold")
- **Refund** (not "reversal", "chargeback")
- **Batch Payment** (not "bulk payment", "mass payment")
- **Session** (not "token session", "checkout session")
- **Card Proxy** / **Account Proxy** (not "tokenized card", "vault token")

### Status and State Language

- Use **"successful"** not "succeeded", "OK", "good"
- Use **"failed"** not "error", "unsuccessful", "bad"
- Use **"pending"** not "processing", "in-progress", "waiting"
- Use **"cancelled"** not "aborted", "terminated", "stopped"
- Use **"voided"** for reversals before settlement
- Use **"refunded"** for reversals after settlement

---

## Operation Summaries

### Format

```
[Action Verb] [Resource/Object] [Optional: Key Detail]
```

### Guidelines

- **Length:** 40-80 characters (one line)
- **Capitalization:** Sentence case
- **Punctuation:** No period at the end
- **Detail level:** Brief but descriptive

### Examples

**Good:**
```yaml
summary: Retrieve payment details by payment reference
summary: Create a new customer with payment profile
summary: Process a one-off payment for existing customer
summary: List all refund requests for a payment
summary: Void a pre-authorization before capture
```

**Bad:**
```yaml
summary: Get payment  # Too vague
summary: This endpoint retrieves the payment information  # Too wordy
summary: Payment retrieval  # Noun phrase, not action verb
summary: Gets a payment from the database  # Implementation detail
```

### Template by Method

```yaml
# GET (single resource)
summary: Retrieve [resource] by [identifier]

# GET (collection)
summary: List all [resources] for [parent resource]

# POST (creation)
summary: Create a new [resource] with [key details]

# POST (action/processing)
summary: Process [action] for [resource]

# PUT (full update)
summary: Update [resource] with new [details]

# PATCH (partial update)
summary: Update [specific field] for [resource]

# DELETE
summary: Delete [resource] by [identifier]
```

---

## Descriptions

### Format

Descriptions should include:
1. **Purpose** - What this endpoint does (1-2 sentences)
2. **Key behavior** - Important notes about how it works
3. **Prerequisites** - What must exist or be true first (if applicable)
4. **Side effects** - What else happens (if applicable)

### Guidelines

- **Length:** 2-5 sentences
- **Tense:** Present tense
- **Voice:** Active voice
- **Start with:** The action verb matching the summary

### Template Structure

```
[Action] [detailed explanation of what happens].

[Additional context about behavior, requirements, or constraints].

[Optional: Important notes about errors, validation, or side effects].
```

### Examples

**GET endpoint:**
```yaml
description: |
  Retrieves complete payment details including transaction status,
  payment method, customer reference, and all associated metadata.

  The payment reference is a unique identifier assigned when the
  payment is created. Returns a 404 error if the payment reference
  is not found or does not belong to your merchant account.
```

**POST endpoint:**
```yaml
description: |
  Creates a new customer record with the provided profile information
  and optional default payment method.

  The customer reference must be unique within your merchant account.
  If a duplicate customer reference is provided, the API returns a
  409 Conflict error.

  Upon successful creation, the customer can immediately be used for
  payment processing.
```

**POST processing endpoint:**
```yaml
description: |
  Processes a one-off payment for an existing customer using their
  stored payment method or a new payment method provided in the request.

  The payment is processed immediately and returns either a successful
  payment reference or an error code indicating why the payment failed.

  For 3D Secure enabled cards, this may return a redirect URL requiring
  customer authentication before the payment completes.
```

---

## Parameters

### Parameter Descriptions

Every parameter needs a description explaining:
1. **What it is** - The purpose/meaning
2. **Format/constraints** - Expected format, length, or valid values
3. **Optional: Default value** - If applicable

### Guidelines

- **Length:** 1-2 sentences
- **Format:** Sentence case, ends with period
- **Be specific:** Include format, length limits, valid values

### Template

```yaml
# Path parameters
name: paymentReference
description: |
  Unique payment identifier assigned when the payment was created.
  Format: Alphanumeric string, 1-50 characters.

# Query parameters (filtering)
name: status
description: |
  Filter payments by status. Valid values: 'successful', 'failed',
  'pending', 'cancelled'. Defaults to all statuses if not specified.

# Query parameters (pagination)
name: pageSize
description: |
  Number of results to return per page. Valid range: 1-100.
  Defaults to 20 if not specified.

# Header parameters
name: X-Idempotency-Key
description: |
  Unique identifier for this request to prevent duplicate processing.
  Format: UUID v4. Required for POST operations.
```

### Common Parameter Patterns

| Parameter Type | Description Pattern |
|----------------|-------------------|
| ID/Reference | "Unique [resource] identifier. Format: [format details]." |
| Status filter | "Filter by [resource] status. Valid values: [list]. Defaults to [default]." |
| Date range | "Filter [resources] created/updated after this date. Format: ISO 8601 (YYYY-MM-DD)." |
| Pagination | "Number of results to return. Range: [min-max]. Defaults to [default]." |
| Search | "Search [resources] by [field]. Supports partial matching, case-insensitive." |

---

## Request Bodies

### Description Format

```yaml
requestBody:
  description: |
    [Resource name] object containing [key fields required/optional].

    [Any validation rules, required fields, or constraints].
  required: true
```

### Examples

```yaml
# Creation endpoint
requestBody:
  description: |
    Payment request object containing customer reference, payment amount,
    and payment method details.

    Either a stored payment method reference OR new payment card/account
    details must be provided. The payment is processed immediately upon
    submission.
  required: true

# Update endpoint
requestBody:
  description: |
    Customer profile update object containing fields to modify.

    Only the provided fields will be updated. Omitted fields remain
    unchanged. At least one field must be provided.
  required: true
```

---

## Responses

### Response Descriptions

Every response code needs a description:

| Status Code | Description Pattern |
|-------------|-------------------|
| **200** | "Successfully retrieved [resource]." / "Successfully updated [resource]." |
| **201** | "Successfully created [resource]. Returns the new [resource] details with assigned identifiers." |
| **204** | "Successfully deleted [resource]. No content returned." |
| **400** | "Invalid request. The request body contains validation errors or missing required fields." |
| **401** | "Authentication failed. API key is missing or invalid." |
| **403** | "Forbidden. The API key does not have permission to access this resource." |
| **404** | "[Resource] not found. The specified [identifier] does not exist or does not belong to your account." |
| **409** | "Conflict. A [resource] with this [identifier] already exists." |
| **422** | "Unprocessable entity. The request is valid but cannot be processed due to business rules." |
| **500** | "Internal server error. An unexpected error occurred. Please contact support if this persists." |

### Examples

```yaml
responses:
  '200':
    description: Successfully retrieved payment details.
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PaymentResponse'

  '404':
    description: |
      Payment not found. The specified payment reference does not exist
      or does not belong to your merchant account.
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/ErrorResponse'
```

---

## Examples

### Guidelines

- **Always provide examples** for request bodies and successful responses
- **Use realistic data** that developers can understand
- **Include all required fields** in request examples
- **Show common optional fields** to demonstrate usage
- **Use clear, recognizable values** (not just "string", "12345")

### Naming Conventions for Examples

| Field Type | Example Value | Pattern |
|------------|---------------|---------|
| **Customer Reference** | "CUST-2024-001" | Descriptive + sequence |
| **Payment Reference** | "PAY-20241115-ABC123" | Date-based + unique ID |
| **Amount** | 99.95, 1250.00 | Real prices (not 100, 1000) |
| **Email** | "john.smith@example.com" | Real-looking email |
| **Phone** | "+61412345678" | Valid format |
| **Card Number** | "4111111111111111" | Test card numbers |
| **Dates** | "2024-11-15T10:30:00Z" | ISO 8601 |

### Request Body Example Template

```yaml
example:
  customerReference: "CUST-2024-001"
  amount: 99.95
  currency: "AUD"
  description: "Monthly subscription payment"
  paymentMethod:
    type: "card"
    cardNumber: "4111111111111111"
    expiryMonth: 12
    expiryYear: 2025
    cvv: "123"
    cardholderName: "John Smith"
```

### Response Example Template

```yaml
example:
  paymentReference: "PAY-20241115-ABC123"
  status: "successful"
  amount: 99.95
  currency: "AUD"
  customerReference: "CUST-2024-001"
  createdAt: "2024-11-15T10:30:00Z"
  processedAt: "2024-11-15T10:30:02Z"
  paymentMethod:
    type: "card"
    cardType: "visa"
    lastFourDigits: "1111"
    expiryMonth: 12
    expiryYear: 2025
```

---

## Common Patterns

### Pattern: Get Resource by ID

```yaml
summary: Retrieve [resource] by [identifier]
description: |
  Retrieves [detailed description of what data is returned].

  Returns a 404 error if the [identifier] is not found or does not
  belong to your merchant account.
parameters:
  - name: [identifier]
    in: path
    required: true
    description: Unique [resource] identifier. Format: [format].
    schema:
      type: string
    example: "[example-value]"
responses:
  '200':
    description: Successfully retrieved [resource].
    content:
      application/json:
        example:
          [resource]Id: "[example-id]"
          status: "active"
          # ... other fields
  '404':
    description: [Resource] not found.
```

### Pattern: Create Resource

```yaml
summary: Create a new [resource]
description: |
  Creates a new [resource] with the provided details.

  [Any constraints or validation rules].

  Returns the created [resource] with system-assigned identifiers.
requestBody:
  required: true
  description: [Resource] creation object with required fields.
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/[Resource]Request'
      example:
        field1: "value1"
        field2: "value2"
responses:
  '201':
    description: Successfully created [resource].
    content:
      application/json:
        example:
          [resource]Id: "generated-id"
          field1: "value1"
          field2: "value2"
          createdAt: "2024-11-15T10:30:00Z"
  '400':
    description: Invalid request. Check validation errors.
  '409':
    description: Conflict. [Resource] with this identifier already exists.
```

### Pattern: List/Query Resources

```yaml
summary: List all [resources] [optional: for parent resource]
description: |
  Retrieves a paginated list of [resources] [matching criteria].

  Results are ordered by [field] in [order] order.
  Use pagination parameters to navigate through large result sets.
parameters:
  - name: pageNumber
    in: query
    description: Page number to retrieve. Starts at 1. Defaults to 1.
    schema:
      type: integer
      minimum: 1
    example: 1
  - name: pageSize
    in: query
    description: Number of results per page. Range: 1-100. Defaults to 20.
    schema:
      type: integer
      minimum: 1
      maximum: 100
    example: 20
responses:
  '200':
    description: Successfully retrieved [resources] list.
    content:
      application/json:
        example:
          data:
            - [resource]Id: "id-1"
              # ... fields
            - [resource]Id: "id-2"
              # ... fields
          pagination:
            page: 1
            pageSize: 20
            totalResults: 156
            totalPages: 8
```

---

## Validation Checklist

Before marking documentation as complete, verify:

- [ ] **Summary:** Present, 40-80 chars, starts with action verb
- [ ] **Description:** Present, 2-5 sentences, clear and detailed
- [ ] **Operation ID:** Present and follows naming convention
- [ ] **Tags:** Assigned to appropriate group
- [ ] **Parameters:** All have descriptions with format details
- [ ] **Parameters:** All have example values
- [ ] **Request Body:** Has description and example (if applicable)
- [ ] **Responses:** All status codes have descriptions
- [ ] **Responses:** Success responses have examples
- [ ] **Language:** Uses standardized terminology
- [ ] **Voice:** Active voice, present tense
- [ ] **Clarity:** No vague language or undefined terms

---

## Examples of Before/After

### Before (Poor Quality)

```yaml
/v2/payments/{paymentReference}:
  get:
    summary: Get payment
    parameters:
      - name: paymentReference
        in: path
        required: true
        schema:
          type: string
    responses:
      '200':
        description: OK
```

### After (High Quality)

```yaml
/v2/payments/{paymentReference}:
  get:
    summary: Retrieve payment details by payment reference
    description: |
      Retrieves complete payment details including transaction status,
      payment method, customer reference, and all associated metadata.

      The payment reference is a unique identifier assigned when the
      payment is created. Returns a 404 error if the payment reference
      is not found or does not belong to your merchant account.
    operationId: Payments_GetPayment
    tags:
      - Payments
    parameters:
      - name: paymentReference
        in: path
        required: true
        description: |
          Unique payment identifier assigned during payment creation.
          Format: Alphanumeric string, 1-50 characters.
        schema:
          type: string
          maxLength: 50
        example: "PAY-20241115-ABC123"
    responses:
      '200':
        description: Successfully retrieved payment details.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PaymentResponse'
            example:
              paymentReference: "PAY-20241115-ABC123"
              status: "successful"
              amount: 99.95
              currency: "AUD"
              customerReference: "CUST-2024-001"
              createdAt: "2024-11-15T10:30:00Z"
      '404':
        description: |
          Payment not found. The specified payment reference does not
          exist or does not belong to your merchant account.
```

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-15 | Initial style guide created |
