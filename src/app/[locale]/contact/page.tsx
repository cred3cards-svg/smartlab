import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact SMARTLAB247 — Support, Booking Help & Enquiries",
  description:
    "Contact SMARTLAB247 support via WhatsApp, phone, or email. We're available 7 days a week to help with bookings, reports, and any queries.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-brand-blue to-[#0F5280] text-white py-14">
        <div className="container-site max-w-3xl text-center">
          <h1 className="font-heading font-bold text-2xl md:text-3xl mb-3">Contact & Support</h1>
          <p className="text-white/70">We&apos;re here for you — 7 days a week, from 6 AM to 8 PM.</p>
        </div>
      </div>

      <div className="container-site py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact methods */}
          <div className="space-y-5">
            <h2 className="font-heading font-semibold text-xl text-text-primary mb-6">Reach Us</h2>

            {[
              {
                icon: MessageCircle, color: "text-[#25D366]", bg: "bg-green-50",
                title: "WhatsApp (Fastest)", sub: "Typical reply in < 5 minutes",
                action: "Chat Now",
                href: "https://wa.me/918002662247",
                detail: "+91-8002-66-2247",
              },
              {
                icon: Phone, color: "text-brand-blue", bg: "bg-blue-50",
                title: "Toll-Free Helpline", sub: "Mon–Sun, 6 AM – 8 PM",
                action: "Call Now",
                href: "tel:18002662247",
                detail: "1800-266-2247",
              },
              {
                icon: Mail, color: "text-brand-teal", bg: "bg-brand-teal-pale",
                title: "Email Support", sub: "Response within 4 hours",
                action: "Send Email",
                href: "mailto:support@smartlab247.com",
                detail: "support@smartlab247.com",
              },
              {
                icon: MapPin, color: "text-orange-500", bg: "bg-orange-50",
                title: "Head Office", sub: "For corporate / partner enquiries",
                action: "Get Directions",
                href: "#",
                detail: "SMARTLAB247 Health Pvt. Ltd., Salt Lake, Kolkata — 700091",
              },
            ].map(({ icon: Icon, color, bg, title, sub, action, href, detail }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 bg-white rounded-2xl border border-surface-border p-5 shadow-card hover:border-brand-teal hover:shadow-card-hover transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary">{title}</p>
                  <p className="text-sm text-text-muted">{sub}</p>
                  <p className="text-sm text-brand-blue font-medium mt-1 truncate">{detail}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-brand-teal group-hover:gap-2 transition-all flex-shrink-0">
                  {action} <ChevronRight size={15} />
                </div>
              </a>
            ))}

            <div className="bg-surface-soft rounded-2xl border border-surface-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-brand-teal" />
                <p className="font-semibold text-text-primary text-sm">Support Hours</p>
              </div>
              <div className="space-y-1.5 text-sm text-text-secondary">
                <div className="flex justify-between"><span>Chat & Phone</span><span className="font-medium">6 AM – 8 PM, 7 days</span></div>
                <div className="flex justify-between"><span>Collection Slots</span><span className="font-medium">6 AM – 6 PM, 7 days</span></div>
                <div className="flex justify-between"><span>Email</span><span className="font-medium">Mon–Sat, 4-hr response</span></div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-heading font-semibold text-xl text-text-primary mb-6">Send a Message</h2>
            <form className="bg-white rounded-2xl border border-surface-border shadow-card p-6 space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Rahul Mehta"
                    className="w-full h-11 px-4 rounded-xl border border-surface-border text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Phone Number *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full h-11 px-4 rounded-xl border border-surface-border text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="rahul@example.com"
                  className="w-full h-11 px-4 rounded-xl border border-surface-border text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Topic *</label>
                <select
                  id="contact-topic"
                  className="w-full h-11 px-4 rounded-xl border border-surface-border text-sm bg-white focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all"
                >
                  <option value="">Select a topic</option>
                  <option>Booking Help</option>
                  <option>Report Query</option>
                  <option>Payment / Refund</option>
                  <option>SkillMedic™ Feedback</option>
                  <option>SMARTPASS247 Membership</option>
                  <option>Corporate / B2B Enquiry</option>
                  <option>Doctor / Clinic Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Describe your query in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-border text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 outline-none transition-all resize-none"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth size="lg">
                Send Message
              </Button>
              <p className="text-xs text-text-muted text-center">
                We typically respond within 4 hours on business days.
              </p>
            </form>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-12 bg-surface-soft rounded-2xl p-6">
          <p className="font-semibold text-text-primary mb-4">Quick Help Links</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Track My Order", href: "/order" },
              { label: "View My Reports", href: "/app" },
              { label: "Cancel / Reschedule Booking", href: "/faqs#booking" },
              { label: "Refund Policy", href: "/refund" },
              { label: "Full FAQs", href: "/faqs" },
            ].map(({ label, href }) => (
              <Link key={href} href={href}
                className="text-sm font-medium text-brand-teal hover:text-brand-teal-dark border border-brand-teal/30 bg-brand-teal-pale rounded-full px-4 py-1.5 transition-colors hover:bg-brand-teal hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
