import papersJson from '@/data/json/papers.json';
import { fetchCollection } from '@/lib/db';
import type { Paper, PaperStatus, PaperStatusOption } from '@/data/types/paper.types';

const FALLBACK = papersJson as Paper[];

/** Newest first, preserving the curated JSON order within a year. */
export async function getAllPapers(): Promise<Paper[]> {
  const papers = await fetchCollection<Paper>('papers', FALLBACK, { sort: { order: 1 } });
  return [...papers].sort((a, b) => b.year - a.year);
}

export const PAPER_STATUS_LABELS: Record<PaperStatus, string> = {
  published: 'Published',
  preprint: 'Preprint',
  'under-review': 'Under Review',
  'in-progress': 'In Progress',
};

export async function getPaperStatuses(): Promise<PaperStatusOption[]> {
  return (Object.keys(PAPER_STATUS_LABELS) as PaperStatus[]).map((id) => ({
    id,
    label: PAPER_STATUS_LABELS[id],
  }));
}
