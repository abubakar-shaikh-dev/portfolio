import projectsJson from '@/data/json/projects.json';
import type { Project } from '@/data/types/project.types';

export async function getAllProjects(): Promise<Project[]> {
  return projectsJson as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}
