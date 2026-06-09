import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/SectionLabel';

export function ServicesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-grid-pattern pt-32 pb-20">
      <div className="section-container hero-content-wrapper">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <SectionLabel label="SERVICES" />
            <h1 className="font-display mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-7xl">
              Services <span className="text-accent-orange">&amp; Advisory</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
              Advisory &amp; consultancy services with hands-on expertise building and deploying scalable web applications, real-time AI networks, and automated cloud pipelines.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
