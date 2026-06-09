import { motion } from 'framer-motion';
import { TopicCard } from '@/components/TopicCard';
import { topics } from '@/data/topics';

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

export function DeepDiveTopicsSection() {
  return (
    <section className="bg-accent-orange py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-black/60">// things_i_know</p>
            <h2 className="text-display-md font-display font-bold text-black">Deep Dive by Topic</h2>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {topics.map((topic) => (
            <motion.div key={topic.id} variants={itemVariants}>
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
