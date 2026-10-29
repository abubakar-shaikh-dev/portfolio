import skillsJson from '@/data/json/skills.json';
import { fetchOne } from '@/lib/db';
import type { Skills } from '@/data/types/skills.types';

const FALLBACK = skillsJson as Skills;

/** Single config document ({ row1, row2 }); falls back to JSON when the DB is unreachable. */
export async function getAllSkills(): Promise<Skills> {
  const fromDb = await fetchOne<Skills>('skills', { key: 'skills' }, null);
  return fromDb ?? FALLBACK;
}
