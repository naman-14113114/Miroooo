import Link from "next/link";
import { legalEntity } from "@/data/policies";

export function CartMinimalFooter() {
  return (
    <footer className="bg-[#080909] border-t border-[rgba(255,255,255,0.08)] py-8 px-4 text-center text-xs text-neutral-400">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex flex-wrap justify-center gap-6 text-neutral-400">
          <Link href="/policies/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/policies/terms-of-service" className="hover:text-white transition">
            Terms of Service
          </Link>
          <Link href="/policies/shipping-policy" className="hover:text-white transition">
            Shipping Policy
          </Link>
          <Link href="/policies/return-policy" className="hover:text-white transition">
            Return Policy
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Miroooo · {legalEntity.company}, {legalEntity.address}</p>
      </div>
    </footer>
  );
}
