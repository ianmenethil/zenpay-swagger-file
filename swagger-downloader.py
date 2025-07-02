#!/usr/bin/env python3
"""
swagger-downloader.py

Download the Swagger 2.0 spec from the primary URL, falling back to a secondary URL on failure,
and save it to a local file (swagger.json by default).

Requires:
    - Python 3.x
    - requests (install via pip install requests)
"""

import sys

try:
    import requests
except ImportError:
    sys.stderr.write("Error: 'requests' library is required. Install with 'pip install requests'.\n")
    sys.exit(1)

# Primary and fallback endpoints for the Swagger 2.0 spec
PRIMARY_URL = 'https://apiuat.travelpay.com.au/v2.0/help'
FALLBACK_URL = 'https://apiuat.b2bpay.com.au/v2.0/help'

# Output filename for the downloaded spec
OUTPUT_FILE = 'swagger.json'

def fetch(url, verify_ssl=True):
    response = requests.get(url, timeout=30, verify=verify_ssl)
    response.raise_for_status()
    return response.text

def main():
    # Try primary then fallback
    urls = [PRIMARY_URL, FALLBACK_URL]
    for idx, url in enumerate(urls, start=1):
        try:
            print(f"Fetching Swagger spec from {url}...")
            content = fetch(url)
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Saved spec to {OUTPUT_FILE}")
            return 0
        except requests.exceptions.SSLError as ssl_err:
            sys.stderr.write(f"SSL error fetching {url}: {ssl_err}\n")
        except requests.exceptions.RequestException as req_err:
            sys.stderr.write(f"Error fetching {url}: {req_err}\n")

        if idx < len(urls):
            print("Attempting fallback URL...", file=sys.stderr)

    sys.stderr.write("Failed to fetch Swagger spec from both primary and fallback URLs.\n")
    return 1

if __name__ == '__main__':
    sys.exit(main())