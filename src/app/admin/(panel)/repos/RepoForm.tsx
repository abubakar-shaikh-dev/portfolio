'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Repo } from '@/data/types/repo.types';
import { saveRepoAction } from '../actions';
import { ErrorBox, Field, inputClasses, SubmitButton } from '../form-ui';

export function RepoForm({ repo }: { repo: Repo | null }) {
  const [state, formAction, isPending] = useActionState(saveRepoAction, { error: null });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/repos"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All repos
      </Link>

      <h1 className="font-display mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
        {repo ? `Edit: ${repo.name}` : 'New Repo'}
      </h1>

      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={repo?.id ?? ''} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name">
            <input name="name" defaultValue={repo?.name} required maxLength={80} className={inputClasses} />
          </Field>
          <Field label="Slug" hint="Leave to auto-generate">
            <input name="slug" defaultValue={repo?.slug} className={inputClasses} />
          </Field>
        </div>

        <Field label="Description">
          <textarea name="description" defaultValue={repo?.description} required rows={3} maxLength={500} className={inputClasses} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Language">
            <input name="language" defaultValue={repo?.language ?? 'TypeScript'} required maxLength={40} className={inputClasses} />
          </Field>
          <Field label="Language color" hint="Hex, e.g. #3178c6">
            <input name="languageColor" defaultValue={repo?.languageColor ?? '#10b981'} maxLength={7} className={inputClasses} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Stars">
            <input type="number" name="stars" defaultValue={repo?.stars ?? 0} min={0} className={inputClasses} />
          </Field>
          <Field label="Forks">
            <input type="number" name="forks" defaultValue={repo?.forks ?? 0} min={0} className={inputClasses} />
          </Field>
        </div>

        <ErrorBox message={state.error} />
        <SubmitButton pending={isPending}>{repo ? 'Save changes' : 'Create repo'}</SubmitButton>
      </form>
    </div>
  );
}
