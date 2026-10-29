import { Section } from '@/components/atoms/Section';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { CareerItem } from '@/components/molecules/CareerItem';
import { getAllCareerItems } from '@/data/queries/getCareer';

export async function PreviouslyAtSection() {
  const careerItems = await getAllCareerItems();

  return (
    <Section className="border-b border-border-primary/40 bg-bg-primary/50">
      <SectionHeader label="CAREER_TIMELINE" title="Previous Experience & Roles" />

      <div className="space-y-3">
        {careerItems.map((item) => (
          <CareerItem key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
