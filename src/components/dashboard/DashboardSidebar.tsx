"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Activity, 
  FileText, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Health Trends', href: '/dashboard/trends', icon: BarChart3 },
  { name: 'Recommendations', href: '/dashboard/insights', icon: Zap },
  { name: 'Family Profiles', href: '/dashboard/family', icon: Users },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Refer & Earn', href: '/dashboard/referrals', icon: TrendingUp },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col w-72 bg-white border-r border-surface-border">
      <div className="h-20 flex items-center px-8 border-b border-surface-border">
        <Logo noLink />
      </div>

      <div className="flex-1 py-8 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" 
                  : "text-text-secondary hover:bg-surface-soft hover:text-brand-blue"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-text-muted transition-colors group-hover:text-brand-blue")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-surface-border space-y-4">
        <div className="bg-brand-teal/5 rounded-2xl p-4 border border-brand-teal/10">
          <div className="flex items-center gap-2 text-brand-teal font-bold text-xs uppercase mb-1">
            <ShieldCheck size={14} /> SMARTPASS247
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Protect your family with 20% off every test.
          </p>
          <button className="mt-2 text-[10px] font-extrabold text-brand-teal hover:underline uppercase tracking-tight">
            Upgrade Now →
          </button>
        </div>

        <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-status-danger hover:bg-red-50 rounded-xl transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
