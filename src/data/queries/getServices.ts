import servicesJson from '@/data/json/services.json';
import { fetchCollection } from '@/lib/db';
import type { Service, ExpertiseArea, PreviousClient } from '@/data/types/service.types';

const FALLBACK = servicesJson as Service[];

export async function getAllServices(): Promise<Service[]> {
  return fetchCollection<Service>('services', FALLBACK, { sort: { order: 1 } });
}

// Static advisory config — moved to the DB when the admin panel manages it
export async function getExpertiseAreas(): Promise<ExpertiseArea[]> {
  return [
    { category: 'Frontend Tech', items: 'React, Next.js 16, Server Actions, Zustand, Tailwind CSS, TanStack' },
    { category: 'Backend & Data', items: 'Node.js, NestJS, Express, PostgreSQL, MySQL, MongoDB, Redis' },
    { category: 'DevOps & Infra', items: 'Docker, AWS deployments, Nginx, CI/CD, Linux, DNS management' },
    { category: 'AI & Real-time', items: 'Deepgram, Twilio Voice, WebSockets, OpenRouter, Kafka, BullMQ' },
  ];
}

export async function getPreviousClients(): Promise<PreviousClient[]> {
  return [
    { company: 'NEXENSTIAL LLP', role: 'Full Stack Software Engineer', description: 'Developing and deploying web applications and APIs using the MERN stack.' },
    { company: 'Freelance Software', role: 'Full Stack Developer', description: 'Built custom automation tools, browser encryption libraries, and responsive web systems.' },
  ];
}
