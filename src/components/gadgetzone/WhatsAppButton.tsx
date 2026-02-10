"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20GadgetZone!%20I%27m%20interested%20in%20buying%20a%20phone."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full text-white font-bold text-sm shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
      style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
