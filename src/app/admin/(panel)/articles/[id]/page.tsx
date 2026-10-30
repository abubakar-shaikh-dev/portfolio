import { notFound } from 'next/navigation';
import { getDocById } from '@/lib/db';
import { getAllArticles } from '@/data/queries/getArticles';
import { ArticleForm } from '../ArticleForm';

export const dynamic = 'force-dynamic';

export default async function AdminArticleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id === 'new') {
    return <ArticleForm article={null} />;
  }

  const article = await getDocById<import('@/data/types/article.types').Article>('articles', id);
  if (!article) {
    const fallback = (await getAllArticles()).find((a) => a.id === id);
    if (!fallback) notFound();
    return <ArticleForm article={fallback} />;
  }

  return <ArticleForm article={article} />;
}
