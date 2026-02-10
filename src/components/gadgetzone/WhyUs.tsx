import { ScrollReveal } from "../ScrollReveal";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Authorized dealer for Apple, Samsung, Google, OnePlus & more",
  "In-house repair lab with certified technicians",
  "Best trade-in values in the city — instant cash",
  "0% EMI options on all major credit cards",
  "Genuine accessories and screen guards",
  "Post-purchase support and setup assistance",
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <ScrollReveal>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80"
                  alt="Inside GadgetZone store"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)" }} />

                {/* Overlay stat */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full border-2 border-black"
                          style={{ background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 50%), hsl(${i * 60 + 40}, 70%, 40%))` }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">2,000+ Happy Customers</div>
                      <div className="text-xs text-white/40">Join our growing family</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div
                className="absolute -bottom-6 -right-6 p-5 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl"
                style={{ boxShadow: "0 0 40px rgba(6,182,212,0.1)" }}
              >
                <div className="text-3xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  5+
                </div>
                <div className="text-xs text-white/40 mt-1">Years in Business</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — content */}
          <div>
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#10b981" }}>
                Why GadgetZone
              </p>
              <h2
                className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The Store You Can <span style={{ color: "#10b981" }}>Trust</span>
              </h2>
              <p className="text-white/40 mb-10 leading-relaxed max-w-lg">
                We&apos;re not just another phone shop. We&apos;re your local tech partner —
                from purchase to repair, we&apos;ve got you covered.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {reasons.map((reason, i) => (
                <ScrollReveal key={reason} delay={i * 60}>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all">
                    <CheckCircle size={20} className="mt-0.5 shrink-0" style={{ color: "#10b981" }} />
                    <span className="text-sm text-white/70">{reason}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
