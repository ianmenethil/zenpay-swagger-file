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

import os
import json
import re
import csv

# Default output directory for splitting and audit
OUTPUT_DIR = 'swagger-splitter-output'
AUDIT_DIR = os.path.join(OUTPUT_DIR, 'audit')
PATHS_DIR = os.path.join(OUTPUT_DIR, 'paths')
DEF_DIR = os.path.join(OUTPUT_DIR, 'definitions')

# HTTP methods to consider in Swagger paths
METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

# Primary and fallback endpoints for the Swagger 2.0 spec
PRIMARY_URL = 'https://apiuat.travelpay.com.au/v2.0/help'
FALLBACK_URL = 'https://apiuat.b2bpay.com.au/v2.0/help'

# Output filename for the downloaded spec
OUTPUT_FILE = 'swagger.json'

def fetch(url, verify_ssl=True):
    response = requests.get(url, timeout=30, verify=verify_ssl)
    response.raise_for_status()
    return response.text

def is_empty(v):
    return (
        v is None
        or (isinstance(v, str) and not v.strip())
        or (isinstance(v, (list, tuple)) and len(v) == 0)
        or (isinstance(v, dict) and len(v) == 0)
    )

def finalize(arr, tally, get_keys):
    union = set(tally.keys())
    for r in arr:
        have = get_keys(r)
        r['missing'] = sorted(k for k in union if k not in have)
        r['unique'] = sorted(k for k in have if tally.get(k, 0) == 1)

def scan_split(directory, grp):
    res = []
    tally = {}
    for root, _, files in os.walk(directory):
        for filename in files:
            if not filename.endswith('.json'):
                continue
            path = os.path.join(root, filename)
            data = json.load(open(path, encoding='utf-8'))
            kset = set()
            empty = []
            if grp == 'split-path':
                for op in data.values():
                    if isinstance(op, dict):
                        for k, v in op.items():
                            kset.add(k)
                            if is_empty(v):
                                empty.append(k)
            else:
                for k, v in data.items():
                    kset.add(k)
                    if is_empty(v):
                        empty.append(k)
            for k in kset:
                tally[k] = tally.get(k, 0) + 1
            res.append({'group': grp, 'id': filename, 'missing': [], 'unique': [], 'empty': empty, '_kset': kset})
    union = set(tally.keys())
    for r in res:
        ks = r.pop('_kset')
        r['missing'] = sorted(k for k in union if k not in ks)
        r['unique'] = sorted(k for k in ks if tally.get(k, 0) == 1)
    return res

def main():
    # Use local swagger.json if already present, else download spec (primary then fallback)
    if os.path.exists(OUTPUT_FILE):
        print(f"Found local {OUTPUT_FILE}, skipping download")
        content = open(OUTPUT_FILE, encoding='utf-8').read()
    else:
        urls = [PRIMARY_URL, FALLBACK_URL]
        content = None
        for idx, url in enumerate(urls, start=1):
            try:
                print(f"Fetching Swagger spec from {url}...")
                content = fetch(url)
                with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Saved spec to {OUTPUT_FILE}")
                break
            except requests.exceptions.SSLError as ssl_err:
                sys.stderr.write(f"SSL error fetching {url}: {ssl_err}\n")
            except requests.exceptions.RequestException as req_err:
                sys.stderr.write(f"Error fetching {url}: {req_err}\n")

            if idx < len(urls):
                print("Attempting fallback URL...", file=sys.stderr)

        if content is None:
            sys.stderr.write("Failed to fetch Swagger spec from both primary and fallback URLs.\n")
            return 1

    # Load and validate spec
    swagger = json.loads(content)
    if 'paths' not in swagger or 'definitions' not in swagger:
        sys.stderr.write("Invalid Swagger 2.0 spec (missing paths/definitions)\n")
        return 1

    # Prepare output directories
    os.makedirs(AUDIT_DIR, exist_ok=True)
    os.makedirs(PATHS_DIR, exist_ok=True)
    os.makedirs(DEF_DIR, exist_ok=True)

    # 1) Whole-file audit
    print(f"\n🔍 Whole-file audit of {OUTPUT_FILE}\n")
    whole_path = []
    path_tally = {}
    for route, methods in swagger['paths'].items():
        for m, op in methods.items():
            if m not in METHODS:
                continue
            keys = list(op.keys())
            for k in keys:
                path_tally[k] = path_tally.get(k, 0) + 1
            empty_fields = [k for k in keys if is_empty(op[k])]
            whole_path.append({'group': 'whole-path', 'id': f"{route}#{m}", 'missing': [], 'unique': [], 'empty': empty_fields})

    whole_def = []
    def_tally = {}
    for name, def_obj in swagger['definitions'].items():
        keys = list(def_obj.keys())
        for k in keys:
            def_tally[k] = def_tally.get(k, 0) + 1
        empty_fields = [k for k in keys if is_empty(def_obj[k])]
        whole_def.append({'group': 'whole-def', 'id': name, 'missing': [], 'unique': [], 'empty': empty_fields})

    finalize(whole_path, path_tally, lambda r: set(swagger['paths'][r['id'].split('#')[0]][r['id'].split('#')[1]].keys()))
    finalize(whole_def, def_tally, lambda r: set(swagger['definitions'][r['id']].keys()))

    whole_results = whole_path + whole_def

    with open(os.path.join(AUDIT_DIR, 'wholefile-audit.json'), 'w', encoding='utf-8') as f:
        json.dump(whole_results, f, indent=2)
    with open(os.path.join(AUDIT_DIR, 'wholefile-audit.csv'), 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['group', 'id', 'missingKeys', 'uniqueKeys', 'emptyKeys'])
        for r in whole_results:
            writer.writerow([r['group'], r['id'], ';'.join(r['missing']), ';'.join(r['unique']), ';'.join(r['empty'])])

    print(f"Saved whole-file audit to {AUDIT_DIR}/wholefile-audit.json and CSV to {AUDIT_DIR}/wholefile-audit.csv")

    print("\n── Whole-file issues ──")
    for r in whole_results:
        if r['missing'] or r['unique'] or r['empty']:
            tag = '[path]' if r['group'] == 'whole-path' else '[def ]'
            print(f"{tag} {r['id'].ljust(40)} miss:[{','.join(r['missing'])}] uniq:[{','.join(r['unique'])}] empty:[{','.join(r['empty'])}]")

    # 2) Split & bundle Swagger
    print(f"\n🔍 Splitting {OUTPUT_FILE}…")
    for route, methods in swagger['paths'].items():
        fn = re.sub(r'[^a-zA-Z0-9]', '_', route) + '.json'
        with open(os.path.join(PATHS_DIR, fn), 'w', encoding='utf-8') as f:
            json.dump(methods, f, indent=2)
    for name, def_obj in swagger['definitions'].items():
        with open(os.path.join(DEF_DIR, f"{name}.json"), 'w', encoding='utf-8') as f:
            json.dump(def_obj, f, indent=2)

    ref_root = {
        'swagger': swagger.get('swagger'),
        'info': swagger.get('info'),
        'host': swagger.get('host'),
        'basePath': swagger.get('basePath'),
        'schemes': swagger.get('schemes'),
        'consumes': swagger.get('consumes'),
        'produces': swagger.get('produces'),
        'paths': {},
        'definitions': {}
    }
    for route in swagger['paths']:
        fn = re.sub(r'[^a-zA-Z0-9]', '_', route) + '.json'
        ref_root['paths'][route] = {'$ref': f"paths/{fn}"}
    for name in swagger['definitions']:
        ref_root['definitions'][name] = {'$ref': f"definitions/{name}.json"}

    with open(os.path.join(OUTPUT_DIR, 'swagger-ref.json'), 'w', encoding='utf-8') as f:
        json.dump(ref_root, f, indent=2)
    print("Split files written and swagger-ref.json created")

    # 3) Split-folder audit
    print("\n🔍 Split-folder audit…")
    split_path = scan_split(PATHS_DIR, 'split-path')
    split_def = scan_split(DEF_DIR, 'split-def')
    split_all = split_path + split_def

    with open(os.path.join(AUDIT_DIR, 'split-audit.json'), 'w', encoding='utf-8') as f:
        json.dump(split_all, f, indent=2)
    with open(os.path.join(AUDIT_DIR, 'split-audit.csv'), 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['group', 'id', 'missingKeys', 'uniqueKeys', 'emptyKeys'])
        for r in split_all:
            writer.writerow([r['group'], r['id'], ';'.join(r['missing']), ';'.join(r['unique']), ';'.join(r['empty'])])

    print(f"Saved split-folder audit to {AUDIT_DIR}/split-audit.json and CSV to {AUDIT_DIR}/split-audit.csv")
    print("\n── Split-folder issues ──")
    for r in split_all:
        if r['missing'] or r['unique'] or r['empty']:
            tag = '[path]' if r['group'] == 'split-path' else '[def ]'
            print(f"{tag} {r['id'].ljust(40)} miss:[{','.join(r['missing'])}] uniq:[{','.join(r['unique'])}] empty:[{','.join(r['empty'])}]")

    print("\nAll done ✅")
    return 0

if __name__ == '__main__':
    sys.exit(main())