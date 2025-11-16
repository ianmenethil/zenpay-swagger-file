# API Quality Report: customers

**Generated:** 2025-11-16T06:39:35.068Z

---

## Summary

- **Route Group:** `/v2/customers`
- **Endpoints:** 7
- **Operations:** 12
- **Quality Score:** 0/100 🔴 Needs Improvement

### Issues Found

- 🔴 **Critical:** 0
- 🟡 **Warning:** 42
- ℹ️ **Info:** 19
- **Total:** 61

---

## Endpoints Overview

| Method | Path | Summary | Description | Examples | Issues |
|--------|------|---------|-------------|----------|--------|
| GET | `/v2/customers/{customerReference}` | ✅ | ❌ | ❌ | 3 |
| GET | `/v2/customers/{customerReference}/status` | ✅ | ❌ | ❌ | 4 |
| PUT | `/v2/customers/{customerReference}/status` | ✅ | ❌ | ❌ | 6 |
| GET | `/v2/customers/{customerReference}/account` | ✅ | ❌ | ❌ | 4 |
| PUT | `/v2/customers/{customerReference}/account` | ✅ | ❌ | ❌ | 6 |
| GET | `/v2/customers/{customerReference}/profile` | ✅ | ❌ | ❌ | 4 |
| PUT | `/v2/customers/{customerReference}/profile` | ✅ | ❌ | ❌ | 6 |
| GET | `/v2/customers/{customerReference}/paymentOption` | ✅ | ❌ | ❌ | 4 |
| PUT | `/v2/customers/{customerReference}/paymentOption` | ✅ | ❌ | ❌ | 6 |
| GET | `/v2/customers` | ✅ | ❌ | ❌ | 11 |
| POST | `/v2/customers` | ✅ | ❌ | ❌ | 3 |
| PUT | `/v2/customers/{customerReference}/customerReference` | ✅ | ❌ | ❌ | 4 |

---

## Detailed Analysis

### GET /v2/customers/{customerReference}

**Operation ID:** `Customers_GetCustomer`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 1 with descriptions

**Issues (3):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/customers/{customerReference}/status

**Operation ID:** `Customers_GetCustomerStatus`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (4):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### PUT /v2/customers/{customerReference}/status

**Operation ID:** `Customers_UpdateCustomerStatus`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (6):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/customers/{customerReference}/account

**Operation ID:** `Customers_GetCustomerAccount`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (4):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### PUT /v2/customers/{customerReference}/account

**Operation ID:** `Customers_UpdateCustomerAccount`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (6):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/customers/{customerReference}/profile

**Operation ID:** `Customers_GetCustomerProfile`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (4):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### PUT /v2/customers/{customerReference}/profile

**Operation ID:** `Customers_UpdateCustomerProfile`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (6):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/customers/{customerReference}/paymentOption

**Operation ID:** `Customers_GetCustomerPaymentOption`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (4):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### PUT /v2/customers/{customerReference}/paymentOption

**Operation ID:** `Customers_UpdateCustomerPaymentOption`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (6):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/customers

**Operation ID:** `Customers_Get`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 9 total, 9 with descriptions

**Issues (11):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "customerStatuses" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "fromOpenDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "toOpenDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "fromClosedDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "toClosedDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "paymentOptions" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "offset" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "limit" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### POST /v2/customers

**Operation ID:** `Customers_CreateCustomer`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 0 total, 0 with descriptions

**Issues (3):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

---

### PUT /v2/customers/{customerReference}/customerReference

**Operation ID:** `Customers_UpdateCustomerReference`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 1 with descriptions

**Issues (4):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

## Recommendations

### 🟡 Important Improvements

42 warning(s) should be addressed to improve API quality.

### ℹ️ Optional Enhancements

19 recommendation(s) to further enhance documentation and developer experience.

