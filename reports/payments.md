# API Quality Report: payments

**Generated:** 2025-11-15T11:15:25.593Z

---

## Summary

- **Route Group:** `/v2/payments`
- **Endpoints:** 5
- **Operations:** 7
- **Quality Score:** 0/100 🔴 Needs Improvement

### Issues Found

- 🔴 **Critical:** 2
- 🟡 **Warning:** 29
- ℹ️ **Info:** 16
- **Total:** 47

---

## Endpoints Overview

| Method | Path | Summary | Description | Examples | Issues |
|--------|------|---------|-------------|----------|--------|
| GET | `/v2/payments/{paymentReference}` | ✅ | ❌ | ❌ | 3 |
| GET | `/v2/payments/uniqueId/{merchantUniqueId}` | ✅ | ❌ | ❌ | 3 |
| GET | `/v2/payments/{paymentReference}/refundrequests` | ✅ | ❌ | ❌ | 3 |
| POST | `/v2/payments/{paymentReference}/refundrequests` | ✅ | ❌ | ❌ | 5 |
| GET | `/v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}` | ❌ | ❌ | ❌ | 7 |
| GET | `/v2/payments` | ❌ | ❌ | ❌ | 23 |
| POST | `/v2/payments` | ✅ | ❌ | ❌ | 3 |

---

## Detailed Analysis

### GET /v2/payments/{paymentReference}

**Operation ID:** `Payments_GetPayment`

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

- **Examples:** Parameter "paymentReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/payments/uniqueId/{merchantUniqueId}

**Operation ID:** `Payments_GetPaymentByUniqueId`

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

- **Examples:** Parameter "merchantUniqueId" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/payments/{paymentReference}/refundrequests

**Operation ID:** `Payments_GetRefundRequest`

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

- **Examples:** Parameter "paymentReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### POST /v2/payments/{paymentReference}/refundrequests

**Operation ID:** `Payments_CreateRefundRequests`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 1 with descriptions

**Issues (5):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "paymentReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}

**Operation ID:** `Payments_GetV2PaymentsUniqueIdByPaymentReferenceRefundrequestsByRefundRequestUniqueId`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 2 total, 0 with descriptions

**Issues (7):**

#### 🔴 Critical Issues

- **Documentation:** Missing summary
  - *Suggestion:* Add a concise summary describing what this endpoint does

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "paymentReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "refundRequestUniqueId" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "paymentReference" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "refundRequestUniqueId" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/payments

**Operation ID:** `Payments_Get`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 10 total, 0 with descriptions

**Issues (23):**

#### 🔴 Critical Issues

- **Documentation:** Missing summary
  - *Suggestion:* Add a concise summary describing what this endpoint does

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "customerReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "fromProcessedDate" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "toProcessedDate" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "settlementDate" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "paymentSettlement" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "transactionTypes" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "isRecalled" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "isRefunded" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "offset" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Parameter "limit" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "customerReference" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "fromProcessedDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "toProcessedDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "settlementDate" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "paymentSettlement" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "transactionTypes" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "isRecalled" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "isRefunded" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "offset" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "limit" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### POST /v2/payments

**Operation ID:** `Payments_Post`

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

## Recommendations

### 🔴 Critical Actions Required

2 critical issue(s) must be addressed:

**Documentation** (2 issues)
- GET /v2/payments/uniqueId/{paymentReference}/refundrequests/{refundRequestUniqueId}: Missing summary
- GET /v2/payments: Missing summary

### 🟡 Important Improvements

29 warning(s) should be addressed to improve API quality.

### ℹ️ Optional Enhancements

16 recommendation(s) to further enhance documentation and developer experience.

