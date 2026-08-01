import type { CareerItem as CareerItemType } from '@/data/types/career.types';

interface CareerItemProps {
  item: CareerItemType;
}

export function CareerItem({ item }: CareerItemProps) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-lg border border-border-primary/60 bg-bg-secondary/40 p-5 transition-[border-color,background-color] duration-150 ease-out-premium hover:border-accent/30 hover:bg-bg-secondary/70 sm:flex-row sm:items-center">
      <div>
        <h3 className="text-base font-bold text-white">{item.company}</h3>
        <p className="font-mono text-xs text-accent mt-0.5">{item.role}</p>
      </div>
      <span className="font-mono text-xs text-text-muted bg-bg-primary px-3 py-1 rounded-md border border-border-primary/60 w-fit">
        {item.period}
      </span>
    </div>
  );
}
