'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Service } from '@/data/types/service.types';
import { saveServiceAction } from '../actions';
import { ErrorBox, Field, inputClasses, SubmitButton } from '../form-ui';

export function ServiceForm({ service }: { service: Service | null }) {
  const [state, formAction, isPending] = useActionState(saveServiceAction, { error: null });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All services
      </Link>

      <h1 className="font-display mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
        {service ? `Edit: ${service.title}` : 'New Service'}
      </h1>

      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={service?.id ?? ''} />

        <Field label="Title">
          <input name="title" defaultValue={service?.title} required maxLength={120} className={inputClasses} />
        </Field>

        <Field label="Description">
          <textarea name="description" defaultValue={service?.description} required rows={4} maxLength={1000} className={inputClasses} />
        </Field>

        <Field label="Featured technologies" hint="Comma separated">
          <input name="techStack" defaultValue={service?.techStack.join(', ')} required className={inputClasses} />
        </Field>

        <ErrorBox message={state.error} />
        <SubmitButton pending={isPending}>{service ? 'Save changes' : 'Create service'}</SubmitButton>
      </form>
    </div>
  );
}
