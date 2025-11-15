# API Quality Report: proxies

**Generated:** 2025-11-15T19:24:11.353Z

---

## Summary

- **Route Group:** `/v2/proxies`
- **Endpoints:** 2
- **Operations:** 2
- **Quality Score:** 21/100 🔴 Needs Improvement

### Issues Found

- 🔴 **Critical:** 0
- 🟡 **Warning:** 4
- ℹ️ **Info:** 3
- **Total:** 7

---

## Endpoints Overview

| Method | Path | Summary | Description | Examples | Issues |
|--------|------|---------|-------------|----------|--------|
| GET | `/v2/proxies/{proxy}` | ✅ | ❌ | ❌ | 3 |
| GET | `/v2/proxies/{proxy}/pricing` | ✅ | ❌ | ❌ | 4 |

---

## Detailed Analysis

### GET /v2/proxies/{proxy}

**Operation ID:** `Proxies_GetPaymentAccountProxy`

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

- **Examples:** Parameter "proxy" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/proxies/{proxy}/pricing

**Operation ID:** `Proxies_GetTransactionFee`

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

- **Examples:** Parameter "proxy" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "paymentAmount" missing example
  - *Suggestion:* Add an example value to help API consumers

---

## Recommendations

### 🟡 Important Improvements

4 warning(s) should be addressed to improve API quality.

### ℹ️ Optional Enhancements

3 recommendation(s) to further enhance documentation and developer experience.

