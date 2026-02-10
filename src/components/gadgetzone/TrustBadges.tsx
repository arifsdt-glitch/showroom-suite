import { ScrollReveal } from "../ScrollReveal";
import { Shield, Clock, ArrowRightLeft, Palette } from "lucide-react";

const badges = [
  { icon: Shield, title: "Official Warranty", desc: "Authorized dealer for all brands", color: "#06b6d4" },
  { icon: Clock, title: "30-Min Repair", desc: "Expert technicians, genuine parts", color: "#a855f7" },
  { icon: ArrowRightLeft, title: "Trade-In Center", desc: "Best value for your old phone", color: "#f59e0b" },
  { icon: Palette, title: "Custom Skins", desc: "Premium wraps & accessories", color: "#10b981" },
];

export function TrustBadges() {
  return (
    <section className="relative py-16 border-y border-white/5" style={{ background: "linear-gradient(180deg, rgba(6,182,212,0.03), transparent)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <ScrollReveal key={badge.title} delay={i * 100}>
              <div className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${badge.color}15`, border: `1px solid ${badge.color}30` }}
                >
                  <badge.icon size={22} style={{ color: badge.color }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{badge.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{badge.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
