# API Quality Report: preauths

**Generated:** 2025-11-16T03:34:01.019Z

---

## Summary

- **Route Group:** `/v2/preauths`
- **Endpoints:** 4
- **Operations:** 5
- **Quality Score:** 0/100 🔴 Needs Improvement

### Issues Found

- 🔴 **Critical:** 5
- 🟡 **Warning:** 22
- ℹ️ **Info:** 8
- **Total:** 35

---

## Endpoints Overview

| Method | Path | Summary | Description | Examples | Issues |
|--------|------|---------|-------------|----------|--------|
| GET | `/v2/preauths/{preauthReference}` | ❌ | ❌ | ❌ | 5 |
| GET | `/v2/preauths` | ❌ | ❌ | ❌ | 13 |
| POST | `/v2/preauths` | ❌ | ❌ | ❌ | 5 |
| PUT | `/v2/preauths/{preauthReference}/voids` | ❌ | ❌ | ❌ | 5 |
| POST | `/v2/preauths/{preauthReference}/captures` | ❌ | ❌ | ❌ | 7 |

---

## Detailed Analysis

### GET /v2/preauths/{preauthReference}

**Operation ID:** `Preauths_Get`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (5):**

#### 🔴 Critical Issues

- **Documentation:** Missing summary
  - *Suggestion:* Add a concise summary describing what this endpoint does

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "preauthReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "preauthReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### GET /v2/preauths

**Operation ID:** `Preauths_GetV2Preauths`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 5 total, 0 with descriptions

**Issues (13):**

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
- **Examples:** Parameter "offset" missing example
  - *Suggestion:* Add an example value to help API consumers
- **Examples:** Parameter "limit" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### POST /v2/preauths

**Operation ID:** `Preauths_Post`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 0 total, 0 with descriptions

**Issues (5):**

#### 🔴 Critical Issues

- **Documentation:** Missing summary
  - *Suggestion:* Add a concise summary describing what this endpoint does

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

---

### PUT /v2/preauths/{preauthReference}/voids

**Operation ID:** `Preauths_VoidPreauth`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (5):**

#### 🔴 Critical Issues

- **Documentation:** Missing summary
  - *Suggestion:* Add a concise summary describing what this endpoint does

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "preauthReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "preauthReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

### POST /v2/preauths/{preauthReference}/captures

**Operation ID:** `Preauths_CapturePreauth`

**Quality Checks:**

- Summary: ❌ Missing
- Description: ❌ Missing
- Request Examples: ❌ Missing
- Response Examples: ❌ Missing
- Parameters: 1 total, 0 with descriptions

**Issues (7):**

#### 🔴 Critical Issues

- **Documentation:** Missing summary
  - *Suggestion:* Add a concise summary describing what this endpoint does

#### 🟡 Warnings

- **Documentation:** Missing description
  - *Suggestion:* Add a detailed description explaining the endpoint's purpose, behavior, and usage
- **Documentation:** Parameter "preauthReference" missing description
  - *Suggestion:* Add a description explaining the parameter's purpose and expected values
- **Documentation:** Request body missing description
  - *Suggestion:* Add a description explaining the request body structure
- **Examples:** Request body missing examples
  - *Suggestion:* Add example request bodies to help developers understand the expected format
- **Examples:** No response examples provided
  - *Suggestion:* Add example responses to show the expected response structure

#### ℹ️ Recommendations

- **Examples:** Parameter "preauthReference" missing example
  - *Suggestion:* Add an example value to help API consumers

---

## Recommendations

### 🔴 Critical Actions Required

5 critical issue(s) must be addressed:

**Documentation** (5 issues)
- GET /v2/preauths/{preauthReference}: Missing summary
- GET /v2/preauths: Missing summary
- POST /v2/preauths: Missing summary
- ... and 2 more

### 🟡 Important Improvements

22 warning(s) should be addressed to improve API quality.

### ℹ️ Optional Enhancements

8 recommendation(s) to further enhance documentation and developer experience.

