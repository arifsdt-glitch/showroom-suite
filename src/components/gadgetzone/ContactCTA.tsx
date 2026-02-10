import { ScrollReveal } from "../ScrollReveal";
import { MapPin, Phone, Clock, Mail, ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* CTA Banner */}
        <ScrollReveal>
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 mb-20"
            style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 text-center">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to Upgrade?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Walk in today or call us for the best deals on smartphones, accessories, and repairs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                >
                  <Phone size={18} />
                  +91 98765 43210
                </a>
                <a
                  href="#store-info"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 text-white font-bold backdrop-blur-sm hover:bg-white/25 transition-all"
                >
                  Get Directions
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Store Info */}
        <div id="store-info" className="grid md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#06b6d4" }}>
                Visit Us
              </p>
              <h3
                className="text-3xl font-extrabold tracking-tight mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Store
              </h3>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "Shop No. 12, Main Market Road\nNear City Center Mall, Your City - 400001", color: "#06b6d4" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210", color: "#a855f7" },
                  { icon: Mail, label: "Email", value: "hello@gadgetzone.in", color: "#f59e0b" },
                  { icon: Clock, label: "Hours", value: "Mon - Sat: 10 AM - 9 PM\nSunday: 11 AM - 7 PM", color: "#10b981" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                    >
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm text-white/70 whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Map placeholder */}
          <ScrollReveal delay={100}>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 h-full min-h-[360px]">
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="mx-auto mb-3 text-white/20" />
                  <p className="text-sm text-white/30 font-medium">Google Maps Integration</p>
                  <p className="text-xs text-white/15 mt-1">Will be added with your store location</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
