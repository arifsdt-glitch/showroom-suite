import type { Metadata } from "next";
import { HotelApp } from "@/components/hotel/HotelApp";

export const metadata: Metadata = {
  title: "The Aethelgard — Luxury Hotel & Resort",
  description: "Cinematic luxury hotel with room details, booking wizard, dining showcase, curated experiences, and AI concierge.",
};

export default function HotelPage() {
  return <HotelApp />;
}
