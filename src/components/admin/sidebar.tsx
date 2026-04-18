"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Settings, 
  Users, 
  Calendar, 
  TestTube2, 
  Package, 
  BadgePercent, 
  UsersRound, 
  FileText, 
  LayoutDashboard,
  History,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Tests', href: '/admin/tests', icon: TestTube2 },
  { name: 'Packages', href: '/admin/packages', icon: Package },
  { name: 'Offers', href: '/admin/offers', icon: BadgePercent },
  { name: 'Referral Scheme', href: '/admin/settings/referrals', icon: BarChart3 },
  { name: 'Ref. Users', href: '/admin/referrals', icon: UsersRound },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Audit Logs', href: '/admin/logs', icon: History },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white border-r border-surface-border">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-surface-border">
        <span className="text-xl font-bold gradient-text">SMARTLAB admin</span>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive
                  ? 'bg-brand-teal-pale text-brand-teal'
                  : 'text-text-secondary hover:bg-surface-soft hover:text-text-primary',
                'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors'
              )}
            >
              <item.icon
                className={cn(
                  isActive ? 'text-brand-teal' : 'text-text-muted group-hover:text-text-primary',
                  'mr-3 h-5 w-5 shrink-0'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-surface-border p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-status-danger hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 shrink-0" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}
