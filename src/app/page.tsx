import Link from "next/link";
import { Smartphone, Stethoscope, Bike, Car, Hotel } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Smartphone className="w-8 h-8 text-zinc-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
            Showroom Suite
          </h1>
          <p className="text-zinc-500 text-lg max-w-md mx-auto">
            Choose a design style to present to your client.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* GadgetZone */}
          <Link href="/gadgetzone" className="group relative block">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-cyan-500/30 hover:bg-zinc-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}>
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">GadgetZone</h2>
                    <p className="text-xs text-zinc-500">Modern Tech Style</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Bold, colorful, and energetic. Cyan &amp; purple gradients, floating phone mockup, spec cards, trust badges. Perfect for younger audiences and tech enthusiasts.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Gradient Hero", "Phone Mockup", "Spec Grid", "Trust Badges", "WhatsApp CTA"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20 text-cyan-400/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>View Demo</span>
                  <span className="text-cyan-400">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Aurora */}
          <Link href="/aurora" className="group relative block">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <div>
                    <h2 className="text-xl font-light tracking-[0.15em] text-white">AURORA</h2>
                    <p className="text-xs text-zinc-500">Luxury Editorial Style</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Minimalist, monochrome, and sophisticated. Fashion-editorial layouts, parallax hero, tall product cards, AI concierge, cart &amp; trade-in flow. For premium clients.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Parallax Hero", "Editorial Layout", "Product Pages", "Cart & Trade-In", "AI Concierge"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>View Demo</span>
                  <span className="text-white">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Clinic */}
          <Link href="/clinic" className="group relative block">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-amber-500/30 hover:bg-zinc-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #d97706, transparent 70%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d97706, #92400e)" }}>
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AURA ELITE</h2>
                    <p className="text-xs text-zinc-500">Premium Clinic Style</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Warm, authoritative, and trust-building. Serif headings, amber-gold accents, doctor profiles, booking modal, patient portal. For clinics &amp; hospitals.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Booking Flow", "Doctor Profiles", "Patient Portal", "Trust Badges", "Testimonials"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-500/20 text-amber-400/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>View Demo</span>
                  <span className="text-amber-400">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Bikes */}
          <Link href="/bikes" className="group relative block">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-orange-500/30 hover:bg-zinc-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #ea580c, transparent 70%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ea580c, #78350f)" }}>
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AURORA Cycles</h2>
                    <p className="text-xs text-zinc-500">Motorcycle Showroom</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Dark luxury automotive. Parallax hero, bike configurator, EMI calculator, product detail pages, framer-motion animations. For dealerships.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Parallax Hero", "Configurator", "EMI Calculator", "Detail Pages", "Test Ride Booking"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-orange-500/20 text-orange-400/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>View Demo</span>
                  <span className="text-orange-400">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Cars */}
          <Link href="/cars" className="group relative block">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-blue-500/30 hover:bg-zinc-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #0B3D91, transparent 70%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0B3D91, #062356)" }}>
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Aster Motors</h2>
                    <p className="text-xs text-zinc-500">Luxury Car Showroom</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Ultra-premium car showroom. Parallax hero, car configurator with day/night mode, EMI calculator, boutique shop, INR pricing. For auto dealerships.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Configurator", "EMI Calculator", "Detail Pages", "Test Drive", "Boutique Shop"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/20 text-blue-400/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>View Demo</span>
                  <span className="text-blue-400">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Hotel */}
          <Link href="/hotel" className="group relative block">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-amber-500/30 hover:bg-zinc-900/50">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ background: "radial-gradient(circle, #C27B3A, transparent 70%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C27B3A, #8B5A2B)" }}>
                    <Hotel className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">The Aethelgard</h2>
                    <p className="text-xs text-zinc-500">Luxury Hotel</p>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Cinematic luxury hotel. Parallax hero, room detail pages, booking wizard, dining showcase, AI concierge, testimonials. For premium hotels.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Parallax Hero", "Room Details", "Booking Wizard", "AI Concierge", "Dining"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ border: "1px solid rgba(194,123,58,0.3)", color: "rgba(194,123,58,0.8)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                  <span>View Demo</span>
                  <span style={{ color: "#C27B3A" }}>&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-center text-zinc-700 text-xs mt-16">
          Built with Next.js + Tailwind CSS + Framer Motion
        </p>
      </div>
    </main>
  );
}
