import { notFound } from 'next/navigation';
import { getDocById } from '@/lib/db';
import { getAllProjects } from '@/data/queries/getProjects';
import { ProjectForm } from '../ProjectForm';

export const dynamic = 'force-dynamic';

export default async function AdminProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === 'new') {
    return <ProjectForm project={null} />;
  }

  const project = await getDocById<import('@/data/types/project.types').Project>('projects', id);
  if (!project) {
    // fall back to the JSON snapshot so legacy items stay editable pre-migration
    const fallback = (await getAllProjects()).find((p) => p.id === id);
    if (!fallback) notFound();
    return <ProjectForm project={fallback} />;
  }

  return <ProjectForm project={project} />;
}
