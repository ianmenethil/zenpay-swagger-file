# API Quality Report: cardproxies

**Generated:** 2025-11-15T11:15:25.585Z

---

## Summary

- **Route Group:** `/v2/cardproxies`
- **Endpoints:** 3
- **Operations:** 4
- **Quality Score:** 0/100 🔴 Needs Improvement

### Issues Found

- 🔴 **Critical:** 0
- 🟡 **Warning:** 9
- ℹ️ **Info:** 4
- **Total:** 13

---

## Endpoints Overview

| Method | Path | Summary | Description | Examples | Issues |
|--------|------|---------|-------------|----------|--------|
| GET | `/v2/cardproxies/{cardProxy}` | ✅ | ❌ | ❌ | 3 |
| DELETE | `/v2/cardproxies/{cardProxy}` | ✅ | ❌ | ❌ | 3 |
| GET | `/v2/cardproxies/{cardProxy}/pricing` | ✅ | ❌ | ❌ | 4 |
| POST | `/v2/cardproxies` | ✅ | ❌ | ❌ | 3 |

---

## Detailed Analysis

### GET /v2/cardproxies/{cardProxy}

**Operation ID:** `CardProxies_GetTokenDetail`

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

- **Examples:** Parameter "cardProxy" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### DELETE /v2/cardproxies/{cardProxy}

**Operation ID:** `CardProxies_Delete`

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

- **Examples:** Parameter "cardProxy" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/cardproxies/{cardProxy}/pricing

**Operation ID:** `CardProxies_GetTransactionFee`

**Quality Checks:**

- Summary: ✅ Present
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 2 total, 2 with descriptions

**Issues (4):**

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "cardProxy" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "paymentAmount" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### POST /v2/cardproxies

**Operation ID:** `CardProxies_Tokenise`

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

### 🟡 Important Improvements

9 warning(s) should be addressed to improve API quality.

### ℹ️ Optional Enhancements

4 recommendation(s) to further enhance documentation and developer experience.

