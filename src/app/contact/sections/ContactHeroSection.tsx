import { SectionLabel } from '@/components/atoms/SectionLabel';

export function ContactHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <SectionLabel label="CONTACT" />
            <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Contact</h1>
            <p className="mt-4 text-text-secondary">
              Get in touch with Abubakar Shaikh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
