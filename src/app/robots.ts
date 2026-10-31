import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/** Private surfaces kept out of every crawler's path (meta-noindex is the
 *  second layer; this saves crawl budget and hides admin from AI agents). */
const PROTECTED_PATHS = ['/admin', '/api'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PROTECTED_PATHS,
      },
      // AI Search Crawlers — Allow (enables citation in ChatGPT, Claude, Perplexity).
      // Each group needs its own disallow: a group with only `allow` overrides
      // the `*` group's disallow rules.
      ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'].map(
        (userAgent) => ({
          userAgent,
          allow: '/',
          disallow: PROTECTED_PATHS,
        }),
      ),
      // AI Training Crawlers — Block (prevent content scraping for model training)
      ...['CCBot', 'anthropic-ai', 'Bytespider'].map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
