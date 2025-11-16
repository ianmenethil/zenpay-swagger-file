# Postman Tools

Comprehensive tooling for working with Postman collections and converting them to OpenAPI 3.1 specifications.

## Scripts

### 1. Download Collections (`postman-download.ts`)

Downloads Postman collections from the Postman API.

**Features:**
- Supports both private (API key) and public (access key) collections
- Automatic retry logic with exponential backoff
- Hash-based caching to avoid unnecessary downloads
- Unwraps API responses automatically for direct use
- Validates collection structure

**Usage:**

```bash
# Download with public access key (from env)
export POSTMAN_ACCESS_KEY=your_access_key
bun run postman:download

# Download with full public URL
bun run postman:download --public-url=https://api.postman.com/collections/xxx?access_key=yyy

# Download with private API key
export POSTMAN_API_KEY=your_api_key
bun run postman:download --collection-id=your_collection_id

# Force re-download (ignore cache)
bun run postman:download --force
```

**Output:**
- `zenith-postman-collection.json` - Original API response (wrapped)
- `zenith-postman-collection-unwrapped.json` - Unwrapped collection (ready for conversion)
- `postman-db.json` - Cache metadata

---

### 2. Convert to OpenAPI 3.1 (`postman-to-openapi31.ts`)

Converts Postman collections to OpenAPI 3.1.1 specification.

**Features:**
- Two-step conversion: Postman → OpenAPI 3.0 → OpenAPI 3.1
- Uses `@scalar/openapi-parser` for upgrade to 3.1.1
- Automatic validation and cleanup
- Fixes invalid server URLs
- Removes undefined variables

**Usage:**

```bash
# Convert default collection
bun run postman:convert

# Convert custom collection
bun run postman:convert --input=custom-collection.json

# Full workflow (download + convert)
bun run postman:full
```

**Output:**
- `zenith-openapi-31.json` - OpenAPI 3.1.1 specification

---

### 3. Upload Collections (`postman-upload.ts`)

Uploads or updates Postman collections via the Postman API.

**Features:**
- Create new collections in a workspace
- Update existing collections
- List available workspaces and collections
- Automatic validation before upload
- Handles both wrapped and unwrapped formats

**Usage:**

```bash
# List workspaces
export POSTMAN_API_KEY=your_api_key
bun run postman:workspaces

# List collections
bun run postman:collections

# Create new collection
bun run postman:upload --file=collection.json --workspace-id=WORKSPACE_ID

# Update existing collection
bun run postman:upload --file=collection.json --collection-id=COLLECTION_ID
```

---

## NPM Scripts

Convenient shortcuts for common operations:

```json
{
  "postman:download": "Download collection from Postman API",
  "postman:convert": "Convert Postman to OpenAPI 3.1",
  "postman:upload": "Upload collection to Postman",
  "postman:workspaces": "List available workspaces",
  "postman:collections": "List available collections",
  "postman:full": "Download and convert in one command"
}
```

## Environment Variables

Add to your `.env` file (see `.env.example`):

```bash
# Postman API key (for private collections)
POSTMAN_API_KEY=your_postman_api_key

# Postman access key (for public collections)
POSTMAN_ACCESS_KEY=your_collection_access_key
```

**Get your keys:**
- API Key: https://web.postman.co/settings/me/api-keys
- Access Key: Share a collection and copy the access key from the URL

## Example Workflow

### Download and Convert Zenith Payments Collection

```bash
# Set your access key
export POSTMAN_ACCESS_KEY=PMAT-xxx

# Download and convert in one command
bun run postman:full

# View the result
bun run docs zenith-openapi-31.json
```

### Create a Modified Collection

```bash
# Download original
bun run postman:download

# Modify zenith-postman-collection-unwrapped.json
# ... your modifications ...

# Upload as new collection
export POSTMAN_API_KEY=your_key
bun run postman:upload --file=zenith-postman-collection-unwrapped.json --workspace-id=YOUR_WORKSPACE
```

## Output Files

| File | Description |
|------|-------------|
| `zenith-postman-collection.json` | Original API response (wrapped) |
| `zenith-postman-collection-unwrapped.json` | Unwrapped collection for tools |
| `zenith-openapi-31.json` | Final OpenAPI 3.1.1 specification |
| `postman-db.json` | Cache metadata |

## Comparison with Scalar Tools

Similar to the Swagger/OpenAPI downloader tools, but specifically for Postman:

| Feature | Swagger Tools | Postman Tools |
|---------|---------------|---------------|
| Download | `swagger-downloader.ts` | `postman-download.ts` |
| Convert | To OpenAPI 3.1 (built-in) | `postman-to-openapi31.ts` |
| Upload | N/A | `postman-upload.ts` |
| Caching | ✅ | ✅ |
| Retry Logic | ✅ | ✅ |
| Output Format | OpenAPI 3.1 | OpenAPI 3.1 |

## Tips

1. **Public vs Private Collections:**
   - Use `POSTMAN_ACCESS_KEY` for shared collections
   - Use `POSTMAN_API_KEY` for your private workspace collections

2. **Caching:**
   - Downloads are cached by hash in `postman-db.json`
   - Use `--force` to bypass cache
   - Delete `postman-db.json` to reset cache

3. **Conversion Quality:**
   - Postman variables (e.g., `{{baseURL}}`) are removed during conversion
   - Default server URL is added if none exist
   - Manual review recommended after conversion

4. **Integration with Other Tools:**
   - Use `validate-spec.ts` to validate converted specs
   - Use `enhance-spec.ts` to improve OpenAPI quality
   - Use `serve-docs.ts` to preview documentation

## Troubleshooting

**Authentication Error:**
```
Invalid API Key
```
→ Check your `POSTMAN_API_KEY` is set correctly

**Collection Not Found:**
```
The specified uid is invalid
```
→ Verify collection ID or use full public URL with access key

**Missing Access Key:**
```
Public access key required
```
→ Set `POSTMAN_ACCESS_KEY` environment variable or use `--public-url`

**Conversion Failed:**
```
Invalid collection: missing items array
```
→ Collection format may be unsupported, ensure it's v2.1 format
