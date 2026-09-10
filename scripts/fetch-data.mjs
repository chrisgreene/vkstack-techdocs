#!/usr/bin/env node
/**
 * Download static stackmap bundles from the upstream vkstack site into public/.
 * Core data.json (+ gen8/gen9) may already be committed; this fills optional-layer variants.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public");
const BASE = "https://vkstack.warroyo.com";

const WITH = ["", "nsx", "avi", "tmc", "nsx,avi", "nsx,tmc", "avi,tmc", "nsx,avi,tmc"];
const GENS = ["", "8", "9"];

function bundleName(withKey, genKey) {
  let name = "data";
  if (withKey) name += `-${withKey.replace(/,/g, "-")}`;
  if (genKey) name += `-gen${genKey}`;
  return `${name}.json`;
}

const names = new Set();
for (const w of WITH) {
  for (const g of GENS) names.add(bundleName(w, g));
}

await mkdir(OUT, { recursive: true });
console.log(`Fetching ${names.size} bundles into ${OUT} …`);

for (const name of [...names].sort()) {
  const dest = join(OUT, name);
  try {
    await access(dest);
    console.log(`  skip (exists) ${name}`);
    continue;
  } catch {
    /* missing — download */
  }
  const url = `${BASE}/${name}`;
  process.stdout.write(`  ${name} … `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAIL ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`${(buf.length / 1e6).toFixed(1)} MB`);
}
console.log("Done. Optional layers and generation filters will use local files.");
