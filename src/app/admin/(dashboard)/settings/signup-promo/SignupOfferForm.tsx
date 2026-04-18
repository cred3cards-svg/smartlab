"use client";

import { useState } from "react";
import { updateSignupOffer } from "./actions";
import Button from "@/components/ui/Button";
import { Loader2, CheckCircle2, IndianRupee } from "lucide-react";

export default function SignupOfferForm({ initialAmount }: { initialAmount: number }) {
  const [amount, setAmount] = useState(initialAmount);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateSignupOffer(amount);
      setMessage({ type: 'success', text: "Signup offer updated successfully!" });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Failed to update offer" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="text-sm font-bold text-text-primary px-1">Welcome Bonus Amount (₹)</label>
        <div className="relative">
          <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-surface-soft border-2 border-transparent focus:bg-white focus:border-brand-blue/30 rounded-2xl py-4 pl-12 pr-4 text-xl font-heading font-black transition-all outline-none"
            placeholder="500"
            min="0"
            required
          />
        </div>
        <p className="text-xs text-text-muted px-1">
          This amount will be automatically credited to the patient's wallet upon verified signup.
        </p>
      </div>

      <div className="p-6 bg-brand-blue-pale/30 rounded-2xl border border-brand-blue/10 flex items-start gap-4">
         <CheckCircle2 size={20} className="text-brand-blue shrink-0" />
         <p className="text-xs text-brand-blue font-medium leading-relaxed">
            When you save this, the homepage "Signup Bonus" section will automatically show <span className="font-bold">₹{amount}</span>. Ensure this aligns with your current marketing campaign.
         </p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border text-sm font-bold animate-in fade-in slide-in-from-top-1 ${
          message.type === 'success' ? 'bg-green-50 border-green-100 text-status-success' : 'bg-red-50 border-red-100 text-status-danger'
        }`}>
          {message.text}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="px-12 py-4 rounded-2xl bg-brand-blue text-white hover:bg-brand-blue-dark font-black tracking-wide text-lg shadow-lg shadow-brand-blue/20 transition-all active:scale-95"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
      </Button>
    </form>
  );
}
