"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/components/LanguageProvider";

export default function GlossaryPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-20 pt-10">
        <SectionHeader
          emoji="📖"
          eyebrow={t.glossary.eyebrow}
          title={t.glossary.title}
          subtitle={t.glossary.subtitle}
        />

        <dl className="grid gap-4 sm:grid-cols-2">
          {t.glossary.terms.map((entry) => (
            <div
              key={entry.term}
              className="flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-md"
            >
              <div>
                <dt className="text-lg font-semibold text-emerald-950">
                  {entry.term}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-emerald-900/65">
                  {entry.definition}
                </dd>
              </div>

              {entry.examples && entry.examples.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/40">
                    {t.glossary.examplesLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.examples.map((example) => (
                      <Link
                        key={example}
                        href={`/search?q=${encodeURIComponent(example)}`}
                        className="rounded-full border border-emerald-900/10 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-900/80 transition hover:border-emerald-900/30 hover:text-emerald-900"
                      >
                        {example}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {entry.concepts && entry.concepts.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/40">
                    {t.glossary.conceptsLabel}
                  </p>
                  <p className="text-sm text-emerald-900/60">
                    {entry.concepts.join(" · ")}
                  </p>
                </div>
              )}

              {entry.collectionSlug && (
                <Link
                  href={`/collections/${entry.collectionSlug}`}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-100"
                >
                  📚 {t.glossary.collectionLabel}
                </Link>
              )}
            </div>
          ))}
        </dl>

        <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/80 via-white/70 to-cyan-50/70 p-8 text-center">
          <p className="text-lg font-semibold text-emerald-950">
            {t.explore.title}
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-emerald-900/60">
            {t.explore.subtitle}
          </p>
          <Link
            href="/explore"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            {t.nav.explore} →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
