import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <span className="text-xl font-black tracking-tighter text-blue-600">
                SMARTLAB<span className="text-gray-900">ADMIN</span>
              </span>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-blue-600">Dashboard</Link>
                <Link href="/admin/referrals" className="text-sm font-medium text-gray-600 hover:text-blue-600">Referrals</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest">Back to Site</Link>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
          &copy; 2024 SMARTLAB247 Admin Console. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
