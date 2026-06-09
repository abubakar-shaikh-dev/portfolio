export interface Service {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Full-Stack Web Development',
    description: 'Expert implementation of custom web applications using React, Next.js, and TypeScript. I build clean, modern user interfaces with state-of-the-art styling and micro-animations, integrated with secure, high-performance API backends.',
  },
  {
    id: '2',
    title: 'Backend & Microservices Architecture',
    description: 'Designing modular monoliths and event-driven microservices architectures using NestJS, Node.js, and Fastify. Scalable database schema designs in PostgreSQL, MongoDB, and MySQL with high-throughput queuing via Kafka and BullMQ.',
  },
  {
    id: '3',
    title: 'DevOps & CI/CD Automation',
    description: 'Dockerizing service environments, configuring Nginx reverse proxies, setting up GitHub Actions pipelines for automated builds and testing, and deploying secure, production-grade applications on AWS cloud infrastructure.',
  },
  {
    id: '4',
    title: 'AI Agent & Real-time Integrations',
    description: 'Integrating LLMs (via OpenRouter/OpenAI), building real-time voice AI agents over WebSockets using Twilio and Deepgram, and connecting low-latency notification and messaging networks (SMS, Socket.io).',
  },
];

export const areasOfExpertise = [
  { category: 'Frontend Tech', items: 'React, Next.js 16, Server Actions, Zustand, Tailwind CSS, TanStack' },
  { category: 'Backend & Data', items: 'Node.js, NestJS, Express, PostgreSQL, MySQL, MongoDB, Redis' },
  { category: 'DevOps & Infra', items: 'Docker, AWS deployments, Nginx, CI/CD, Linux, DNS management' },
  { category: 'AI & Real-time', items: 'Deepgram, Twilio Voice, WebSockets, OpenRouter, Kafka, BullMQ' },
];

export const previousClients = [
  { company: 'NEXENSTIAL LLP', role: 'Full Stack Software Engineer', description: 'Developing and deploying web applications and APIs using the MERN stack.' },
  { company: 'Freelance Software', role: 'Full Stack Developer', description: 'Built custom automation tools, browser encryption libraries, and responsive web systems.' },
];
