import type { Metadata } from "next";
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  Phone, 
  Mail,
  Zap,
  Clock,
  Home,
  ShieldCheck,
  CreditCard,
  UserCheck
} from "lucide-react";
import { FAQS } from "@/data";
import { BRAND, CONTACT } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: `FAQs — Everything You Need to Know | ${BRAND.name}`,
  description: "Find answers to commonly asked questions about lab tests, health checkup packages, home sample collection, reports, and payments at SMARTLAB247.",
};

const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "booking", label: "Booking", icon: Zap },
  { id: "preparation", label: "Preparation", icon: Clock },
  { id: "collection", label: "Home Collection", icon: Home },
  { id: "reports", label: "Reports", icon: ShieldCheck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "membership", label: "Membership", icon: UserCheck },
];

export default function FAQPage() {
  return (
    <div className="bg-surface-soft min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-brand-blue text-white pt-20 pb-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="container-site relative z-10 text-center">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 italic leading-tight">
            How Can We <span className="text-brand-teal uppercase tracking-tighter">Help?</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 italic">
            Search our comprehensive guide to tests, home collection, and AI-assisted reports.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-teal transition-colors" />
            <input 
              type="text" 
              placeholder="Search e.g. 'fasting', 'report time', 'Kolkata'..."
              className="w-full h-16 pl-14 pr-6 rounded-[2rem] bg-white text-text-primary text-lg shadow-2xl focus:ring-4 focus:ring-brand-teal/20 outline-none transition-all placeholder:italic"
            />
          </div>
        </div>
      </section>

      <div className="container-site mt-[-40px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Categories */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-surface-border p-3 shadow-sm sticky top-28">
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] px-4 py-2 mb-2 italic">Categories</p>
               <nav className="space-y-1">
                  {FAQ_CATEGORIES.map((cat) => (
                     <button 
                        key={cat.id}
                        className={`w-full flex items-center gap-3 px-4 py-3.2 rounded-2xl text-sm font-bold transition-all italic ${
                          cat.id === 'all' 
                            ? 'bg-brand-teal text-white shadow-teal' 
                            : 'text-text-secondary hover:bg-surface-soft hover:text-brand-teal'
                        }`}
                     >
                        <cat.icon size={18} />
                        {cat.label}
                     </button>
                  ))}
               </nav>
            </div>

            <div className="bg-brand-blue rounded-3xl p-6 text-white shadow-sm overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
               <h3 className="font-bold text-lg mb-4 italic">Still Stuck?</h3>
               <p className="text-white/60 text-xs leading-relaxed mb-6 italic">Our support team is available from 6 AM to 8 PM daily.</p>
               <div className="space-y-3">
                  <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-sm font-bold italic">
                     <Phone size={16} className="text-brand-teal" /> {CONTACT.phone_display}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-sm font-bold italic">
                     <Mail size={16} className="text-brand-teal" /> Contact Us
                  </a>
               </div>
            </div>
          </aside>

          {/* FAQ List */}
          <main className="lg:col-span-9 space-y-8">
            <div className="space-y-4">
               {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-surface-border overflow-hidden hover:shadow-md transition-shadow group">
                     <button className="w-full px-8 py-6 text-left flex items-center justify-between outline-none">
                        <span className="font-heading font-bold text-lg text-text-primary group-hover:text-brand-blue transition-colors italic pr-8">
                           {faq.question}
                        </span>
                        <ChevronDown size={20} className="text-text-muted flex-shrink-0 transition-transform group-hover:text-brand-teal" />
                     </button>
                     <div className="px-8 pb-8">
                        <div className="prose prose-sm text-text-secondary leading-relaxed max-w-none italic pt-2 border-t border-surface-border/50">
                           {faq.answer}
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                           <span className="text-[10px] bg-surface-soft text-text-muted px-2 py-0.5 rounded uppercase font-bold tracking-widest italic">{faq.category}</span>
                           <button className="text-[10px] text-brand-teal font-bold uppercase tracking-widest flex items-center gap-1.5 hover:underline italic">
                              <MessageSquare size={12} /> Was this helpful?
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Bottom Help Block */}
            <div className="bg-brand-teal/5 border border-brand-teal/10 rounded-[2.5rem] p-8 md:p-12 text-center">
               <h2 className="font-heading font-bold text-2xl text-text-primary mb-4 italic">Couldn&apos;t find what you were looking for?</h2>
               <p className="text-text-secondary italic mb-8 max-w-md mx-auto">Skip the reading and talk to a healthcare concierge representative immediately.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-10 h-14 italic tracking-tight shadow-teal" leftIcon={<Phone size={18} />}>
                     Call Support Now
                  </Button>
                  <Button size="lg" variant="outline" className="px-10 h-14 italic tracking-tight" leftIcon={<Mail size={18} />}>
                     Submit a Ticket
                  </Button>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
