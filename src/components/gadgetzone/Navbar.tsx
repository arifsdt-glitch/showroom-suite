"use client";

import { useState, useEffect } from "react";
import { Smartphone, Phone, Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:bg-white/5 transition-colors" title="Back to selector">
            <ArrowLeft size={16} className="text-white/60" />
          </Link>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
               style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>
            <Smartphone size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Gadget<span style={{ color: "#06b6d4" }}>Zone</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Phones", "Services", "Why Us", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-black transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #06b6d4, #22d3ee)" }}
          >
            <Phone size={14} />
            Call Now
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-white/80"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/5 p-6">
          <div className="flex flex-col gap-4">
            {["Phones", "Services", "Why Us", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-lg font-medium text-white/70 hover:text-white py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-black mt-2"
              style={{ background: "linear-gradient(135deg, #06b6d4, #22d3ee)" }}
            >
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
