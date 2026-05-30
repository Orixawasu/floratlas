"use client";

import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useI18n();

  const links = [
    { href: "/", label: t.nav.discover },
    { href: "/explore", label: t.nav.explore },
    { href: "/regions", label: t.nav.regions },
    { href: "/glossary", label: t.nav.glossary },
    { href: "/collections", label: t.nav.collections },
    { href: "/paths", label: t.nav.paths },
    { href: "/guide", label: t.nav.guide },
    { href: "/search", label: t.nav.search },
  ];

  return (
    <footer className="border-t border-emerald-900/10 bg-white/50 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-lg font-semibold tracking-tight text-emerald-950">
            FloraDex 🌿
          </p>
          <p className="max-w-sm text-sm text-emerald-900/55">
            {t.home.subtitle}
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-emerald-900/70"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-emerald-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
