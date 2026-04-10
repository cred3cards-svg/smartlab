import type { Metadata } from "next";
import "./globals.css";
import PromoStrip from "@/components/layout/PromoStrip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-surface text-text-primary antialiased">
        <PromoStrip />
        <Header />
        <main id="main-content" className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
