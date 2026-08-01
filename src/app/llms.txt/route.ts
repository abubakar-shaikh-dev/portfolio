import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/constants';

export async function GET() {
  const content = `# Abubakar Shaikh — Full Stack Software Engineer
> Personal portfolio and technical blog of Abubakar Shaikh, a Full Stack Software Engineer specializing in scalable MERN applications, DevOps workflows, and AI integrations.

## Core Pages
- [Homepage](${SITE_URL}/): Portfolio homepage with featured projects, latest articles, and open source work
- [About](${SITE_URL}/about): Background, experience, and technical expertise
- [Projects](${SITE_URL}/projects): Full-stack web applications, AI-powered tools, and developer CLIs
- [Services](${SITE_URL}/services): Full-stack development, backend architecture, DevOps automation, and AI integration services
- [Open Source](${SITE_URL}/open-source): Open source projects including SKELR, FEATIFY, and XENC
- [Thoughts](${SITE_URL}/thoughts): Technical blog covering backend engineering, DevOps, AI, and security
- [Contact](${SITE_URL}/contact): Get in touch for collaborations and consulting

## Featured Projects
- [AI Complaint Management System](${SITE_URL}/projects/ai-complaint-management-system): Voice AI agent with Twilio, Deepgram, and LLM integration
- [Postlance](${SITE_URL}/projects/postlance): Student freelance platform with AI evaluation
- [XENC](${SITE_URL}/projects/xenc): Browser-native AES-256-CBC encryption tool
- [Libro](${SITE_URL}/projects/libro-ai-library-assistant): AI-powered library assistant
- [SKELR](${SITE_URL}/projects/skelr): Service scaffolding CLI for Node.js
- [FEATIFY](${SITE_URL}/projects/featify): Feature branch database isolation CLI

## Technical Articles
- [Database Isolation Per Feature Branch in Prisma Workflows](${SITE_URL}/thoughts/database-isolation-prisma-workflows)
- [Building Real-Time Voice AI Agents with Twilio and Deepgram](${SITE_URL}/thoughts/voice-ai-agent-twilio-deepgram-nodejs)
- [Scaffolding Production-Ready Node.js Services in Seconds](${SITE_URL}/thoughts/scaffolding-nodejs-services-cli)
- [Browser-Native Encryption with Web Crypto API](${SITE_URL}/thoughts/browser-native-encryption-web-crypto)

## Key Information
- 3+ years of professional software engineering experience
- Tech stack: TypeScript, React, Next.js, Node.js, Express, NestJS, MongoDB, PostgreSQL, Docker, AWS
- Specialties: Full-stack web development, microservices architecture, DevOps & CI/CD, AI agent integrations
- Based in India

## Contact
- Email: shaikhabubakar2380@gmail.com
- LinkedIn: https://www.linkedin.com/in/abubakar-shaikh-dev
- GitHub: https://github.com/abubakar-shaikh-dev
- Twitter/X: https://x.com/abubakarshaikh_dev
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
