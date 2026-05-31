type SectionHeaderProps = {
  emoji: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({
  emoji,
  eyebrow,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70 backdrop-blur-md">
        <span aria-hidden="true" className="text-sm">
          {emoji}
        </span>
        {eyebrow}
      </span>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-emerald-950 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-base text-emerald-900/60">{subtitle}</p>
      )}
    </div>
  );
}
