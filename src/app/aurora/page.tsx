import type { Metadata } from "next";
import { AuroraApp } from "@/components/aurora/AuroraApp";

export const metadata: Metadata = {
  title: "AURORA — Luxury Phone Store",
  description: "An editorial luxury phone store with parallax hero, product pages, cart, trade-in flow, and AI concierge.",
};

export default function AuroraPage() {
  return <AuroraApp />;
}
