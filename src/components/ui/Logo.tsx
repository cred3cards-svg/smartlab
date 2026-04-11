import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "mono-light" | "mono-dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

/**
 * Logo Component
 * Uses the official brand image provided by the user.
 * Supports variants like mono-light (white) for dark backgrounds.
 */
export function Logo({
  variant = "full",
  size = "md",
  className,
  href = "/",
}: LogoProps) {
  // Height mapping based on size prop
  const heights = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 72,
  };

  const height = heights[size];
  
  // Adjusted aspect ratio for the new logo (approx 2.4:1)
  const width = variant === "full" ? height * 2.4 : height * 0.8;

  const content = (
    <div 
      className={cn("relative flex items-center transition-all", className)} 
      style={{ height, width }}
    >
      <Image
        src="/images/smart247.png"
        alt="SMARTLAB247"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn(
          "object-contain",
          variant === "icon" && "object-left", // Only show the shield part for icon
          variant === "mono-light" && "brightness-0 invert opacity-90", // White version
          variant === "mono-dark" && "brightness-0 opacity-80" // Black version
        )}
        priority
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
