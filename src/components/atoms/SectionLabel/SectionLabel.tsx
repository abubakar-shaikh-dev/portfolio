interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p className="font-mono text-xs uppercase tracking-wider text-accent-orange">
      // {label}
    </p>
  );
}
