import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";

export function CartMinimalHeader() {
  return (
    <header className="bg-[#080909] border-b border-[rgba(255,255,255,0.08)] py-4 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-black tracking-widest uppercase text-white hover:opacity-90 font-sans"
        >
          MIROOOO
        </Link>
        <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
          <Lock size={14} className="text-emerald-400" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>
    </header>
  );
}
