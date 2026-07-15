import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Outfit } from 'next/font/google';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
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
        url: '/images/profile.webp',
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
    images: ['/images/profile.webp'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'Abubakar Shaikh',
                  url: 'https://abubakarshaikh.dev',
                  logo: 'https://abubakarshaikh.dev/images/profile.webp',
                  sameAs: [
                    'https://www.linkedin.com/in/abubakar-shaikh-dev',
                    'https://github.com/abubakar-shaikh-dev',
                    'https://x.com/abubakarshaikh_dev',
                    'https://instagram.com/abubakarshaikh.dev',
                  ],
                },
                {
                  '@type': 'WebSite',
                  name: 'Abubakar Shaikh',
                  url: 'https://abubakarshaikh.dev',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://abubakarshaikh.dev/thoughts',
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'Person',
                  name: 'Abubakar Shaikh',
                  url: 'https://abubakarshaikh.dev',
                  image: 'https://abubakarshaikh.dev/images/profile.webp',
                  jobTitle: 'Full Stack Software Engineer',
                  sameAs: [
                    'https://www.linkedin.com/in/abubakar-shaikh-dev',
                    'https://github.com/abubakar-shaikh-dev',
                    'https://x.com/abubakarshaikh_dev',
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
