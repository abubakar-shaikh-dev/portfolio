'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { Article } from '@/data/types/article.types';
import { saveArticleAction } from '../actions';
import { ErrorBox, Field, ImageField, inputClasses, labelClasses, SubmitButton } from '../form-ui';

interface ContentSection {
  heading: string;
  body: string;
  code?: string;
}

const CATEGORIES = [
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'devops', label: 'Infrastructure & DevOps' },
  { id: 'ai', label: 'AI & Real-time' },
  { id: 'security', label: 'Security & Tooling' },
];

export function ArticleForm({ article }: { article: Article | null }) {
  const [state, formAction, isPending] = useActionState(saveArticleAction, { error: null });

  const existing = article?.content;
  const [subtitle, setSubtitle] = useState(existing?.subtitle ?? '');
  const [introduction, setIntroduction] = useState(existing?.introduction ?? '');
  const [conclusion, setConclusion] = useState(existing?.conclusion ?? '');
  const [sections, setSections] = useState<ContentSection[]>(existing?.sections ?? []);

  // Content travels to the action as JSON in a hidden field — Zod validates server-side.
  const contentJson = JSON.stringify({
    subtitle,
    introduction,
    conclusion,
    sections: sections.filter((s) => s.heading.trim() && s.body.trim()),
  });

  function updateSection(index: number, patch: Partial<ContentSection>) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All articles
      </Link>

      <h1 className="font-display mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
        {article ? 'Edit Article' : 'New Article'}
      </h1>

      <form action={formAction} className="mt-8 space-y-6">
        <input type="hidden" name="id" value={article?.id ?? ''} />
        <input type="hidden" name="content" value={contentJson} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title">
            <input name="title" defaultValue={article?.title} required maxLength={200} className={inputClasses} />
          </Field>
          <Field label="Slug" hint="Leave to auto-generate from the title">
            <input name="slug" defaultValue={article?.slug} className={inputClasses} />
          </Field>
        </div>

        <Field label="Excerpt">
          <textarea name="excerpt" defaultValue={article?.excerpt} required rows={2} maxLength={500} className={inputClasses} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-4">
          <Field label="Date shown" hint="e.g. 12 May 2026">
            <input name="date" defaultValue={article?.date} required maxLength={40} className={inputClasses} />
          </Field>
          <Field label="Date (ISO)" hint="YYYY-MM-DD">
            <input name="dateISO" defaultValue={article?.dateISO} required pattern="\d{4}-\d{2}-\d{2}" className={inputClasses} />
          </Field>
          <Field label="Read time" hint="e.g. 8 min">
            <input name="readTime" defaultValue={article?.readTime ?? '6 min'} required maxLength={20} className={inputClasses} />
          </Field>
          <Field label="Author">
            <input name="author" defaultValue={article?.author ?? 'Abubakar Shaikh'} maxLength={80} className={inputClasses} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category">
            <select name="category" defaultValue={article?.category ?? 'backend'} className={inputClasses}>
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tags" hint="Comma separated">
            <input name="tags" defaultValue={article?.tags.join(', ')} required className={inputClasses} />
          </Field>
        </div>

        <ImageField currentImage={article?.image} currentImagePublicId={article?.imagePublicId} />

        {/* ── Content ── */}
        <div className="space-y-4 rounded-xl border border-border-primary/60 bg-bg-secondary/40 p-5">
          <p className="font-mono text-xs text-text-muted">// Article content</p>

          <Field label="Subtitle">
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} maxLength={300} className={inputClasses} />
          </Field>

          <Field label="Introduction">
            <textarea value={introduction} onChange={(e) => setIntroduction(e.target.value)} rows={3} maxLength={4000} className={inputClasses} />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className={labelClasses}>Sections</label>
              <button
                type="button"
                onClick={() => setSections((prev) => [...prev, { heading: '', body: '' }])}
                className="inline-flex items-center gap-1.5 rounded-md border border-border-primary px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                <Plus className="h-3 w-3" aria-hidden="true" /> Add section
              </button>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="space-y-2 rounded-lg border border-border-primary/50 bg-bg-primary/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-text-muted">SECTION_{String(index + 1).padStart(2, '0')}</span>
                  <button
                    type="button"
                    onClick={() => setSections((prev) => prev.filter((_, i) => i !== index))}
                    className="text-text-muted transition-colors hover:text-red-400"
                    aria-label={`Remove section ${index + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
                <input
                  value={section.heading}
                  onChange={(e) => updateSection(index, { heading: e.target.value })}
                  placeholder="Section heading"
                  maxLength={200}
                  className={inputClasses}
                />
                <textarea
                  value={section.body}
                  onChange={(e) => updateSection(index, { body: e.target.value })}
                  placeholder="Section body"
                  rows={4}
                  maxLength={8000}
                  className={inputClasses}
                />
                <textarea
                  value={section.code ?? ''}
                  onChange={(e) => updateSection(index, { code: e.target.value })}
                  placeholder="Optional code block"
                  rows={3}
                  maxLength={6000}
                  className={`${inputClasses} font-mono text-xs`}
                />
              </div>
            ))}
          </div>

          <Field label="Conclusion">
            <textarea value={conclusion} onChange={(e) => setConclusion(e.target.value)} rows={3} maxLength={4000} className={inputClasses} />
          </Field>
        </div>

        <ErrorBox message={state.error} />
        <SubmitButton pending={isPending}>{article ? 'Save changes' : 'Create article'}</SubmitButton>
      </form>
    </div>
  );
}
