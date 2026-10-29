import careerJson from '@/data/json/career.json';
import { fetchCollection } from '@/lib/db';
import type { CareerItem } from '@/data/types/career.types';

const FALLBACK = careerJson as CareerItem[];

export async function getAllCareerItems(): Promise<CareerItem[]> {
  return fetchCollection<CareerItem>('career', FALLBACK, { sort: { order: 1 } });
}
