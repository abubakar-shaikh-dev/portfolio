import { SectionLabel } from '@/components/atoms/SectionLabel';

export function ProjectsHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div>
          <SectionLabel label="PROJECTS" />
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Projects</h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Personal and commercial projects I have built.
          </p>
        </div>
      </div>
    </section>
  );
}
