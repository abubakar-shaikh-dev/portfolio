export interface ProjectLinks {
  live?: string;
  github?: string;
  npm?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  slug: string;
  year: string;
  status: string;
  featured: boolean;
  stack: string[];
  links: ProjectLinks;
}
