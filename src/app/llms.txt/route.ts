import { NextResponse } from 'next/server';
import { getAllArticles } from '@/data/queries/getArticles';
import { getAllPapers } from '@/data/queries/getPapers';
import { getAllProjects } from '@/data/queries/getProjects';
import { SITE_EMAIL, SITE_NAME, SITE_URL } from '@/lib/constants';

/**
 * llms.txt for AI search engines — generated from the live data queries so
 * it always matches the database (JSON fallback included), never drifts
 * from the real content. Never hardcode content links here.
 */
export async function GET() {
  const [projects, articles, papers] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllPapers(),
  ]);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .map((project) => `- [${project.name}](${SITE_URL}/projects/${project.slug}): ${project.description}`);

  const latestArticles = articles.slice(0, 6).map((article) => {
    const lines = article.excerpt.split('. ');
    return `- [${article.title}](${SITE_URL}/thoughts/${article.slug}): ${lines[0] ?? article.excerpt}`;
  });

  const researchPapers = papers
    // Only papers with a real external URL — no fake targets
    .map((paper) => ({ paper, link: paper.links.doi ?? paper.links.arxiv ?? paper.links.pdf }))
    .filter(({ link }) => Boolean(link))
    .map(({ paper, link }) => `- [${paper.title}](${link}): ${paper.venue}, ${paper.year} — ${paper.authors.join(', ')}`);

  const content = `# ${SITE_NAME} — Full Stack Software Engineer
> Portfolio and technical blog of ${SITE_NAME}, a Full Stack Software Engineer specializing in scalable MERN applications, DevOps workflows, AI integrations, and (from 2026) doctoral research.

## Core Pages
- [Homepage](${SITE_URL}/): Portfolio homepage with featured projects, latest articles, and open source work
- [About](${SITE_URL}/about): Background, experience, and technical expertise
- [Projects](${SITE_URL}/projects): Full-stack web applications, AI-powered tools, and developer CLIs
- [Research](${SITE_URL}/research): Research papers, publications, and preprints from doctoral research
- [Services](${SITE_URL}/services): Full-stack development, backend architecture, DevOps automation, and AI integration services
- [Open Source](${SITE_URL}/open-source): Open source projects and developer tools
- [Thoughts](${SITE_URL}/thoughts): Technical blog covering backend engineering, DevOps, AI, and security
- [Contact](${SITE_URL}/contact): Get in touch for collaborations and consulting

## Featured Projects
${featuredProjects.join('\n')}

## Latest Articles
${latestArticles.join('\n')}
${researchPapers.length > 0 ? `\n## Research Papers\n${researchPapers.join('\n')}\n` : ''}
## Key Information
- 3+ years of professional software engineering experience
- Tech stack: TypeScript, React, Next.js, Node.js, Express, NestJS, MongoDB, PostgreSQL, Docker, AWS
- Specialties: Full-stack web development, microservices architecture, DevOps & CI/CD, AI agent integrations
- Based in India

## Contact
- Email: ${SITE_EMAIL}
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
