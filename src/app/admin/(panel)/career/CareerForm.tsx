'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { CareerItem } from '@/data/types/career.types';
import { saveCareerAction } from '../actions';
import { ErrorBox, Field, inputClasses, SubmitButton } from '../form-ui';

export function CareerForm({ item }: { item: CareerItem | null }) {
  const [state, formAction, isPending] = useActionState(saveCareerAction, { error: null });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/career"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All entries
      </Link>

      <h1 className="font-display mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
        {item ? `Edit: ${item.company}` : 'New Career Entry'}
      </h1>

      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={item?.id ?? ''} />

        <Field label="Company">
          <input name="company" defaultValue={item?.company} required maxLength={120} className={inputClasses} />
        </Field>
        <Field label="Role">
          <input name="role" defaultValue={item?.role} required maxLength={120} className={inputClasses} />
        </Field>
        <Field label="Period" hint="e.g. Sep 2023 - Present">
          <input name="period" defaultValue={item?.period} required maxLength={40} className={inputClasses} />
        </Field>

        <ErrorBox message={state.error} />
        <SubmitButton pending={isPending}>{item ? 'Save changes' : 'Create entry'}</SubmitButton>
      </form>
    </div>
  );
}
