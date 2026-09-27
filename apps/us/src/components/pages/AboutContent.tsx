import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { legalEntity } from "@/data/policies";

export function AboutContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          Our Philosophy
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Oral Care, Elevated to Ritual
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed">
          We believe the objects you touch every single morning and evening should be crafted with
          calm intent, aerospace durability, and genuine clinical integrity.
        </p>
      </div>

      <div className="space-y-16">
        {/* Section 1: The Problem & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden bg-neutral-900 border border-[rgba(255,255,255,0.08)]">
            <Image
              src="/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp"
              alt="Miroooo in hand"
              width={700}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Eliminating Bathroom Clutter
            </h2>
            <p>
              Traditional electric toothbrushes are bulky, noisy plastic devices burdened with messy
              charging stands, short battery spans, and harsh vibrating motors that sound like power
              tools at 6:30 AM.
            </p>
            <p>
              Miroooo started with a blank page: what if a toothbrush was machined from unibody
              aerospace aluminum, operated below 50dB with linear acoustic precision, and lasted
              months between charges?
            </p>
          </div>
        </div>

        {/* Section 2: Clinical Precision */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-[rgba(255,255,255,0.08)] shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Sparkles size={16} />
            <span>Clinical Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The 45° Bass Method Standard
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            Dentists have long advocated the Bass Technique for sweeping plaque away from the gingival
            margin. Our flagship Miroooo X2 mechanics physically reproduce this sweeping motion at
            40,000 micro-vibrations per minute—protecting enamel while dramatically improving gum health.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <strong className="block text-white text-sm mb-1">51g Unibody</strong>
              <span className="text-xs text-neutral-400">CNC machined aerospace aluminum handle</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <strong className="block text-white text-sm mb-1">90-Day Battery</strong>
              <span className="text-xs text-neutral-400">Universal USB-C fast charging</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
              <strong className="block text-white text-sm mb-1">IPX7 Immersion</strong>
              <span className="text-xs text-neutral-400">100% submersible and shower safe</span>
            </div>
          </div>
        </div>

        {/* Section 3: Company info */}
        <div className="text-center py-6 space-y-4">
          <h3 className="text-lg font-bold text-white">United States Headquarters</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Operated by {legalEntity.company}, located at {legalEntity.address}. Dedicated US customer
            support available Mon-Fri 9am-5pm EST.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-xl"
            >
              <span>Explore The Collection</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
