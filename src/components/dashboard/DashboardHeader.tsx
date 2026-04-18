"use client";

import { Bell, Search, UserCircle2, ChevronDown } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="h-20 bg-white border-b border-surface-border flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-brand-blue" />
          <input 
            type="text" 
            placeholder="Search reports, tests, or family members..." 
            className="w-full bg-surface-soft border-transparent rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 text-text-secondary hover:bg-surface-soft rounded-2xl transition-colors shrink-0">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-status-danger rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-surface-border cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-text-primary group-hover:text-brand-blue transition-colors">Rajesh Sharma</p>
            <p className="text-[10px] text-text-muted font-medium">Phone: +91 98300 00000</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold text-sm shadow-sm">
            RS
          </div>
          <ChevronDown size={14} className="text-text-muted group-hover:text-brand-blue transition-transform" />
        </div>
      </div>
    </header>
  );
}
