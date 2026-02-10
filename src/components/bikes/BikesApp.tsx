"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronRight, Menu, X, Star, Shield, Zap, ArrowRight, ArrowLeft,
  MapPin, Search, ShoppingBag, Check, Gauge, Phone, Mail,
  Instagram, Youtube, ChevronDown, Calculator, Palette, Settings,
  Send, Fuel, Weight, Timer,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

type BikeSpec = { label: string; value: string; icon?: React.ReactNode };

type Bike = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  desc: string;
  image: string;
  gallery: string[];
  specs: BikeSpec[];
  stat: { label: string; value: string };
  colors: { name: string; hex: string }[];
  category: "sport" | "touring" | "electric";
};

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const BIKES: Bike[] = [
  {
    id: "xr-1200",
    name: "Aurora XR 1200",
    tagline: "Track-Day Dominance",
    price: 18299,
    oldPrice: 19899,
    desc: "The Aurora XR blends track-day performance with grand touring comfort. 1200cc twin engine, active suspension, and rider-assist radar come standard. Carbon fibre bodywork sheds weight while the Brembo Stylema brakes deliver unmatched stopping power.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2670&auto=format&fit=crop",
    ],
    specs: [
      { label: "Engine", value: "1200cc Twin", icon: <Fuel className="w-4 h-4" /> },
      { label: "Horsepower", value: "145 HP", icon: <Zap className="w-4 h-4" /> },
      { label: "Torque", value: "104 Nm", icon: <Gauge className="w-4 h-4" /> },
      { label: "Weight", value: "215 kg", icon: <Weight className="w-4 h-4" /> },
    ],
    stat: { label: "Top Speed", value: "185 mph" },
    colors: [
      { name: "Obsidian Black", hex: "#1a1a1a" },
      { name: "Racing Red", hex: "#dc2626" },
      { name: "Arctic White", hex: "#f5f5f5" },
    ],
    category: "sport",
  },
  {
    id: "gt-limited",
    name: "Aurora GT Limited",
    tagline: "Endless Horizons",
    price: 22499,
    desc: "Built for the long haul. The GT Limited features heated grips, adaptive cruise control, and expanding panniers for cross-continent journeys. The 1800cc boxer engine delivers effortless power at any RPM, while the electronically adjustable windscreen keeps you comfortable mile after mile.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop",
    ],
    specs: [
      { label: "Engine", value: "1800cc Boxer", icon: <Fuel className="w-4 h-4" /> },
      { label: "Horsepower", value: "120 HP", icon: <Zap className="w-4 h-4" /> },
      { label: "Torque", value: "160 Nm", icon: <Gauge className="w-4 h-4" /> },
      { label: "Weight", value: "340 kg", icon: <Weight className="w-4 h-4" /> },
    ],
    stat: { label: "Range", value: "450 mi" },
    colors: [
      { name: "Midnight Blue", hex: "#1e3a5f" },
      { name: "Titanium Silver", hex: "#8b8b8b" },
      { name: "Desert Sand", hex: "#c2b280" },
    ],
    category: "touring",
  },
  {
    id: "ev-volo",
    name: "Aurora E-Volo",
    tagline: "Silent Velocity",
    price: 24999,
    oldPrice: 26500,
    desc: "Zero emissions, infinite thrills. The E-Volo redefines urban mobility with instant torque, AI flight-assist stability, and a 45-minute fast charge. Regenerative braking recovers energy on every ride, while the heads-up display keeps your eyes on the road.",
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop",
    ],
    specs: [
      { label: "Motor", value: "HyperCore Electric", icon: <Zap className="w-4 h-4" /> },
      { label: "Power", value: "180 HP Equiv.", icon: <Gauge className="w-4 h-4" /> },
      { label: "Torque", value: "200 Nm Instant", icon: <Timer className="w-4 h-4" /> },
      { label: "Charge", value: "45 Min (80%)", icon: <Fuel className="w-4 h-4" /> },
    ],
    stat: { label: "0-60 mph", value: "2.4s" },
    colors: [
      { name: "Neon Volt", hex: "#84cc16" },
      { name: "Stealth Grey", hex: "#404040" },
      { name: "Pure White", hex: "#ffffff" },
    ],
    category: "electric",
  },
];

const FEATURES = [
  { icon: Zap, title: "Advanced Tech", desc: "Cornering ABS, traction control, 6-axis IMU, and rider-assist radar come standard." },
  { icon: Shield, title: "5-Year Warranty", desc: "Comprehensive coverage on powertrain, electronics, and frame. We stand by our engineering." },
  { icon: Star, title: "0% APR Financing", desc: "Flexible plans from 12–60 months. Ride today, pay at your own pace." },
  { icon: MapPin, title: "Experience Centers", desc: "Visit our showrooms for a custom fitting, test ride, and complimentary espresso." },
];

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function RevealOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => { obs.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONFIGURATOR MODAL
   ═══════════════════════════════════════════ */

function ConfiguratorModal({ bike, isOpen, onClose }: { bike: Bike; isOpen: boolean; onClose: () => void }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [addons, setAddons] = useState<string[]>([]);

  const addonsList = [
    { id: "carbon", name: "Carbon Fibre Package", price: 2400 },
    { id: "quick", name: "Quick Shifter Pro", price: 890 },
    { id: "exhaust", name: "Titanium Exhaust System", price: 3200 },
    { id: "gps", name: "Integrated GPS Navigator", price: 1100 },
    { id: "heated", name: "Heated Grips & Seat", price: 650 },
  ];

  const toggleAddon = (id: string) => {
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const totalAddons = addonsList.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const totalPrice = bike.price + totalAddons;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-stone-950/95 backdrop-blur-sm border-b border-stone-800 p-6 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Settings className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Configure</span>
              </div>
              <h3 className="text-2xl font-serif text-white">{bike.name}</h3>
            </div>
            <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Color Selection */}
            <div>
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-500" /> Colour — {bike.colors[selectedColor].name}
              </h4>
              <div className="flex gap-4">
                {bike.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(i)}
                    className={`w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                      i === selectedColor ? "border-amber-500 scale-110 shadow-lg" : "border-stone-700 hover:border-stone-500"
                    }`}
                    style={{ background: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-800">
              <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `${bike.colors[selectedColor].hex}15`, mixBlendMode: "overlay" }} />
              <div className="absolute bottom-4 left-4 bg-stone-950/80 backdrop-blur px-4 py-2 rounded-lg border border-stone-700">
                <span className="text-xs text-stone-400">Selected: </span>
                <span className="text-sm text-white font-medium">{bike.colors[selectedColor].name}</span>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h4 className="text-white font-medium mb-4">Performance Add-ons</h4>
              <div className="space-y-3">
                {addonsList.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      addons.includes(addon.id)
                        ? "border-amber-600 bg-amber-600/10"
                        : "border-stone-800 bg-stone-900/50 hover:border-stone-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        addons.includes(addon.id) ? "border-amber-500 bg-amber-500" : "border-stone-600"
                      }`}>
                        {addons.includes(addon.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-stone-200">{addon.name}</span>
                    </div>
                    <span className="text-amber-500 font-medium">+${addon.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-stone-900 rounded-xl p-6 border border-stone-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-400">Base Price</span>
                <span className="text-white">${bike.price.toLocaleString()}</span>
              </div>
              {totalAddons > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-stone-400">Add-ons</span>
                  <span className="text-amber-500">+${totalAddons.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-stone-700 pt-3 mt-3 flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-2xl font-serif text-white">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-amber-600 text-white font-medium uppercase tracking-wider rounded-full hover:bg-amber-700 transition-colors">
              Submit Configuration Request
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   FINANCING CALCULATOR
   ═══════════════════════════════════════════ */

function FinancingCalc({ bike, isOpen, onClose }: { bike: Bike; isOpen: boolean; onClose: () => void }) {
  const [downPayment, setDownPayment] = useState(20);
  const [months, setMonths] = useState(36);
  const apr = months <= 12 ? 0 : months <= 24 ? 2.9 : months <= 36 ? 4.5 : 5.9;

  const principal = bike.price * (1 - downPayment / 100);
  const monthlyRate = apr / 100 / 12;
  const monthly = monthlyRate === 0
    ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-lg bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4 text-white/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Financing</span>
                </div>
                <h3 className="text-xl font-serif text-white">{bike.name}</h3>
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Down Payment */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-stone-400 text-sm">Down Payment</span>
                <span className="text-white font-bold">{downPayment}% — ${(bike.price * downPayment / 100).toLocaleString()}</span>
              </div>
              <input
                type="range" min={0} max={50} step={5} value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Term */}
            <div>
              <span className="text-stone-400 text-sm block mb-3">Loan Term</span>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      months === m
                        ? "bg-amber-600 text-white"
                        : "bg-stone-900 text-stone-400 border border-stone-800 hover:border-stone-600"
                    }`}
                  >
                    {m} mo
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="bg-stone-900 rounded-xl p-6 text-center border border-stone-800">
              <p className="text-stone-400 text-sm mb-2">Estimated Monthly Payment</p>
              <p className="text-4xl font-serif text-white mb-2">${Math.round(monthly).toLocaleString()}<span className="text-lg text-stone-500">/mo</span></p>
              <p className="text-xs text-stone-500">
                {apr === 0 ? "0% APR promotional rate" : `${apr}% APR for ${months} months`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-stone-900/50 rounded-xl p-4 border border-stone-800">
                <p className="text-xs text-stone-500 mb-1">Total Cost</p>
                <p className="text-white font-bold">${Math.round(monthly * months + bike.price * downPayment / 100).toLocaleString()}</p>
              </div>
              <div className="bg-stone-900/50 rounded-xl p-4 border border-stone-800">
                <p className="text-xs text-stone-500 mb-1">Interest Saved</p>
                <p className="text-amber-500 font-bold">{apr === 0 ? "100%" : `vs ${(apr + 3).toFixed(1)}% bank`}</p>
              </div>
            </div>

            <button className="w-full py-4 bg-amber-600 text-white font-medium uppercase tracking-wider rounded-full hover:bg-amber-700 transition-colors">
              Apply for Pre-Approval
            </button>

            <p className="text-[10px] text-stone-600 text-center">
              *Rates are indicative. Final terms subject to credit approval. 0% APR on 12-month term only.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   TEST RIDE BOOKING MODAL
   ═══════════════════════════════════════════ */

function BookingModal({ bike, isOpen, onClose }: { bike: Bike; isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-md bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-stone-800 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-serif text-white">Book a Test Ride</h3>
              <p className="text-stone-500 text-sm">{bike.name}</p>
            </div>
            <button onClick={onClose} className="text-stone-500 hover:text-white"><X className="w-6 h-6" /></button>
          </div>

          {!submitted ? (
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <input type="text" placeholder="Full Name" required className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-white placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors" />
              <input type="email" placeholder="Email Address" required className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-white placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-white placeholder-stone-600 focus:border-amber-600 focus:outline-none transition-colors" />
              <select className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-white focus:border-amber-600 focus:outline-none transition-colors">
                <option value="">Preferred Experience Center</option>
                <option>Manhattan Flagship</option>
                <option>Los Angeles Beverly Hills</option>
                <option>Miami Design District</option>
              </select>
              <button type="submit" className="w-full py-4 bg-amber-600 text-white font-medium uppercase tracking-wider rounded-full hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                Confirm Booking <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-600/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif text-white mb-2">You&apos;re All Set</h4>
              <p className="text-stone-400 text-sm mb-6">Our concierge will contact you within 2 hours to finalize your test ride with the {bike.name}.</p>
              <button onClick={onClose} className="px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors text-sm">
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT DETAIL PAGE
   ═══════════════════════════════════════════ */

function BikeDetailPage({
  bike,
  onBack,
  onBookRide,
  onConfigure,
  onFinance,
}: {
  bike: Bike;
  onBack: () => void;
  onBookRide: () => void;
  onConfigure: () => void;
  onFinance: () => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div className="animate-fade-in">
      {/* Immersive Hero */}
      <div ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <img src={bike.gallery[activeImg]} alt={bike.name} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 to-transparent" />

        {/* Back button */}
        <button onClick={onBack} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> <span className="text-sm">All Models</span>
        </button>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="inline-block px-3 py-1 bg-amber-600/20 border border-amber-600/40 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4 backdrop-blur-sm">
              {bike.tagline}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">{bike.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl text-white font-light">${bike.price.toLocaleString()}</span>
              {bike.oldPrice && (
                <span className="text-xl text-stone-500 line-through">${bike.oldPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={onBookRide} className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium uppercase tracking-wider hover:bg-amber-700 transition-all hover:scale-105 shadow-lg shadow-amber-900/30 flex items-center gap-2">
                Book Test Ride <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={onConfigure} className="px-8 py-4 bg-white text-stone-900 rounded-full font-medium uppercase tracking-wider hover:bg-stone-100 transition-all hover:scale-105 flex items-center gap-2">
                <Settings className="w-4 h-4" /> Configure
              </button>
              <button onClick={onFinance} className="px-8 py-4 border border-stone-600 text-stone-300 rounded-full font-medium uppercase tracking-wider hover:border-amber-500 hover:text-amber-500 transition-all flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Financing
              </button>
            </div>
          </motion.div>
        </div>

        {/* Gallery Dots */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-2">
          {bike.gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? "bg-amber-500 w-8" : "bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* Specs Section */}
      <div className="bg-stone-950 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Description */}
            <RevealOnScroll>
              <h2 className="text-3xl font-serif text-white mb-6">The Machine</h2>
              <p className="text-stone-400 leading-relaxed text-lg mb-8">{bike.desc}</p>
              <div className="bg-stone-900/50 rounded-2xl p-8 border border-stone-800">
                <div className="text-center mb-6">
                  <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">{bike.stat.label}</p>
                  <p className="text-5xl font-serif text-white">{bike.stat.value}</p>
                </div>
                <div className="h-px bg-stone-800 my-6" />
                <div className="grid grid-cols-2 gap-4">
                  {bike.specs.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="flex items-center justify-center gap-1 text-stone-500 text-xs uppercase tracking-wider mb-1">
                        {s.icon} {s.label}
                      </div>
                      <p className="text-white font-medium">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Gallery Grid */}
            <RevealOnScroll delay={200}>
              <div className="grid grid-cols-2 gap-3">
                {bike.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    className={`overflow-hidden rounded-xl border border-stone-800 cursor-pointer ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export function BikesApp() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState<string | null>(null);
  const [activeBikeIndex, setActiveBikeIndex] = useState(0);
  const [configOpen, setConfigOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "sport" | "touring" | "electric">("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const activeBike = BIKES[activeBikeIndex];
  const selectedBike = selectedBikeId ? BIKES.find((b) => b.id === selectedBikeId) || BIKES[0] : activeBike;
  const filteredBikes = filter === "all" ? BIKES : BIKES.filter((b) => b.category === filter);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // If viewing a bike detail page
  if (selectedBikeId) {
    const bike = BIKES.find((b) => b.id === selectedBikeId);
    if (bike) {
      return (
        <div className="bg-stone-950 min-h-screen text-stone-200 font-sans">
          {/* Nav stays */}
          <nav className="fixed w-full z-50 bg-stone-950/90 backdrop-blur-md py-4 border-b border-stone-800">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-700 hover:bg-stone-800 transition-colors" title="Home">
                  <ArrowLeft className="w-4 h-4 text-stone-400" />
                </Link>
                <div onClick={() => { setSelectedBikeId(null); window.scrollTo(0, 0); }} className="cursor-pointer flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold text-white tracking-tighter">AURORA<span className="text-amber-600">.</span></span>
                </div>
              </div>
            </div>
          </nav>
          <div className="pt-16">
            <BikeDetailPage
              bike={bike}
              onBack={() => { setSelectedBikeId(null); window.scrollTo(0, 0); }}
              onBookRide={() => setBookingOpen(true)}
              onConfigure={() => setConfigOpen(true)}
              onFinance={() => setFinanceOpen(true)}
            />
          </div>

          {/* CTA after detail */}
          <section className="py-24 bg-stone-900/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to feel the difference?</h2>
                <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto">Visit any Aurora Experience Center for a personal fitting, test ride, and complimentary espresso.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setBookingOpen(true)} className="px-10 py-5 bg-amber-600 text-white rounded-full font-medium uppercase tracking-wider hover:bg-amber-700 transition-all hover:scale-105 shadow-lg shadow-amber-900/30">
                    Book Test Ride
                  </button>
                  <button onClick={() => setFinanceOpen(true)} className="px-10 py-5 border border-stone-600 text-stone-300 rounded-full font-medium uppercase tracking-wider hover:border-amber-500 hover:text-amber-500 transition-all backdrop-blur">
                    Explore Financing
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <Footer />

          <ConfiguratorModal bike={bike} isOpen={configOpen} onClose={() => setConfigOpen(false)} />
          <FinancingCalc bike={bike} isOpen={financeOpen} onClose={() => setFinanceOpen(false)} />
          <BookingModal bike={bike} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
        </div>
      );
    }
  }

  return (
    <div className="bg-stone-950 min-h-screen text-stone-200 font-sans selection:bg-amber-900 selection:text-white overflow-x-hidden">

      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-stone-950/90 backdrop-blur-md py-4 shadow-2xl border-b border-stone-800" : "bg-transparent py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-700 hover:bg-stone-800 transition-colors" title="Back to selector">
              <ArrowLeft className="w-4 h-4 text-stone-400" />
            </Link>
            <div className="cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="text-2xl font-serif font-bold text-white tracking-tighter">AURORA<span className="text-amber-600">.</span></span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {["Motorcycles", "Configure", "Experience", "Financing"].map((item) => (
              <button
                key={item}
                className="hover:text-amber-500 transition-colors relative group text-stone-300"
                onClick={() => {
                  if (item === "Configure") { setConfigOpen(true); return; }
                  if (item === "Financing") { setFinanceOpen(true); return; }
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Search className="w-5 h-5 text-stone-400 hover:text-white cursor-pointer transition-colors" />
            <ShoppingBag className="w-5 h-5 text-stone-400 hover:text-white cursor-pointer transition-colors" />
            <button onClick={() => setBookingOpen(true)} className="ml-2 px-5 py-2 border border-stone-600 text-stone-300 rounded-full text-xs uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-colors">
              Book a Ride
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {["Motorcycles", "Configure", "Experience", "Financing"].map((item) => (
              <button key={item} className="text-2xl font-serif text-white hover:text-amber-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>{item}</button>
            ))}
            <button onClick={() => { setBookingOpen(true); setMobileMenuOpen(false); }} className="mt-4 px-8 py-4 bg-amber-600 text-white rounded-full font-medium uppercase tracking-wider">
              Book a Test Ride
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CINEMATIC HERO ─── */}
      <header ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2670&auto=format&fit=crop"
            alt="Premium Motorcycle"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/20 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-transparent z-[1]" />

        <motion.div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full" style={{ opacity: heroOpacity }}>
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block py-1 px-4 border border-amber-600/30 bg-amber-600/10 text-amber-400 rounded-full text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              The 2025 Collection
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-[0.9]"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Unleash the<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #d97706, #fbbf24)" }}>
              Beast.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-stone-300 mb-12 max-w-2xl font-light leading-relaxed"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Precision-engineered machines, tailored financing, and an unmatched service experience for the modern rider.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button onClick={() => setBookingOpen(true)} className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium uppercase tracking-wider hover:bg-amber-700 transition-all hover:scale-105 shadow-lg shadow-amber-900/30 flex items-center gap-2">
              Book a Test Ride <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => setConfigOpen(true)} className="px-8 py-4 bg-white text-stone-900 rounded-full font-medium uppercase tracking-wider hover:bg-stone-100 transition-all hover:scale-105">
              Configure Yours
            </button>
            <button onClick={() => setFinanceOpen(true)} className="px-8 py-4 text-stone-400 hover:text-white rounded-full font-medium uppercase tracking-wider transition-all flex items-center gap-2">
              Explore Financing <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-500 flex flex-col items-center gap-3 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-stone-600" />
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </header>

      {/* ─── TRUST STRIP ─── */}
      <div className="border-y border-stone-800 bg-stone-950/50 backdrop-blur-sm relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            {["RedDot Design Award", "TechCrunch Top Pick", "0% APR Available", "5-Year Warranty"].map((item) => (
              <span key={item} className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 hover:text-amber-500 transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PRODUCT SPOTLIGHT ─── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10" style={{ background: "radial-gradient(circle, #d97706, transparent 70%)" }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">The Lineup</h2>
              <div className="h-1 w-24 bg-amber-600 mx-auto mb-6" />
              <p className="text-stone-400 text-lg max-w-2xl mx-auto">Three machines. One philosophy: uncompromising performance meets refined luxury.</p>
            </div>
          </RevealOnScroll>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-16">
            {(["all", "sport", "touring", "electric"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all ${
                  filter === cat
                    ? "bg-amber-600 text-white"
                    : "bg-stone-900 text-stone-500 border border-stone-800 hover:border-stone-600 hover:text-stone-300"
                }`}
              >
                {cat === "all" ? "All Models" : cat}
              </button>
            ))}
          </div>

          {/* Bikes Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredBikes.map((bike, i) => (
                <motion.div
                  key={bike.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <RevealOnScroll delay={i * 150}>
                    <div
                      className="group bg-stone-900/40 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-600/40 transition-all duration-500 cursor-pointer"
                      onClick={() => { setSelectedBikeId(bike.id); window.scrollTo(0, 0); }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent opacity-60" />

                        {/* Floating Stat */}
                        <div className="absolute bottom-4 left-4 bg-stone-950/80 backdrop-blur border border-stone-700 px-4 py-2 rounded-lg">
                          <div className="text-[10px] text-stone-400 uppercase tracking-widest">{bike.stat.label}</div>
                          <div className="text-lg font-bold text-white flex items-center gap-1">
                            <Gauge className="w-4 h-4 text-amber-500" /> {bike.stat.value}
                          </div>
                        </div>

                        {bike.oldPrice && (
                          <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            SAVE ${(bike.oldPrice - bike.price).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">{bike.tagline}</span>
                        <h3 className="text-2xl font-serif text-white mt-2 mb-2">{bike.name}</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xl text-white font-light">${bike.price.toLocaleString()}</span>
                          {bike.oldPrice && <span className="text-stone-600 line-through text-sm">${bike.oldPrice.toLocaleString()}</span>}
                        </div>

                        {/* Mini Specs */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {bike.specs.slice(0, 2).map((s) => (
                            <div key={s.label} className="bg-stone-950 rounded-lg px-3 py-2 text-center">
                              <div className="text-[10px] text-stone-500 uppercase tracking-wider">{s.label}</div>
                              <div className="text-sm text-white font-medium">{s.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-stone-400 group-hover:text-amber-500 transition-colors flex items-center gap-2">
                            View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="flex gap-1">
                            {bike.colors.map((c) => (
                              <div key={c.name} className="w-4 h-4 rounded-full border border-stone-700" style={{ background: c.hex }} title={c.name} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 bg-stone-900/30 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Why Ride Aurora?</h2>
              <div className="h-1 w-24 bg-amber-600 mx-auto mb-6" />
              <p className="text-stone-400 text-lg max-w-2xl mx-auto">We don&apos;t just sell motorcycles. We curate a premium riding lifestyle.</p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <RevealOnScroll key={f.title} delay={i * 100}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full bg-stone-900/50 backdrop-blur-sm border border-stone-800 p-8 rounded-2xl hover:border-amber-600/50 transition-colors duration-300 group cursor-default"
                >
                  <div className="bg-stone-800 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors">
                    <f.icon className="text-stone-300 group-hover:text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">{f.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IMMERSIVE CTA ─── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558980664-3a031cf67ea8?q=80&w=2670&auto=format&fit=crop"
            alt="Riding lifestyle"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <RevealOnScroll>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Ready to ride<br />the future?
            </h2>
            <p className="text-xl text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the elite riders. Schedule a demo at our nearest showroom or configure your dream machine online today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => setBookingOpen(true)} className="px-10 py-5 bg-amber-600 text-white rounded-full font-medium uppercase tracking-wider hover:bg-amber-700 transition-all hover:scale-105 shadow-lg shadow-amber-900/30 text-lg">
                Build Your Bike
              </button>
              <button className="px-10 py-5 border border-stone-600 text-stone-300 rounded-full font-medium uppercase tracking-wider hover:border-amber-500 hover:text-amber-500 transition-all backdrop-blur text-lg">
                Find a Dealer
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />

      {/* ─── MODALS ─── */}
      <ConfiguratorModal bike={activeBike} isOpen={configOpen} onClose={() => setConfigOpen(false)} />
      <FinancingCalc bike={activeBike} isOpen={financeOpen} onClose={() => setFinanceOpen(false)} />
      <BookingModal bike={activeBike} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-stone-950 pt-20 pb-10 border-t border-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="text-2xl font-serif font-bold text-white mb-6 tracking-tighter">AURORA<span className="text-amber-600">.</span></div>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Premium motorcycles for the discerning rider. Designed in Milan, ridden globally.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-stone-500 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-stone-500 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-stone-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              {["Super Sport", "Grand Touring", "Electric", "Apparel & Gear"].map((i) => (
                <li key={i}><span className="hover:text-amber-500 transition-colors cursor-pointer">{i}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              {["About Us", "Journal", "Careers", "Contact"].map((i) => (
                <li key={i}><span className="hover:text-amber-500 transition-colors cursor-pointer">{i}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
            <p className="text-stone-500 text-sm mb-4">Subscribe for exclusive launches and event invites.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-stone-900 border border-stone-800 text-white px-4 py-3 rounded-l-xl focus:outline-none focus:border-amber-600 w-full text-sm" />
              <button className="bg-amber-600 px-4 py-3 rounded-r-xl hover:bg-amber-700 transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 gap-4">
          <p>&copy; 2025 Aurora Cycles. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-300 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
