"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, MapPin, ShoppingCart, Phone, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Tests", href: "/tests" },
  { label: "Checkups", href: "/checkups" },
  { label: "SMARTPASS247", href: "/smartpass247", highlight: true },
  { label: "Why Us", href: "/why-smartlab247" },
  { label: "More", href: "#", children: [
    { label: "AI Diagnostics", href: "/ai-diagnostics" },
    { label: "For Doctors", href: "/doctors" },
    { label: "Corporate", href: "/corporate" },
    { label: "About", href: "/about" },
  ]},
];

const CITIES = [
  { name: "Kolkata", status: "active" },
  { name: "Goa", status: "soon" },
  { name: "Belagavi", status: "soon" },
  { name: "North East", status: "soon" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [cityOpen, setCityOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header */}
      <div className="glass border-b border-surface-border shadow-card">
        <div className="container-site">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="md" />
            </Link>

            {/* City selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityOpen(!cityOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-brand-teal transition-colors py-1 px-2 rounded-lg hover:bg-surface-soft"
                aria-haspopup="listbox"
                aria-expanded={cityOpen}
              >
                <MapPin size={15} className="text-brand-teal" />
                <span>{selectedCity}</span>
                <ChevronDown size={14} className={cn("text-text-muted transition-transform", cityOpen && "rotate-180")} />
              </button>
              {cityOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-surface-border rounded-xl shadow-modal min-w-44 py-1 z-50">
                  {CITIES.map((city) => (
                    <button
                      key={city.name}
                      disabled={city.status === "soon"}
                      onClick={() => { 
                        if (city.status === "active") {
                          setSelectedCity(city.name); 
                          setCityOpen(false); 
                        }
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors",
                        city.status === "soon" ? "opacity-50 cursor-not-allowed" : "hover:bg-surface-soft",
                        city.name === selectedCity ? "text-brand-teal font-semibold" : "text-text-primary"
                      )}
                    >
                      <span>{city.name}</span>
                      {city.status === "soon" && (
                        <span className="text-[10px] bg-brand-teal-pale text-brand-teal px-1.5 py-0.5 rounded uppercase font-bold">Soon</span>
                      )}
                    </button>
                  ))}
                  <div className="border-t border-surface-border mt-1 pt-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-brand-teal font-medium hover:bg-brand-teal-pale transition-colors">
                      + Enter Pincode
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 max-w-lg">
              <SearchBar size="sm" className="flex-1" />
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-2" aria-label="Main navigation">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setMoreOpen(!moreOpen)}
                      className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-blue transition-colors px-3 py-2 rounded-lg hover:bg-surface-soft"
                    >
                      {item.label}
                      <ChevronDown size={14} className={cn("transition-transform", moreOpen && "rotate-180")} />
                    </button>
                    {moreOpen && (
                      <div className="absolute top-full right-0 mt-1 bg-white border border-surface-border rounded-xl shadow-modal min-w-48 py-1 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMoreOpen(false)}
                            className="block px-4 py-2.5 text-sm text-text-primary hover:bg-surface-soft hover:text-brand-blue transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                      item.highlight
                        ? "text-brand-teal bg-brand-teal-pale hover:bg-brand-teal hover:text-white font-semibold"
                        : "text-text-secondary hover:text-brand-blue hover:bg-surface-soft"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              {/* Support */}
              <a
                href={`tel:${CONTACT.phone}`}
                className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-brand-blue transition-colors px-2 py-1.5 rounded-lg hover:bg-surface-soft"
              >
                <Phone size={15} />
                <span>{CONTACT.phone_display}</span>
              </a>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg hover:bg-surface-soft transition-colors text-text-secondary hover:text-brand-blue"
                aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-teal text-white text-xs font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center min-w-[18px] min-h-[18px] text-[10px]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Book Now CTA */}
              <Button size="sm" variant="secondary" className="hidden sm:flex">
                Book Now
              </Button>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-surface-soft text-text-secondary"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile full-screen nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-surface-border">
            <Logo size="md" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-soft text-text-secondary"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="px-4 py-4">
            <SearchBar size="md" autoFocus />
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-4">
            {/* City selector mobile */}
            <div className="mb-4 p-3 bg-surface-soft rounded-xl">
              <p className="text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">Your Location</p>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city.name}
                    disabled={city.status === "soon"}
                    onClick={() => {
                      if (city.status === "active") setSelectedCity(city.name);
                    }}
                    className={cn(
                      "text-sm px-3 py-1.5 rounded-lg font-medium transition-colors border flex items-center gap-1.5",
                      city.name === selectedCity
                        ? "bg-brand-teal text-white border-brand-teal"
                        : city.status === "soon"
                        ? "bg-gray-50 text-text-muted border-gray-100 opacity-60"
                        : "bg-white text-text-secondary border-surface-border hover:border-brand-teal"
                    )}
                  >
                    {city.name}
                    {city.status === "soon" && <span className="text-[8px] uppercase font-bold opacity-70">Soon</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-text-secondary hover:bg-surface-soft hover:text-brand-blue transition-colors text-base font-medium"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors text-base font-medium",
                        item.highlight
                          ? "bg-brand-teal-pale text-brand-teal"
                          : "text-text-secondary hover:bg-surface-soft hover:text-brand-blue"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile bottom CTA */}
          <div className="px-4 py-4 border-t border-surface-border flex gap-3 pb-safe">
            <Button variant="outline" fullWidth size="lg">
              <Phone size={16} />
              Call Support
            </Button>
            <Button variant="secondary" fullWidth size="lg">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
