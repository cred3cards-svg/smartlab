import { prisma } from "@/lib/db";
import { ReferralSettingsForm } from "./ReferralSettingsForm";
import { ShieldCheck, Info } from "lucide-react";

export default async function ReferralSettingsPage() {
  const settings = await prisma.siteSetting.findUnique({
    where: { key: "referral_tiers" }
  });

  const tiers = settings ? JSON.parse(settings.value) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Referral Scheme configuration</h1>
        <p className="text-text-secondary">Define milestones and rewards for your brand ambassadors.</p>
      </div>

      <div className="bg-brand-teal-pale border border-brand-teal/20 p-4 rounded-2xl flex gap-3 text-brand-teal text-sm">
        <Info className="h-5 w-5 shrink-0" />
        <p>
          Changes here will affect how new rewards are calculated. Past rewards are already recorded in the ledger and will not be retroactively changed.
        </p>
      </div>

      <div className="max-w-3xl">
        <ReferralSettingsForm initialTiers={tiers} />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-surface-border">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand-teal" />
          Safety Controls
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-surface-border rounded-xl">
            <div>
              <p className="text-sm font-semibold text-text-primary">Self-Referral Prevention</p>
              <p className="text-xs text-text-muted">Enforces unique phone and IP validation</p>
            </div>
            <div className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase">Enabled</div>
          </div>
          <div className="flex items-center justify-between p-3 border border-surface-border rounded-xl">
            <div>
              <p className="text-sm font-semibold text-text-primary">Admin Payout Approval</p>
              <p className="text-xs text-text-muted">Cash rewards require manual sign-off</p>
            </div>
            <div className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase">Enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
}
