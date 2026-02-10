"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Shield,
  Menu,
  X,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Activity,
  Heart,
  Stethoscope,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  Quote,
} from "lucide-react";

/* ── Data ── */

interface Doctor {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  credentials: string;
  availability: string;
}

const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Elena Vance",
    role: "Chief of Cardiology",
    specialty: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    bio: "Pioneering minimally invasive cardiac procedures with over 15 years of experience at top-tier institutions.",
    credentials: "MD, PhD, FACC",
    availability: "Mon, Wed, Fri",
  },
  {
    id: 2,
    name: "Dr. James Sterling",
    role: "Neurology Specialist",
    specialty: "Neurology",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
    bio: "Expert in neuro-regenerative medicine, focusing on personalized treatment plans for complex neurological conditions.",
    credentials: "MD, FAAN",
    availability: "Tue, Thu, Sat",
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    role: "Dermatologic Surgeon",
    specialty: "Dermatology",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
    bio: "Blending aesthetic precision with medical expertise to deliver natural, rejuvenating results.",
    credentials: "MD, FAAD",
    availability: "Mon, Tue, Fri",
  },
];

interface Service {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    title: "Executive Health",
    desc: "Comprehensive, same-day health screenings tailored for busy executives.",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    title: "Advanced Cardiology",
    desc: "State-of-the-art diagnostics and preventative heart care strategies.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Regenerative Medicine",
    desc: "Cutting-edge therapies focused on longevity and cellular rejuvenation.",
    icon: <Stethoscope className="w-6 h-6" />,
  },
  {
    title: "Concierge Primary Care",
    desc: "24/7 access to your dedicated physician with extended appointment times.",
    icon: <User className="w-6 h-6" />,
  },
];

const TESTIMONIALS = [
  {
    text: "The level of care at Aura is unlike anything I've experienced. It feels more like a 5-star hotel than a clinic, yet the medical expertise is world-class.",
    author: "Jonathan R.",
    role: "CEO, TechTextiles",
  },
  {
    text: "Dr. Vance saved my life, not just with surgery, but with a plan that changed my lifestyle. The concierge team handled every detail.",
    author: "Margaret T.",
    role: "Private Client",
  },
];

/* ── Sub-components ── */

function RevealOnScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "px-6 py-3 rounded-none font-medium transition-all duration-300 flex items-center justify-center gap-2 tracking-wide text-sm uppercase";
  const variants: Record<string, string> = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900",
    secondary:
      "bg-transparent border border-slate-900 text-slate-900 hover:bg-slate-50",
    accent: "bg-amber-700 text-white hover:bg-amber-800 border border-amber-700",
    outline:
      "bg-transparent border border-white text-white hover:bg-white/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function SectionHeading({
  sub,
  title,
  align = "center",
  light = false,
}: {
  sub: string;
  title: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <span
        className={`block text-xs font-bold tracking-[0.2em] uppercase mb-3 ${
          light ? "text-amber-400" : "text-amber-700"
        }`}
      >
        {sub}
      </span>
      <h2
        className={`text-3xl md:text-4xl font-serif leading-tight ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <div
        className={`h-1 w-20 mt-6 ${align === "center" ? "mx-auto" : ""} ${
          light ? "bg-amber-400" : "bg-amber-700"
        }`}
      />
    </div>
  );
}

/* ── Booking Modal ── */

function BookingModal({
  isOpen,
  onClose,
  preselectedDoctor,
}: {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor: string | null;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    doctor: preselectedDoctor || "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (preselectedDoctor) {
      setFormData((prev) => ({ ...prev, doctor: preselectedDoctor }));
    }
  }, [preselectedDoctor]);

  if (!isOpen) return null;

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-serif text-xl">Request Consultation</h3>
            <p className="text-slate-400 text-sm mt-1">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto flex-grow">
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <h4 className="text-lg font-medium text-slate-900">
                Choose Service &amp; Provider
              </h4>
              <div className="grid gap-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Service Type
                  </span>
                  <select
                    className="mt-2 block w-full border-gray-300 bg-slate-50 p-3 border focus:ring-amber-600 focus:border-amber-600 outline-none transition-colors"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  >
                    <option value="">Select a medical service...</option>
                    {SERVICES.map((s, i) => (
                      <option key={i} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Preferred Physician
                  </span>
                  <select
                    className="mt-2 block w-full border-gray-300 bg-slate-50 p-3 border focus:ring-amber-600 focus:border-amber-600 outline-none transition-colors"
                    value={formData.doctor}
                    onChange={(e) =>
                      setFormData({ ...formData, doctor: e.target.value })
                    }
                  >
                    <option value="">No preference / First Available</option>
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} — {d.specialty}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <h4 className="text-lg font-medium text-slate-900">
                Preferred Availability
              </h4>
              <p className="text-sm text-slate-500">
                Our concierge team will confirm the exact time with you shortly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 hover:border-amber-600 cursor-pointer transition-colors bg-slate-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-slate-900">Morning</span>
                  </div>
                  <p className="text-xs text-slate-500">8:00 AM – 12:00 PM</p>
                </div>
                <div className="p-4 border border-slate-200 hover:border-amber-600 cursor-pointer transition-colors bg-slate-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-amber-700" />
                    <span className="font-bold text-slate-900">Afternoon</span>
                  </div>
                  <p className="text-xs text-slate-500">12:00 PM – 5:00 PM</p>
                </div>
              </div>
              <label className="block mt-4">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Specific Date Request (Optional)
                </span>
                <input
                  type="date"
                  className="mt-2 block w-full border-gray-300 bg-slate-50 p-3 border focus:ring-amber-600 focus:border-amber-600 outline-none"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-slide-up">
              <h4 className="text-lg font-medium text-slate-900">
                Contact Details
              </h4>
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-gray-300 bg-slate-50 p-3 border focus:ring-amber-600 focus:border-amber-600 outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border-gray-300 bg-slate-50 p-3 border focus:ring-amber-600 focus:border-amber-600 outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border-gray-300 bg-slate-50 p-3 border focus:ring-amber-600 focus:border-amber-600 outline-none"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex items-start gap-2 mt-4">
                <Shield className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs text-slate-500">
                  Your data is encrypted and secure. By proceeding, you agree to
                  our Privacy Policy (HIPAA Compliant).
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 animate-slide-up">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif text-slate-900 mb-2">
                Request Received
              </h4>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Thank you, {formData.name}. Our care concierge has received your
                request and will contact you at {formData.email} within 2 hours
                to confirm your appointment.
              </p>
              <Button onClick={onClose} variant="primary">
                Return to Homepage
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between shrink-0">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="px-4 py-2 text-slate-500 font-medium hover:text-slate-800"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            <Button onClick={nextStep} variant="accent">
              {step === 3 ? "Confirm Request" : "Next Step"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Export ── */

export function ClinicApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = (doctorName: string | null = null) => {
    setSelectedDoctor(doctorName);
    setIsBookingOpen(true);
  };

  const NavLink = ({
    page,
    label,
  }: {
    page: string;
    label: string;
  }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
        window.scrollTo(0, 0);
      }}
      className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-amber-600 ${
        currentPage === page ? "text-amber-600" : "text-slate-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="font-sans text-slate-600 antialiased bg-white min-h-screen flex flex-col" style={{ color: "#475569" }}>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white/80 py-2 px-4 md:px-8 text-xs flex justify-between items-center z-50 relative">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" /> HIPAA Compliant
          </span>
          <span className="hidden md:flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" /> Voted #1 Private Clinic
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setCurrentPage("portal")}
            className="hover:text-white transition-colors"
          >
            Patient Portal
          </button>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-3 h-3" /> 212-555-0199
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`sticky top-0 w-full z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm"
            : "bg-white border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo + Back */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentPage("home")}
            >
              <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
                A
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-slate-900 leading-none tracking-tight">
                  AURA ELITE
                </h1>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-amber-700 font-bold">
                  Medical Group
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink page="home" label="Home" />
            <NavLink page="services" label="Expertise" />
            <NavLink page="doctors" label="Physicians" />
            <NavLink page="portal" label="Portal" />
            <Button
              variant="primary"
              onClick={() => openBooking()}
              className="ml-4 py-2 px-5 text-xs"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-8 flex flex-col gap-6 md:hidden animate-fade-in">
          <NavLink page="home" label="Home" />
          <NavLink page="services" label="Medical Services" />
          <NavLink page="doctors" label="Our Physicians" />
          <NavLink page="portal" label="Patient Portal" />
          <div className="h-px bg-slate-100 w-full my-2" />
          <Button
            onClick={() => {
              openBooking();
              setMobileMenuOpen(false);
            }}
            variant="primary"
            className="w-full"
          >
            Book Appointment
          </Button>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-grow">
        {currentPage === "home" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2000"
                  alt="Doctor consulting with patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/10" />
              </div>

              <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16">
                <div className="max-w-2xl text-white">
                  <div
                    className="flex items-center gap-3 mb-6 animate-slide-up"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <span className="px-3 py-1 bg-amber-600/20 border border-amber-600/50 text-amber-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                      Accepting New Patients
                    </span>
                  </div>
                  <h1
                    className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-6 animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    World-class care,
                    <br />
                    locally delivered.
                  </h1>
                  <p
                    className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-lg animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    Personalised treatment plans from specialists — within
                    private suites designed for your comfort and corporate
                    concierge support.
                  </p>
                  <div
                    className="flex flex-col sm:flex-row gap-4 animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <Button variant="accent" onClick={() => openBooking()}>
                      Book a Consultation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage("services")}
                    >
                      Explore Services
                    </Button>
                  </div>

                  {/* Trust Bar */}
                  <div
                    className="mt-16 flex items-center gap-8 text-slate-400 text-sm font-medium animate-slide-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-500" />
                      <span>JCI Accredited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <span>4.9/5 Patient Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
            </section>

            {/* Statistics Bar */}
            <div className="bg-slate-900 border-t border-white/10 py-12">
              <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: "Years of Excellence", val: "15+" },
                    { label: "Patients Served", val: "50k+" },
                    { label: "Board Certified", val: "100%" },
                    { label: "Private Suites", val: "24" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-serif text-white font-bold mb-1">
                        {stat.val}
                      </div>
                      <div className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <section className="py-24" style={{ backgroundColor: "#f8fafc" }}>
              <div className="container mx-auto px-4 md:px-8">
                <SectionHeading
                  sub="Clinical Excellence"
                  title="Comprehensive Care Pillars"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {SERVICES.map((s, i) => (
                    <RevealOnScroll key={i}>
                      <div className="bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-amber-600 group h-full flex flex-col">
                        <div className="w-12 h-12 bg-slate-100 text-slate-900 group-hover:bg-amber-600 group-hover:text-white rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                          {s.icon}
                        </div>
                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                          {s.title}
                        </h3>
                        <p className="text-slate-500 mb-6 leading-relaxed text-sm flex-grow">
                          {s.desc}
                        </p>
                        <button
                          onClick={() => setCurrentPage("services")}
                          className="text-amber-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all mt-auto"
                        >
                          Learn More <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Doctor */}
            <section className="py-24 bg-white overflow-hidden">
              <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2 relative">
                    <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50" />
                    <RevealOnScroll>
                      <img
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000"
                        alt="Dr. Vance"
                        className="relative z-10 w-full rounded-sm shadow-2xl"
                      />
                    </RevealOnScroll>
                    <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 z-20 shadow-xl max-w-xs hidden md:block">
                      <p className="font-serif italic text-lg mb-2">
                        &ldquo;Medicine is an art form rooted in science. Every
                        patient deserves a masterpiece.&rdquo;
                      </p>
                      <p className="text-amber-500 text-sm font-bold uppercase tracking-widest">
                        — Dr. Elena Vance
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <RevealOnScroll>
                      <SectionHeading
                        sub="Meet Our Experts"
                        title="Physicians at the Top of Their Field"
                        align="left"
                      />
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Aura Elite Medical recruits only the top 1% of
                        specialists. Our physicians are leaders in research,
                        active in academia, and dedicated to a patient-first
                        philosophy that prioritizes listening over rushing.
                      </p>

                      <div className="space-y-6 mb-10">
                        <div className="flex gap-4 items-start">
                          <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Board Certified Specialists
                            </h4>
                            <p className="text-sm text-slate-500">
                              Double and triple-board certified physicians across
                              all departments.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-slate-900">
                              Collaborative Care Model
                            </h4>
                            <p className="text-sm text-slate-500">
                              Our doctors consult with each other to form a
                              holistic view of your health.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => setCurrentPage("doctors")}
                        variant="primary"
                      >
                        View All Physicians
                      </Button>
                    </RevealOnScroll>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="container mx-auto px-4 md:px-8 relative z-10">
                <SectionHeading
                  sub="Patient Stories"
                  title="Voices of Trust"
                  light={true}
                />
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {TESTIMONIALS.map((t, i) => (
                    <RevealOnScroll key={i}>
                      <div className="bg-white/5 p-8 border border-white/10 rounded-sm hover:bg-white/10 transition-colors duration-300">
                        <Quote className="w-8 h-8 text-amber-500 mb-6 opacity-50" />
                        <p className="text-lg leading-relaxed text-slate-200 italic mb-6">
                          &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                            {t.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold font-serif">
                              {t.author}
                            </div>
                            <div className="text-xs text-amber-500 uppercase tracking-widest">
                              {t.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === "services" && (
          <div className="animate-fade-in pb-24">
            <div className="bg-slate-900 text-white py-20 px-4">
              <div className="container mx-auto max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-serif mb-6">
                  Medical Services
                </h1>
                <p className="text-xl text-slate-300 font-light">
                  Combining advanced technology with compassionate care to treat
                  the whole person, not just the symptom.
                </p>
              </div>
            </div>
            <div className="container mx-auto px-4 md:px-8 -mt-10 grid gap-8">
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-8 md:p-12 shadow-lg border-l-4 border-amber-600 flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="p-4 bg-slate-50 rounded-full text-amber-700 shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">
                      {s.title}
                    </h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {s.desc} Includes full diagnostic panel, consultation with
                      chief specialist, and a personalized 12-month care
                      roadmap.
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3 mb-6">
                      {[
                        "Specialized Diagnostics",
                        "Preventative Strategy",
                        "Minimally Invasive Options",
                        "Post-Care Monitoring",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button variant="secondary" onClick={() => openBooking()}>
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "doctors" && (
          <div className="animate-fade-in pb-24">
            <div className="bg-slate-900 text-white py-20 px-4">
              <div className="container mx-auto max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-serif mb-6">
                  Our Physicians
                </h1>
                <p className="text-xl text-slate-300 font-light">
                  Meet the world-class team dedicated to your well-being.
                </p>
              </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DOCTORS.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <div className="h-80 overflow-hidden relative">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                        {doc.specialty}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="mb-2">
                        <h3 className="text-xl font-serif font-bold text-slate-900">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-amber-700 font-medium mb-4">
                          {doc.credentials}
                        </p>
                      </div>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                        {doc.bio}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 bg-slate-50 p-2 rounded">
                        <Calendar className="w-4 h-4" /> Available:{" "}
                        <span className="text-slate-700 font-medium">
                          {doc.availability}
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => openBooking(doc.name)}
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === "portal" && (
          <div
            className="min-h-[70vh] flex items-center justify-center px-4 py-20 animate-fade-in"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div className="max-w-md w-full bg-white shadow-xl p-8 border-t-4 border-amber-600">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-serif font-bold text-slate-900">
                  Patient Portal
                </h1>
                <p className="text-slate-500 text-sm mt-2">
                  Secure access to your medical records and appointments.
                </p>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email / Medical ID
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-3 bg-slate-50 focus:border-amber-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 p-3 bg-slate-50 focus:border-amber-600 outline-none"
                  />
                </div>
                <Button variant="primary" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-center text-xs text-slate-400 mb-4">
                  Or continue with
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-slate-200 p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Google
                  </button>
                  <button className="border border-slate-200 p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Apple
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> End-to-end encrypted &amp;
                  HIPAA Compliant
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
            <div>
              <div className="w-12 h-12 bg-white text-slate-900 flex items-center justify-center font-serif text-xl font-bold rounded-sm mb-6">
                A
              </div>
              <h2 className="text-xl font-serif font-bold mb-4">AURA ELITE</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Setting the gold standard in private healthcare. Your health is
                our only priority.
              </p>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <Facebook className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <button
                    onClick={() => setCurrentPage("home")}
                    className="hover:text-white"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("services")}
                    className="hover:text-white"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("doctors")}
                    className="hover:text-white"
                  >
                    Find a Doctor
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage("portal")}
                    className="hover:text-white"
                  >
                    Patient Portal
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>
                    100 Park Avenue, Suite 2500
                    <br />
                    New York, NY 10017
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>+1 (212) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-amber-600" />
                  <span>concierge@auraelite.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-6">
                Newsletter
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Latest medical insights delivered to your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-slate-800 border-none text-white px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button className="bg-amber-700 text-white px-4 py-2 hover:bg-amber-600 transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>&copy; 2024 Aura Elite Medical Group. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-slate-300 cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-slate-300 cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:text-slate-300 cursor-pointer">
                Sitemap
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctor={selectedDoctor}
      />
    </div>
  );
}
