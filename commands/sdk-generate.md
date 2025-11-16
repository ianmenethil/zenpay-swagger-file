---
name: sdk-generate
description: Generate TypeScript or Python SDK from OpenAPI spec
---

# Generate SDK

Generates type-safe SDKs from the OpenAPI specification.

**Usage:**
```
/travelpay:sdk-generate [language]
```

**Parameters:**
- `language`: typescript | python | all (default: all)

**Generates:**
- TypeScript SDK in `sdk/typescript/`
- Python SDK in `sdk/python/`
- Type definitions
- API client classes
- Documentation

**Example:**
```
/travelpay:sdk-generate typescript
```

**After generation:**
```bash
# TypeScript
cd sdk/typescript
npm install
npm run build

# Python
cd sdk/python
pip install -r requirements.txt
```
