import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';

/**
 * Web app manifest (served at /manifest.webmanifest by the App Router).
 * Icons reuse the existing square profile image — no dedicated PWA icon
 * assets are fabricated.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Portfolio`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/images/profile_2.webp',
        sizes: '1200x1200',
        type: 'image/webp',
        purpose: 'any',
      },
    ],
  };
}
