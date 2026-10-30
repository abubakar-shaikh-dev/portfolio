import { MongoClient, type Db, type Document, type Filter, type Sort } from 'mongodb';

/**
 * MongoDB connection layer.
 *
 * The client is cached as a module singleton so dev hot-reloads and serverless
 * invocations reuse one connection pool. Every helper resolves to `null` when
 * MONGODB_URI is missing or the cluster is unreachable — callers fall back to
 * the JSON snapshot in src/data/json, so the public site never breaks because
 * of the database.
 */

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn('[db] MONGODB_URI is not set — data queries will serve the JSON fallback.');
}

declare global {
  var __mongoClient: MongoClient | undefined;
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function connect(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (global.__mongoClient) return Promise.resolve(global.__mongoClient);
  if (!global.__mongoClientPromise) {
    global.__mongoClientPromise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    })
      .connect()
      .then((client) => {
        global.__mongoClient = client;
        return client;
      })
      .catch((error) => {
        global.__mongoClientPromise = undefined;
        throw error;
      });
  }
  return global.__mongoClientPromise;
}

export async function getDb(): Promise<Db | null> {
  try {
    const client = await connect();
    return client ? client.db(process.env.MONGODB_DB || 'portfolio') : null;
  } catch (error) {
    console.warn('[db] unreachable, serving JSON fallback:', (error as Error).message);
    return null;
  }
}

/** Reads a whole collection; falls back to JSON when the DB is unreachable. */
export async function fetchCollection<T>(
  collection: string,
  fallback: T[],
  options?: { filter?: Filter<Document>; sort?: Sort },
): Promise<T[]> {
  const db = await getDb();
  if (!db) return fallback;
  try {
    const docs = await db
      .collection(collection)
      .find(options?.filter ?? {}, { sort: options?.sort })
      .toArray();
    return docs.map((doc) => plain<T>(doc));
  } catch (error) {
    console.warn(`[db] read failed on "${collection}", serving JSON fallback:`, (error as Error).message);
    return fallback;
  }
}

/**
 * Strips MongoDB's `_id` (an ObjectId — not serializable across the
 * server/client boundary) so every document leaving this module is a plain
 * object matching the JSON snapshot shape.
 */
function plain<T>(doc: Document): T {
  const { _id, ...rest } = doc;
  return rest as unknown as T;
}

/** Admin write: insert or replace a document by its stable `id`. */
export async function upsertById<T extends { id: string }>(
  collection: string,
  doc: T & { order?: number },
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error(`Database unavailable — cannot save ${collection}.`);
  const { id, ...rest } = doc;
  await db.collection(collection).replaceOne({ id }, { id, ...rest }, { upsert: true });
}

export async function deleteById(collection: string, id: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error(`Database unavailable — cannot delete from ${collection}.`);
  await db.collection(collection).deleteOne({ id });
}

/** Admin read: raw DB document by id — no JSON fallback (admin sees DB truth). */
export async function getDocById<T>(collection: string, id: string): Promise<(T & { order?: number }) | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const doc = await db.collection(collection).findOne({ id });
    return doc ? (plain<T>(doc) as T & { order?: number }) : null;
  } catch {
    return null;
  }
}

/** Next positional slot for appended items (list queries sort by `order`). */
export async function nextOrder(collection: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const last = await db
    .collection(collection)
    .find({}, { sort: { order: -1 }, limit: 1 })
    .next();
  return ((last?.order as number | undefined) ?? -1) + 1;
}

/** Reads a single document; falls back to JSON when the DB is unreachable or the doc is absent. */
export async function fetchOne<T>(
  collection: string,
  filter: Filter<Document>,
  fallback: T | null,
): Promise<T | null> {
  const db = await getDb();
  if (!db) return fallback;
  try {
    const doc = await db.collection(collection).findOne(filter);
    return doc ? plain<T>(doc) : fallback;
  } catch (error) {
    console.warn(`[db] read failed on "${collection}", serving JSON fallback:`, (error as Error).message);
    return fallback;
  }
}
