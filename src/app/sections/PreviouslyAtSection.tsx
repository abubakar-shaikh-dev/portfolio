import { SectionLabel } from '@/components/atoms/SectionLabel';
import { CareerItem } from '@/components/molecules/CareerItem';
import { getAllCareerItems } from '@/data/queries/getCareer';

export async function PreviouslyAtSection() {
  const careerItems = await getAllCareerItems();

  return (
    <section className="py-20">
      <div className="section-container">
        <SectionLabel label="PREVIOUSLY_AT" />
        <h2 className="sr-only">Previous Experience</h2>
        <div className="mt-8">
          {careerItems.map((item) => (
            <CareerItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
