export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  category: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Database Isolation Per Feature Branch in Prisma Workflows',
    excerpt: 'Schema conflicts in shared development databases can paralyze engineering teams. Here is how feature-branch database isolation solves this collision problem.',
    date: '12 May 2026',
    readTime: '8 min',
    tags: ['database', 'prisma', 'mysql', 'devops'],
    slug: 'database-isolation-prisma-workflows',
    category: 'devops',
  },
  {
    id: '2',
    title: 'Building Real-Time Voice AI Agents with Twilio and Deepgram in Node.js',
    excerpt: 'A deep dive into connecting Twilio voice streams to Deepgram transcription engine over WebSockets, routing speech to LLMs, and returning natural speech responses.',
    date: '28 Feb 2025',
    readTime: '15 min',
    tags: ['nodejs', 'ai', 'websockets', 'twilio'],
    slug: 'voice-ai-agent-twilio-deepgram-nodejs',
    category: 'ai',
  },
  {
    id: '3',
    title: 'Scaffolding Production-Ready Node.js Services in Seconds',
    excerpt: 'Standardizing service file structures is essential for scaling backend APIs. How configuring CLI template scaffolding speeds up developers without restricting their flow.',
    date: '10 Jan 2026',
    readTime: '6 min',
    tags: ['nodejs', 'typescript', 'cli', 'architecture'],
    slug: 'scaffolding-nodejs-services-cli',
    category: 'backend',
  },
  {
    id: '4',
    title: 'Browser-Native Encryption with Web Crypto API and AES-256-CBC',
    excerpt: 'Secure files directly inside client browsers without sending secrets to any server. Exploring Web Crypto API native primitives for fast, local AES-256-CBC encryption.',
    date: '15 Dec 2023',
    readTime: '10 min',
    tags: ['security', 'javascript', 'cryptography'],
    slug: 'browser-native-encryption-web-crypto',
    category: 'security',
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'devops', label: 'Infrastructure & DevOps' },
  { id: 'ai', label: 'AI & WebRTC' },
  { id: 'security', label: 'Security & Tooling' },
];
