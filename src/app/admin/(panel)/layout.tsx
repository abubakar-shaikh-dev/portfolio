import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/organisms/AdminShell';
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

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
