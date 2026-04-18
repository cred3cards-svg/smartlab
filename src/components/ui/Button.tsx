import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "teal" | "primary";
  size?: "default" | "sm" | "md" | "lg" | "xl" | "icon";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, leftIcon, rightIcon, fullWidth, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const variants = {
      default: "bg-brand-blue text-white hover:bg-brand-blue-light shadow-sm",
      destructive: "bg-status-danger text-white hover:opacity-90",
      outline: "border border-surface-border bg-white hover:bg-surface-soft text-text-primary",
      secondary: "bg-surface-muted text-text-primary hover:bg-surface-border",
      ghost: "hover:bg-surface-soft text-text-primary",
      link: "text-brand-teal underline-offset-4 hover:underline",
      teal: "bg-brand-teal text-white hover:bg-brand-teal-dark shadow-sm",
      primary: "bg-brand-blue text-white hover:bg-brand-blue-light shadow-sm",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      md: "h-10 rounded-md px-4 py-2",
      lg: "h-11 rounded-md px-8",
      xl: "h-14 rounded-xl px-10 text-base font-bold",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          fullWidth && "w-full",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
export default Button;
