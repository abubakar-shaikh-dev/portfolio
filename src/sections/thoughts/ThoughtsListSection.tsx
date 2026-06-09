import { motion, AnimatePresence } from 'framer-motion';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@/data/articles';

interface ThoughtsListSectionProps {
  articles: Article[];
}

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

export function ThoughtsListSection({ articles }: ThoughtsListSectionProps) {
  return (
    <section className="pb-20">
      <div className="section-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={articles.map((a) => a.id).join(',')}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
