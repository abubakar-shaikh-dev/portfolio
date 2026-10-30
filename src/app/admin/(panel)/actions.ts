'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { deleteById, getDb, getDocById, nextOrder, upsertById } from '@/lib/db';
import { deleteImage, uploadImage } from '@/lib/cloudinary';
import {
  articleContentSchema,
  articleSchema,
  careerSchema,
  projectSchema,
  repoSchema,
  serviceSchema,
  skillsSchema,
} from '@/lib/schemas';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export interface ActionState {
  error: string | null;
}

const INITIAL_ERROR = { error: (null as string | null) };

async function requireAdmin(): Promise<void> {
  const store = await cookies();
  const session = await verifySessionToken(store.get(SESSION_COOKIE)?.value ?? '');
  if (!session) throw new Error('Unauthorized');
}

function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Invalid input.';
}

/** FormData → typed object helpers (everything arrives as strings). */
function str(form: FormData, key: string): string {
  return String(form.get(key) ?? '').trim();
}
function bool(form: FormData, key: string): boolean {
  return form.get(key) === 'on' || form.get(key) === 'true';
}
function list(form: FormData, key: string): string[] {
  return String(form.get(key) ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}
function num(form: FormData, key: string, fallback = 0): number {
  const raw = String(form.get(key) ?? '').trim();
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Edit keeps its position; new items append. */
async function resolveOrder(
  collection: string,
  id: string,
  form: FormData,
): Promise<number> {
  const existing = await getDocById<{ order?: number }>(collection, id);
  if (existing && typeof existing.order === 'number') return existing.order;
  return num(form, 'order', await nextOrder(collection));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

/** Uploads the chosen file (if any) and returns [url, publicId], deleting the replaced image. */
async function handleImage(
  form: FormData,
  folder: string,
  current?: { image?: string; imagePublicId?: string },
): Promise<{ image?: string; imagePublicId?: string }> {
  const file = form.get('image');
  if (!(file instanceof File) || file.size === 0) {
    // keep current image; honor explicit removal
    if (form.get('removeImage') === 'on') {
      if (current?.imagePublicId) await deleteImage(current.imagePublicId).catch(() => {});
      return {};
    }
    return { image: current?.image, imagePublicId: current?.imagePublicId };
  }
  if (!file.type.startsWith('image/')) {
    throw new Error('Uploaded file is not an image.');
  }
  if (file.size > 4.5 * 1024 * 1024) {
    throw new Error('Image must be smaller than 4.5 MB.');
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadImage(buffer, { folder, filename: file.name });
  if (current?.imagePublicId && current.imagePublicId !== uploaded.publicId) {
    await deleteImage(current.imagePublicId).catch(() => {});
  }
  return { image: uploaded.url, imagePublicId: uploaded.publicId };
}

function publish(paths: string[]): void {
  for (const path of paths) revalidatePath(path);
}

/* ── Projects ─────────────────────────────────────────────────────────── */

export async function saveProjectAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  try {
    await requireAdmin();

    const parsed = projectSchema.parse({
      id: str(form, 'id') || crypto.randomUUID(),
      name: str(form, 'name'),
      description: str(form, 'description'),
      slug: slugify(str(form, 'slug') || str(form, 'name')),
      year: str(form, 'year'),
      status: str(form, 'status') || 'Live',
      featured: bool(form, 'featured'),
      stack: list(form, 'stack'),
      links: { live: str(form, 'live'), github: str(form, 'github'), npm: str(form, 'npm') },
    });

    const image = await handleImage(form, 'projects', {
      image: str(form, 'currentImage') || undefined,
      imagePublicId: str(form, 'currentImagePublicId') || undefined,
    });

    await upsertById('projects', {
      ...parsed,
      ...image,
      links: Object.fromEntries(Object.entries(parsed.links).filter(([, v]) => v)) as typeof parsed.links,
      order: await resolveOrder('projects', parsed.id, form),
    });

    publish(['/', '/projects', `/projects/${parsed.slug}`]);
    redirect('/admin/projects');
  } catch (error) {
    if (error instanceof z.ZodError) return { error: firstError(error) };
    if (error instanceof Error) {
      if (error.message.startsWith('NEXT_REDIRECT')) throw error;
      return { error: error.message };
    }
    return INITIAL_ERROR;
  }
  return INITIAL_ERROR;
}

export async function deleteProjectAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (id) await deleteById('projects', id);
  publish(['/', '/projects']);
  redirect('/admin/projects');
}

/* ── Articles ─────────────────────────────────────────────────────────── */

export async function saveArticleAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  try {
    await requireAdmin();

    let content: z.infer<typeof articleContentSchema> | undefined;
    const rawContent = str(form, 'content');
    if (rawContent) {
      const parsedContent = articleContentSchema.safeParse(JSON.parse(rawContent));
      if (!parsedContent.success) return { error: firstError(parsedContent.error) };
      content = parsedContent.data;
    }

    const parsed = articleSchema.parse({
      id: str(form, 'id') || crypto.randomUUID(),
      title: str(form, 'title'),
      excerpt: str(form, 'excerpt'),
      slug: slugify(str(form, 'slug') || str(form, 'title')),
      date: str(form, 'date'),
      dateISO: str(form, 'dateISO'),
      readTime: str(form, 'readTime'),
      tags: list(form, 'tags'),
      slugCategory: slugify(str(form, 'category')),
      author: str(form, 'author') || 'Abubakar Shaikh',
      content,
    });

    const image = await handleImage(form, 'articles', {
      image: str(form, 'currentImage') || undefined,
      imagePublicId: str(form, 'currentImagePublicId') || undefined,
    });

    await upsertById('articles', {
      ...parsed,
      ...image,
      category: parsed.slugCategory,
      order: await resolveOrder('articles', parsed.id, form),
    });

    publish(['/', '/thoughts', `/thoughts/${parsed.slug}`]);
    redirect('/admin/articles');
  } catch (error) {
    if (error instanceof z.ZodError) return { error: firstError(error) };
    if (error instanceof Error) {
      if (error.message.startsWith('NEXT_REDIRECT')) throw error;
      return { error: error.message };
    }
    return INITIAL_ERROR;
  }
  return INITIAL_ERROR;
}

export async function deleteArticleAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (id) await deleteById('articles', id);
  publish(['/', '/thoughts']);
  redirect('/admin/articles');
}

/* ── Repos ────────────────────────────────────────────────────────────── */

export async function saveRepoAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const parsed = repoSchema.parse({
      id: str(form, 'id') || crypto.randomUUID(),
      name: str(form, 'name'),
      description: str(form, 'description'),
      language: str(form, 'language'),
      languageColor: str(form, 'languageColor') || '#10b981',
      stars: num(form, 'stars'),
      forks: num(form, 'forks'),
      slug: slugify(str(form, 'slug') || str(form, 'name')),
    });
    await upsertById('repos', { ...parsed, order: num(form, 'order', await nextOrder('repos')) });
    publish(['/', '/open-source']);
    redirect('/admin/repos');
  } catch (error) {
    if (error instanceof z.ZodError) return { error: firstError(error) };
    if (error instanceof Error) {
      if (error.message.startsWith('NEXT_REDIRECT')) throw error;
      return { error: error.message };
    }
    return INITIAL_ERROR;
  }
  return INITIAL_ERROR;
}

export async function deleteRepoAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (id) await deleteById('repos', id);
  publish(['/', '/open-source']);
  redirect('/admin/repos');
}

/* ── Career ───────────────────────────────────────────────────────────── */

export async function saveCareerAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const parsed = careerSchema.parse({
      id: str(form, 'id') || crypto.randomUUID(),
      company: str(form, 'company'),
      role: str(form, 'role'),
      period: str(form, 'period'),
    });
    await upsertById('career', { ...parsed, order: num(form, 'order', await nextOrder('career')) });
    publish(['/']);
    redirect('/admin/career');
  } catch (error) {
    if (error instanceof z.ZodError) return { error: firstError(error) };
    if (error instanceof Error) {
      if (error.message.startsWith('NEXT_REDIRECT')) throw error;
      return { error: error.message };
    }
    return INITIAL_ERROR;
  }
  return INITIAL_ERROR;
}

export async function deleteCareerAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (id) await deleteById('career', id);
  publish(['/']);
  redirect('/admin/career');
}

/* ── Services & Skills ────────────────────────────────────────────────── */

export async function saveServiceAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const parsed = serviceSchema.parse({
      id: str(form, 'id') || crypto.randomUUID(),
      title: str(form, 'title'),
      description: str(form, 'description'),
      techStack: list(form, 'techStack'),
    });
    await upsertById('services', { ...parsed, order: num(form, 'order', await nextOrder('services')) });
    publish(['/', '/services']);
    redirect('/admin/services');
  } catch (error) {
    if (error instanceof z.ZodError) return { error: firstError(error) };
    if (error instanceof Error) {
      if (error.message.startsWith('NEXT_REDIRECT')) throw error;
      return { error: error.message };
    }
    return INITIAL_ERROR;
  }
  return INITIAL_ERROR;
}

export async function deleteServiceAction(form: FormData): Promise<void> {
  await requireAdmin();
  const id = String(form.get('id') ?? '');
  if (id) await deleteById('services', id);
  publish(['/', '/services']);
  redirect('/admin/services');
}

export async function saveSkillsAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const parsed = skillsSchema.parse({ row1: list(form, 'row1'), row2: list(form, 'row2') });
    const db = await getDb();
    if (!db) throw new Error('Database unavailable — cannot save skills.');
    await db.collection('skills').replaceOne(
      { key: 'skills' },
      { key: 'skills', ...parsed },
      { upsert: true },
    );
    publish(['/']);
    redirect('/admin/services');
  } catch (error) {
    if (error instanceof z.ZodError) return { error: firstError(error) };
    if (error instanceof Error) {
      if (error.message.startsWith('NEXT_REDIRECT')) throw error;
      return { error: error.message };
    }
    return INITIAL_ERROR;
  }
  return INITIAL_ERROR;
}
