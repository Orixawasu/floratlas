"use client";

import Link from "next/link";
import { useI18n } from "@/components/LanguageProvider";

type FooterLink = { href: string; label: string };

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/45">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-emerald-900/70 transition hover:text-emerald-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t } = useI18n();

  const exploreLinks: FooterLink[] = [
    { href: "/explore", label: t.nav.explore },
    { href: "/collections", label: t.footer.allCollections },
  ];

  const placesLinks: FooterLink[] = [
    { href: "/regions", label: t.nav.regions },
    { href: "/regions/france", label: t.footer.france },
    { href: "/paths", label: t.nav.paths },
  ];

  const learnLinks: FooterLink[] = [
    { href: "/glossary", label: t.nav.glossary },
    { href: "/guide", label: t.nav.guide },
    { href: "/search", label: t.nav.search },
  ];

  return (
    <footer className="border-t border-emerald-900/10 bg-white/50 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-emerald-950"
            >
              <span aria-hidden="true">🌿</span>
              FlorAtlas
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-emerald-900/55">
              {t.home.subtitle}
            </p>
          </div>

          <FooterColumn title={t.footer.exploreGroup} links={exploreLinks} />
          <FooterColumn title={t.footer.placesGroup} links={placesLinks} />
          <FooterColumn title={t.footer.learnGroup} links={learnLinks} />
        </div>

        <div className="mt-10 border-t border-emerald-900/8 pt-6 text-xs text-emerald-900/40">
          <p>© {new Date().getFullYear()} FlorAtlas</p>
        </div>
      </div>
    </footer>
  );
}
