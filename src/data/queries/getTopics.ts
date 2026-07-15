import topicsJson from '@/data/json/topics.json';
import type { Topic } from '@/data/types/topic.types';

export async function getAllTopics(): Promise<Topic[]> {
  return topicsJson as Topic[];
}
