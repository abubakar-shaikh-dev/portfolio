import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';
import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_TWITTER, SITE_URL, SOCIAL_LINKS } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const SOCIAL_URLS = SOCIAL_LINKS.map((social) => social.href);
const PROFILE_IMAGE = '/images/abubakar-shaikh-profile.webp';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Full Stack Software Engineer & DevOps Specialist`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Full Stack Engineer',
    'MERN Stack',
    'React',
    'Next.js',
    'Node.js',
    'DevOps',
    'AWS',
    'Docker',
    'TypeScript',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Full Stack Software Engineer & DevOps Specialist`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: PROFILE_IMAGE,
        width: 1200,
        height: 1200,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_TWITTER,
    creator: SITE_TWITTER,
    images: [PROFILE_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable}`}>
      <head>
        {/* Gates JS-dependent styles (scroll reveals) so no-JS visitors always see content */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_URL}/#organization`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}${PROFILE_IMAGE}`,
                    width: 1200,
                    height: 1200,
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: SITE_EMAIL,
                    contactType: 'customer service',
                  },
                  sameAs: SOCIAL_URLS,
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  publisher: { '@id': `${SITE_URL}/#organization` },
                },
                {
                  '@type': 'Person',
                  '@id': `${SITE_URL}/#person`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  image: `${SITE_URL}${PROFILE_IMAGE}`,
                  jobTitle: 'Full Stack Software Engineer',
                  description: SITE_DESCRIPTION,
                  email: SITE_EMAIL,
                  worksFor: { '@id': `${SITE_URL}/#organization` },
                  knowsAbout: [
                    'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
                    'NestJS', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS',
                    'DevOps', 'CI/CD', 'Microservices', 'WebSockets', 'AI Integrations',
                  ],
                  sameAs: SOCIAL_URLS,
                },
              ],
            }),
          }}
        />
      </head>
      {/* Site chrome (navbar/footer/cursor) lives in the (site) route group
          so admin pages render without it. */}
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {/* Route-change progress bar (accent emerald); covers site + admin */}
        <NextTopLoader color="#10b981" showSpinner={false} />
        {children}
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
