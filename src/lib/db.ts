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
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
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
    return docs as unknown as T[];
  } catch (error) {
    console.warn(`[db] read failed on "${collection}", serving JSON fallback:`, (error as Error).message);
    return fallback;
  }
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
    return (doc as unknown as T) ?? fallback;
  } catch (error) {
    console.warn(`[db] read failed on "${collection}", serving JSON fallback:`, (error as Error).message);
    return fallback;
  }
}
