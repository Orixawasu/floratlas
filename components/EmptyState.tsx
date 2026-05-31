type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-white/60 bg-white/70 px-6 py-10 text-center text-emerald-900/70 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <p className="text-lg font-semibold text-emerald-950">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
}
