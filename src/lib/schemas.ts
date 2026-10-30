import { z } from 'zod';

/** Shared validation for admin mutations. Forms submit FormData; actions parse
 *  through these before anything touches MongoDB. */

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === '' || /^https?:\/\//.test(v), 'Must be a valid URL')
  .transform((v) => (v === '' ? undefined : v));

const slugField = z
  .string()
  .trim()
  .min(1, 'Slug is required')
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers and dashes only');

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, 'Name is required').max(120),
  description: z.string().trim().min(1, 'Description is required').max(2000),
  slug: slugField,
  year: z.string().trim().min(2).max(12),
  status: z.string().trim().min(1).max(40),
  featured: z.boolean(),
  stack: z.array(z.string().trim().min(1)).min(1, 'At least one technology'),
  links: z.object({
    live: optionalUrl,
    github: optionalUrl,
    npm: optionalUrl,
  }),
  image: z.string().trim().max(500).optional(),
  imagePublicId: z.string().trim().max(200).optional(),
});

export const articleContentSchema = z.object({
  subtitle: z.string().trim().max(300).optional(),
  introduction: z.string().trim().max(4000).optional(),
  sections: z
    .array(
      z.object({
        heading: z.string().trim().min(1).max(200),
        body: z.string().trim().min(1).max(8000),
        code: z.string().max(6000).optional(),
      }),
    )
    .optional(),
  conclusion: z.string().trim().max(4000).optional(),
});

export const articleSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1, 'Title is required').max(200),
  excerpt: z.string().trim().min(1, 'Excerpt is required').max(500),
  slug: slugField,
  date: z.string().trim().min(4).max(40),
  dateISO: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  readTime: z.string().trim().min(1).max(20),
  tags: z.array(z.string().trim().min(1)).min(1, 'At least one tag'),
  slugCategory: slugField, // category id
  author: z.string().trim().min(1).max(80),
  content: articleContentSchema.optional(),
  image: z.string().trim().max(500).optional(),
  imagePublicId: z.string().trim().max(200).optional(),
});

export const repoSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(500),
  language: z.string().trim().min(1).max(40),
  languageColor: z.string().trim().regex(/^#[0-9a-fA-F]{6}$/, 'Hex color like #10b981'),
  stars: z.number().int().min(0).max(1_000_000),
  forks: z.number().int().min(0).max(1_000_000),
  slug: slugField,
});

export const careerSchema = z.object({
  id: z.string().min(1),
  company: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  period: z.string().trim().min(1).max(40),
});

export const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(1000),
  techStack: z.array(z.string().trim().min(1)).min(1),
});

export const skillsSchema = z.object({
  row1: z.array(z.string().trim().min(1)),
  row2: z.array(z.string().trim().min(1)),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
export type RepoInput = z.infer<typeof repoSchema>;
export type CareerInput = z.infer<typeof careerSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
