'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Paper } from '@/data/types/paper.types';
import { savePaperAction } from '../actions';
import { ErrorBox, Field, inputClasses, SubmitButton } from '../form-ui';

const STATUSES = [
  { id: 'published', label: 'Published' },
  { id: 'preprint', label: 'Preprint' },
  { id: 'under-review', label: 'Under Review' },
  { id: 'in-progress', label: 'In Progress' },
];

export function PaperForm({ paper }: { paper: Paper | null }) {
  const [state, formAction, isPending] = useActionState(savePaperAction, { error: null });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/papers"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All papers
      </Link>

      <h1 className="font-display mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
        {paper ? 'Edit Paper' : 'New Paper'}
      </h1>

      <form action={formAction} className="mt-8 space-y-6">
        <input type="hidden" name="id" value={paper?.id ?? ''} />

        <Field label="Title">
          <input name="title" defaultValue={paper?.title} required maxLength={300} className={inputClasses} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Venue" hint="Conference or journal">
            <input name="venue" defaultValue={paper?.venue} required maxLength={160} placeholder="e.g. IEEE S&P" className={inputClasses} />
          </Field>
          <Field label="Year">
            <input
              name="year"
              type="number"
              min={1900}
              max={2100}
              defaultValue={paper?.year ?? new Date().getFullYear()}
              required
              className={inputClasses}
            />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={paper?.status ?? 'in-progress'} className={inputClasses}>
              {STATUSES.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Authors" hint="Comma separated, in citation order — your name is highlighted on the card">
          <input name="authors" defaultValue={paper?.authors.join(', ')} required placeholder="Abubakar Shaikh, Jane Doe" className={inputClasses} />
        </Field>

        <Field label="Abstract">
          <textarea name="abstract" defaultValue={paper?.abstract} required rows={5} maxLength={4000} className={inputClasses} />
        </Field>

        <Field label="Keywords" hint="Comma separated">
          <input name="keywords" defaultValue={paper?.keywords.join(', ')} required className={inputClasses} />
        </Field>

        <div className="space-y-4 rounded-xl border border-border-primary/60 bg-bg-secondary/40 p-5">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">// PAPER_LINKS</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="PDF URL" hint="Publisher or personal copy">
              <input name="pdf" type="url" defaultValue={paper?.links.pdf} className={inputClasses} />
            </Field>
            <Field label="DOI URL" hint="https://doi.org/10.xxxx/xxxxx">
              <input name="doi" type="url" defaultValue={paper?.links.doi} className={inputClasses} />
            </Field>
            <Field label="arXiv URL">
              <input name="arxiv" type="url" defaultValue={paper?.links.arxiv} className={inputClasses} />
            </Field>
            <Field label="Code URL" hint="Artifact repository">
              <input name="code" type="url" defaultValue={paper?.links.code} className={inputClasses} />
            </Field>
          </div>
        </div>

        <ErrorBox message={state.error} />
        <SubmitButton pending={isPending}>{paper ? 'Save changes' : 'Create paper'}</SubmitButton>
      </form>
    </div>
  );
}
