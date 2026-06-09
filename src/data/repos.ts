export interface Repo {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  slug: string;
}

export const repos: Repo[] = [
  {
    id: '1',
    name: 'skelr',
    description: 'Service Scaffolding CLI — Generate production-ready service files in seconds. Supports modular and layer-based architectures, optional CRUD generation.',
    language: 'TypeScript',
    languageColor: '#3178C6',
    stars: 12,
    forks: 2,
    slug: 'skelr',
  },
  {
    id: '2',
    name: 'featify',
    description: 'Feature Branch Database Isolation CLI — Instantly clone development MySQL databases into isolated environments per feature branch to prevent schema collisions.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 8,
    forks: 1,
    slug: 'featify',
  },
  {
    id: '3',
    name: 'xenc',
    description: 'Browser-native file and text encryption tool using AES-256-CBC and Web Crypto API with a clean, lightweight responsive layout.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: 5,
    forks: 0,
    slug: 'xenc',
  },
];
