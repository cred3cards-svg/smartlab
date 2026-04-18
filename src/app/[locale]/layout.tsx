import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "../globals.css";
import PromoStrip from "@/components/layout/PromoStrip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: {
    default: "SMARTLAB247 — India's First AI-Assisted Pathology Lab | Home Sample Collection",
    template: "%s | SMARTLAB247",
  },
  description:
    "Book lab tests and health checkups online in Kolkata with home sample collection. Reports in 6 hours. NABL-certified AI-assisted pathology. Up to 75% off. Kolkata launch: Salt Lake, New Town, and more.",
  keywords: [
    "lab tests at home",
    "blood test home collection",
    "health checkup",
    "pathology lab",
    "AI diagnostics",
    "NABL lab",
  ],
  authors: [{ name: "SMARTLAB247 Health Pvt. Ltd." }],
  metadataBase: new URL("https://smartlab247.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SMARTLAB247",
    title: "SMARTLAB247 — AI-Assisted Pathology | Home Sample Collection",
    description: "India's first AI-assisted pathology lab. Home sample collection, fastest reports, up to 75% off.",
    url: "https://smartlab247.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@smartlab247",
    creator: "@smartlab247",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider>
        <PromoStrip />
        <Header />
        <main id="main-content" className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <FloatingWhatsApp />
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
