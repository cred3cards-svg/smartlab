"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Clock, Search, Filter } from "lucide-react";

export default function AdminReferralTable() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRewards() {
      // Mocking admin fetch for now as it usually requires auth session
      const res = await fetch("/api/admin/referrals"); // Note: Need to create this route
      if (res.ok) {
        setRewards(await res.json());
      }
      setLoading(false);
    }
    // fetchRewards();
    setLoading(false); // Mocked for demonstration
  }, []);

  if (loading) return <div>Loading records...</div>;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-gray-900">Referral Reward Ledger</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search phone..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-white text-gray-400">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Reward Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rewards.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  No reward requests found.
                </td>
              </tr>
            ) : rewards.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{r.account?.name || 'User'}</div>
                  <div className="text-xs text-gray-400">{r.account?.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    r.type === 'CASH_REWARD' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {r.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">₹{r.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {r.status === 'APPROVED' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {r.status === 'REJECTED' && <XCircle className="w-4 h-4 text-rose-500" />}
                    {r.status === 'PENDING' && <Clock className="w-4 h-4 text-amber-500" />}
                    <span className="font-bold text-[11px] uppercase">{r.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  {r.status === 'PENDING' && (
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700">Approve</button>
                      <button className="px-3 py-1 border border-gray-200 rounded-lg font-bold text-xs hover:bg-gray-50">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
