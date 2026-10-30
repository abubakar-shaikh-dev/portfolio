import { notFound } from 'next/navigation';
import { getDocById } from '@/lib/db';
import { getAllCareerItems } from '@/data/queries/getCareer';
import { CareerForm } from '../CareerForm';

export const dynamic = 'force-dynamic';

export default async function AdminCareerEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === 'new') {
    return <CareerForm item={null} />;
  }

  const item = await getDocById<import('@/data/types/career.types').CareerItem>('career', id);
  if (!item) {
    const fallback = (await getAllCareerItems()).find((c) => c.id === id);
    if (!fallback) notFound();
    return <CareerForm item={fallback} />;
  }

  return <CareerForm item={item} />;
}
