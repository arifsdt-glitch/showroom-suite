import type { Metadata } from "next";
import { ClinicApp } from "@/components/clinic/ClinicApp";

export const metadata: Metadata = {
  title: "AURA ELITE — Premium Medical Centre",
  description: "World-class healthcare with doctor profiles, appointment booking, patient portal, and testimonials.",
};

export default function ClinicPage() {
  return <ClinicApp />;
}
