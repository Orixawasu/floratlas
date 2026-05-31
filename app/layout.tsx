import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import {
  bilingualDescription,
  defaultTitle,
  siteDescription,
  siteKeywords,
  siteName,
  siteTagline,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s · ${siteName}`,
  },
  description: bilingualDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      fr: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName,
    title: defaultTitle,
    description: `${siteDescription.en} ${siteTagline.en}.`,
    url: siteUrl,
    locale: "en_US",
    alternateLocale: ["fr_FR"],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription.en,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      >
        <body className="min-h-full bg-white font-sans text-emerald-950">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <LanguageProvider>{children}</LanguageProvider>
        </body>
    </html>
  );
}
