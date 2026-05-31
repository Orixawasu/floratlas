export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/60 px-6 py-4 text-sm font-medium text-emerald-900/70 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-700" />
      <span>{label}…</span>
    </div>
  );
}
