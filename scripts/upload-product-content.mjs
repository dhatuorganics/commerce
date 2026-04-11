#!/usr/bin/env node
/**
 * upload-product-content.mjs
 *
 * Reads product-content.csv and uploads metafields to Shopify via Admin GraphQL API.
 * Requires SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local
 *
 * Usage:
 *   node scripts/upload-product-content.mjs
 *   node scripts/upload-product-content.mjs --dry-run
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── 1. Load .env.local ────────────────────────────────────────────────────────

function loadEnv(filePath) {
  if (!existsSync(filePath)) {
    console.error(`❌  .env.local not found at: ${filePath}`);
    process.exit(1);
  }
  const lines = readFileSync(filePath, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const env = loadEnv(resolve(ROOT, ".env.local"));
const STORE_DOMAIN = env.SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!STORE_DOMAIN || !ADMIN_TOKEN) {
  console.error(
    "❌  Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local"
  );
  process.exit(1);
}

const API_VERSION = "2024-01";
const GRAPHQL_URL = `https://${STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`;

const DRY_RUN = process.argv.includes("--dry-run");
if (DRY_RUN) {
  console.log("🔍  DRY RUN mode — no changes will be written to Shopify\n");
}

// ── 2. Simple CSV parser ──────────────────────────────────────────────────────

function parseCSV(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const nonEmpty = lines.filter((l) => l.trim() !== "" && !l.trim().startsWith("#"));

  const headers = parseCSVRow(nonEmpty[0]);
  const rows = [];

  for (let i = 1; i < nonEmpty.length; i++) {
    const values = parseCSVRow(nonEmpty[i]);
    if (values.every((v) => v === "")) continue;
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function parseCSVRow(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

// ── 3. Shopify Admin GraphQL helpers ─────────────────────────────────────────

async function shopifyQuery(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data;
}

async function getProductId(handle) {
  const data = await shopifyQuery(
    `query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
      }
    }`,
    { handle }
  );
  return data?.productByHandle ?? null;
}

async function setMetafields(metafields) {
  const data = await shopifyQuery(
    `mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
          code
        }
      }
    }`,
    { metafields }
  );

  const errors = data?.metafieldsSet?.userErrors ?? [];
  if (errors.length > 0) {
    throw new Error(`Metafield errors: ${JSON.stringify(errors, null, 2)}`);
  }
  return data?.metafieldsSet?.metafields ?? [];
}

async function updateProductTags(productId, tags) {
  const data = await shopifyQuery(
    `mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          tags
        }
        userErrors {
          field
          message
        }
      }
    }`,
    { input: { id: productId, tags } }
  );

  const errors = data?.productUpdate?.userErrors ?? [];
  if (errors.length > 0) {
    throw new Error(`Tag update errors: ${JSON.stringify(errors, null, 2)}`);
  }
  return data?.productUpdate?.product;
}

// ── 4. Metafield key mapping ──────────────────────────────────────────────────

const METAFIELD_KEYS = [
  "tagline",
  "bullet_1",
  "bullet_2",
  "bullet_3",
  "bullet_4",
  "why_love_it_1",
  "why_love_it_2",
  "why_love_it_3",
  "why_love_it_4",
  "why_love_it_5",
  "ingredients",
  "how_to_use",
  "nutrition_serving_size",
  "nutrition_calories",
  "nutrition_protein_g",
  "nutrition_carbs_g",
  "nutrition_fiber_g",
  "nutrition_fat_g",
  "nutrition_sodium_mg",
  "nutrition_sugar_g",
];

// ── 5. Main ───────────────────────────────────────────────────────────────────

async function main() {
  // Find the CSV file
  const csvPaths = [
    resolve(ROOT, "product-content.csv"),
    resolve(__dirname, "product-content.csv"),
  ];

  let csvPath = null;
  for (const p of csvPaths) {
    if (existsSync(p)) {
      csvPath = p;
      break;
    }
  }

  if (!csvPath) {
    console.error(
      "❌  product-content.csv not found. Please place it in the project root."
    );
    process.exit(1);
  }

  console.log(`📄  Reading CSV from: ${csvPath}\n`);
  const csvText = readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvText);

  console.log(`Found ${rows.length} product row(s)\n`);
  console.log("─".repeat(60));

  let successCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    const handle = row["product_handle"];
    if (!handle) {
      console.warn("⚠️   Skipping row with no product_handle");
      continue;
    }

    console.log(`\n📦  Processing: ${handle} (${row["product_name"] || "—"})`);

    // Look up product ID
    let product;
    try {
      product = await getProductId(handle);
    } catch (err) {
      console.error(`   ❌  Failed to fetch product: ${err.message}`);
      errorCount++;
      continue;
    }

    if (!product) {
      console.warn(`   ⚠️   Product not found in Shopify: ${handle}`);
      errorCount++;
      continue;
    }

    console.log(`   ✓ Found: "${product.title}" (${product.id})`);

    // Build metafields array (only include non-empty values)
    const metafieldsToSet = [];
    for (const key of METAFIELD_KEYS) {
      const value = row[key];
      if (value && value.trim() !== "") {
        metafieldsToSet.push({
          ownerId: product.id,
          namespace: "dhatu",
          key,
          value: value.trim(),
          type: "single_line_text_field",
        });
      }
    }

    if (metafieldsToSet.length === 0) {
      console.log("   ℹ️   No metafield values to set for this product.");
    } else {
      console.log(`   Setting ${metafieldsToSet.length} metafield(s)...`);

      if (!DRY_RUN) {
        try {
          // Shopify metafieldsSet accepts up to 25 at a time
          const BATCH_SIZE = 25;
          for (let i = 0; i < metafieldsToSet.length; i += BATCH_SIZE) {
            const batch = metafieldsToSet.slice(i, i + BATCH_SIZE);
            const result = await setMetafields(batch);
            console.log(`   ✓ Set ${result.length} metafield(s)`);
          }
        } catch (err) {
          console.error(`   ❌  Metafield error: ${err.message}`);
          errorCount++;
          continue;
        }
      } else {
        for (const mf of metafieldsToSet) {
          console.log(`   [dry-run] Would set dhatu.${mf.key} = "${mf.value.slice(0, 60)}${mf.value.length > 60 ? "..." : ""}"`);
        }
      }
    }

    // Update tags / badges if provided
    const badgesColumn = row["badges"];
    if (badgesColumn && badgesColumn.trim() !== "") {
      const newTags = badgesColumn
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean);

      console.log(`   Updating tags: ${newTags.join(", ")}`);

      if (!DRY_RUN) {
        try {
          await updateProductTags(product.id, newTags);
          console.log(`   ✓ Tags updated`);
        } catch (err) {
          console.error(`   ❌  Tag update error: ${err.message}`);
          errorCount++;
          continue;
        }
      } else {
        console.log(`   [dry-run] Would set tags: ${newTags.join(", ")}`);
      }
    }

    successCount++;
    console.log(`   ✅  Done`);
  }

  console.log("\n" + "─".repeat(60));
  console.log(`\nSummary: ${successCount} succeeded, ${errorCount} failed\n`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
