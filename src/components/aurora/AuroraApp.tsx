"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Search, Menu, X, ChevronRight, Star, Smartphone,
  ShieldCheck, Truck, CreditCard, ArrowRight, ArrowLeft, RefreshCcw, Check,
  Headphones, Watch, Zap, Upload, Palette, Sparkles, Send
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

// --- Types ---
type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  monthlyPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  color: string;
  specs: string[];
  tag?: string;
  description: string;
  category: "flagship" | "accessory" | "refurbished" | "custom";
};

type ViewState = "home" | "product" | "cart" | "trade-in" | "studio";

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: "p1", name: "iPhone 16 Pro Max", brand: "Apple", price: 144900, monthlyPrice: 6038,
    rating: 4.9, reviews: 1240,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=800",
    color: "Natural Titanium", specs: ["A18 Pro Chip", "48MP Main", "1TB Storage"],
    tag: "Iconic", description: "Forged in aerospace-grade titanium. The most powerful iPhone ever created.",
    category: "flagship",
  },
  {
    id: "p2", name: "Galaxy S25 Ultra", brand: "Samsung", price: 129999, monthlyPrice: 5416,
    rating: 4.8, reviews: 980,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
    color: "Phantom Black", specs: ["Snapdragon 8 Gen 4", "200MP Wide", "S-Pen Integrated"],
    tag: "Powerhouse", description: "The ultimate Android experience. AI-enhanced photography meets productivity.",
    category: "flagship",
  },
  {
    id: "p3", name: "Pixel 9 Pro", brand: "Google", price: 109999, monthlyPrice: 4583,
    rating: 4.7, reviews: 650,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800",
    color: "Obsidian", specs: ["Tensor G4", "Super Res Zoom", "Magic Editor"],
    description: "Helpfulness built-in. The smartest smartphone camera.",
    category: "flagship",
  },
  {
    id: "p4", name: "OnePlus 13", brand: "OnePlus", price: 69999, monthlyPrice: 2916,
    rating: 4.6, reviews: 820,
    image: "https://images.unsplash.com/photo-1592950630581-03cb41342cc5?auto=format&fit=crop&q=80&w=800",
    color: "Midnight Ocean", specs: ["Snapdragon 8 Gen 4", "Hasselblad", "6000 mAh"],
    tag: "Value King", description: "Flagship killer. Hasselblad camera system with the biggest battery in its class.",
    category: "flagship",
  },
  {
    id: "a1", name: "AirPods Max", brand: "Apple", price: 59900, rating: 4.8, reviews: 2100,
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800",
    color: "Midnight", specs: ["Lossless Audio", "USB-C", "40hr Battery"],
    tag: "Best Seller", description: "The ultimate personal listening experience.",
    category: "accessory",
  },
  {
    id: "a2", name: "Galaxy Watch 7 Pro", brand: "Samsung", price: 44999, rating: 4.7, reviews: 850,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800",
    color: "Titanium", specs: ["BioActive Sensor", "Sapphire Crystal", "3-Day Battery"],
    description: "Your health journey, redefined.",
    category: "accessory",
  },
  {
    id: "a3", name: "MagSafe Charger Duo", brand: "Belkin", price: 12900, rating: 4.5, reviews: 320,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800",
    color: "White", specs: ["15W Fast Charge", "Travel Ready", "Weighted Base"],
    description: "Charge your essentials in style.",
    category: "accessory",
  },
  {
    id: "r1", name: "iPhone 15 Pro (Archive)", brand: "Apple", price: 85000, originalPrice: 134900,
    rating: 4.9, reviews: 5000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
    color: "Blue Titanium", specs: ["Certified Pre-Owned", "New Battery", "1-Year Warranty"],
    tag: "Certified", description: "Iconic design, restored to perfection.",
    category: "refurbished",
  },
  {
    id: "r2", name: "Galaxy S24 Ultra (Archive)", brand: "Samsung", price: 79999, originalPrice: 129999,
    rating: 4.8, reviews: 3200,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=800",
    color: "Titanium Grey", specs: ["Galaxy AI Ready", "Pristine Condition", "Box & Accessories"],
    tag: "Great Value", description: "Last year's flagship, today's best value.",
    category: "refurbished",
  },
];

// --- Header ---
function Header({ cartCount, onNav }: { cartCount: number; onNav: (v: ViewState) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = ["Flagships", "Accessories", "Archive", "Trade In"];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:bg-white/5 transition-colors" title="Back to selector">
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
          </Link>
          <div onClick={() => onNav("home")} className="cursor-pointer group flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300" />
            <span className="text-xl font-light tracking-[0.2em] text-white">AURORA</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Trade In") { onNav("trade-in"); return; }
                onNav("home");
                setTimeout(() => document.getElementById(item.toLowerCase().replace(" ", "-"))?.scrollIntoView({ behavior: "smooth" }), 100);
              }}
              className="text-xs uppercase tracking-widest font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <Search className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer transition-colors hidden md:block" />
          <div onClick={() => onNav("cart")} className="relative cursor-pointer group">
            <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <Menu className="md:hidden w-6 h-6 text-white cursor-pointer" onClick={() => setMobileOpen(true)} />
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-50 flex flex-col p-8">
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-light tracking-widest text-white">AURORA</span>
              <X className="w-8 h-8 text-zinc-400 cursor-pointer" onClick={() => setMobileOpen(false)} />
            </div>
            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  onClick={() => { item === "Trade In" ? onNav("trade-in") : onNav("home"); setMobileOpen(false); }}
                  className="text-4xl font-light text-zinc-300 hover:text-white cursor-pointer"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// --- Hero ---
function Hero({ onShopNow }: { onShopNow: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className="text-zinc-400 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8">
            The 2025 Collection
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tighter mb-10">
            Beyond <br />
            <span className="italic text-zinc-300" style={{ fontFamily: "Georgia, serif" }}>Intelligence.</span>
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
            <button onClick={onShopNow} className="group relative px-8 py-4 bg-white text-black overflow-hidden rounded-full transition-all hover:pr-12">
              <span className="relative z-10 text-sm font-bold tracking-widest uppercase">Explore Now</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
            </button>
            <button className="px-8 py-4 text-white text-sm tracking-widest uppercase border border-white/20 rounded-full hover:bg-white/5 transition-colors">
              Trade-In Estimate
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- Product Card ---
function ProductCard({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
        {product.tag && (
          <div className="absolute top-4 left-4 z-20">
            <span className="text-[10px] font-bold tracking-widest uppercase text-black bg-white/90 backdrop-blur px-3 py-1">
              {product.tag}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-2">{product.brand}</p>
          <h3 className="text-white text-xl font-light mb-1">{product.name}</h3>
          <div className="flex gap-3 items-baseline">
            <p className="text-zinc-400 text-sm">₹{product.price.toLocaleString()}</p>
            {product.originalPrice && (
              <p className="text-zinc-600 text-xs line-through">₹{product.originalPrice.toLocaleString()}</p>
            )}
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button type="button" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Trade-In ---
function TradeInEstimator({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const calculateValue = () => {
    setStep(2);
    setTimeout(() => { setEstimatedValue(48500); setStep(3); }, 2000);
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-12 max-w-3xl mx-auto text-center">
      <div className="flex justify-end mb-4">
        <button type="button" onClick={onCancel} className="text-zinc-500 hover:text-white uppercase text-xs tracking-widest">Close</button>
      </div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
            <div>
              <h2 className="text-3xl font-light text-white mb-2">Upgrade Privilege</h2>
              <p className="text-zinc-500">Select your current device for an instant valuation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500">Brand</label>
                <select title="Select brand" className="w-full bg-black border-b border-white/20 py-3 text-white focus:outline-none appearance-none">
                  <option>Apple</option><option>Samsung</option><option>Google</option><option>OnePlus</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500">Model</label>
                <select title="Select model" className="w-full bg-black border-b border-white/20 py-3 text-white focus:outline-none appearance-none">
                  <option>iPhone 15 Pro Max</option><option>iPhone 15 Pro</option><option>iPhone 15</option><option>iPhone 14 Pro</option>
                </select>
              </div>
            </div>
            <button type="button" onClick={calculateValue} className="bg-white text-black px-12 py-4 text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">
              Calculate Value
            </button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-2 border-zinc-800 border-t-white rounded-full animate-spin mb-8" />
            <p className="text-zinc-400 text-xs tracking-widest uppercase">Connecting to global markets...</p>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10">
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-4">Your device value</p>
            <div className="text-6xl md:text-7xl font-light text-white mb-8">₹{estimatedValue?.toLocaleString()}</div>
            <p className="text-zinc-400 max-w-lg mx-auto mb-12 font-light">This offer is valid for 7 days. Apply this credit directly to your purchase.</p>
            <div className="flex justify-center gap-6">
              <button type="button" className="bg-white text-black px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-zinc-200">Apply Credit</button>
              <button type="button" onClick={() => setStep(1)} className="text-white border-b border-white/20 pb-1 hover:border-white text-sm tracking-widest uppercase">Retake</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- AI Concierge ---
function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string; options?: string[] }[]>([
    { role: "ai", text: "Welcome to Aurora. I'm your dedicated shopping concierge. How can I elevate your experience today?", options: ["Show Flagships", "Trade-In Value", "Repair Status"] },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

  const handleOption = (opt: string) => {
    setMessages((prev) => [...prev, { role: "user", text: opt }]);
    setIsTyping(true);
    setTimeout(() => {
      let response = "I can certainly help with that. Let me look into it for you.";
      if (opt.includes("Flagships")) response = "Our top picks right now: iPhone 16 Pro Max in Natural Titanium and the Galaxy S25 Ultra. Both available for immediate pickup.";
      if (opt.includes("Trade")) response = "Excellent choice. We offer up to ₹48,500 for an iPhone 15 Pro Max in good condition. Shall I start an estimate?";
      if (opt.includes("Repair")) response = "Our express repair center handles screen replacements in 30 minutes. Walk-ins welcome, or I can book a slot for you.";
      if (opt.includes("Compare")) response = "The iPhone 16 Pro Max leads in video and battery. The S25 Ultra wins on zoom and S-Pen productivity. Both exceptional choices.";
      setMessages((prev) => [...prev, { role: "ai", text: response, options: ["Compare Phones", "Check EMI Options", "Visit Store"] }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Aurora AI</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Personal Concierge</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black rounded-tr-sm" : "bg-zinc-800 text-zinc-200 rounded-tl-sm border border-white/5"}`}>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.options && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.options.map((opt) => (
                          <button key={opt} type="button" onClick={() => handleOption(opt)} className="px-3 py-1.5 bg-black/20 hover:bg-black/40 border border-white/10 rounded-lg text-xs transition-colors">
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-2xl rounded-tl-sm p-4 border border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-zinc-950">
              <div className="relative">
                <input type="text" placeholder="Ask about specs, stock, or styling..." className="w-full bg-zinc-900 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-full text-black hover:bg-zinc-200 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-14 h-14 bg-black rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
        </div>
      </motion.button>
    </>
  );
}

// --- Main App ---
export function AuroraApp() {
  const [view, setView] = useState<ViewState>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [view]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView("product");
  };

  return (
    <div className="bg-black min-h-screen text-zinc-200 selection:bg-white selection:text-black overflow-x-hidden relative" style={{ fontFamily: "var(--font-sans)" }}>
      <Header cartCount={cart.length} onNav={setView} />
      <AIConcierge />

      {/* HOME */}
      {view === "home" && (
        <>
          <Hero onShopNow={() => document.getElementById("flagships")?.scrollIntoView({ behavior: "smooth" })} />

          {/* Editorial Hook */}
          <section className="py-32 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="text-zinc-500 text-xs tracking-[0.2em] uppercase">The Aurora Standard</h3>
                <p className="text-3xl md:text-4xl leading-tight font-light text-white">
                  We curate only the exceptional. Devices that represent the pinnacle of engineering, selected for the discerning few.
                </p>
                <div className="flex gap-12 pt-8 border-t border-white/10">
                  {[
                    { val: "0%", label: "Finance" },
                    { val: "24h", label: "Delivery" },
                    { val: "1Yr", label: "Extended Care" },
                  ].map((s) => (
                    <div key={s.label}>
                      <h4 className="text-white text-2xl font-light">{s.val}</h4>
                      <p className="text-zinc-500 text-xs uppercase tracking-wider mt-2">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[500px] w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:scale-105 transition-transform duration-1000" alt="Tech" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-white font-medium">Titanium & Glass</p>
                  <p className="text-zinc-500 text-sm">Material innovation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Flagships */}
          <section id="flagships" className="py-32 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight">Flagships</h2>
              <span className="text-sm tracking-widest uppercase border-b border-white pb-1 text-white mt-8 md:mt-0 cursor-pointer hover:text-zinc-300 transition-colors">View All</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {PRODUCTS.filter((p) => p.category === "flagship").map((p) => (
                <ProductCard key={p.id} product={p} onSelect={handleProductSelect} />
              ))}
            </div>
          </section>

          {/* Accessories */}
          <section id="accessories" className="py-32 max-w-[1400px] mx-auto px-6 md:px-12 border-b border-white/5">
            <div className="mb-16">
              <h3 className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-4">The Essentials</h3>
              <h2 className="text-4xl md:text-5xl font-light text-white">Curated Peripherals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PRODUCTS.filter((p) => p.category === "accessory").map((p) => (
                <ProductCard key={p.id} product={p} onSelect={handleProductSelect} />
              ))}
            </div>
          </section>

          {/* Archive */}
          <section id="archive" className="py-32 bg-zinc-900">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3 space-y-8">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <RefreshCcw className="w-8 h-8 text-black" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-light text-white leading-none">The<br />Archive</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Certified Pre-Owned devices. Rigorously inspected, fitted with new batteries and outer shells. Sustainable luxury at exceptional value.
                  </p>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PRODUCTS.filter((p) => p.category === "refurbished").map((p) => (
                    <ProductCard key={p.id} product={p} onSelect={handleProductSelect} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* WhatsApp CTA strip */}
          <section className="py-20 border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-light text-white mb-2">Need help choosing?</h3>
                <p className="text-zinc-500">Chat with us on WhatsApp for instant recommendations.</p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hi%20Aurora!%20I%27m%20looking%20for%20a%20new%20phone."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-3"
              >
                <Send className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </section>
        </>
      )}

      {/* PRODUCT DETAIL */}
      {view === "product" && selectedProduct && (
        <div className="pt-32 min-h-screen bg-zinc-950">
          <div className="max-w-[1400px] mx-auto px-6 mb-12 flex items-center gap-4 text-xs tracking-widest uppercase text-zinc-500">
            <span onClick={() => setView("home")} className="cursor-pointer hover:text-white">Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{selectedProduct.brand}</span>
          </div>

          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 pb-32">
            <div className="lg:sticky lg:top-32 h-fit">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="aspect-[4/5] bg-zinc-900 overflow-hidden relative">
                <img src={selectedProduct.image} className="w-full h-full object-cover opacity-90" alt={selectedProduct.name} />
                {selectedProduct.tag && (
                  <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {selectedProduct.tag}
                  </div>
                )}
              </motion.div>
            </div>

            <div className="py-8">
              <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">{selectedProduct.name}</h1>
              <div className="flex flex-col gap-2 mb-12 border-l border-white/20 pl-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light text-white">₹{selectedProduct.price.toLocaleString()}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xl text-zinc-500 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                {selectedProduct.monthlyPrice && (
                  <span className="text-zinc-500 text-sm">or ₹{selectedProduct.monthlyPrice.toLocaleString()}/mo with 0% finance</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-8 border-y border-white/10 py-8 mb-12">
                {selectedProduct.specs.map((spec, i) => (
                  <div key={i}>
                    <p className="text-white text-sm font-medium mb-1">{spec.split(" ")[0]}</p>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">{spec.split(" ").slice(1).join(" ")}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill={i < Math.floor(selectedProduct.rating) ? "#fff" : "none"} stroke="#fff" strokeWidth={1} />
                  ))}
                </div>
                <span className="text-zinc-400 text-sm">{selectedProduct.rating} ({selectedProduct.reviews.toLocaleString()} reviews)</span>
              </div>

              <p className="text-zinc-400 font-light leading-loose mb-12">{selectedProduct.description}</p>

              <button type="button" onClick={() => addToCart(selectedProduct)} className="w-full bg-white text-black h-16 text-sm font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors mb-3">
                Add to Bag
              </button>
              <p className="text-center text-zinc-500 text-xs">Dispatches within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      {/* TRADE IN */}
      {view === "trade-in" && (
        <div className="pt-40 pb-24 max-w-[1400px] mx-auto px-6 min-h-screen flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-light text-white mb-8 tracking-tighter">Exchange Program</h1>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
              Upgrade to the future. We offer market-leading value for your current device.
            </p>
          </motion.div>
          <div className="w-full"><TradeInEstimator onCancel={() => setView("home")} /></div>
        </div>
      )}

      {/* CART */}
      {view === "cart" && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setView("home")} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="w-full max-w-md bg-zinc-950 border-l border-white/10 p-12 flex flex-col relative z-10">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-light text-white">Your Selection</h2>
              <X onClick={() => setView("home")} className="w-6 h-6 text-zinc-500 hover:text-white cursor-pointer" />
            </div>
            <div className="flex-1 space-y-8 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-6 pb-8 border-b border-white/5">
                  <div className="w-20 h-24 bg-zinc-900 overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.name}</h4>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4">{item.color}</p>
                    <span className="text-white">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {cart.length === 0 && <p className="text-zinc-500 font-light">Your shopping bag is empty.</p>}
            </div>
            <div className="mt-auto pt-8">
              <div className="flex justify-between text-white text-xl font-light mb-8">
                <span>Total</span>
                <span>₹{cart.reduce((acc, i) => acc + i.price, 0).toLocaleString()}</span>
              </div>
              <button type="button" className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200">Checkout</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-24">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-8">
            <span className="text-2xl font-light tracking-[0.2em] text-white">AURORA</span>
            <p className="text-zinc-600 text-sm max-w-xs leading-relaxed">Defining the future of luxury mobile retail.</p>
          </div>
          <div className="flex gap-24">
            <div>
              <h5 className="text-white text-xs uppercase tracking-widest mb-6">Shop</h5>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Flagships</li>
                <li className="hover:text-white cursor-pointer transition-colors">Accessories</li>
                <li className="hover:text-white cursor-pointer transition-colors">Archive</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white text-xs uppercase tracking-widest mb-6">Support</h5>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">Trade In</li>
                <li className="hover:text-white cursor-pointer transition-colors">Repairs</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-white/5">
          <p className="text-zinc-700 text-xs">&copy; 2025 Aurora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
