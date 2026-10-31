import { notFound } from 'next/navigation';
import { getDocById } from '@/lib/db';
import { getAllPapers } from '@/data/queries/getPapers';
import { PaperForm } from '../PaperForm';

export const dynamic = 'force-dynamic';

export default async function AdminPaperEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === 'new') {
    return <PaperForm paper={null} />;
  }

  const paper = await getDocById<import('@/data/types/paper.types').Paper>('papers', id);
  if (!paper) {
    const fallback = (await getAllPapers()).find((p) => p.id === id);
    if (!fallback) notFound();
    return <PaperForm paper={fallback} />;
  }

  return <PaperForm paper={paper} />;
}
