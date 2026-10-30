import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutAction } from '../actions';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

/**
 * Shell for every authenticated admin page. Middleware already blocks
 * unauthenticated visitors; this re-checks to render the session email.
 */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value ?? '');

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-40 border-b border-border-primary/60 bg-bg-primary/90 backdrop-blur-xl">
        <div className="section-container flex items-center justify-between py-4">
          <Link
            href="/admin"
            className="font-mono text-lg font-bold tracking-tight text-white transition-colors duration-150"
          >
            <span className="text-accent">~/</span>backstage
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-text-muted sm:inline">{session.email}</span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md border border-border-primary px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent active:scale-97"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="section-container py-10 md:py-14">{children}</main>
    </div>
  );
}
