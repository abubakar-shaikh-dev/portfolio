'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft, Loader2, Lock } from 'lucide-react';
import { loginAction, type LoginState } from '../actions';

const INITIAL_STATE: LoginState = { error: null };

const inputClasses =
  'w-full rounded-md border border-border-primary bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted transition-[border-color,opacity,background-color] duration-150 ease-out-premium focus:border-accent focus:outline-none';

export function LoginForm({ nextPath }: { nextPath?: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL_STATE);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-8 ">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
            <Lock className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-xs text-text-muted">// Admin access</p>
            <h1 className="font-display text-2xl font-medium tracking-tight text-white">Backstage</h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-text-secondary">
          Sign in to manage portfolio content. Sessions last 7 days.
        </p>

        <form action={formAction} className="mt-8 space-y-5">
          <input type="hidden" name="next" value={nextPath ?? ''} />

          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-medium text-text-secondary">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-medium text-text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={inputClasses}
            />
          </div>

          {state.error && (
            <div className="rounded-md border border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-400">
              // {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Verifying...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back to site
      </Link>
    </div>
  );
}
