import { motion } from 'framer-motion';
import { RepoCard } from '@/components/RepoCard';
import { repos } from '@/data/repos';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function RepoGridSection() {
  return (
    <section className="pb-20">
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2"
        >
          {repos.map((repo) => (
            <motion.div key={repo.id} variants={itemVariants}>
              <RepoCard repo={repo} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
