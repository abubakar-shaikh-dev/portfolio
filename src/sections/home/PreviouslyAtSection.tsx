import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/SectionLabel';
import { CareerItem } from '@/components/CareerItem';
import { careerItems } from '@/data/career';

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function PreviouslyAtSection() {
  return (
    <section className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <SectionLabel label="PREVIOUSLY_AT" />
          <h2 className="sr-only">Previous Experience</h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8"
        >
          {careerItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <CareerItem item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
