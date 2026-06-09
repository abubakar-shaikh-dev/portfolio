import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Package } from 'lucide-react';
import { projects } from '@/data/projects';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className="min-h-screen pt-32 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white">Project not found</h1>
            <p className="mt-4 text-text-secondary">
              The project you are looking for does not exist or has been moved.
            </p>
            <Link
              to="/projects"
              className="mt-8 inline-flex items-center gap-2 border border-border-primary bg-bg-secondary px-6 py-3 font-mono text-xs uppercase tracking-wider text-white transition-all hover:border-accent-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          {/* Back navigation */}
          <div className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-3"
          >
            {/* Main Info */}
            <div className="space-y-8 lg:col-span-2">
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div variants={itemVariants} className="border border-border-primary bg-bg-secondary p-8">
                <p className="text-lg leading-relaxed text-text-secondary whitespace-pre-line">
                  {project.description}
                </p>
              </motion.div>

              {/* Actions / Links */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 border border-accent-orange bg-accent-orange px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-orange-deep hover:-translate-y-0.5"
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
                    className="inline-flex items-center gap-2.5 border border-border-primary bg-bg-secondary px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-accent-orange hover:-translate-y-0.5"
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
                    className="inline-flex items-center gap-2.5 border border-border-primary bg-bg-secondary px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-accent-orange hover:-translate-y-0.5"
                  >
                    <Package className="h-4 w-4" />
                    NPM Registry
                  </a>
                )}
              </motion.div>
            </div>

            {/* Tech Stack sidebar */}
            <motion.div variants={itemVariants} className="space-y-6">
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
