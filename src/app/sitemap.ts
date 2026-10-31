import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/data/queries/getArticles';
import { getAllProjects } from '@/data/queries/getProjects';
import { SITE_URL } from '@/lib/constants';

const PROFILE_IMAGE = '/images/abubakar-shaikh-profile.webp';
const PROFILE_IMAGE_URL = `${SITE_URL}${PROFILE_IMAGE}`;

/**
 * Detailed sitemap: every entry carries changeFrequency + priority by route
 * type. Google ignores both (per 30x-seo-sitemap), but Bing and many
 * indexers still read them — cheap to include, kept accurate per route type.
 * Articles use their real dateISO as lastModified; other routes use the
 * generation timestamp since admin edits can change them any time.
 *
 * Image entries (`images`) feed Google Images directly — pages carrying the
 * hero profile photo or item covers declare them here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [PROFILE_IMAGE_URL],
    },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/thoughts`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/research`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/open-source`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      images: [PROFILE_IMAGE_URL],
    },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const projects = await getAllProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
    ...(project.image ? { images: [project.image] } : {}),
  }));

  const articles = await getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/thoughts/${article.slug}`,
    lastModified: new Date(article.dateISO),
    changeFrequency: 'monthly',
    priority: 0.7,
    ...(article.image ? { images: [article.image] } : {}),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
