"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/components/LanguageProvider";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/explore", key: "explore" as const },
  { href: "/regions", key: "regions" as const },
  { href: "/paths", key: "paths" as const },
  { href: "/glossary", key: "glossary" as const },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  pathname,
  onNavigate,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full px-3 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900",
        active
          ? "bg-emerald-900/8 font-semibold text-emerald-950"
          : "text-emerald-900/75 hover:text-emerald-900",
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLabels = {
    explore: t.nav.explore,
    regions: t.nav.regions,
    paths: t.nav.paths,
    glossary: t.nav.glossary,
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/5 bg-[#f7fbf7]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          aria-label={`FloraDex — ${t.nav.home}`}
          className="group flex items-center gap-2 text-xl font-semibold tracking-tight text-emerald-950"
        >
          <span aria-hidden="true" className="text-lg transition group-hover:scale-110">
            🌿
          </span>
          FloraDex
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 text-sm font-medium md:flex"
          >
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={navLabels[item.key]}
                pathname={pathname}
              />
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
            className="hidden items-center gap-1 rounded-full border border-emerald-900/15 bg-white/70 p-1 backdrop-blur-md sm:flex"
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

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/15 bg-white/70 text-emerald-900 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-emerald-900/5 bg-white/90 px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <NavLink
              href="/"
              label={t.nav.home}
              pathname={pathname}
              onNavigate={closeMenu}
            />
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={navLabels[item.key]}
                pathname={pathname}
                onNavigate={closeMenu}
              />
            ))}
            <NavLink
              href="/search"
              label={t.nav.search}
              pathname={pathname}
              onNavigate={closeMenu}
            />
            <NavLink
              href="/guide"
              label={t.nav.guide}
              pathname={pathname}
              onNavigate={closeMenu}
            />
          </div>
          <div
            className="mt-4 flex items-center gap-1 rounded-full border border-emerald-900/15 bg-white/70 p-1 sm:hidden"
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
                  "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition",
                  locale === code
                    ? "bg-emerald-900 text-white"
                    : "text-emerald-900/70",
                )}
              >
                {code}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
