import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/SectionLabel';

export function ContactHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <SectionLabel label="CONTACT" />
            <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Contact</h1>
            <p className="mt-4 text-text-secondary">
              Get in touch with Abubakar Shaikh
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
