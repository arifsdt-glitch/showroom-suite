import { ScrollReveal } from "../ScrollReveal";
import { Wrench, RefreshCw, CreditCard, Smartphone, Headphones, Package } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Expert Repairs",
    desc: "Screen replacements, battery swaps, water damage recovery. 30-minute express service available.",
    color: "#06b6d4",
  },
  {
    icon: RefreshCw,
    title: "Trade-In Program",
    desc: "Get the best value for your old phone. Instant assessment and payment, upgrade seamlessly.",
    color: "#a855f7",
  },
  {
    icon: CreditCard,
    title: "Easy EMI",
    desc: "0% interest EMI on all major banks. Split your purchase into 6, 12, or 24 easy payments.",
    color: "#f59e0b",
  },
  {
    icon: Smartphone,
    title: "Premium Pre-Owned",
    desc: "Certified refurbished phones with 6-month warranty. Grade A quality guaranteed.",
    color: "#10b981",
  },
  {
    icon: Headphones,
    title: "Accessories Hub",
    desc: "Cases, screen guards, chargers, earbuds — original accessories for every phone model.",
    color: "#ec4899",
  },
  {
    icon: Package,
    title: "Bulk & Corporate",
    desc: "Special pricing for businesses, schools, and bulk orders. Dedicated account manager.",
    color: "#f97316",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 px-6" style={{ background: "linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)" }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#a855f7" }}>
              What We Offer
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our <span style={{ color: "#a855f7" }}>Services</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 80}>
              <div className="group relative p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 h-full">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${service.color}08, transparent 60%)` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
                  >
                    <service.icon size={22} style={{ color: service.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
