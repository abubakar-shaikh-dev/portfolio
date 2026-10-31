import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">// 404_NOT_FOUND</p>
      <h1 className="font-display mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
        The page you are looking for does not exist or has been moved. It may never have existed — much like most of my bugs.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97"
      >
        Back to homepage
      </Link>
    </main>
  );
}
