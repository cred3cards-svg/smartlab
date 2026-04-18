"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateTest } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Save, Trash2, AlertCircle } from "lucide-react";

export function TestEditForm({ test }: { test: any }) {
  const [formData, setFormData] = useState({
    name: test.name,
    shortDescription: test.shortDescription,
    price: test.price.toString(),
    originalPrice: test.originalPrice.toString(),
    reportTime: test.reportTime,
    active: test.active,
    preparation: test.preparation.join("\n"),
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateTest(test.id, {
        ...formData,
        preparation: formData.preparation.split("\n").filter((l: string) => l.trim().length > 0)
      });
      router.push("/admin/tests");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Display Name</label>
              <input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Short Description</label>
              <textarea 
                value={formData.shortDescription}
                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                className="w-full px-4 py-2.5 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal outline-none transition-all min-h-[100px]"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary">Sale Price (INR)</label>
                <input 
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal outline-none transition-all font-bold text-brand-blue"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary">Original Price (INR)</label>
                <input 
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  className="w-full px-4 py-2.5 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-primary">Report Turnaround Time</label>
              <input 
                value={formData.reportTime}
                onChange={(e) => setFormData({...formData, reportTime: e.target.value})}
                className="w-full px-4 py-2.5 bg-surface-soft border-transparent rounded-xl text-sm focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="rounded border-surface-border text-brand-teal focus:ring-brand-teal h-4 w-4"
              />
              <label htmlFor="active" className="text-sm font-medium text-text-primary seleccion-none">Test is currently active and bookable</label>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <label className="text-sm font-bold text-text-primary">Preparation Instructions (one per line)</label>
          <textarea 
            value={formData.preparation}
            onChange={(e) => setFormData({...formData, preparation: e.target.value})}
            className="w-full px-4 py-2.5 bg-surface-soft border-transparent rounded-xl text-sm font-mono focus:ring-2 focus:ring-brand-teal outline-none transition-all min-h-[120px]"
            placeholder="No fasting required&#10;Stay hydrated"
          />
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-surface-border">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/admin/tests")}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-brand-blue hover:bg-brand-blue-light"
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving Changes..." : "Save Test Details"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
