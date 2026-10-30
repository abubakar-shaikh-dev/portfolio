import type { Metadata } from 'next';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-24">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px] animate-breathe" />
      <LoginForm nextPath={next} />
    </main>
  );
}
