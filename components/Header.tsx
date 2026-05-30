"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/LanguageProvider";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const router = useRouter();

  const navItems = [
    { href: "/", label: t.nav.discover },
    { href: "/explore", label: t.nav.explore },
    { href: "/regions", label: t.nav.regions },
    { href: "/glossary", label: t.nav.glossary },
  ];

  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-emerald-950"
        >
          FloraDex
        </Link>
        <div className="flex items-center gap-4">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm font-medium text-emerald-900/80 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-emerald-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => router.push("/search")}
            aria-label={t.nav.search}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/15 bg-white/70 text-emerald-900/80 backdrop-blur-md transition hover:border-emerald-900/30 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            <span aria-hidden="true">🔍</span>
          </button>
          <div
            className="flex items-center gap-1 rounded-full border border-emerald-900/15 bg-white/70 p-1 backdrop-blur-md"
            role="group"
            aria-label={t.language.label}
          >
            {locales.map((code: Locale) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900",
                  locale === code
                    ? "bg-emerald-900 text-white"
                    : "text-emerald-900/70 hover:text-emerald-900",
                )}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
