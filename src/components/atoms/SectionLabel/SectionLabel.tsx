interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <p className={`font-mono text-xs uppercase tracking-wider text-accent ${className}`}>
      // {label}
    </p>
  );
}
