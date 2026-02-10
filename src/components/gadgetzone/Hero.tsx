"use client";

import { ChevronDown, Zap, Shield, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] animate-glow-pulse"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] animate-glow-pulse"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)", animationDelay: "1.5s" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-cyan-300 uppercase">
                Now Open — Walk In Today
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-white">The Future.</span>
              <span className="block text-shimmer">In Your Hands.</span>
            </h1>

            <p className="text-lg text-white/50 max-w-md mb-10 leading-relaxed">
              Premium smartphones, expert repairs, and trade-in deals — all under one roof.
              Official warranty on every device.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#phones"
                className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105"
                style={{ background: "linear-gradient(135deg, #06b6d4, #22d3ee)" }}
              >
                <Zap size={18} />
                Explore Phones
              </a>
              <a
                href="#contact"
                className="flex items-center gap-3 px-8 py-4 rounded-full font-bold border border-white/15 text-white hover:bg-white/5 transition-all"
              >
                Visit Store
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              {[
                { value: "2000+", label: "Phones Sold" },
                { value: "4.9★", label: "Google Rating" },
                { value: "30min", label: "Quick Repair" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Glow behind phone */}
            <div
              className="absolute w-[350px] h-[350px] rounded-full blur-[80px] animate-glow-pulse"
              style={{ background: "radial-gradient(circle, rgba(6,182,212,0.35), rgba(139,92,246,0.2), transparent 70%)" }}
            />

            {/* Phone frame */}
            <div className="relative w-[280px] h-[560px] rounded-[3rem] border-[3px] border-white/10 bg-gradient-to-b from-zinc-900 to-black overflow-hidden shadow-2xl shadow-cyan-500/10 animate-float">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-10" />

              {/* Screen content */}
              <div className="w-full h-full p-4 pt-10 flex flex-col items-center justify-center text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
                >
                  <Zap size={28} className="text-white" />
                </div>
                <p className="text-lg font-bold text-white mb-1">GadgetZone</p>
                <p className="text-xs text-white/40">Premium Mobile Store</p>

                {/* Mini cards inside phone */}
                <div className="mt-8 w-full space-y-3 px-2">
                  {[
                    { label: "iPhone 16 Pro", price: "₹1,34,900" },
                    { label: "Samsung S25 Ultra", price: "₹1,29,999" },
                    { label: "Pixel 9 Pro", price: "₹1,09,999" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <span className="text-xs text-white/70">{item.label}</span>
                      <span className="text-xs font-bold" style={{ color: "#06b6d4" }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div
              className="absolute -left-8 top-1/4 flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Shield size={18} style={{ color: "#06b6d4" }} />
              <div>
                <div className="text-xs font-bold text-white">Official</div>
                <div className="text-[10px] text-white/40">Warranty</div>
              </div>
            </div>

            <div
              className="absolute -right-4 bottom-1/3 flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Award size={18} style={{ color: "#a855f7" }} />
              <div>
                <div className="text-xs font-bold text-white">Certified</div>
                <div className="text-[10px] text-white/40">Seller</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ChevronDown size={20} className="text-white/20 animate-bounce" />
      </div>
    </section>
  );
}
