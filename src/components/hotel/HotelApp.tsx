"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown, Star, ArrowRight, ArrowLeft, Menu, X, Check,
  MapPin, Phone, Instagram, Mail, Wine, Globe, Key,
  Calendar, Users, Sparkles, Clock, Shield, Heart,
  Send, MessageCircle, Wifi, Car, Coffee, Dumbbell,
  UtensilsCrossed, Waves,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  longDesc: string;
  features: string[];
  amenities: string[];
  sqft: number;
  maxGuests: number;
}

interface Experience {
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
  duration: string;
  price: number;
}

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

interface DiningVenue {
  name: string;
  cuisine: string;
  desc: string;
  image: string;
  hours: string;
  highlight: string;
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const BRAND = {
  name: "The Aethelgard",
  tagline: "Where Calm Arrives First",
  sub: "A private chapter in the city's story, written exclusively for those who know how to read it.",
  phone: "+91 22 4000 5000",
  email: "concierge@aethelgard.in",
  address: "12, Residency Road, Bengaluru, KA 560025",
};

const ACCENT = "#C27B3A";
const ACCENT_DARK = "#A0632E";

const ROOMS: Room[] = [
  {
    id: "royal-suite",
    name: "The Royal Suite",
    price: 45000,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1600",
    ],
    description: "Panoramic city views, private butler service, and a master sanctuary.",
    longDesc: "The Royal Suite is the crown jewel of The Aethelgard — 1800 square feet of curated luxury with floor-to-ceiling windows framing the city skyline. Every detail, from the hand-selected Italian marble to the bespoke Hermès linens, has been chosen to create an atmosphere of total serenity. Your private butler anticipates every need before you voice it.",
    features: ["1800 sq ft", "City View", "Butler Service", "Grand Piano"],
    amenities: ["Private Balcony", "Italian Marble Bath", "Walk-in Closet", "Bose Surround Sound", "Nespresso Machine", "Hermès Linens"],
    sqft: 1800,
    maxGuests: 4,
  },
  {
    id: "sanctuary-deluxe",
    name: "Sanctuary Deluxe",
    price: 22000,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1600",
    ],
    description: "Designed for deep rest with sound-proofed interiors and artisan linens.",
    longDesc: "The Sanctuary Deluxe is an exercise in intentional minimalism. Every surface, texture, and sound has been calibrated for one purpose: the deepest rest you've ever experienced. Sound-proofed walls, blackout curtains activated by a single touch, and a pillow menu curated by a sleep scientist.",
    features: ["550 sq ft", "Garden View", "Rain Shower"],
    amenities: ["Sound-Proofed Walls", "Smart Curtains", "Rain Shower", "Pillow Menu", "Yoga Mat", "Organic Minibar"],
    sqft: 550,
    maxGuests: 2,
  },
  {
    id: "garden-villa",
    name: "Garden Villa",
    price: 35000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1600",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1600",
    ],
    description: "A secluded haven amidst lush greenery with a private plunge pool.",
    longDesc: "Tucked behind a canopy of century-old banyans, the Garden Villa is your private estate within the city. A heated plunge pool, an outdoor rain shower, and a screened patio blur the line between indoors and nature. Morning chai arrives silently at your doorstep; the only alarm clock is birdsong.",
    features: ["900 sq ft", "Private Pool", "Patio", "Garden Access"],
    amenities: ["Heated Plunge Pool", "Outdoor Shower", "Screened Patio", "Fireplace", "Daybed", "Private Garden"],
    sqft: 900,
    maxGuests: 3,
  },
];

const EXPERIENCES: Experience[] = [
  {
    title: "The Private Gallery",
    desc: "After-hours access to the city's modern art museum with a personal curator guiding you through rare collections.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
    icon: <Globe className="w-5 h-5" />,
    duration: "3 hours",
    price: 15000,
  },
  {
    title: "Culinary Journey",
    desc: "Private dining with Michelin-star Chef Arjun Gupta in your suite. A seven-course tasting menu paired with rare vintages.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
    icon: <Wine className="w-5 h-5" />,
    duration: "4 hours",
    price: 25000,
  },
  {
    title: "The Golden Hour",
    desc: "Sunset jazz on the rooftop terrace, reserved exclusively for residents. Champagne, canapés, and the city at your feet.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
    icon: <Star className="w-5 h-5" />,
    duration: "2 hours",
    price: 8000,
  },
];

const DINING: DiningVenue[] = [
  {
    name: "Saffron & Smoke",
    cuisine: "Modern Indian",
    desc: "Deconstructed Indian cuisine with molecular techniques. Our signature Raan Confit has been featured in Condé Nast Traveller.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200",
    hours: "7:00 PM – 11:00 PM",
    highlight: "Signature: 48hr Raan Confit",
  },
  {
    name: "The Verandah",
    cuisine: "Continental Breakfast",
    desc: "A sun-drenched colonial verandah serving artisanal breads, cold-pressed juices, and a live egg station overlooking the gardens.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1200",
    hours: "6:30 AM – 10:30 AM",
    highlight: "Farm-to-table ingredients",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "I've stayed at the Ritz, the Aman, the Oberoi. The Aethelgard is different — it doesn't try to impress you. It simply understands you. The silence here is its own luxury.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    location: "New Delhi",
    text: "The Garden Villa was otherworldly. Waking up to birdsong, my own plunge pool, and chai arriving without asking — this is what hospitality should be.",
    rating: 5,
    avatar: "AM",
  },
  {
    name: "Kavita Desai",
    location: "London",
    text: "Chef Arjun's private dining was the highlight of our anniversary. Seven courses, each more extraordinary than the last. The Aethelgard is a masterpiece.",
    rating: 5,
    avatar: "KD",
  },
];

const AMENITIES_LIST = [
  { icon: <Wifi className="w-5 h-5" />, label: "High-Speed WiFi" },
  { icon: <Car className="w-5 h-5" />, label: "Valet Parking" },
  { icon: <Coffee className="w-5 h-5" />, label: "24/7 Room Service" },
  { icon: <Dumbbell className="w-5 h-5" />, label: "Fitness Centre" },
  { icon: <UtensilsCrossed className="w-5 h-5" />, label: "Fine Dining" },
  { icon: <Waves className="w-5 h-5" />, label: "Infinity Pool" },
  { icon: <Shield className="w-5 h-5" />, label: "24/7 Security" },
  { icon: <Key className="w-5 h-5" />, label: "Concierge" },
];

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/* ═══════════════════════════════════════════
   SCROLL REVEAL COMPONENT
   ═══════════════════════════════════════════ */

function RevealOnScroll({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */

export function HotelApp() {
  const [view, setView] = useState<"home" | "room-detail" | "booking">("home");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const openRoom = (room: Room) => {
    setSelectedRoom(room);
    setView("room-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setView("home");
    setSelectedRoom(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HomeView
              onOpenRoom={openRoom}
              onBooking={() => setBookingOpen(true)}
              mobileNav={mobileNav}
              setMobileNav={setMobileNav}
            />
          </motion.div>
        )}
        {view === "room-detail" && selectedRoom && (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RoomDetailView room={selectedRoom} onBack={goHome} onBooking={() => setBookingOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingOpen && (
          <BookingModal
            room={selectedRoom}
            onClose={() => setBookingOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* AI Concierge */}
      <AIConcierge open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />

      {/* Back to Showroom */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
        }}
      >
        <ArrowLeft className="w-3 h-3" />
        Suite
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME VIEW
   ═══════════════════════════════════════════ */

function HomeView({
  onOpenRoom,
  onBooking,
  mobileNav,
  setMobileNav,
}: {
  onOpenRoom: (room: Room) => void;
  onBooking: () => void;
  mobileNav: boolean;
  setMobileNav: (v: boolean) => void;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  return (
    <>
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-5" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="text-xl tracking-[0.25em] uppercase text-white font-semibold"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            The Aethelgard
          </div>
          <div className="hidden md:flex gap-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {["Suites", "Dining", "Experiences", "Gallery"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ background: ACCENT }} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onBooking}
              className="hidden md:block px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Reserve
            </button>
            <button className="md:hidden text-white" onClick={() => setMobileNav(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button onClick={() => setMobileNav(false)} className="absolute top-6 right-6 text-white">
              <X className="w-6 h-6" />
            </button>
            {["Suites", "Dining", "Experiences", "Gallery"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileNav(false)}
                className="text-2xl tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => { setMobileNav(false); onBooking(); }}
              className="mt-8 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white"
              style={{ background: ACCENT }}
            >
              Reserve Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero ─── */}
      <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
            alt="The Aethelgard"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

        <motion.div
          className="relative h-full flex flex-col justify-center items-center text-center px-6 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm font-semibold tracking-[0.35em] uppercase mb-8"
            style={{ color: ACCENT }}
          >
            Est. 2024 &nbsp;&middot;&nbsp; Bengaluru
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] max-w-5xl mb-8"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {BRAND.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed italic mb-12"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {BRAND.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onBooking}
              className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Check Availability
            </button>
            <a
              href="#suites"
              className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-white border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Explore Suites
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="h-12 w-[1px]" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT})` }} />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
        </motion.div>
      </div>

      {/* ─── Philosophy ─── */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <RevealOnScroll>
            <div className="relative aspect-[3/4] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                className="object-cover w-full h-full transition-transform duration-[1.2s] group-hover:scale-105"
                alt="Hotel Interior"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="lg:pl-8">
              <span
                className="font-semibold tracking-[0.25em] uppercase text-xs block mb-8"
                style={{ color: ACCENT }}
              >
                The Philosophy
              </span>
              <h2
                className="text-4xl md:text-6xl text-neutral-900 mb-10 leading-[1.05]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Architecture of{" "}
                <span className="italic font-light">Silence</span>
              </h2>
              <div className="space-y-6 text-lg font-light text-neutral-500 leading-relaxed">
                <p>
                  In a city that never pauses, we offer the pause. The Aethelgard was not built to impress, but to embrace.
                </p>
                <p>
                  Every texture, sound, and shadow has been curated to help you return to the essential. This is not merely a hotel; it is a private chapter in the city&apos;s story, written exclusively for those who know how to read it.
                </p>
              </div>
              <div className="mt-10 w-16 h-[2px]" style={{ background: ACCENT }} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Amenities Strip ─── */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {AMENITIES_LIST.map((a, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                    {a.icon}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">{a.label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Suites ─── */}
      <section id="suites" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-20">
              <span className="font-semibold tracking-[0.25em] uppercase text-xs block mb-6" style={{ color: ACCENT }}>
                Accommodations
              </span>
              <h2 className="text-4xl md:text-6xl text-neutral-900 mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Private Sanctuaries
              </h2>
              <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                Three distinct categories of rooms, each designed as a standalone residence within the city.
              </p>
              <div className="mt-8 w-12 h-[2px] mx-auto" style={{ background: ACCENT }} />
            </div>
          </RevealOnScroll>

          <div className="space-y-24">
            {ROOMS.map((room, i) => (
              <RevealOnScroll key={room.id} delay={0.1}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={`relative aspect-[4/3] overflow-hidden group cursor-pointer ${i % 2 === 1 ? "lg:order-2" : ""}`} onClick={() => onOpenRoom(room)}>
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/95 backdrop-blur text-neutral-900 py-3 text-center text-xs font-bold uppercase tracking-widest">
                        View Suite
                      </div>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">
                      {room.features.join("  &middot;  ")}
                    </span>
                    <h3
                      className="text-3xl md:text-4xl text-neutral-900 mb-4 cursor-pointer hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                      onClick={() => onOpenRoom(room)}
                    >
                      {room.name}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed mb-6">
                      {room.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-8" style={i % 2 === 1 ? { justifyContent: "flex-end" } : {}}>
                      <span className="text-2xl font-semibold" style={{ color: ACCENT, fontFamily: "var(--font-playfair), serif" }}>
                        {formatINR(room.price)}
                      </span>
                      <span className="text-sm text-neutral-400">/ night</span>
                    </div>
                    <div className="flex gap-3" style={i % 2 === 1 ? { justifyContent: "flex-end" } : {}}>
                      <button
                        onClick={() => onOpenRoom(room)}
                        className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                        style={{ background: ACCENT }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={onBooking}
                        className="px-8 py-3 text-xs font-bold uppercase tracking-widest border transition-all hover:bg-neutral-900 hover:text-white"
                        style={{ borderColor: "#e5e5e5" }}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Full-Bleed Image Divider ─── */}
      <ParallaxDivider
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
        text="Where Every Detail Whispers Luxury"
      />

      {/* ─── Dining ─── */}
      <section id="dining" className="py-32 px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-20">
              <span className="font-semibold tracking-[0.25em] uppercase text-xs block mb-6" style={{ color: ACCENT }}>
                Gastronomy
              </span>
              <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
                A Feast for the Senses
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Two culinary destinations, each with its own philosophy, united by an obsession with the exceptional.
              </p>
              <div className="mt-8 w-12 h-[2px] mx-auto" style={{ background: ACCENT }} />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {DINING.map((d, i) => (
              <RevealOnScroll key={i} delay={i * 0.15}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden mb-8">
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5" style={{ background: ACCENT, color: "#fff" }}>
                        {d.cuisine}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl mb-3 text-white" style={{ fontFamily: "var(--font-playfair), serif" }}>{d.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{d.desc}</p>
                  <div className="flex items-center justify-between text-xs text-white/40 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {d.hours}</span>
                    <span style={{ color: ACCENT }}>{d.highlight}</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experiences ─── */}
      <section id="experiences" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <span className="font-semibold tracking-[0.25em] uppercase text-xs block mb-4" style={{ color: ACCENT }}>
                  Curated Living
                </span>
                <h2 className="text-4xl md:text-6xl text-neutral-900 leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Beyond the Stay
                </h2>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-neutral-200">
            {EXPERIENCES.map((exp, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="group border-r border-b border-neutral-200 p-10 hover:bg-neutral-50 transition-colors duration-500 cursor-pointer h-full">
                  <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT }}>
                    {exp.icon}
                  </div>
                  <h3 className="text-xl mb-3 text-neutral-900" style={{ fontFamily: "var(--font-playfair), serif" }}>{exp.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6">{exp.desc}</p>

                  <div className="relative h-44 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4 text-neutral-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exp.duration}</span>
                      <span style={{ color: ACCENT }}>{formatINR(exp.price)}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold uppercase tracking-widest text-neutral-900 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Reserve</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="font-semibold tracking-[0.25em] uppercase text-xs block mb-6" style={{ color: ACCENT }}>
                Guest Voices
              </span>
              <h2 className="text-4xl md:text-5xl text-neutral-900" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Words That Humble Us
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-6xl mb-8 italic text-neutral-200" style={{ fontFamily: "var(--font-playfair), serif" }}>&ldquo;</div>
                  <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-10 italic" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {TESTIMONIALS[testimonialIdx].text}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {Array.from({ length: TESTIMONIALS[testimonialIdx].rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: ACCENT }} />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: ACCENT }}
                    >
                      {TESTIMONIALS[testimonialIdx].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{TESTIMONIALS[testimonialIdx].name}</p>
                      <p className="text-xs text-neutral-400">{TESTIMONIALS[testimonialIdx].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-3 mt-12">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: i === testimonialIdx ? ACCENT : "#d4d4d4",
                      transform: i === testimonialIdx ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Contact & CTA ─── */}
      <section className="py-32 px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <RevealOnScroll>
              <div>
                <span className="font-semibold tracking-[0.25em] uppercase text-xs block mb-6" style={{ color: ACCENT }}>
                  Get in Touch
                </span>
                <h2 className="text-4xl md:text-5xl mb-10 leading-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Your Journey Begins With a Conversation
                </h2>
                <div className="space-y-6 text-white/50">
                  <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                    <span>{BRAND.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                    <span>{BRAND.phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
                    <span>{BRAND.email}</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                  {[Instagram, Globe].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10">
                <h3 className="text-xl mb-8" style={{ fontFamily: "var(--font-playfair), serif" }}>Quick Inquiry</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-2 block">Name</label>
                      <input className="w-full bg-transparent border-b border-white/20 pb-3 text-sm outline-none focus:border-white/50 transition-colors text-white placeholder:text-white/20" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-2 block">Email</label>
                      <input className="w-full bg-transparent border-b border-white/20 pb-3 text-sm outline-none focus:border-white/50 transition-colors text-white placeholder:text-white/20" placeholder="you@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-2 block">Message</label>
                    <textarea className="w-full bg-transparent border-b border-white/20 pb-3 text-sm outline-none focus:border-white/50 transition-colors resize-none h-24 text-white placeholder:text-white/20" placeholder="Tell us about your ideal stay..." />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                    style={{ background: ACCENT }}
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg tracking-[0.25em] uppercase text-white/30" style={{ fontFamily: "var(--font-playfair), serif" }}>
            The Aethelgard
          </div>
          <div className="text-xs text-white/20 uppercase tracking-wider">
            &copy; 2026 The Aethelgard Hotel. All rights reserved.
          </div>
          <div className="flex gap-8 text-xs text-white/20 uppercase tracking-wider">
            <span className="hover:text-white/50 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════
   PARALLAX DIVIDER
   ═══════════════════════════════════════════ */

function ParallaxDivider({ image, text }: { image: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <div ref={ref} className="relative h-[60vh] overflow-hidden" id="gallery">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={image} alt="Divider" className="w-full h-[130%] object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-center justify-center px-6">
        <h2
          className="text-3xl md:text-5xl text-white text-center max-w-3xl italic"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOM DETAIL VIEW
   ═══════════════════════════════════════════ */

function RoomDetailView({ room, onBack, onBooking }: { room: Room; onBack: () => void; onBooking: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* Hero */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={room.gallery[activeImg]}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        <motion.div
          className="absolute bottom-12 left-0 right-0 px-6"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Suites
            </button>
            <h1
              className="text-4xl md:text-6xl text-white mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {room.name}
            </h1>
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <span>{room.sqft} sq ft</span>
              <span>&middot;</span>
              <span>Up to {room.maxGuests} guests</span>
              <span>&middot;</span>
              <span style={{ color: ACCENT }} className="text-lg font-semibold">{formatINR(room.price)}<span className="text-sm text-white/40"> / night</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gallery thumbnails */}
      <div className="bg-neutral-950 py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto">
          {room.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className="relative w-24 h-16 shrink-0 overflow-hidden transition-all"
              style={{
                opacity: i === activeImg ? 1 : 0.4,
                border: i === activeImg ? `2px solid ${ACCENT}` : "2px solid transparent",
              }}
            >
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <RevealOnScroll>
              <h2 className="text-3xl mb-6 text-neutral-900" style={{ fontFamily: "var(--font-playfair), serif" }}>About This Suite</h2>
              <p className="text-neutral-500 leading-relaxed text-lg mb-12">{room.longDesc}</p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h3 className="text-xl mb-6 text-neutral-900" style={{ fontFamily: "var(--font-playfair), serif" }}>Amenities</h3>
              <div className="grid grid-cols-2 gap-4 mb-12">
                {room.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-neutral-600">
                    <Check className="w-4 h-4 shrink-0" style={{ color: ACCENT }} />
                    <span className="text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <h3 className="text-xl mb-6 text-neutral-900" style={{ fontFamily: "var(--font-playfair), serif" }}>Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {room.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden group cursor-pointer" onClick={() => setActiveImg(i)}>
                    <img src={img} alt={`${room.name} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-neutral-50 border border-neutral-200 p-8">
                <div className="text-center mb-6">
                  <span className="text-3xl font-semibold" style={{ color: ACCENT, fontFamily: "var(--font-playfair), serif" }}>{formatINR(room.price)}</span>
                  <span className="text-sm text-neutral-400 block mt-1">per night</span>
                </div>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Check-in</label>
                    <input type="date" className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Check-out</label>
                    <input type="date" className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Guests</label>
                    <select className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400 transition-colors bg-white">
                      {Array.from({ length: room.maxGuests }).map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={onBooking}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                  style={{ background: ACCENT }}
                >
                  Reserve This Suite
                </button>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">Need Help?</h4>
                <p className="text-sm text-neutral-500 mb-4">Our concierge team is available 24/7 to assist with your reservation.</p>
                <div className="flex items-center gap-3 text-sm" style={{ color: ACCENT }}>
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">{BRAND.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════
   BOOKING MODAL
   ═══════════════════════════════════════════ */

function BookingModal({ room, onClose }: { room: Room | null; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(room?.id || "");
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const steps = ["Select Suite", "Your Details", "Confirmation"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="text-xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {step < 2 ? "Reserve Your Stay" : "Booking Confirmed"}
          </h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        {step < 2 && (
          <div className="flex items-center px-6 py-4 border-b border-neutral-100">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: i <= step ? ACCENT : "#e5e5e5",
                      color: i <= step ? "#fff" : "#999",
                    }}
                  >
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className={`text-xs uppercase tracking-wider ${i <= step ? "text-neutral-900 font-semibold" : "text-neutral-400"}`}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && <div className="w-12 h-[1px] mx-3" style={{ background: i < step ? ACCENT : "#e5e5e5" }} />}
              </div>
            ))}
          </div>
        )}

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-4 mb-6">
                  {ROOMS.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRoom(r.id)}
                      className="flex items-center gap-4 p-4 border cursor-pointer transition-all"
                      style={{
                        borderColor: selectedRoom === r.id ? ACCENT : "#e5e5e5",
                        background: selectedRoom === r.id ? `${ACCENT}08` : "transparent",
                      }}
                    >
                      <img src={r.image} alt={r.name} className="w-20 h-14 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{r.name}</h4>
                        <p className="text-xs text-neutral-500">{r.features.join(" · ")}</p>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: ACCENT }}>{formatINR(r.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Check-in</label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Check-out</label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400 bg-white"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  disabled={!selectedRoom}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: ACCENT }}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-5 mb-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Full Name</label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400"
                        placeholder="+91 98xxx xxxxx"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1 block">Special Requests</label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full border border-neutral-200 rounded px-3 py-2.5 text-sm outline-none focus:border-neutral-400 resize-none h-20"
                      placeholder="Allergies, celebrations, airport transfer..."
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(0)}
                    className="px-8 py-4 text-xs font-bold uppercase tracking-widest border border-neutral-200 text-neutral-600 transition-all hover:bg-neutral-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                    style={{ background: ACCENT }}
                  >
                    Confirm Reservation
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
                  <Check className="w-8 h-8" style={{ color: ACCENT }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Your Reservation is Confirmed
                </h3>
                <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                  A confirmation has been sent to your email. Our concierge will reach out within 24 hours to personalize your stay.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 p-6 text-left max-w-sm mx-auto mb-8">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Suite</span>
                      <span className="font-semibold">{ROOMS.find(r => r.id === selectedRoom)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Check-in</span>
                      <span className="font-semibold">{formData.checkIn || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Check-out</span>
                      <span className="font-semibold">{formData.checkOut || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Guests</span>
                      <span className="font-semibold">{formData.guests}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                  style={{ background: ACCENT }}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   AI CONCIERGE
   ═══════════════════════════════════════════ */

function AIConcierge({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Good evening. I'm your personal concierge at The Aethelgard. How may I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = [
    "Suite availability",
    "Dining reservations",
    "Airport transfer",
    "Spa appointment",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thank you for your inquiry. Our concierge team will attend to this personally. In the meantime, I can help you with suite reservations, dining, or curated experiences.",
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105"
        style={{ background: ACCENT }}
      >
        {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5 text-white" />}
      </button>

      {/* Chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] max-h-[500px] bg-white border border-neutral-200 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-neutral-100 flex items-center gap-3" style={{ background: `${ACCENT}08` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Concierge</h4>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Available 24/7</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[85%] px-4 py-3 text-sm leading-relaxed"
                    style={{
                      background: m.role === "user" ? ACCENT : "#f5f5f5",
                      color: m.role === "user" ? "#fff" : "#333",
                      borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-neutral-100 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask your concierge..."
                className="flex-1 text-sm px-3 py-2 border border-neutral-200 rounded-full outline-none focus:border-neutral-400 transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-90"
                style={{ background: ACCENT }}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
