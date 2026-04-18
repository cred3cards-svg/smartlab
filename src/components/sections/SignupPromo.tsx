"use client";

import Link from "next/link";
import { ArrowRight, Ticket, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SignupPromoProps {
  rewardAmount?: number;
}

export default function SignupPromo({ rewardAmount = 500 }: SignupPromoProps) {
  return (
    <section className="py-12 bg-surface-soft relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-site relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-surface-border shadow-xl shadow-surface-border/20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue-pale text-brand-blue text-[10px] font-bold uppercase tracking-widest border border-brand-blue/10">
              <Zap size={14} fill="currentColor" /> Welcome Offer
            </div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-black text-text-primary leading-tight">
              Join the <span className="text-brand-blue">SMARTLAB247</span> Family & get <span className="text-status-success">₹500</span> Cashback
            </h2>
            
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl italic italic-accent">
              Unlock a personalized health dashboard, track your history, and get ₹500 credits instantly upon your first booking.
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
               <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-green-50 text-status-success flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-sm font-bold text-text-primary">Instant Account Setup</span>
               </div>
               <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center">
                    <Ticket size={16} />
                  </div>
                  <span className="text-sm font-bold text-text-primary">Flat Discounts</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
               <Link href="/signup" className="w-full sm:w-auto">
                 <Button className="w-full sm:w-auto px-10 py-4 font-bold rounded-2xl bg-brand-blue text-white hover:bg-brand-blue-dark shadow-lg shadow-brand-blue/20 transition-all active:scale-95 text-lg">
                    Claim Reward <ArrowRight size={20} className="ml-2" />
                 </Button>
               </Link>
               <p className="text-xs text-text-muted font-medium">No credit card required to sign up.</p>
            </div>
          </div>

          <div className="lg:w-1/3 w-full">
            <div className="bg-surface-soft rounded-3xl p-8 border border-surface-border relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="relative z-10 space-y-6">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Rewards Preview</p>
                  
                  {/* Mock UI card */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-surface-border translate-x-2 -rotate-2 group-hover:translate-x-0 group-hover:rotate-0 transition-transform duration-500">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                          <Ticket size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-status-success bg-green-50 px-2 py-0.5 rounded-full uppercase">Active</span>
                     </div>
                     <p className="text-sm font-bold text-text-primary">Welcome Gift Voucher</p>
                     <p className="text-2xl font-black text-brand-blue">₹500.00</p>
                     <div className="mt-4 pt-4 border-t border-surface-border text-[9px] text-text-muted font-bold uppercase tracking-widest">
                        VALID FOR 30 DAYS
                     </div>
                  </div>

                  <p className="text-[11px] text-text-muted text-center italic">
                    Already have an account? <Link href="/login" className="text-brand-blue font-bold hover:underline">Log In</Link>
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
