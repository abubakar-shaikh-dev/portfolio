import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RepoCard } from '@/components/RepoCard';
import { repos } from '@/data/repos';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function LatestOpenSourceSection() {
  return (
    <section className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mono-accent mb-3">// things_i_open_source</p>
              <h2 className="text-display-md font-display font-bold text-white">Latest Open Source</h2>
            </div>
            <Link
              to="/open-source"
              className="hidden items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-orange sm:flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {repos.slice(0, 5).map((repo) => (
            <motion.div key={repo.id} variants={itemVariants}>
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </motion.div>

        <Link
          to="/open-source"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-orange sm:hidden"
        >
          View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
