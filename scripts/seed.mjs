/**
 * Seeds the MongoDB `portfolio` database from the JSON snapshot in src/data/json.
 *
 * Idempotent: upserts every document by its stable `id`, so re-running never
 * duplicates. Each document gets an `order` field (its JSON array position)
 * which the site's queries sort by, preserving the curated display order.
 *
 * Usage: pnpm db:seed   (equivalent to: node --env-file=.env.local scripts/seed.mjs)
 */
import { readFile } from 'node:fs/promises';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'portfolio';

if (!uri) {
  console.error('[seed] MONGODB_URI is missing — run with: node --env-file=.env.local scripts/seed.mjs');
  process.exit(1);
}

async function readJson(name) {
  const raw = await readFile(new URL(`../src/data/json/${name}.json`, import.meta.url), 'utf8');
  return JSON.parse(raw);
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

try {
  await client.connect();
  const db = client.db(dbName);
  console.log(`[seed] connected to ${dbName}`);

  const collections = ['articles', 'papers', 'projects', 'repos', 'career', 'services'];

  for (const name of collections) {
    const docs = (await readJson(name)).map((doc, index) => ({ ...doc, order: index }));
    const collection = db.collection(name);

    let upserted = 0;
    for (const doc of docs) {
      const result = await collection.replaceOne({ id: doc.id }, doc, { upsert: true });
      if (result.upsertedCount > 0) upserted += 1;
    }

    const total = await collection.countDocuments();
    console.log(`[seed] ${name}: ${docs.length} in snapshot, ${upserted} new, ${total} total`);
  }

  // Skills is a single config document
  const skills = await readJson('skills');
  await db.collection('skills').replaceOne({ key: 'skills' }, { key: 'skills', ...skills }, { upsert: true });
  console.log('[seed] skills: config document upserted');

  console.log('[seed] done.');
} catch (error) {
  console.error('[seed] failed:', error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
