import careerJson from '@/data/json/career.json';
import type { CareerItem } from '@/data/types/career.types';

export async function getAllCareerItems(): Promise<CareerItem[]> {
  return careerJson as CareerItem[];
}
