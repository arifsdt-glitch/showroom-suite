import type { Metadata } from "next";
import { BikesApp } from "@/components/bikes/BikesApp";

export const metadata: Metadata = {
  title: "AURORA Cycles — Premium Motorcycle Showroom",
  description: "High-performance motorcycles with configurator, EMI calculator, test ride booking, and immersive parallax experience.",
};

export default function BikesPage() {
  return <BikesApp />;
}
