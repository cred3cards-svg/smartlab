import { getSignupOffer } from "./actions";
import SignupOfferForm from "./SignupOfferForm";
import { ShieldAlert, Zap, History } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function SignupPromoSettingsPage() {
  const currentAmount = await getSignupOffer();
  
  const recentLogs = await prisma.auditLog.findMany({
    where: { action: "UPDATE_SIGNUP_OFFER" },
    orderBy: { timestamp: "desc" },
    take: 5
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-3xl font-heading font-black text-text-primary mb-2">Signup Strategy</h1>
        <p className="text-text-secondary text-sm">Configure incentives for new patient registrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-8">
           <div className="bg-white rounded-[2.5rem] border border-surface-border p-10 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <Zap size={120} />
             </div>
             
             <div className="relative z-10 max-w-xl">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-brand-blue-pale text-brand-blue rounded-2xl flex items-center justify-center">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">Welcome Reward</h2>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Global Promotion Setting</p>
                  </div>
               </div>

               <SignupOfferForm initialAmount={currentAmount} />
             </div>
           </div>
        </div>

        {/* Sidebar: Logs & Help */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-surface-soft/50 rounded-[2.5rem] border border-dashed border-surface-border p-8">
              <div className="flex items-center gap-3 mb-6">
                 <History size={20} className="text-text-muted" />
                 <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Recent Changes</h3>
              </div>
              
              <div className="space-y-6">
                {recentLogs.length > 0 ? recentLogs.map((log) => (
                  <div key={log.id} className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-white border border-surface-border flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold">{(log.metadata as any)?.newAmount}</span>
                     </div>
                     <div>
                        <p className="text-xs font-bold text-text-primary">₹{(log.metadata as any)?.newAmount} set as reward</p>
                        <p className="text-[10px] text-text-muted">{new Date(log.timestamp).toLocaleDateString()} • {log.userEmail}</p>
                     </div>
                  </div>
                )) : (
                  <p className="text-xs text-text-muted italic">No recent changes logged.</p>
                )}
              </div>
           </div>

           <div className="bg-red-50 rounded-[2.5rem] p-8 border border-red-100">
              <div className="flex items-center gap-2 text-status-danger mb-3">
                 <ShieldAlert size={20} />
                 <h4 className="text-sm font-bold">Security Warning</h4>
              </div>
              <p className="text-xs text-red-700 leading-relaxed font-medium">
                 This setting affects the direct fiscal liability of the company. Changes here reflect instantly on the homepage and mobile app.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
