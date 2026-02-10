import { Hero } from "@/components/gadgetzone/Hero";
import { TrustBadges } from "@/components/gadgetzone/TrustBadges";
import { FeaturedPhones } from "@/components/gadgetzone/FeaturedPhones";
import { Services } from "@/components/gadgetzone/Services";
import { WhyUs } from "@/components/gadgetzone/WhyUs";
import { ContactCTA } from "@/components/gadgetzone/ContactCTA";
import { Footer } from "@/components/gadgetzone/Footer";
import { Navbar } from "@/components/gadgetzone/Navbar";
import { WhatsAppButton } from "@/components/gadgetzone/WhatsAppButton";

export default function GadgetZonePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <TrustBadges />
      <FeaturedPhones />
      <Services />
      <WhyUs />
      <ContactCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
