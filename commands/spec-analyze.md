---
name: spec-analyze
description: Analyze OpenAPI specification quality and completeness
---

# Analyze OpenAPI Spec

Analyzes the OpenAPI specification for quality issues, missing documentation, and completeness.

**Usage:**
```
/travelpay:spec-analyze [route]
```

**Parameters:**
- `route` (optional): Analyze specific route only (e.g., "payments", "customers")

**Generates:**
- Quality score per route
- List of issues (missing descriptions, examples, etc.)
- Recommendations for improvements
- Reports saved to `reports/` directory

**Example:**
```
/travelpay:spec-analyze payments
```
