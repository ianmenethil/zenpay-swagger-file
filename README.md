# Zenpay Swagger File

This repository contains the Zenpay Swagger specification and supporting scripts.

## Files

- [swagger.json](./swagger.json) – the full Swagger (OpenAPI) specification for the Zenpay API.
- [swagger-downloader.py](./swagger-downloader.py) – script to download/refresh `swagger.json` with fallback logic.
- [swagger-splitter.ts](./swagger-splitter.ts) – script to split `swagger.json` into per-definition and per-path files.
- [swagger-splitter-output/](./swagger-splitter-output/) – output folder of `swagger-splitter.ts`, including split definitions and paths.

## Usage

1. To fetch or update `swagger.json`:
   ```bash
   python3 swagger-downloader.py
   ```

2. To split `swagger.json` into smaller files:
   ```bash
   npm install
   ts-node swagger-splitter.ts
   ```

Any contributions, issues or pull requests are very welcome.