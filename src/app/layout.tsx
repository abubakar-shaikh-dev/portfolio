import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://abubakarshaikh.dev'),
  title: {
    default: 'Abubakar Shaikh | Full Stack Software Engineer & DevOps Specialist',
    template: '%s | Abubakar Shaikh',
  },
  description:
    'Full Stack Software Engineer specializing in building scalable MERN applications, APIs, and DevOps workflows.',
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
  authors: [{ name: 'Abubakar Shaikh' }],
  creator: 'Abubakar Shaikh',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abubakarshaikh.dev',
    siteName: 'Abubakar Shaikh',
    title: 'Abubakar Shaikh | Full Stack Software Engineer & DevOps Specialist',
    description:
      'Full Stack Software Engineer specializing in building scalable MERN applications, APIs, and DevOps workflows.',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abubakarshaikh_dev',
    creator: '@abubakarshaikh_dev',
    images: ['/images/profile_2.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://abubakarshaikh.dev',
  },
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
                  '@id': 'https://abubakarshaikh.dev/#organization',
                  name: 'Abubakar Shaikh',
                  url: 'https://abubakarshaikh.dev',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://abubakarshaikh.dev/images/profile_2.webp',
                    width: 1200,
                    height: 1200,
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'shaikhabubakar2380@gmail.com',
                    contactType: 'customer service',
                  },
                  sameAs: [
                    'https://www.linkedin.com/in/abubakar-shaikh-dev',
                    'https://github.com/abubakar-shaikh-dev',
                    'https://x.com/abubakarshaikh_dev',
                    'https://instagram.com/abubakarshaikh.dev',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://abubakarshaikh.dev/#website',
                  name: 'Abubakar Shaikh',
                  url: 'https://abubakarshaikh.dev',
                  publisher: { '@id': 'https://abubakarshaikh.dev/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://abubakarshaikh.dev/thoughts?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://abubakarshaikh.dev/#person',
                  name: 'Abubakar Shaikh',
                  url: 'https://abubakarshaikh.dev',
                  image: 'https://abubakarshaikh.dev/images/profile_2.webp',
                  jobTitle: 'Full Stack Software Engineer',
                  description: 'Full Stack Software Engineer specializing in building scalable MERN applications, APIs, and DevOps workflows.',
                  knowsAbout: [
                    'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
                    'NestJS', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS',
                    'DevOps', 'CI/CD', 'Microservices', 'WebSockets', 'AI Integrations',
                  ],
                  sameAs: [
                    'https://www.linkedin.com/in/abubakar-shaikh-dev',
                    'https://github.com/abubakar-shaikh-dev',
                    'https://x.com/abubakarshaikh_dev',
                    'https://instagram.com/abubakarshaikh.dev',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      {/* Site chrome (navbar/footer/cursor) lives in the (site) route group
          so admin pages render without it. */}
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {children}
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
