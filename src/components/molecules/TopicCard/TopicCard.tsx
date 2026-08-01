import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Topic } from '@/data/types/topic.types';

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={topic.slug}
      className="group block border-black bg-black p-6 text-white transition-[border-color,transform] duration-150 ease-out-premium active:scale-98"
      style={{ borderWidth: '3px', boxShadow: '4px 4px 0 #000000' }}
    >
      <h3 className="font-display font-semibold text-white transition-colors group-hover:text-accent">
        {topic.title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary">{topic.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs text-text-muted transition-colors group-hover:text-accent">
        Browse articles
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </span>
    </Link>
  );
}
