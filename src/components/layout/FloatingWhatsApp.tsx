"use client";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918002662247?text=Hi%2C%20I%20need%20help%20with%20a%20test%20booking%20on%20SMARTLAB247"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SMARTLAB247 on WhatsApp"
      className="fixed bottom-24 right-4 lg:bottom-8 lg:right-6 z-50 group"
    >
      <div className="relative flex items-center">
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-brand-blue text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-card">
          Chat with us 💬
        </span>
        {/* Button */}
        <div className="w-13 h-13 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{ width: 52, height: 52 }}>
          <MessageCircle size={26} fill="white" strokeWidth={0} />
        </div>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      </div>
    </a>
  );
}
