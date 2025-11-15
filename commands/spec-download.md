---
name: spec-download
description: Download and convert TravelPay OpenAPI specification
---

# Download TravelPay Spec

Downloads the latest TravelPay API specification and converts it to OpenAPI 3.1 format.

**Usage:**
```
/travelpay:spec-download
```

**What it does:**
1. Downloads Swagger 2.0 spec from TravelPay
2. Converts to OpenAPI 3.1
3. Saves to `openapi.json`
4. Validates the conversion

**Next steps after download:**
- Analyze quality: `/travelpay:spec-analyze`
- Generate SDK: `/travelpay:sdk-generate`
- Enhance docs: `/travelpay:spec-enhance`
