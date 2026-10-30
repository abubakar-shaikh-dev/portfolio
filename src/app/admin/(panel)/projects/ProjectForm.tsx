'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/types/project.types';
import { saveProjectAction } from '../actions';
import { ErrorBox, Field, ImageField, inputClasses, SubmitButton } from '../form-ui';

export function ProjectForm({ project }: { project: Project | null }) {
  const [state, formAction, isPending] = useActionState(saveProjectAction, { error: null });

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All projects
      </Link>

      <h1 className="font-display mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
        {project ? `Edit: ${project.name}` : 'New Project'}
      </h1>

      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={project?.id ?? ''} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name">
            <input name="name" defaultValue={project?.name} required maxLength={120} className={inputClasses} />
          </Field>
          <Field label="Slug" hint="Leave to auto-generate from the name">
            <input name="slug" defaultValue={project?.slug} className={inputClasses} />
          </Field>
        </div>

        <Field label="Description">
          <textarea name="description" defaultValue={project?.description} required rows={4} maxLength={2000} className={inputClasses} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Year">
            <input name="year" defaultValue={project?.year ?? String(new Date().getFullYear())} required maxLength={12} className={inputClasses} />
          </Field>
          <Field label="Status">
            <input name="status" defaultValue={project?.status ?? 'Live'} required maxLength={40} className={inputClasses} />
          </Field>
          <Field label="Technologies" hint="Comma separated">
            <input name="stack" defaultValue={project?.stack.join(', ')} required className={inputClasses} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Live URL">
            <input name="live" defaultValue={project?.links.live ?? ''} placeholder="https://..." className={inputClasses} />
          </Field>
          <Field label="GitHub URL">
            <input name="github" defaultValue={project?.links.github ?? ''} placeholder="https://..." className={inputClasses} />
          </Field>
          <Field label="NPM URL">
            <input name="npm" defaultValue={project?.links.npm ?? ''} placeholder="https://..." className={inputClasses} />
          </Field>
        </div>

        <ImageField currentImage={project?.image} currentImagePublicId={project?.imagePublicId} />

        <label className="flex w-fit items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4 accent-emerald-500" />
          Featured project
        </label>

        <ErrorBox message={state.error} />
        <SubmitButton pending={isPending}>{project ? 'Save changes' : 'Create project'}</SubmitButton>
      </form>
    </div>
  );
}
