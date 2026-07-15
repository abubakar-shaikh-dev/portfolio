import skillsJson from '@/data/json/skills.json';
import type { Skills } from '@/data/types/skills.types';

export async function getAllSkills(): Promise<Skills> {
  return skillsJson as Skills;
}
