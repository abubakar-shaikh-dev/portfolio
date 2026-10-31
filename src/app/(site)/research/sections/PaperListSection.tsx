import { Section } from '@/components/atoms/Section';
import { Reveal } from '@/components/atoms/Reveal';
import { PaperCard } from '@/components/molecules/PaperCard';
import { getAllPapers } from '@/data/queries/getPapers';

export async function PaperListSection() {
  const papers = await getAllPapers();

  if (papers.length === 0) {
    return (
      <Section>
        <Reveal>
          <div className="rounded-xl border border-dashed border-border-primary/80 bg-bg-secondary/40 px-6 py-16 text-center">
            <p className="font-mono text-xs text-text-muted">
              // No publications yet
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              The first papers from my doctoral research are in the pipeline — they will appear here as they are submitted and published.
            </p>
          </div>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section>
      <div className="grid gap-5">
        {papers.map((paper, index) => (
          <Reveal key={paper.id} delay={(index % 2) * 70}>
            <PaperCard paper={paper} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
