import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/data/queries/getArticles';
import { getAllProjectSlugs } from '@/data/queries/getProjects';
import { SITE_URL } from '@/lib/constants';

/**
 * Detailed sitemap: every entry carries changeFrequency + priority by route
 * type. Google ignores both (per 30x-seo-sitemap), but Bing and many
 * indexers still read them — cheap to include, kept accurate per route type.
 * Articles use their real dateISO as lastModified; other routes use the
 * generation timestamp since admin edits can change them any time.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/thoughts`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/research`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/open-source`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const projectSlugs = await getAllProjectSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articles = await getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/thoughts/${article.slug}`,
    lastModified: new Date(article.dateISO),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
