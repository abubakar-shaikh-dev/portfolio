import { notFound } from 'next/navigation';
import { getDocById } from '@/lib/db';
import { getAllServices } from '@/data/queries/getServices';
import { ServiceForm } from '../ServiceForm';

export const dynamic = 'force-dynamic';

export default async function AdminServiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === 'new') {
    return <ServiceForm service={null} />;
  }

  const service = await getDocById<import('@/data/types/service.types').Service>('services', id);
  if (!service) {
    const fallback = (await getAllServices()).find((s) => s.id === id);
    if (!fallback) notFound();
    return <ServiceForm service={fallback} />;
  }

  return <ServiceForm service={service} />;
}
