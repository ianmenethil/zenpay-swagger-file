# Complete OpenAPI 3.1 Properties Checklist

## Operation-Level Properties

### ✅ Currently Checked
- `summary` - Brief description (40-80 chars)
- `description` - Detailed explanation (2-5 sentences)
- `operationId` - Unique identifier for code generation
- `tags` - Grouping for organization
- `deprecated` - Warning flag for deprecated endpoints

### ⚠️ Not Yet Checked (Should Add)

**Request/Response:**
- `externalDocs` - Link to external documentation
  ```yaml
  externalDocs:
    description: "See payment flow documentation"
    url: "https://docs.travelpay.com.au/payments"
  ```

- `callbacks` - Webhook/callback definitions
  ```yaml
  callbacks:
    paymentComplete:
      '{$request.body#/callbackUrl}':
        post:
          requestBody:
            # ...
  ```

- `security` - Security requirements override
  ```yaml
  security:
    - ApiKeyAuth: []
    - OAuth2: [read, write]
  ```

- `servers` - Server override for specific operation
  ```yaml
  servers:
    - url: https://api-payments.travelpay.com.au
      description: Payments-specific server
  ```

**Request Body:**
- `requestBody.required` - Whether body is required
- `requestBody.content.<mediaType>.encoding` - Encoding rules for multipart
- `requestBody.content.<mediaType>.examples` - Multiple named examples

**Responses:**
- `responses.<code>.headers` - Response headers
- `responses.<code>.links` - HATEOAS links to related operations
- `responses.<code>.content.<mediaType>.examples` - Multiple named examples
- `responses.default` - Default/catch-all response

**Parameters:**
- `parameters[].deprecated` - Parameter deprecation flag
- `parameters[].allowEmptyValue` - Allow empty string
- `parameters[].style` - Serialization style
- `parameters[].explode` - Array/object expansion
- `parameters[].allowReserved` - Allow reserved chars
- `parameters[].schema.default` - Default value
- `parameters[].schema.enum` - Valid values list
- `parameters[].schema.pattern` - Validation regex
- `parameters[].schema.minimum/maximum` - Number constraints
- `parameters[].schema.minLength/maxLength` - String constraints

---

## Schema-Level Properties

### ✅ Currently Checked
- `description` - Schema description
- `title` - Schema title
- `example` - Example value
- `properties.<name>.description` - Property descriptions

### ⚠️ Not Yet Checked (Should Add)

**Validation:**
- `type` - Data type
- `format` - String format (email, uuid, date-time, etc.)
- `pattern` - Regex validation
- `minimum`, `maximum` - Number bounds
- `exclusiveMinimum`, `exclusiveMaximum` - Exclusive bounds
- `multipleOf` - Number must be multiple of
- `minLength`, `maxLength` - String length
- `minItems`, `maxItems` - Array size
- `uniqueItems` - Array uniqueness
- `minProperties`, `maxProperties` - Object property count
- `required` - Required properties list
- `enum` - Valid values
- `const` - Single allowed value

**Composition:**
- `allOf` - Must match all schemas
- `oneOf` - Must match exactly one schema
- `anyOf` - Must match at least one schema
- `not` - Must not match schema

**Metadata:**
- `title` - Human-readable title
- `description` - Explanation
- `default` - Default value
- `examples` - Array of examples (OAS 3.1+)
- `deprecated` - Deprecation flag
- `readOnly` - Read-only property
- `writeOnly` - Write-only property
- `xml` - XML representation hints
  ```yaml
  xml:
    name: Customer
    namespace: http://example.com/schema
    prefix: cust
    attribute: false
    wrapped: true
  ```

**Discriminator:**
- `discriminator` - Polymorphism support
  ```yaml
  discriminator:
    propertyName: paymentType
    mapping:
      card: '#/components/schemas/CardPayment'
      bank: '#/components/schemas/BankPayment'
  ```

**Additional Properties:**
- `additionalProperties` - Whether extra properties allowed
- `nullable` - Whether null is valid (OAS 3.0) / use type array in 3.1
- `$comment` - Comments for schema maintainers (OAS 3.1+)

---

## Component-Level Properties

### Security Schemes
- `type` - apiKey, http, oauth2, openIdConnect
- `description` - How to use this security
- `name` - Parameter name (for apiKey)
- `in` - Location (header, query, cookie)
- `scheme` - HTTP auth scheme (basic, bearer)
- `bearerFormat` - JWT, etc.
- `flows` - OAuth2 flow definitions
  - `implicit`, `password`, `clientCredentials`, `authorizationCode`
  - Each has: `authorizationUrl`, `tokenUrl`, `refreshUrl`, `scopes`
- `openIdConnectUrl` - OpenID Connect discovery URL

### Examples
- Named examples with `summary`, `description`, `value`, `externalValue`
  ```yaml
  examples:
    validPayment:
      summary: Valid payment request
      description: Example of a successful payment
      value:
        amount: 99.95
        currency: AUD
  ```

### Headers
- All parameter properties apply
  ```yaml
  headers:
    X-RateLimit-Limit:
      description: Requests per hour
      schema:
        type: integer
      example: 5000
  ```

### Request Bodies (Reusable)
- Same as inline requestBody

### Responses (Reusable)
- Same as inline responses

### Links
- `operationRef` or `operationId` - Link to operation
- `parameters` - Parameter mappings
- `requestBody` - Request body mapping
- `description` - Link description
- `server` - Server override

### Callbacks (Reusable)
- Webhook definitions

---

## Global Properties

### Info Object
- ✅ `title` - API name
- ✅ `version` - API version
- ✅ `description` - API description
- ⚠️ `termsOfService` - TOS URL
- ⚠️ `contact` - Contact info
  ```yaml
  contact:
    name: API Support
    url: https://support.travelpay.com.au
    email: api-support@travelpay.com.au
  ```
- ⚠️ `license` - License info
  ```yaml
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
  ```
- ⚠️ `summary` - Short description (OAS 3.1+)

### Servers
- ✅ `url` - Server URL
- ⚠️ `description` - Server description
- ⚠️ `variables` - URL template variables
  ```yaml
  servers:
    - url: https://{environment}.travelpay.com.au/{version}
      description: TravelPay API
      variables:
        environment:
          default: api
          enum: [api, api-uat, api-sandbox]
          description: Environment
        version:
          default: v2.0
          description: API version
  ```

### Tags
- ✅ `name` - Tag name
- ⚠️ `description` - Tag description
- ⚠️ `externalDocs` - External documentation

### External Docs
- `description` - Description
- `url` - URL

### Webhooks (OAS 3.1+)
- Similar to paths but for callbacks
  ```yaml
  webhooks:
    paymentComplete:
      post:
        requestBody:
          # ...
  ```

---

## Priority for Enhancement Script

### High Priority (Add Now)
1. **Parameter validation properties:**
   - `schema.enum` - Shows valid values
   - `schema.pattern` - Regex validation
   - `schema.minimum/maximum` - Constraints
   - `schema.format` - Type format (email, uuid, etc.)

2. **Schema validation properties:**
   - `required` - Required fields
   - `enum` - Valid values
   - `format` - Data format
   - `pattern` - Validation regex
   - `minimum/maximum` - Constraints

3. **Response headers:**
   - Common headers like `X-RateLimit-*`, `ETag`, etc.

4. **Multiple examples:**
   - Use `examples` (plural) instead of `example`
   - Provide success, error, edge case examples

5. **Contact & License:**
   - `info.contact` - Support contact
   - `info.license` - License info

### Medium Priority
6. **Security requirements:**
   - Per-operation security overrides
   - Document required scopes

7. **External documentation:**
   - Links to detailed docs
   - Migration guides

8. **Server variables:**
   - Environment selection
   - Version selection

9. **Deprecated flags:**
   - Mark deprecated operations
   - Provide migration path

### Low Priority (Nice to Have)
10. **Links (HATEOAS)**
11. **Callbacks/Webhooks**
12. **XML metadata**
13. **Discriminators**

---

## Example: Enhanced Parameter with All Properties

```yaml
parameters:
  - name: status
    in: query
    description: |
      Filter payments by status. Multiple statuses can be provided
      as comma-separated values.
    required: false
    deprecated: false
    allowEmptyValue: false
    style: form
    explode: false
    schema:
      type: array
      items:
        type: string
        enum:
          - successful
          - failed
          - pending
          - cancelled
          - refunded
      minItems: 1
      maxItems: 5
      default: []
    example: "successful,pending"
    examples:
      singleStatus:
        summary: Single status filter
        value: "successful"
      multipleStatuses:
        summary: Multiple status filter
        value: "successful,pending,cancelled"
```

## Example: Enhanced Schema with All Properties

```yaml
components:
  schemas:
    PaymentRequest:
      type: object
      title: Payment Request
      description: |
        Request object for creating a new payment transaction.
        Contains customer reference, amount, and payment method details.
      required:
        - customerReference
        - amount
        - currency
      properties:
        customerReference:
          type: string
          description: Unique customer identifier
          minLength: 1
          maxLength: 50
          pattern: '^[A-Z0-9-]+$'
          example: "CUST-2024-001"
        amount:
          type: number
          description: Payment amount in the specified currency
          format: decimal
          minimum: 0.01
          maximum: 999999.99
          multipleOf: 0.01
          example: 99.95
        currency:
          type: string
          description: ISO 4217 currency code
          minLength: 3
          maxLength: 3
          pattern: '^[A-Z]{3}$'
          enum: [AUD, NZD, USD]
          default: AUD
          example: AUD
        description:
          type: string
          description: Payment description visible to customer
          minLength: 1
          maxLength: 255
          example: "Monthly subscription payment"
        metadata:
          type: object
          description: Custom metadata for the payment
          additionalProperties:
            type: string
          maxProperties: 20
          example:
            orderId: "ORDER-12345"
            invoiceNumber: "INV-2024-001"
      examples:
        - summary: Card payment
          value:
            customerReference: "CUST-2024-001"
            amount: 99.95
            currency: AUD
            description: "Monthly subscription"
        - summary: Bank transfer
          value:
            customerReference: "CUST-2024-002"
            amount: 1250.00
            currency: AUD
            description: "Invoice payment"
```

---

## Validation Checklist

When enhancing, check:

- [ ] `summary` - Present, concise
- [ ] `description` - Present, detailed
- [ ] `operationId` - Present, unique
- [ ] `tags` - Appropriate tags assigned
- [ ] `parameters[].description` - All params documented
- [ ] `parameters[].example` - All params have examples
- [ ] `parameters[].schema.enum` - Valid values documented
- [ ] `parameters[].schema.pattern` - Validation rules documented
- [ ] `requestBody.description` - Body documented
- [ ] `requestBody.required` - Requirement specified
- [ ] `requestBody.content.<type>.example` - Example provided
- [ ] `responses.<code>.description` - All responses documented
- [ ] `responses.<code>.content.<type>.example` - Examples provided
- [ ] `responses.<code>.headers` - Headers documented
- [ ] `schemas.description` - Schema documented
- [ ] `schemas.required` - Required fields listed
- [ ] `schemas.properties.<name>.description` - All properties documented
- [ ] `schemas.properties.<name>.example` - Examples provided
- [ ] `schemas.properties.<name>.enum` - Valid values listed
- [ ] `schemas.properties.<name>.format` - Format specified
- [ ] `schemas.properties.<name>.pattern` - Validation regex provided
- [ ] `schemas.example` or `schemas.examples` - Complete object examples
- [ ] `info.contact` - Contact info provided
- [ ] `info.license` - License specified
- [ ] `servers[].description` - Server descriptions
- [ ] `tags[].description` - Tag descriptions
- [ ] `externalDocs` - External docs linked where appropriate

---

## References

- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [JSON Schema](https://json-schema.org/draft/2020-12/schema)
- [OpenAPI Examples](https://github.com/OAI/OpenAPI-Specification/tree/main/examples)
