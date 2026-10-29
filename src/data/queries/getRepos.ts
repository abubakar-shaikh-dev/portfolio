import reposJson from '@/data/json/repos.json';
import { fetchCollection } from '@/lib/db';
import type { Repo } from '@/data/types/repo.types';

const FALLBACK = reposJson as Repo[];

export async function getAllRepos(): Promise<Repo[]> {
  return fetchCollection<Repo>('repos', FALLBACK, { sort: { order: 1 } });
}
