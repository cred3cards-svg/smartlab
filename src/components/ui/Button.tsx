"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "teal";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none hover:scale-[1.02]";

    const variants = {
      primary:
        "bg-brand-blue text-white hover:bg-brand-blue-light focus-visible:ring-brand-blue shadow-sm hover:shadow-blue active:scale-[0.98]",
      secondary:
        "bg-brand-teal text-white hover:bg-brand-teal-dark focus-visible:ring-brand-teal shadow-sm hover:shadow-teal active:scale-[0.98]",
      teal: "bg-brand-teal-pale text-brand-teal border border-brand-teal/20 hover:bg-brand-teal hover:text-white focus-visible:ring-brand-teal hover:shadow-teal active:scale-[0.98]",
      outline:
        "border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-white focus-visible:ring-brand-blue hover:shadow-blue active:scale-[0.98]",
      ghost:
        "text-text-secondary bg-transparent hover:bg-surface-soft hover:text-text-primary focus-visible:ring-brand-teal hover:scale-100 active:scale-[0.98]",
      danger:
        "bg-status-danger text-white hover:opacity-90 focus-visible:ring-status-danger hover:shadow-card-hover active:scale-[0.98]",
    };

    const sizes = {
      xs: "h-7 px-3 text-xs rounded-lg",
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
