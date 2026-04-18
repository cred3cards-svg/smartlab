import React from "react";
import AdminReferralTable from "@/components/admin/AdminReferralTable";

export default function AdminReferralsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Referral Management</h1>
        <p className="text-gray-500 mt-2">Manage customer rewards, approve cash payouts, and track referral performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Rewards Issued</div>
          <div className="text-3xl font-black text-gray-900 mt-1">--</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Approvals</div>
          <div className="text-3xl font-black text-amber-600 mt-1">--</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Referrals</div>
          <div className="text-3xl font-black text-blue-600 mt-1">--</div>
        </div>
      </div>

      <AdminReferralTable />
    </div>
  );
}
