import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/data/queries/getArticles';
import { getAllProjectSlugs } from '@/data/queries/getProjects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://abubakarshaikh.dev';

  // Google ignores priority and changeFrequency — omitted per 30x-seo-sitemap best practices
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/open-source`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/research`, lastModified: new Date() },
    { url: `${baseUrl}/thoughts`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const projectSlugs = await getAllProjectSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  const articles = await getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/thoughts/${article.slug}`,
    lastModified: new Date(article.dateISO),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
