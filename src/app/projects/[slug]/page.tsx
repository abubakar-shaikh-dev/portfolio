import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Package, ChevronRight } from 'lucide-react';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/queries/getProjects';
import { notFound } from 'next/navigation';

const BASE_URL = 'https://abubakarshaikh.dev';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  const projectUrl = `${BASE_URL}/projects/${slug}`;

  return {
    title: project.name,
    description: project.description,
    keywords: [project.name, ...project.stack.slice(0, 8)],
    openGraph: {
      title: `${project.name} | Abubakar Shaikh`,
      description: project.description,
      url: projectUrl,
      type: 'article',
      images: [
        {
          url: '/images/profile_2.webp',
          width: 1200,
          height: 1200,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: project.name,
      description: project.description,
      images: ['/images/profile_2.webp'],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectUrl = `${BASE_URL}/projects/${slug}`;

  // Determine schema type based on whether it has a live URL
  const schemaType = project.links.live ? 'WebApplication' : 'SoftwareSourceCode';

  return (
    <section className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-white">Projects</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="text-text-secondary truncate max-w-[200px]" aria-current="page">{project.name}</li>
            </ol>
          </nav>

          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  // PROJECT_DETAILS
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                    {project.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-border-primary/80 bg-bg-secondary px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                      {project.status}
                    </span>
                    <span className="rounded-md border border-border-primary/80 bg-bg-secondary px-2.5 py-0.5 font-mono text-xs text-text-secondary">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-8 shadow-xl">
                <p className="text-base leading-relaxed text-text-secondary whitespace-pre-line sm:text-lg">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md border border-border-primary bg-bg-secondary px-6 py-3.5 text-sm font-medium text-white transition-[border-color,color,transform] duration-150 ease-out-premium hover:border-accent hover:text-accent active:scale-97"
                  >
                    <Github className="h-4 w-4" />
                    View Repository
                  </a>
                )}
                {project.links.npm && (
                  <a
                    href={project.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-md border border-border-primary bg-bg-secondary px-6 py-3.5 text-sm font-medium text-white transition-[border-color,color,transform] duration-150 ease-out-premium hover:border-accent hover:text-accent active:scale-97"
                  >
                    <Package className="h-4 w-4" />
                    NPM Registry
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 shadow-xl">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">
                  // TECHNOLOGIES_USED
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border-primary/60 bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SoftwareSourceCode / WebApplication + BreadcrumbList JSON-LD per 30x-seo-schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': schemaType,
            name: project.name,
            description: project.description,
            url: projectUrl,
            author: {
              '@type': 'Person',
              '@id': `${BASE_URL}/#person`,
              name: 'Abubakar Shaikh',
            },
            ...(project.links.github && { codeRepository: project.links.github }),
            ...(project.links.live && { url: project.links.live }),
            programmingLanguage: project.stack,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Projects', item: `${BASE_URL}/projects` },
                { '@type': 'ListItem', position: 3, name: project.name, item: projectUrl },
              ],
            },
          }),
        }}
      />
    </section>
  );
}
