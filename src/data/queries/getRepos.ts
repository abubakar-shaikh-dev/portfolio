import reposJson from '@/data/json/repos.json';
import type { Repo } from '@/data/types/repo.types';

export async function getAllRepos(): Promise<Repo[]> {
  return reposJson as Repo[];
}
