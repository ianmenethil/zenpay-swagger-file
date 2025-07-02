// swaggerSplitAuditer.ts — full detail audit & split for Swagger 2.0
// Usage: deno run -A swaggerSplitAuditer.ts -i ./swagger.json -o ./swagger-splitter-output

import { bold, green, yellow, red, cyan } from "https://deno.land/std@0.201.0/fmt/colors.ts";
import { ensureDir }                     from "https://deno.land/std@0.201.0/fs/ensure_dir.ts";
import { walk }                          from "https://deno.land/std@0.201.0/fs/walk.ts";
import { join, basename }               from "https://deno.land/std@0.201.0/path/mod.ts";
import { parse }                         from "https://deno.land/std@0.201.0/flags/mod.ts";

// ─── CLI flags & paths ─────────────────────────────────────────────────────
const { input, output } = parse(Deno.args, {
  alias: { i: "input", o: "output" },
  default: { input: "./swagger.json", output: "./swagger-splitter-output" }
});
const IN_FILE   = input as string;
const OUT_ROOT  = output as string;
const AUDIT_DIR = join(OUT_ROOT, "audit");
const PATHS_DIR = join(OUT_ROOT, "paths");
const DEF_DIR   = join(OUT_ROOT, "definitions");

await ensureDir(AUDIT_DIR);
await ensureDir(PATHS_DIR);
await ensureDir(DEF_DIR);

// ─── Helpers ─────────────────────────────────────────────────────────────────
const METHODS = ["get","post","put","patch","delete","head","options"];
const isEmpty = (v: unknown) =>
  v == null ||
  (typeof v === "string" && (v as string).trim() === "") ||
  (Array.isArray(v) && (v as any[]).length === 0) ||
  (typeof v === "object" && Object.keys(v as object).length === 0);

interface Result {
  group   : "whole-path"|"whole-def"|"split-path"|"split-def";
  id      : string;
  missing : string[];
  unique  : string[];
  empty   : string[];
}

// ─── 1) Whole-file audit ─────────────────────────────────────────────────────
console.log(bold(`\n🔍 Whole-file audit of ${IN_FILE}\n`));
const swagger = JSON.parse(await Deno.readTextFile(IN_FILE));
if (!swagger.paths || !swagger.definitions) {
  console.error(red("✘ Invalid Swagger 2.0 (missing paths/definitions)"));
  Deno.exit(1);
}

// collect and tally operations
const wholePath: Result[] = [];
const pathTally: Record<string,number> = {};
for (const [route, methods] of Object.entries(swagger.paths as Record<string,any>)) {
  for (const [m, op] of Object.entries(methods)) {
    if (!METHODS.includes(m)) continue;
    const keys = Object.keys(op as object);
    keys.forEach(k => pathTally[k] = (pathTally[k]||0) + 1);
    const empty = keys.filter(k => isEmpty((op as any)[k]));
    wholePath.push({ group:"whole-path", id:`${route}#${m}`, missing:[], unique:[], empty });
  }
}

// collect and tally definitions
const wholeDef: Result[] = [];
const defTally: Record<string,number> = {};
for (const [name, defObj] of Object.entries(swagger.definitions as Record<string,any>)) {
  const keys = Object.keys(defObj as object);
  keys.forEach(k => defTally[k] = (defTally[k]||0) + 1);
  const empty = keys.filter(k => isEmpty((defObj as any)[k]));
  wholeDef.push({ group:"whole-def", id:name, missing:[], unique:[], empty });
}

// compute missing & unique
function finalize(arr: Result[], tally: Record<string,number>, getKeys: (r:Result)=>Set<string>) {
  const union = new Set(Object.keys(tally));
  for (const r of arr) {
    const have = getKeys(r);
    r.missing = [...union].filter(k => !have.has(k));
    r.unique  = [...have].filter(k => tally[k] === 1);
  }
}
finalize(wholePath, pathTally, r => new Set(Object.keys(
  (swagger.paths as Record<string,any>)[r.id.split("#")[0]][r.id.split("#")[1]])
));
finalize(wholeDef, defTally, r => new Set(Object.keys(
  (swagger.definitions as Record<string,any>)[r.id]
)));

const wholeResults = [...wholePath, ...wholeDef];

// write whole-file reports
await Deno.writeTextFile(
  join(AUDIT_DIR, "wholefile-audit.json"),
  JSON.stringify(wholeResults, null, 2)
);
await Deno.writeTextFile(
  join(AUDIT_DIR, "wholefile-audit.csv"),
  [
    "group,id,missingKeys,uniqueKeys,emptyKeys",
    ...wholeResults.map(r =>
      `${r.group},"${r.id}","${r.missing.join(";")}","${r.unique.join(";")}","${r.empty.join(";")}"`
    )
  ].join("\n")
);
console.log(cyan(`💾 Whole-file JSON → audit/wholefile-audit.json`));
console.log(cyan(`💾 Whole-file CSV  → audit/wholefile-audit.csv`));

// CLI summary
console.log(bold("\n── Whole-file issues ──"));
for (const r of wholeResults.filter(x=>x.missing.length||x.unique.length||x.empty.length)) {
  const tag = r.group === "whole-path" ? yellow("[path]") : yellow("[def ]");
  console.log(
    `${tag} ${r.id.padEnd(40)} ` +
    `miss:[${r.missing.join(",")}] ` +
    `uniq:[${r.unique.join(",")}] ` +
    `empty:[${r.empty.join(",")}]`
  );
}

// ─── 2) Split & bundle Swagger ───────────────────────────────────────────────
console.log(bold(`\n🔍 Splitting ${IN_FILE}…`));
for (const [route, methods] of Object.entries(swagger.paths)) {
  const fn = route.replace(/[^a-zA-Z0-9]/g, "_") + ".json";
  await Deno.writeTextFile(join(PATHS_DIR, fn), JSON.stringify(methods, null, 2));
}
for (const [name, defObj] of Object.entries(swagger.definitions)) {
  await Deno.writeTextFile(join(DEF_DIR, `${name}.json`), JSON.stringify(defObj, null, 2));
}
// write swagger-ref.json
const refRoot: any = { swagger: swagger.swagger, info:swagger.info, host:swagger.host, basePath:swagger.basePath, schemes:swagger.schemes, consumes:swagger.consumes, produces:swagger.produces, paths:{}, definitions:{} };
for (const route of Object.keys(swagger.paths)) {
  const fn = route.replace(/[^a-zA-Z0-9]/g, "_") + ".json";
  refRoot.paths[route] = { $ref: `paths/${fn}` };
}
for (const name of Object.keys(swagger.definitions)) {
  refRoot.definitions[name] = { $ref: `definitions/${name}.json` };
}
await Deno.writeTextFile(join(OUT_ROOT, "swagger-ref.json"), JSON.stringify(refRoot, null, 2));
console.log(green("✓ Split + swagger-ref.json written"));

// ─── 3) Split-folder audit ─────────────────────────────────────────────────
console.log(bold("\n🔍 Split-folder audit…\n"));
async function scanSplit(dir:string, grp:"split-path"|"split-def"):Promise<Result[]> {
  const res: Result[] = [];
  const tally: Record<string,number> = {};
  for await (const e of walk(dir,{includeDirs:false,exts:[".json"]})) {
    const data = JSON.parse(await Deno.readTextFile(e.path)) as any;
    const kset = new Set<string>();
    const empty: string[] = [];
    if (grp === "split-path") {
      for (const op of Object.values(data)) {
        if (typeof op !== "object") continue;
        Object.entries(op as Record<string,unknown>).forEach(([k,v])=>{
          kset.add(k); if (isEmpty(v)) empty.push(k);
        });
      }
    } else {
      Object.entries(data).forEach(([k,v])=>{
        kset.add(k); if (isEmpty(v)) empty.push(k);
      });
    }
    kset.forEach(k=>tally[k]=(tally[k]||0)+1);
    res.push({ group:grp, id:basename(e.path), missing:[], unique:[], empty });
    (res.at(-1) as any)._kset = kset;
  }
  const union = new Set(Object.keys(tally));
  for (const r of res) {
    const ks = (r as any)._kset as Set<string>;
    r.missing = [...union].filter(k=>!ks.has(k));
    r.unique  = [...ks].filter(k=>tally[k]===1);
    delete (r as any)._kset;
  }
  return res;
}
const splitPath = await scanSplit(PATHS_DIR, "split-path");
const splitDef  = await scanSplit(DEF_DIR,   "split-def");
const splitAll  = [...splitPath, ...splitDef];

await Deno.writeTextFile(
  join(AUDIT_DIR, "split-audit.json"),
  JSON.stringify(splitAll, null, 2)
);
await Deno.writeTextFile(
  join(AUDIT_DIR, "split-audit.csv"),
  [
    "group,id,missingKeys,uniqueKeys,emptyKeys",
    ...splitAll.map(r =>
      `${r.group},"${r.id}","${r.missing.join(";")}","${r.unique.join(";")}","${r.empty.join(";")}"`
    )
  ].join("\n")
);
console.log(cyan(`
💾 Split-folder JSON → audit/split-audit.json`));
console.log(cyan(`💾 Split-folder CSV  → audit/split-audit.csv`));

console.log(bold("\n── Split-folder issues ──"));
for (const r of splitAll.filter(x=>x.missing.length||x.unique.length||x.empty.length)) {
  const tag = r.group === "split-path" ? yellow("[path]") : yellow("[def ]");
  console.log(
    `${tag} ${r.id.padEnd(40)} ` +
    `miss:[${r.missing.join(",")}] ` +
    `uniq:[${r.unique.join(",")}] ` +
    `empty:[${r.empty.join(",")}]`
  );
}
console.log(bold("\nAll done ✅"));
