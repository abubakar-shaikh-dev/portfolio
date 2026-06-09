import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/SectionLabel';

export function ProjectsHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <SectionLabel label="PROJECTS" />
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Projects</h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Personal and commercial projects I have built.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
