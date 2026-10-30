import { notFound } from 'next/navigation';
import { getDocById } from '@/lib/db';
import { getAllRepos } from '@/data/queries/getRepos';
import { RepoForm } from '../RepoForm';

export const dynamic = 'force-dynamic';

export default async function AdminRepoEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === 'new') {
    return <RepoForm repo={null} />;
  }

  const repo = await getDocById<import('@/data/types/repo.types').Repo>('repos', id);
  if (!repo) {
    const fallback = (await getAllRepos()).find((r) => r.id === id);
    if (!fallback) notFound();
    return <RepoForm repo={fallback} />;
  }

  return <RepoForm repo={repo} />;
}
