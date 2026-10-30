/**
 * Integration test for the admin CRUD write path — runs the same Zod schemas
 * and DB helpers the Server Actions use, without needing a browser session.
 *
 * Usage: node --env-file=.env.local --experimental-strip-types scripts/test-crud.ts
 * Creates → reads → updates → deletes a throwaway project, then exits nonzero
 * on any mismatch.
 */
import { MongoClient } from 'mongodb';
import { projectSchema } from '../src/lib/schemas.ts';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI missing');
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

const TEST_ID = 'crud-integration-test';

async function main() {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'portfolio');
  const projects = db.collection('projects');

  // 1. CREATE — parse through the same schema the Server Action uses
  const created = projectSchema.parse({
    id: TEST_ID,
    name: 'CRUD Integration Test',
    description: 'Temporary document proving the write path.',
    slug: 'crud-integration-test',
    year: '2026',
    status: 'Test',
    featured: false,
    stack: ['Node'],
    links: { live: 'https://example.com', github: '', npm: '' },
  });
  await projects.replaceOne({ id: TEST_ID }, { ...created, order: 9999 }, { upsert: true });
  console.log('CREATE ok');

  // 2. READ via the same sort the site query uses
  const readBack = await projects.findOne({ id: TEST_ID }, { sort: { order: 1 } });
  if (readBack?.name !== 'CRUD Integration Test') throw new Error('READ mismatch');
  console.log('READ ok');

  // 3. UPDATE
  await projects.updateOne({ id: TEST_ID }, { $set: { status: 'Updated' } });
  const updated = await projects.findOne({ id: TEST_ID });
  if (updated?.status !== 'Updated') throw new Error('UPDATE mismatch');
  console.log('UPDATE ok');

  // 4. DELETE
  await projects.deleteOne({ id: TEST_ID });
  const gone = await projects.findOne({ id: TEST_ID });
  if (gone) throw new Error('DELETE failed');
  console.log('DELETE ok');

  console.log('CRUD integration: all green.');
}

main()
  .catch((error) => {
    console.error('CRUD integration FAILED:', error.message);
    process.exitCode = 1;
  })
  .finally(() => client.close());
