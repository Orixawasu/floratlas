import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff] px-6 text-center">
      <span aria-hidden="true" className="text-5xl">
        🌿
      </span>
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-semibold text-emerald-950">
          Page not found · Page introuvable
        </h1>
        <p className="max-w-md text-emerald-900/60">
          This plant or page could not be found. Cette plante ou cette page
          est introuvable.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        Back home · Retour à l&apos;accueil
      </Link>
    </div>
  );
}
