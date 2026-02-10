"use client";

import { useState } from "react";
import { ScrollReveal } from "../ScrollReveal";
import { Star, ShoppingBag, ChevronRight } from "lucide-react";

const phones = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: "₹1,44,900",
    emi: "₹6,038/mo",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=600&q=80",
    specs: ["A18 Pro Chip", "48MP Camera", "6.9\" Display", "4685 mAh"],
    rating: 4.9,
    tag: "Best Seller",
    tagColor: "#06b6d4",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: "₹1,29,999",
    emi: "₹5,416/mo",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    specs: ["Snapdragon 8 Gen 4", "200MP Camera", "6.8\" AMOLED", "5000 mAh"],
    rating: 4.8,
    tag: "New Launch",
    tagColor: "#a855f7",
    gradient: "linear-gradient(135deg, #1a1a2e, #2d1b4e)",
  },
  {
    id: 3,
    name: "Google Pixel 9 Pro",
    brand: "Google",
    price: "₹1,09,999",
    emi: "₹4,583/mo",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    specs: ["Tensor G4", "50MP Triple", "6.3\" OLED", "4700 mAh"],
    rating: 4.7,
    tag: "AI Camera",
    tagColor: "#f59e0b",
    gradient: "linear-gradient(135deg, #1a1a2e, #1a2e1a)",
  },
  {
    id: 4,
    name: "OnePlus 13",
    brand: "OnePlus",
    price: "₹69,999",
    emi: "₹2,916/mo",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    specs: ["Snapdragon 8 Gen 4", "50MP Hasselblad", "6.82\" AMOLED", "6000 mAh"],
    rating: 4.6,
    tag: "Value King",
    tagColor: "#10b981",
    gradient: "linear-gradient(135deg, #1a1a2e, #2e1a1a)",
  },
  {
    id: 5,
    name: "iPhone 16",
    brand: "Apple",
    price: "₹79,900",
    emi: "₹3,329/mo",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    specs: ["A18 Chip", "48MP Fusion", "6.1\" OLED", "3561 mAh"],
    rating: 4.8,
    tag: "Popular",
    tagColor: "#06b6d4",
    gradient: "linear-gradient(135deg, #1a1a2e, #1e293b)",
  },
  {
    id: 6,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: "₹39,999",
    emi: "₹1,666/mo",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80",
    specs: ["Exynos 1480", "50MP OIS", "6.6\" AMOLED", "5000 mAh"],
    rating: 4.5,
    tag: "Budget Pick",
    tagColor: "#ec4899",
    gradient: "linear-gradient(135deg, #1a1a2e, #2e1a2e)",
  },
];

export function FeaturedPhones() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="phones" className="relative py-28 px-6">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#06b6d4" }}>
              Featured Collection
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Latest <span style={{ color: "#06b6d4" }}>Smartphones</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-lg mx-auto">
              Hand-picked flagships and best sellers. All with official warranty and EMI options.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {phones.map((phone, i) => (
            <ScrollReveal key={phone.id} delay={i * 80}>
              <div
                className="group relative rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/15 cursor-pointer"
                style={{ background: phone.gradient }}
                onMouseEnter={() => setHoveredId(phone.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Tag */}
                <div className="px-5 pt-4 pb-2">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${phone.tagColor}20`, border: `1px solid ${phone.tagColor}40`, color: phone.tagColor }}
                  >
                    {phone.tag}
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden flex items-center justify-center px-6">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[60px]"
                    style={{ background: `radial-gradient(circle, ${phone.tagColor}30, transparent 70%)` }}
                  />
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="relative z-10 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 pt-2">
                  <p className="text-[10px] font-bold tracking-wider text-white/30 uppercase mb-1">{phone.brand}</p>
                  <h3 className="text-lg font-bold text-white mb-3">{phone.name}</h3>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {phone.specs.map((spec) => (
                      <div
                        key={spec}
                        className="text-[11px] text-white/50 bg-white/[0.03] rounded-lg px-3 py-1.5 border border-white/5"
                      >
                        {spec}
                      </div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <Star size={12} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                    <span className="text-xs font-bold text-white/70">{phone.rating}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                        {phone.price}
                      </div>
                      <div className="text-[10px] text-white/30 mt-0.5">
                        EMI from {phone.emi}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-black transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${phone.tagColor}, ${phone.tagColor}dd)` }}
                    >
                      <ShoppingBag size={13} />
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All */}
        <ScrollReveal>
          <div className="text-center mt-12">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
            >
              View All Phones
              <ChevronRight size={16} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
