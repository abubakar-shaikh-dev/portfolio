import { motion } from 'framer-motion';

export function AboutHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex flex-col items-center"
          >
            <div className="mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-accent-orange bg-bg-secondary">
              <img
                src="/images/profile.webp"
                alt="Abubakar Shaikh"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-orange">
              // ABOUT
            </p>
            <h1 className="text-4xl font-bold text-white md:text-5xl">About Me</h1>
            <p className="mt-4 text-text-secondary">
              Full Stack Software Engineer with professional experience shipping production-grade applications, scalable APIs, and automated DevOps workflows.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

