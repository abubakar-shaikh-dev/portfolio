import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Package } from 'lucide-react';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/queries/getProjects';
import { notFound } from 'next/navigation';

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

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} | Abubakar Shaikh`,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-accent-orange">
                  // PROJECT_DETAILS
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                    {project.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="border border-border-primary bg-bg-secondary px-2.5 py-0.5 font-mono text-xs font-semibold text-accent-orange">
                      {project.status}
                    </span>
                    <span className="border border-border-primary bg-bg-secondary px-2.5 py-0.5 font-mono text-xs text-text-secondary">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-border-primary bg-bg-secondary p-8">
                <p className="text-lg leading-relaxed text-text-secondary whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 border border-accent-orange bg-accent-orange px-6 py-3.5 text-sm font-medium text-white transition-[background-color,border-color,transform] duration-150 ease-out-premium hover:bg-accent-orange-deep hover:-translate-y-0.5 active:scale-97"
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
                    className="inline-flex items-center gap-2.5 border border-border-primary bg-bg-secondary px-6 py-3.5 text-sm font-medium text-white transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent-orange hover:-translate-y-0.5 active:scale-97"
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
                    className="inline-flex items-center gap-2.5 border border-border-primary bg-bg-secondary px-6 py-3.5 text-sm font-medium text-white transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent-orange hover:-translate-y-0.5 active:scale-97"
                  >
                    <Package className="h-4 w-4" />
                    NPM Registry
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border-primary bg-bg-secondary p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-orange">
                  // TECHNOLOGIES_USED
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border-primary bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-accent-orange hover:text-white"
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
    </section>
  );
}
