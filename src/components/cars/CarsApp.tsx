"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, ArrowLeft, ChevronRight, ChevronDown, Play, ShieldCheck, Battery, Zap, Wind,
  Menu, X, Check, Sun, Moon, MapPin, Calendar, ShoppingBag, Plus, Star,
  Phone, Mail, Instagram, Youtube, Calculator, Gauge, Timer, Send,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════ */

const BRAND = { name: "Aster Motors", color: "#0B3D91" };

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

type CarModel = {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  specs: { range: string; accel: string; power: string; topSpeed: string };
  image: string;
  gallery: string[];
  type: string;
  desc: string;
  colors: { name: string; hex: string; price: number }[];
};

const CAR_MODELS: CarModel[] = [
  {
    id: "aster-gt",
    name: "Aster GT-X",
    tagline: "Grand Touring, Redefined.",
    basePrice: 12500000,
    specs: { range: "520 km", accel: "3.2s", power: "650 HP", topSpeed: "250 km/h" },
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1887&auto=format&fit=crop",
    ],
    type: "Sport",
    desc: "The all-new Aster GT-X combines track-bred performance with sanctuary-level silence. The dual-motor powertrain delivers 650 HP of instant torque while the air suspension reads the road 1,000 times per second. Carbon ceramic brakes, adaptive aero, and a hand-stitched Nappa leather interior come standard.",
    colors: [
      { name: "Midnight Blue", hex: "#0B3D91", price: 0 },
      { name: "Obsidian Black", hex: "#111111", price: 0 },
      { name: "Arctic White", hex: "#E2E2E2", price: 150000 },
      { name: "Liquid Silver", hex: "#9CA3AF", price: 150000 },
    ],
  },
  {
    id: "aster-suv",
    name: "Aster Sovereign",
    tagline: "Command the road.",
    basePrice: 18500000,
    specs: { range: "480 km", accel: "4.5s", power: "580 HP", topSpeed: "220 km/h" },
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1887&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1887&auto=format&fit=crop",
    ],
    type: "SUV",
    desc: "The Sovereign is a fortress of luxury. Three rows of executive seating, a panoramic starlight roof, and a 22-speaker Meridian sound system make every journey an event. The intelligent all-wheel-drive system and 580 HP powertrain handle any terrain with effortless composure.",
    colors: [
      { name: "Forest Green", hex: "#1a3a2a", price: 200000 },
      { name: "Obsidian Black", hex: "#111111", price: 0 },
      { name: "Pearl White", hex: "#f0ece2", price: 250000 },
      { name: "Bronze Metallic", hex: "#8B6914", price: 200000 },
    ],
  },
  {
    id: "aster-coupe",
    name: "Aster Zenith",
    tagline: "Pure driving pleasure.",
    basePrice: 9800000,
    specs: { range: "440 km", accel: "2.8s", power: "720 HP", topSpeed: "280 km/h" },
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=1887&auto=format&fit=crop",
    ],
    type: "Coupé",
    desc: "The Zenith is the purest expression of the Aster philosophy. A lightweight carbon monocoque chassis, rear-wheel drive, and 720 HP make this the fastest road car we have ever built. Limited to 200 units worldwide.",
    colors: [
      { name: "Racing Red", hex: "#dc2626", price: 300000 },
      { name: "Titanium Grey", hex: "#6b7280", price: 0 },
      { name: "Signal Yellow", hex: "#eab308", price: 300000 },
      { name: "Midnight Blue", hex: "#0B3D91", price: 0 },
    ],
  },
];

const SHOP_ITEMS = [
  { id: 1, name: "Aster Wallbox Home", price: 85000, category: "Charging", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2070&auto=format&fit=crop", tag: "Best Seller" },
  { id: 2, name: "Forged Carbon Rims", price: 450000, category: "Performance", image: "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=2070&auto=format&fit=crop", tag: "Set of 4" },
  { id: 3, name: "GT-X Touring Jacket", price: 25000, category: "Lifestyle", image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=2070&auto=format&fit=crop", tag: "New Season" },
  { id: 4, name: "Carbon Ceramic Brakes", price: 850000, category: "Performance", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070&auto=format&fit=crop", tag: "Track Ready" },
];

const CONFIG_WHEELS = [
  { name: '21" Aeroblade', price: 0 },
  { name: '22" Turbine Black', price: 250000 },
  { name: '22" Sport Diamond', price: 350000 },
];

const CONFIG_ADDONS = [
  { id: "panoramic", name: "Panoramic Starlight Roof", price: 180000 },
  { id: "hud", name: "Heads-Up Display", price: 95000 },
  { id: "sound", name: "Meridian 3D Sound (22-speaker)", price: 220000 },
  { id: "autopilot", name: "Full Self-Drive Hardware", price: 350000 },
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
    <div ref={ref} className={`transition-all duration-1000 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TEST DRIVE BOOKING MODAL
   ═══════════════════════════════════════════ */

function TestDriveModal({ car, isOpen, onClose }: { car: CarModel; isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", center: "", date: "" });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 25 }} className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center" style={{ background: "linear-gradient(135deg, #0B3D91, #062356)" }}>
            <div>
              <h3 className="text-xl font-serif text-white">Book a Test Drive</h3>
              <p className="text-white/60 text-sm">{car.name} — Step {step} of 2</p>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
          </div>

          {step === 1 && (
            <div className="p-6 space-y-4 animate-fade-in">
              <h4 className="text-white font-medium">Choose Your Experience</h4>
              <select value={formData.center} onChange={(e) => setFormData({ ...formData, center: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-[#0B3D91] focus:outline-none">
                <option value="" className="bg-black">Select Experience Center</option>
                <option value="mumbai" className="bg-black">Mumbai — Worli Flagship</option>
                <option value="delhi" className="bg-black">Delhi — Connaught Place</option>
                <option value="bangalore" className="bg-black">Bangalore — Whitefield</option>
                <option value="hyderabad" className="bg-black">Hyderabad — Jubilee Hills</option>
              </select>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-[#0B3D91] focus:outline-none" />
              <div className="flex justify-end pt-2">
                <button onClick={() => setStep(2)} className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2" style={{ background: "#0B3D91" }}>
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 space-y-4 animate-fade-in">
              <h4 className="text-white font-medium">Your Details</h4>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 focus:border-[#0B3D91] focus:outline-none" />
              <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 focus:border-[#0B3D91] focus:outline-none" />
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 focus:border-[#0B3D91] focus:outline-none" />
              <div className="flex justify-between pt-2">
                <button onClick={() => setStep(1)} className="px-6 py-3 text-white/50 hover:text-white text-sm">Back</button>
                <button onClick={() => setStep(3)} className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white" style={{ background: "#0B3D91" }}>
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-serif text-white mb-2">You&apos;re All Set</h4>
              <p className="text-white/50 text-sm mb-6">Our concierge will call you within 24 hours to confirm your {car.name} test drive experience.</p>
              <button onClick={onClose} className="px-8 py-3 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors">Close</button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   EMI CALCULATOR MODAL
   ═══════════════════════════════════════════ */

function EMICalculator({ car, isOpen, onClose }: { car: CarModel; isOpen: boolean; onClose: () => void }) {
  const [downPct, setDownPct] = useState(20);
  const [tenure, setTenure] = useState(60);
  const rate = tenure <= 36 ? 8.5 : tenure <= 60 ? 9.2 : 9.9;
  const principal = car.basePrice * (1 - downPct / 100);
  const monthlyRate = rate / 100 / 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayable = emi * tenure + car.basePrice * downPct / 100;
  const totalInterest = totalPayable - car.basePrice;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", damping: 25 }} className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6" style={{ background: "linear-gradient(135deg, #0B3D91, #062356)" }}>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-4 h-4 text-white/60" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">Aster Financial</span>
                </div>
                <h3 className="text-xl font-serif text-white">{car.name}</h3>
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white/50 text-sm">Down Payment</span>
                <span className="text-white font-bold">{downPct}% — {formatINR(car.basePrice * downPct / 100)}</span>
              </div>
              <input type="range" min={10} max={50} step={5} value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-[#0B3D91]" />
            </div>

            <div>
              <span className="text-white/50 text-sm block mb-3">Loan Tenure</span>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 60, 84].map((m) => (
                  <button key={m} onClick={() => setTenure(m)} className={`py-3 rounded-xl text-sm font-medium transition-all ${tenure === m ? "text-white" : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20"}`} style={tenure === m ? { background: "#0B3D91" } : {}}>
                    {m} mo
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <p className="text-white/50 text-sm mb-2">Monthly EMI</p>
              <p className="text-4xl font-serif text-white mb-2">{formatINR(Math.round(emi))}<span className="text-lg text-white/40">/mo</span></p>
              <p className="text-xs text-white/30">{rate}% p.a. for {tenure} months</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-white/40 mb-1">Ex-Showroom</p>
                <p className="text-white font-medium text-sm">{formatINR(car.basePrice)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-white/40 mb-1">Total Payable</p>
                <p className="text-white font-medium text-sm">{formatINR(Math.round(totalPayable))}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[10px] text-white/40 mb-1">Interest</p>
                <p className="font-medium text-sm" style={{ color: "#0B3D91" }}>{formatINR(Math.round(totalInterest))}</p>
              </div>
            </div>

            <button className="w-full py-4 text-white font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity" style={{ background: "#0B3D91" }}>
              Apply for Pre-Approval
            </button>
            <p className="text-[10px] text-white/20 text-center">*Rates are indicative. Final terms subject to credit approval by Aster Financial Services.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   CONFIGURATOR
   ═══════════════════════════════════════════ */

function ConfiguratorSection({ car }: { car: CarModel }) {
  const [activeColor, setActiveColor] = useState(car.colors[0]);
  const [activeWheel, setActiveWheel] = useState(CONFIG_WHEELS[0]);
  const [addons, setAddons] = useState<string[]>([]);
  const [view, setView] = useState<"exterior" | "interior">("exterior");
  const [lighting, setLighting] = useState<"day" | "night">("day");

  const toggleAddon = (id: string) => setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  const addonTotal = CONFIG_ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const totalPrice = car.basePrice + activeColor.price + activeWheel.price + addonTotal;

  return (
    <section id="configurator" className="py-24 border-y border-white/5" style={{ background: "#080808" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#0B3D91" }}>Bespoke</span>
          <h2 className="text-3xl lg:text-5xl font-serif text-white mt-4">Make it Yours</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Render Area */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: lighting === "day" ? "#121212" : "#020202" }}>
            <div className={`absolute inset-0 transition-colors duration-1000 ${lighting === "day" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-[#02050a] to-black"}`} />

            {/* Exterior */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${view === "exterior" ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              <img src={car.image} className="w-[85%] z-10 drop-shadow-2xl" style={{ filter: `brightness(${lighting === "night" ? 0.6 : 1}) contrast(1.1)` }} alt={car.name} />
              {lighting === "night" && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <div className="absolute top-[45%] left-[12%] w-24 h-24 bg-blue-100 blur-[60px] opacity-40" />
                  <div className="absolute top-[45%] right-[12%] w-24 h-24 bg-blue-100 blur-[60px] opacity-40" />
                </div>
              )}
            </div>

            {/* Interior */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${view === "interior" ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
              <div className="relative max-w-lg w-full">
                <img src={car.gallery[2]} className="rounded-lg shadow-2xl w-full" alt="Interior" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <p className="text-sm font-medium text-white">Nappa Leather — Tan</p>
                </div>
              </div>
            </div>

            {/* View Toggles */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/10 z-30">
              <button onClick={() => setView("exterior")} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${view === "exterior" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Ext</button>
              <button onClick={() => setView("interior")} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${view === "interior" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>Int</button>
            </div>

            {/* Lighting Toggle */}
            <button onClick={() => setLighting((p) => p === "day" ? "night" : "day")} className="absolute top-6 right-6 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white text-white hover:text-black transition-all z-30">
              {lighting === "day" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Selected Color Indicator */}
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 z-30 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-white/30" style={{ background: activeColor.hex }} />
              <span className="text-xs text-white">{activeColor.name}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            {/* Color */}
            <div>
              <div className="flex justify-between mb-3">
                <h4 className="text-sm font-bold tracking-widest uppercase text-white">Exterior Paint</h4>
                <span className="text-sm text-white/50">{activeColor.price > 0 ? formatINR(activeColor.price) : "Inclusive"}</span>
              </div>
              <p className="text-lg font-serif text-white mb-4">{activeColor.name}</p>
              <div className="flex gap-3">
                {car.colors.map((c) => (
                  <button key={c.name} onClick={() => setActiveColor(c)} className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${activeColor.name === c.name ? "border-white scale-110 shadow-lg" : "border-transparent hover:border-white/30"}`} style={{ background: c.hex }} title={c.name} />
                ))}
              </div>
            </div>

            {/* Wheels */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-3">Wheels</h4>
              <div className="space-y-2">
                {CONFIG_WHEELS.map((w) => (
                  <button key={w.name} onClick={() => setActiveWheel(w)} className={`w-full text-left p-4 rounded-xl border transition-all ${activeWheel.name === w.name ? "border-[#0B3D91] bg-[#0B3D91]/10" : "border-white/10 hover:border-white/30"}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-sm">{w.name}</span>
                      <div className="flex items-center gap-2">
                        {w.price > 0 && <span className="text-white/40 text-xs">+{formatINR(w.price)}</span>}
                        {activeWheel.name === w.name && <Check className="w-4 h-4" style={{ color: "#0B3D91" }} />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-3">Add-ons</h4>
              <div className="space-y-2">
                {CONFIG_ADDONS.map((a) => (
                  <button key={a.id} onClick={() => toggleAddon(a.id)} className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${addons.includes(a.id) ? "border-[#0B3D91] bg-[#0B3D91]/10" : "border-white/10 hover:border-white/30"}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${addons.includes(a.id) ? "border-[#0B3D91] bg-[#0B3D91]" : "border-white/30"}`}>
                          {addons.includes(a.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-white">{a.name}</span>
                      </div>
                      <span className="text-white/40 text-xs">+{formatINR(a.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-end mb-6">
                <span className="text-sm text-white/40 uppercase tracking-widest">Estimated Total</span>
                <div className="text-right">
                  <span className="text-3xl font-serif text-white block">{formatINR(totalPrice)}</span>
                  <span className="text-xs text-green-400">Delivery in 3-4 Weeks</span>
                </div>
              </div>
              <button className="w-full py-4 rounded-full font-bold uppercase tracking-widest text-black hover:scale-[1.02] transition-transform" style={{ background: "white", boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}>
                Reserve This Build
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CAR DETAIL PAGE
   ═══════════════════════════════════════════ */

function CarDetailPage({ car, onBack, onTestDrive, onEMI }: { car: CarModel; onBack: () => void; onTestDrive: () => void; onEMI: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
          <img src={car.gallery[activeImg]} alt={car.name} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />

        <button onClick={onBack} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> <span className="text-sm">All Models</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-4 inline-block backdrop-blur-sm" style={{ borderColor: "#0B3D9150", background: "#0B3D9120", color: "#6b9ff7" }}>{car.type}</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-2">{car.name}</h1>
            <p className="text-xl text-white/60 mb-6">{car.tagline}</p>
            <p className="text-2xl text-white mb-8">Starting at {formatINR(car.basePrice)}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={onTestDrive} className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-white hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg" style={{ background: "#0B3D91", boxShadow: "0 10px 30px rgba(11,61,145,0.4)" }}>
                Book Test Drive <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={onEMI} className="px-8 py-4 rounded-full font-bold uppercase tracking-wider text-white bg-white/10 backdrop-blur hover:bg-white/20 transition-all flex items-center gap-2">
                <Calculator className="w-4 h-4" /> EMI Calculator
              </button>
            </div>
          </motion.div>
        </div>

        {/* Gallery Dots */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-2">
          {car.gallery.map((_, i) => (
            <button key={i} onClick={() => setActiveImg(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? "w-8" : "bg-white/30 hover:bg-white/60"}`} style={i === activeImg ? { background: "#0B3D91" } : {}} />
          ))}
        </div>
      </div>

      {/* Specs + Description */}
      <div className="py-20" style={{ background: "#050505" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Spec Bar */}
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { label: "0-100 km/h", value: car.specs.accel, icon: <Timer className="w-5 h-5" /> },
                { label: "Range", value: car.specs.range, icon: <Battery className="w-5 h-5" /> },
                { label: "Power", value: car.specs.power, icon: <Zap className="w-5 h-5" /> },
                { label: "Top Speed", value: car.specs.topSpeed, icon: <Gauge className="w-5 h-5" /> },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center hover:border-[#0B3D91]/30 transition-colors">
                  <div className="flex justify-center mb-3 text-white/40">{s.icon}</div>
                  <div className="text-2xl font-serif text-white mb-1">{s.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <RevealOnScroll>
              <h2 className="text-3xl font-serif text-white mb-6">The Experience</h2>
              <p className="text-white/50 leading-relaxed text-lg mb-8">{car.desc}</p>
              <div className="space-y-4">
                {["Adaptive Air Suspension", "Carbon Ceramic Brakes", "Full Self-Drive Capable", "Over-the-Air Updates"].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <Check className="w-5 h-5 shrink-0" style={{ color: "#0B3D91" }} />
                    <span className="text-white/70">{f}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="grid grid-cols-2 gap-3">
                {car.gallery.map((img, i) => (
                  <motion.div key={i} className={`overflow-hidden rounded-xl border border-white/10 cursor-pointer ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`} whileHover={{ scale: 1.02 }} onClick={() => setActiveImg(i)}>
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

export function CarsApp() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [shopCategory, setShopCategory] = useState("All");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const selectedCar = selectedCarId ? CAR_MODELS.find((c) => c.id === selectedCarId) || CAR_MODELS[0] : CAR_MODELS[0];
  const filteredShop = shopCategory === "All" ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => i.category === shopCategory);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Detail Page
  if (selectedCarId) {
    const car = CAR_MODELS.find((c) => c.id === selectedCarId);
    if (car) {
      return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050505" }}>
          <nav className="fixed w-full z-50 bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                  <ArrowLeft className="w-4 h-4 text-white/50" />
                </Link>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedCarId(null); window.scrollTo(0, 0); }}>
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: "#0B3D91" }}>
                    <span className="font-serif italic font-bold text-lg text-white">A</span>
                  </div>
                  <span className="font-serif text-xl tracking-widest font-semibold text-white">ASTER</span>
                </div>
              </div>
            </div>
          </nav>

          <div className="pt-16">
            <CarDetailPage car={car} onBack={() => { setSelectedCarId(null); window.scrollTo(0, 0); }} onTestDrive={() => setTestDriveOpen(true)} onEMI={() => setEmiOpen(true)} />
            <ConfiguratorSection car={car} />

            <section className="py-24" style={{ background: "#050505" }}>
              <div className="max-w-4xl mx-auto px-6 text-center">
                <RevealOnScroll>
                  <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Experience the {car.name}</h2>
                  <p className="text-white/40 text-lg mb-10">Visit any Aster experience center for a personal consultation and test drive.</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button onClick={() => setTestDriveOpen(true)} className="px-10 py-5 rounded-full font-bold uppercase tracking-wider text-white hover:opacity-90 shadow-lg" style={{ background: "#0B3D91" }}>Book Test Drive</button>
                    <button onClick={() => setEmiOpen(true)} className="px-10 py-5 border border-white/20 text-white/70 rounded-full font-bold uppercase tracking-wider hover:border-white/40 hover:text-white transition-all backdrop-blur">EMI Calculator</button>
                  </div>
                </RevealOnScroll>
              </div>
            </section>

            <Footer />
          </div>

          <TestDriveModal car={car} isOpen={testDriveOpen} onClose={() => setTestDriveOpen(false)} />
          <EMICalculator car={car} isOpen={emiOpen} onClose={() => setEmiOpen(false)} />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen text-white font-sans selection:text-white overflow-x-hidden" style={{ background: "#050505" }}>

      {/* NAV */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:bg-white/10 transition-colors" title="Back">
              <ArrowLeft className="w-4 h-4 text-white/50" />
            </Link>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="w-8 h-8 rounded-sm flex items-center justify-center transition-transform hover:rotate-45" style={{ background: "#0B3D91" }}>
                <span className="font-serif italic font-bold text-lg text-white hover:-rotate-45 transition-transform">A</span>
              </div>
              <span className="font-serif text-xl tracking-widest font-semibold text-white">ASTER</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm tracking-wide font-medium text-white/70">
            {["Models", "Configurator", "Boutique", "Financing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group hover:text-white transition-colors py-1">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ background: "#0B3D91" }} />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button className="text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2 text-white/70">
              Sign In
              {cartCount > 0 && (
                <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-xs">
                  <ShoppingBag className="w-3 h-3" /> {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setTestDriveOpen(true)} className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:scale-105 transition-transform" style={{ boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}>
              Test Drive
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden" style={{ background: "#050505" }}>
            {["Models", "Configurator", "Boutique", "Financing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:opacity-70">{item}</a>
            ))}
            <button onClick={() => { setTestDriveOpen(true); setMobileMenuOpen(false); }} className="mt-4 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider">
              Test Drive
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <header ref={heroRef} className="relative w-full min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" alt="Aster GT Cinematic" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </motion.div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#0B3D91" }} /> 2026 Collection Available
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-serif text-5xl lg:text-8xl leading-[1.1] text-white">
              Engineered for<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #fff, rgba(255,255,255,0.5))" }}>Presence.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg lg:text-xl text-white/60 max-w-lg leading-relaxed">
              The all-new Aster GT-X combines track-bred performance with sanctuary-level silence. Designed for the discerning few.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#configurator" className="px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 group text-white hover:opacity-90" style={{ background: "#0B3D91", boxShadow: "0 10px 30px rgba(11,61,145,0.4)" }}>
                Configure Yours <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black text-sm font-bold tracking-wider uppercase transition-all backdrop-blur-sm flex items-center justify-center gap-2 text-white">
                <Play className="w-4 h-4 fill-current" /> Watch Film
              </button>
              <button onClick={() => setEmiOpen(true)} className="px-8 py-4 text-white/50 hover:text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4" /> EMI Calculator
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }} className="hidden lg:block col-span-5 relative">
            <div className="relative aspect-square rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/5 p-8">
              <div className="text-center space-y-4">
                <div className="text-4xl font-light font-serif text-white">3.2<span className="text-sm ml-1 font-sans opacity-50">s</span></div>
                <div className="w-12 h-[1px] bg-white/20 mx-auto" />
                <div className="text-xs tracking-widest uppercase text-white/50">0-100 km/h</div>
              </div>
              <div className="absolute inset-0 rounded-full border border-white/5 animate-spin" style={{ borderTopColor: "#0B3D91", animationDuration: "8s" }} />
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-3 z-10" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20" />
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </header>

      {/* MODELS */}
      <section id="models" className="py-32 relative" style={{ background: "#050505" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl lg:text-5xl font-serif text-white mb-4">The Collection</h2>
                <p className="text-white/50">Three legends. Crafted for every journey.</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CAR_MODELS.map((car, idx) => (
              <motion.div key={car.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }}>
                <div className="group relative rounded-2xl overflow-hidden bg-[#121212] hover:bg-[#1a1a1a] transition-all duration-500 border border-white/5 hover:border-[#0B3D91]/30 cursor-pointer" onClick={() => { setSelectedCarId(car.id); window.scrollTo(0, 0); }}>
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "#0B3D9120" }} />
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors">{car.type}</span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-white">{car.name}</h3>
                    <p className="text-white/40 text-sm mt-1 mb-6">{car.tagline}</p>

                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mb-6">
                      <div><div className="text-lg font-medium text-white">{car.specs.accel}</div><div className="text-[10px] text-white/30 uppercase">0-100</div></div>
                      <div><div className="text-lg font-medium text-white">{car.specs.range}</div><div className="text-[10px] text-white/30 uppercase">Range</div></div>
                      <div><div className="text-lg font-medium text-white">{car.specs.power}</div><div className="text-[10px] text-white/30 uppercase">Power</div></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">From <span className="text-white font-medium">{formatINR(car.basePrice)}</span></span>
                      <span className="font-bold text-xs tracking-widest uppercase flex items-center gap-1 group-hover:translate-x-2 transition-transform" style={{ color: "#0B3D91" }}>
                        Explore <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIGURATOR */}
      <ConfiguratorSection car={CAR_MODELS[0]} />

      {/* BOUTIQUE */}
      <section id="boutique" className="py-32 relative border-t border-white/5" style={{ background: "#050505" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#0B3D91" }}>Boutique</span>
              <h2 className="text-3xl lg:text-5xl font-serif text-white mt-4">Aster Lifestyle</h2>
            </div>
            <div className="flex gap-3">
              {["All", "Performance", "Charging", "Lifestyle"].map((cat) => (
                <button key={cat} onClick={() => setShopCategory(cat)} className={`text-sm px-4 py-2 rounded-full border transition-all ${shopCategory === cat ? "bg-white text-black border-white" : "border-white/10 text-white/50 hover:border-white/30"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="wait">
              {filteredShop.map((item, idx) => (
                <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: idx * 0.1 }} className="group relative bg-[#121212] rounded-xl overflow-hidden hover:bg-[#1a1a1a] transition-all duration-300">
                  <div className="aspect-square overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => setCartCount((c) => c + 1)} className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm" style={{ background: "#0B3D91" }}>{item.tag}</div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-white/30 mb-2 uppercase tracking-wide">{item.category}</div>
                    <h3 className="font-serif text-lg text-white mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">{formatINR(item.price)}</span>
                      <ShoppingBag className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <TestDriveModal car={selectedCar} isOpen={testDriveOpen} onClose={() => setTestDriveOpen(false)} />
      <EMICalculator car={selectedCar} isOpen={emiOpen} onClose={() => setEmiOpen(false)} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 text-sm" style={{ background: "#020202" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <span className="font-serif text-2xl tracking-widest font-semibold text-white block">ASTER</span>
            <p className="text-white/40 max-w-xs">Defining the future of Indian luxury mobility through design, silence, and performance.</p>
            <div className="flex gap-4 text-white/40">
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-6 text-xs">Vehicles</h4>
            <ul className="space-y-4 text-white/40">
              {CAR_MODELS.map((c) => <li key={c.id}><span className="hover:text-white transition-colors cursor-pointer">{c.name}</span></li>)}
              <li><span className="hover:text-white transition-colors cursor-pointer">Certified Pre-Owned</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-6 text-xs">Ownership</h4>
            <ul className="space-y-4 text-white/40">
              {["Service & Warranty", "Charging Network", "Aster Financial", "Insurance"].map((i) => (
                <li key={i}><span className="hover:text-white transition-colors cursor-pointer">{i}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-white mb-6 text-xs">Newsletter</h4>
            <p className="text-white/40 mb-4">Subscribe for exclusive launches and event invites.</p>
            <div className="flex border-b border-white/20 pb-2 focus-within:border-white transition-colors">
              <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-white placeholder:text-white/20 text-sm" />
              <button className="font-bold uppercase text-xs" style={{ color: "#0B3D91" }}>Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-white/5 text-white/20 gap-4">
          <p>&copy; 2026 Aster Motors India Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white/60 cursor-pointer">Privacy</span>
            <span className="hover:text-white/60 cursor-pointer">Legal</span>
            <span className="hover:text-white/60 cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
