'use client';

import { useActionState, useState } from 'react';
import { saveSkillsAction } from '../actions';
import { ErrorBox, labelClasses, SubmitButton } from '../form-ui';
import type { Skills } from '@/data/types/skills.types';

export function SkillsForm({ initial }: { initial: Skills }) {
  const [state, formAction, isPending] = useActionState(saveSkillsAction, { error: null });
  const [row1, setRow1] = useState(initial.row1.join(', '));
  const [row2, setRow2] = useState(initial.row2.join(', '));

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <label className={labelClasses}>Row 1</label>
        <textarea
          name="row1"
          value={row1}
          onChange={(e) => setRow1(e.target.value)}
          rows={2}
          placeholder="TypeScript, JavaScript, React..."
          className="w-full rounded-md border border-border-primary bg-bg-primary px-3.5 py-2.5 font-mono text-xs text-white placeholder-text-muted focus:border-accent focus:outline-none"
        />
      </div>
      <div className="space-y-1.5">
        <label className={labelClasses}>Row 2</label>
        <textarea
          name="row2"
          value={row2}
          onChange={(e) => setRow2(e.target.value)}
          rows={2}
          placeholder="Express, NestJS, MongoDB..."
          className="w-full rounded-md border border-border-primary bg-bg-primary px-3.5 py-2.5 font-mono text-xs text-white placeholder-text-muted focus:border-accent focus:outline-none"
        />
      </div>

      <ErrorBox message={state.error} />
      <SubmitButton pending={isPending}>Save skills</SubmitButton>
    </form>
  );
}
