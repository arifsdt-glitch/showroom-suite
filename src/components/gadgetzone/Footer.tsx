import { Smartphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
          >
            <Smartphone size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white/60">
            Gadget<span style={{ color: "#06b6d4" }}>Zone</span>
          </span>
        </div>
        <p className="text-xs text-white/25">
          &copy; 2025 GadgetZone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
