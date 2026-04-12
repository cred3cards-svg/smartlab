"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReferralDashboard from "@/components/referral/ReferralDashboard";

function ReferralProfileContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  if (!phone) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Referral Dashboard</h1>
        <p className="text-gray-500 mt-2">Please provide a phone number in the URL to view your referral stats.</p>
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 text-sm">
          Example: <code className="font-bold">/profile/referrals?phone=9876543210</code>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">My <span className="text-blue-600">Rewards</span></h1>
        <p className="text-gray-500 mt-1">Track your referrals and milestone rewards.</p>
      </div>
      
      <ReferralDashboard phone={phone} />
      
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">How it works</h3>
        <ul className="space-y-3">
          {[
            { step: 1, text: "Share your unique referral code with friends." },
            { step: 2, text: "They get a special discount on their first booking." },
            { step: 3, text: "Once their report is delivered, you unlock rewards!" },
          ].map((item) => (
            <li key={item.step} className="flex gap-3 text-sm text-gray-600">
              <span className="flex-shrink-0 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                {item.step}
              </span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ReferralProfilePage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto py-20 px-4 text-center">Loading Referral Dashboard...</div>}>
      <ReferralProfileContent />
    </Suspense>
  );
}
