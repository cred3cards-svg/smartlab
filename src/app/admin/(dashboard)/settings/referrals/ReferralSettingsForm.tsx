"use client";

import { useState } from "react";
import { updateReferralTiers } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Save, Plus, Trash2, AlertCircle } from "lucide-react";

export function ReferralSettingsForm({ initialTiers }: { initialTiers: any[] }) {
  const [tiers, setTiers] = useState(initialTiers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await updateReferralTiers(tiers);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update tiers");
    } finally {
      setLoading(false);
    }
  };

  const addTier = () => {
    setTiers([...tiers, { threshold: 0, rewardType: "WALLET", amount: 0, notes: "" }]);
  };

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const updateTier = (index: number, field: string, value: any) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          {tiers.map((tier, index) => (
            <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-3 p-4 bg-surface-soft rounded-2xl border border-transparent hover:border-surface-border transition-all">
              <div className="w-full md:w-24">
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block tracking-wider">Refs Needed</label>
                <input 
                  type="number"
                  value={tier.threshold}
                  onChange={(e) => updateTier(index, "threshold", parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-surface-border rounded-lg text-sm focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>

              <div className="flex-1 min-w-[140px]">
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block tracking-wider">Reward Type</label>
                <select 
                  value={tier.rewardType}
                  onChange={(e) => updateTier(index, "rewardType", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-surface-border rounded-lg text-sm focus:ring-1 focus:ring-brand-teal outline-none"
                >
                  <option value="WALLET">Wallet Credit</option>
                  <option value="PACKAGE">Free Package</option>
                  <option value="CASH">Cash Payout</option>
                </select>
              </div>

              <div className="w-full md:w-32">
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block tracking-wider">Value (INR)</label>
                <input 
                  type="number"
                  value={tier.amount}
                  onChange={(e) => updateTier(index, "amount", parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-surface-border rounded-lg text-sm focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>

              <div className="flex-[2] min-w-[140px]">
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block tracking-wider">Label / Notes</label>
                <input 
                  type="text"
                  value={tier.notes}
                  onChange={(e) => updateTier(index, "notes", e.target.value)}
                  placeholder="e.g. Silver Reward"
                  className="w-full px-3 py-2 bg-white border border-surface-border rounded-lg text-sm focus:ring-1 focus:ring-brand-teal outline-none"
                />
              </div>

              <button 
                type="button"
                onClick={() => removeTier(index)}
                className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <Button 
            type="button" 
            variant="outline" 
            fullWidth 
            className="border-dashed border-2 py-6 rounded-2xl hover:bg-surface-soft text-text-muted hover:text-brand-teal"
            onClick={addTier}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Reward Milestone
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 text-sm">
            <Save className="h-4 w-4 shrink-0" />
            <span>Configuration saved successfully!</span>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-surface-border">
          <Button 
            type="submit" 
            className="bg-brand-blue hover:bg-brand-blue-light px-8"
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Reward Scheme"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
