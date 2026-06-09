import { skillsRow1, skillsRow2 } from '@/data/skills';

export function TechMarquee() {
  const renderItems = (items: string[]) => (
    <>
      {items.map((skill, index) => (
        <span key={`${skill}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
          <span className="font-mono text-sm uppercase tracking-wider text-white">
            {skill}
          </span>
          <span className="text-accent-orange">///</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="overflow-hidden border-y border-border-primary bg-[#0a0a0a] py-4">
      <div className="marquee-container space-y-3">
        {/* Row 1 - Left */}
        <div className="flex animate-marquee gap-6">
          {renderItems(skillsRow1)}
          {renderItems(skillsRow1)}
        </div>
        {/* Row 2 - Right */}
        <div className="flex animate-marquee-reverse gap-6">
          {renderItems(skillsRow2)}
          {renderItems(skillsRow2)}
        </div>
      </div>
    </section>
  );
}
