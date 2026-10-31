interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <p className={`font-mono text-xs text-text-muted ${className}`}>
      // {label}
    </p>
  );
}
