# TravelPay API Specification Tools

Automated downloader and converter for TravelPay Payments API specifications.

## Features

- **Smart Caching**: Downloads only when spec changes (SHA-256 hash comparison)
- **Retry Logic**: 3 attempts per endpoint with exponential backoff
- **Fallback URLs**: Automatically tries multiple endpoints
- **Format Conversion**: Swagger 2.0 → OpenAPI 3.1
- **Data Validation**: Ensures no metadata lost in conversion

## Usage

```bash
# Download spec and convert (first time)
bun run swagger-downloader.ts

# Subsequent runs use cache if spec unchanged
bun run swagger-downloader.ts
```

## Endpoints (in priority order)

1. `https://api.sandbox.travelpay.com.au/v2.0/help`
2. `https://api.sandbox.b2bpay.com.au/v2.0/help`
3. `https://apiuat.travelpay.com.au/v2.0/help`

## Output Files

- `swagger.json` - Original Swagger 2.0 specification
- `openapi.json` - Converted OpenAPI 3.1 specification
- `db.json` - Cache metadata (hash, timestamp, URL)

## Cache Database

The `db.json` file tracks:
- `lastDownload` - ISO 8601 timestamp
- `hash` - SHA-256 of spec content
- `sourceUrl` - Successful endpoint used
- `size` - File size in bytes

## Validation

The script validates that conversion preserves:
- Summaries and descriptions
- Operation IDs and tags
- Parameters (query, path, header, body)
- Response schemas and examples
- Schema property descriptions
- Deprecated flags

## Current Stats

- **30** API paths
- **39** Operations
- **59** Schema definitions
