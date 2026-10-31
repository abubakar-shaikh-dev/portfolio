import { Section } from '@/components/atoms/Section';
import { Reveal } from '@/components/atoms/Reveal';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { CareerItem } from '@/components/molecules/CareerItem';
import { getAllCareerItems } from '@/data/queries/getCareer';

export async function PreviouslyAtSection() {
  const careerItems = await getAllCareerItems();

  return (
    <Section className="border-b border-border-primary/40 bg-bg-primary/50">
      <Reveal>
        <SectionHeader label="Career timeline" title="Previous Experience & Roles" />
      </Reveal>

      <div className="space-y-3">
        {careerItems.map((item, index) => (
          <Reveal key={item.id} delay={index * 90}>
            <CareerItem item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
