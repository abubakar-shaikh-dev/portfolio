import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/SectionLabel';

export function OpenSourceHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <SectionLabel label="OPEN_SOURCE" />
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Open Source</h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Projects and modules I build and maintain in the open.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
