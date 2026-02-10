import type { Metadata } from "next";
import { CarsApp } from "@/components/cars/CarsApp";

export const metadata: Metadata = {
  title: "Aster Motors — Luxury Car Showroom",
  description: "Ultra-premium car showroom with configurator, day/night mode, EMI calculator, test drive booking, and boutique shop.",
};

export default function CarsPage() {
  return <CarsApp />;
}
