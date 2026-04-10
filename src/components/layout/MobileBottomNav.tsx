"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FlaskConical, Package, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Tests", href: "/tests", Icon: FlaskConical },
  { label: "Checkups", href: "/checkups", Icon: Package },
  { label: "Reports", href: "/app", Icon: FileText },
  { label: "Account", href: "/account", Icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-surface-border pb-safe lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5">
        {TABS.map(({ label, href, Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors",
                active ? "text-brand-teal" : "text-text-muted hover:text-text-secondary"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
              <span className="text-[10px]">{label}</span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-brand-teal rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
