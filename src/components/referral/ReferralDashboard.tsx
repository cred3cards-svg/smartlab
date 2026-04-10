"use client";

import React, { useState, useEffect } from "react";
import { Copy, Share2, Award, Users, TrendingUp } from "lucide-react";

interface ReferralStats {
  code: string;
  totalReferrals: number;
  successfulCount: number;
  nextMilestone: number | null;
  progress: number;
  rewards: any[];
}

export default function ReferralDashboard({ phone }: { phone: string }) {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/referral/stats?phone=${phone}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch referral stats", err);
      } finally {
        setLoading(setStats && false);
      }
    }
    if (phone) fetchStats();
  }, [phone]);

  const copyToClipboard = () => {
    if (stats?.code) {
      navigator.clipboard.writeText(stats.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="animate-pulse h-48 bg-gray-100 rounded-2xl" />;
  if (!stats) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
      {/* Header */}
      <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-6 h-6 text-blue-200" />
          <h2 className="text-xl font-bold">Refer & Earn</h2>
        </div>
        <p className="text-blue-100 text-sm opacity-90">
          Share your code and unlock rewards for every friend who completes a checkup.
        </p>
      </div>

      <div className="p-8 space-y-8">
        {/* Referral Code Box */}
        <div className="relative group">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
            Your Personal Code
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-2xl font-black text-blue-900 tracking-widest uppercase">
                {stats.code}
              </span>
              <button 
                onClick={copyToClipboard}
                className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-blue-600"
              >
                {copied ? <span className="text-xs font-bold text-green-600">Copied!</span> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <button className="bg-blue-900 text-white p-4 rounded-2xl hover:bg-blue-800 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Multi-Tier Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-gray-900">Your Progress</span>
            <span className="text-blue-600 font-bold">{stats.successfulCount} / {stats.nextMilestone || "All"} Referrals</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
          
          {/* Milestones */}
          <div className="grid grid-cols-3 gap-2">
            {[2, 5, 10].map((m) => (
              <div key={m} className={`text-center p-3 rounded-2xl border transition-all ${stats.successfulCount >= m ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-transparent'}`}>
                <div className={`text-xs font-black mb-1 ${stats.successfulCount >= m ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {m} REFS
                </div>
                <div className={`text-[10px] leading-tight ${stats.successfulCount >= m ? 'text-emerald-700 font-bold' : 'text-gray-400'}`}>
                  {m === 2 && "Wallet Credit"}
                  {m === 5 && "Free Package"}
                  {m === 10 && "Cash Reward"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Stats */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <div className="flex-1 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 leading-none">{stats.totalReferrals}</div>
              <div className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Shared With</div>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 leading-none">{stats.successfulCount}</div>
              <div className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
