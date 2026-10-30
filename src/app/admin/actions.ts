'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  verifyCredentials,
} from '@/lib/auth';

export interface LoginState {
  error: string | null;
}

/** Naive fixed-window limiter keyed by client IP — sufficient for a single-admin endpoint. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

/** Success resets the budget — only failed attempts count toward lockout. */
function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

function safeNextPath(next: string | null): string {
  return next && next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin';
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const headerList = await headers();
  const ip = (headerList.get('x-forwarded-for') ?? 'local').split(',')[0].trim();

  if (isRateLimited(ip)) {
    return { error: 'Too many attempts. Try again in 10 minutes.' };
  }

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const valid = await verifyCredentials(email, password);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  clearAttempts(ip);

  const token = await createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(safeNextPath(next));
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/admin/login');
}
