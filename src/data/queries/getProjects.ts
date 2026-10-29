import projectsJson from '@/data/json/projects.json';
import { fetchCollection, fetchOne } from '@/lib/db';
import type { Project } from '@/data/types/project.types';

const FALLBACK = projectsJson as Project[];

export async function getAllProjects(): Promise<Project[]> {
  return fetchCollection<Project>('projects', FALLBACK, { sort: { order: 1 } });
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const fromDb = await fetchOne<Project>('projects', { slug }, null);
  return fromDb ?? FALLBACK.find((p) => p.slug === slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}
