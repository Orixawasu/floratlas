"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/components/LanguageProvider";

export default function GuidePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbf7] via-white to-[#eef6ff]">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 pb-20 pt-10">
        <SectionHeader
          emoji="🧭"
          eyebrow={t.guide.eyebrow}
          title={t.guide.title}
          subtitle={t.guide.subtitle}
        />

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-emerald-950">
            {t.guide.navTitle}
          </h2>
          <ol className="space-y-4">
            {t.guide.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white text-xl shadow-sm">
                  {step.emoji}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-950">
                    <span className="text-sm text-emerald-900/40">
                      {index + 1}.
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-900/65">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-emerald-950">
            {t.guide.lexiconTitle}
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {t.guide.lexicon.map((entry) => (
              <div
                key={entry.term}
                className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur-md"
              >
                <dt className="text-lg font-semibold text-emerald-950">
                  {entry.term}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-emerald-900/65">
                  {entry.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/80 via-white/70 to-cyan-50/70 p-8 text-center">
          <p className="text-lg font-semibold text-emerald-950">
            {t.guide.ctaTitle}
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-emerald-900/60">
            {t.guide.ctaText}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            {t.guide.ctaButton} →
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
