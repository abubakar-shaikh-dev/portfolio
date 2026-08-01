import { CareerItem } from '@/components/molecules/CareerItem';
import { getAllCareerItems } from '@/data/queries/getCareer';

export async function PreviouslyAtSection() {
  const careerItems = await getAllCareerItems();

  return (
    <section className="border-b border-border-primary/40 bg-bg-primary/50 py-16 md:py-24">
      <div className="section-container">
        <div className="mb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            // CAREER_TIMELINE
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Previous Experience &amp; Roles
          </h2>
        </div>

        <div className="space-y-3">
          {careerItems.map((item) => (
            <CareerItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
