import type { CareerItem as CareerItemType } from '@/data/career';

interface CareerItemProps {
  item: CareerItemType;
}

export function CareerItem({ item }: CareerItemProps) {
  return (
    <div className="flex flex-col justify-between gap-2 border-b border-border-primary py-6 sm:flex-row sm:items-center">
      <h3 className="text-xl font-semibold text-white">{item.company}</h3>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm uppercase tracking-wider text-accent-orange">
          {item.role}
        </span>
        <span className="font-mono text-sm text-text-muted">{item.period}</span>
      </div>
    </div>
  );
}
