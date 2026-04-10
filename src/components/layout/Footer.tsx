import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Phone, Mail, MapPin, Globe, ExternalLink, Share2, Play } from "lucide-react";
import { CONTACT, ADDRESS, BRAND } from "@/lib/constants";

const FOOTER_LINKS = {
  "Tests & Checkups": [
    { label: "All Lab Tests", href: "/tests" },
    { label: "Health Checkups", href: "/checkups" },
    { label: "Full Body Checkup", href: "/checkups?category=full-body" },
    { label: "Women's Health", href: "/checkups?category=womens-health" },
    { label: "Thyroid Tests", href: "/tests?category=thyroid" },
    { label: "Diabetes Tests", href: "/tests?category=diabetes" },
    { label: "Vitamin Tests", href: "/tests?category=vitamins" },
    { label: "Heart Health", href: "/tests?category=heart-health" },
  ],
  "SMARTLAB247": [
    { label: "About Us", href: "/about" },
    { label: "AI Diagnostics", href: "/ai-diagnostics" },
    { label: "Why SMARTLAB247", href: "/why-smartlab247" },
    { label: "SMARTPASS247", href: "/smartpass247" },
    { label: "Corporate Health", href: "/corporate" },
    { label: "For Doctors", href: "/doctors" },
    { label: "Franchise", href: "/franchise" },
    { label: "Careers", href: "/careers" },
  ],
  "Customer Support": [
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
    { label: "Store Locator", href: "/centres" },
    { label: "App & Reports", href: "/app" },
    { label: "Track Order", href: "/order" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Blog", href: "/blog" },
  ],
  "Cities": [
    { label: "Kolkata", href: "/city/kolkata" },
    { label: "Goa (Soon)", href: "#" },
    { label: "Belagavi (Soon)", href: "#" },
    { label: "North East (Soon)", href: "#" },
  ],
};

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Sample Collection Policy", href: "/sample-collection-policy" },
  { label: "Report Disclaimer", href: "/report-disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white" role="contentinfo">
      {/* Main footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo variant="mono-light" size="lg" className="mb-5" />
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s first AI-assisted pathology lab. Home sample collection, 
              fastest reports, and up to 75% lower pricing — trusted by 2 lakh+ patients across India.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["NABL Accredited", "ISO 15189", "Doctor Verified", "QA Certified"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-medium bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white/80"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all text-white/70">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Toll-Free Helpline</p>
                  <p className="text-sm text-white/80 font-semibold">{CONTACT.phone_display}</p>
                </div>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-all text-white/70">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Email Support</p>
                  <p className="text-sm text-white/80 font-semibold">{CONTACT.email}</p>
                </div>
              </a>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Kolkata Office</p>
                  <p className="text-sm text-white/80 font-semibold">{ADDRESS.head_office}</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Globe, href: "#", label: "Instagram" },
                { Icon: Share2, href: "#", label: "Twitter / X" },
                { Icon: ExternalLink, href: "#", label: "LinkedIn" },
                { Icon: Play, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-teal transition-colors flex items-center justify-center text-white/70 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">{section}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App downloads */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3">Download the SMARTLAB247 App</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 transition-colors"
                  aria-label="Download on App Store"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div>
                    <p className="text-[10px] text-white/60 leading-none">Download on the</p>
                    <p className="text-sm font-semibold text-white leading-snug">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 transition-colors"
                  aria-label="Get on Google Play"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M3,20.5v-17c0-0.83,0.94-1.3,1.6-0.8l14,8.5c0.6,0.37,0.6,1.23,0,1.6l-14,8.5C3.94,21.8,3,21.33,3,20.5z"/></svg>
                  <div>
                    <p className="text-[10px] text-white/60 leading-none">Get it on</p>
                    <p className="text-sm font-semibold text-white leading-snug">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-white/60">
                Available 6 AM – 6 PM · 7 days a week · Serving Kolkata
              </p>
              <p className="text-xs text-white/40 mt-1">
                Sample collection in 60 min · Reports in 6–36 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-site py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} {BRAND.full_name}. All rights reserved. CIN: U74999KA2024PTC000001
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-white/70 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/30 mt-3 text-center md:text-left leading-relaxed">
            <strong className="text-white/40">Disclaimer:</strong> SMARTLAB247 is a diagnostic support service. All pathology reports are reviewed and authorised by qualified pathologists. AI assistance is used for operational efficiency and pattern highlighting only — it does not replace medical diagnosis. Please consult a qualified healthcare professional for interpretation and treatment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
