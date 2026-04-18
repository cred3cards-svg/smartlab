import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "discount" | "popular" | "report" | "new" | "success" | "warning" | "info" | "muted" | "destructive";
  className?: string;
}

export function Badge({ children, variant = "info", className }: BadgeProps) {
  const variants = {
    discount: "badge-discount",
    popular: "badge-popular",
    report: "badge-report",
    new: "badge-new",
    success: "bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2 py-0.5 rounded-full",
    warning: "bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full",
    info: "bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2 py-0.5 rounded-full",
    muted: "bg-surface-soft text-text-secondary border border-surface-border text-xs font-medium px-2 py-0.5 rounded-full",
    destructive: "bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-2 py-0.5 rounded-full",
  };

  return (
    <span className={cn("inline-flex items-center gap-1", variants[variant], className)}>
      {children}
    </span>
  );
}

export function DiscountBadge({ 
  percent, 
  size = "md" 
}: { 
  percent: number; 
  size?: "sm" | "md" | "lg" 
}) {
  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  return (
    <Badge 
      variant="discount" 
      className={cn("font-bold tracking-tight", sizeClasses[size])}
    >
      {percent}% OFF
    </Badge>
  );
}

export function ReportTimeBadge({ time }: { time: string }) {
  return <Badge variant="report">⚡ Reports in {time}</Badge>;
}

export function PopularBadge() {
  return <Badge variant="popular">🔥 Most Booked</Badge>;
}

export function NewBadge() {
  return <Badge variant="new">NEW</Badge>;
}

export function FastingBadge({ required, hours }: { required: boolean; hours?: number }) {
  if (!required) {
    return <Badge variant="success">✓ No Fasting</Badge>;
  }
  return <Badge variant="warning">Fast {hours}h</Badge>;
}
