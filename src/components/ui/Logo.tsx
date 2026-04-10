import { cn } from "@/lib/utils";

// Logo Component — SMARTLAB247 branding with Shield + Multi-tube + Check Swoosh
export function Logo({
  variant = "full",
  size = "md",
  showTagline = true,
  className,
}: {
  variant?: "full" | "icon" | "mono-dark" | "mono-light";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: { height: 32, iconSize: 32, fontSize: "16px", taglineSize: "8px" },
    md: { height: 48, iconSize: 48, fontSize: "22px", taglineSize: "10px" },
    lg: { height: 64, iconSize: 64, fontSize: "28px", taglineSize: "12px" },
    xl: { height: 80, iconSize: 80, fontSize: "36px", taglineSize: "14px" },
  };

  const { iconSize, fontSize, taglineSize } = sizes[size];
  const isLight = variant === "mono-light";
  const isDark = variant === "mono-dark";

  const brandBlue = isLight ? "#FFFFFF" : isDark ? "#1A2E3B" : "#0B3C5D";
  const brandTeal = isLight ? "rgba(255,255,255,0.9)" : isDark ? "#1A2E3B" : "#00B8B8";
  const mutedText = isLight ? "rgba(255,255,255,0.7)" : "#64748B";

  // Icon Only — High Fidelity Reconstruction
  const ShieldIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SMARTLAB247"
    >
      <defs>
        {/* Gradients for the 3D split-shield effect */}
        <linearGradient id="shieldLeft" x1="50%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B3C5D" />
          <stop offset="100%" stopColor="#1A2E3B" />
        </linearGradient>
        <linearGradient id="shieldRight" x1="50%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E0E0" />
          <stop offset="100%" stopColor="#00A8A8" />
        </linearGradient>
        <linearGradient id="glossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* SHIELD BODY — Dual toned for ridge effect */}
      {/* Left side */}
      <path
        d="M50 5L18 20V45C18 65 32 85 50 92V5Z"
        fill="url(#shieldLeft)"
      />
      {/* Right side */}
      <path
        d="M50 5L82 20V45C82 65 68 85 50 92V5Z"
        fill="url(#shieldRight)"
      />
      
      {/* SPARKLE STAR (Top Left) */}
      <path
        d="M32 20C32 20 31 25 28 26C31 27 32 32 32 32C32 32 33 27 36 26C33 25 32 20 32 20Z"
        fill="white"
        fillOpacity="0.8"
      />
      
      {/* APPARATUS (Test Tubes) */}
      {/* Main taller tube */}
      <path
        d="M38 28H48V58C48 61 46 63 43 63C40 63 38 61 38 58V28Z"
        fill="white"
        fillOpacity="0.9"
      />
      <rect x="36" y="26" width="14" height="4" rx="2" fill="white" />
      
      {/* Second tube behind */}
      <path
        d="M48 35H58V55C58 58 56 60 53 60C50 60 48 58 48 55V35Z"
        fill="white"
        fillOpacity="0.7"
      />
      <rect x="46" y="33" width="14" height="3" rx="1.5" fill="white" fillOpacity="0.8" />

      {/* Bubbles / Highlights in tubes */}
      <circle cx="43" cy="40" r="1.5" fill="#00A8A8" fillOpacity="0.6" />
      <circle cx="41" cy="48" r="1" fill="#00A8A8" fillOpacity="0.6" />
      <circle cx="45" cy="54" r="2" fill="#00A8A8" fillOpacity="0.6" />
      <circle cx="53" cy="45" r="1.2" fill="#0B3C5D" fillOpacity="0.5" />
      <circle cx="55" cy="52" r="1.5" fill="#0B3C5D" fillOpacity="0.5" />
      
      {/* THE SWOOSH (White checkmark glossy) */}
      <path
        d="M26 62C26 62 28 75 45 82C65 90 85 70 88 34C88 34 78 68 50 72C35 74 26 62 26 62Z"
        fill="white"
      />
      {/* Polish/Gloss on swoosh */}
      <path
        d="M72 45C75 55 70 65 60 68C75 62 78 50 72 45Z"
        fill="url(#glossGrad)"
        fillOpacity="0.4"
      />
    </svg>
  );

  if (variant === "icon") {
    return <div className={cn("inline-block", className)}>{ShieldIcon}</div>;
  }

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="flex-shrink-0">{ShieldIcon}</div>
      
      <div className="flex flex-col justify-center">
        {/* Brand Name */}
        <div 
          className="font-heading font-black tracking-tighter leading-none"
          style={{ fontSize }}
        >
          <span style={{ color: brandBlue }}>SMARTLAB</span>
          <span style={{ color: brandTeal }}>247</span>
        </div>

        {/* Tagline 1: Trusted Diagnostics, Faster Results */}
        {showTagline && size !== "sm" && (
          <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
            <div className="h-[1px] flex-1 min-w-[10px]" style={{ backgroundColor: brandTeal, opacity: 0.5 }} />
            <span 
              className="font-body font-bold whitespace-nowrap"
              style={{ fontSize: taglineSize, color: brandBlue }}
            >
              Trusted Diagnostics, Faster Results
            </span>
            <div className="h-[1px] flex-1 min-w-[10px]" style={{ backgroundColor: brandTeal, opacity: 0.5 }} />
          </div>
        )}

        {/* Tagline 2: AI POWERED | AFFORDABLE | ACCURATE */}
        {showTagline && (size === "lg" || size === "xl") && (
          <div 
            className="font-body tracking-[0.2em] font-medium mt-1 uppercase"
            style={{ fontSize: `calc(${taglineSize} * 0.75)`, color: mutedText }}
          >
            AI POWERED | AFFORDABLE | ACCURATE
          </div>
        )}
      </div>
    </div>
  );
}
