"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { mobileShopLinks, mobileToolsLinks, secondaryNavigation } from "@/data/navigation";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[6000] flex flex-col justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={drawerRef}
        className="w-full max-h-[88vh] overflow-y-auto bg-[#141515] border-t border-[rgba(255,255,255,0.12)] rounded-t-[32px] text-white shadow-2xl p-6 md:p-8 transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab bar indicator */}
        <div className="w-12 h-1.5 bg-neutral-600 rounded-full mx-auto mb-6" />

        {/* Header row */}
        <div className="flex items-center justify-between pb-5 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">MIROOOO</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 font-mono">
              US Store · USD
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition"
            aria-label="Close navigation drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section: Shop Products */}
        <div className="py-6 border-b border-[rgba(255,255,255,0.08)]">
          <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
            Electric Toothbrushes & Heads
          </p>
          <div className="grid grid-cols-1 gap-3">
            {mobileShopLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800 border border-[rgba(255,255,255,0.04)] transition group"
              >
                <div className="flex items-center gap-3">
                  {item.image && (
                    <div className="w-12 h-12 rounded-xl bg-neutral-950 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <Image
                        src={item.image}
                        alt={item.label}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-sm text-neutral-100 group-hover:text-white">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="ml-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white text-black">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-neutral-500 group-hover:text-white transform group-hover:translate-x-1 transition"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Routine Tools & Discover */}
        <div className="py-6 border-b border-[rgba(255,255,255,0.08)]">
          <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
            Interactive Tools
          </p>
          <div className="grid grid-cols-1 gap-2">
            {mobileToolsLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition"
              >
                <span>{item.label}</span>
                <ArrowRight size={14} className="text-neutral-600" />
              </Link>
            ))}
          </div>
        </div>

        {/* Section: Help & Support */}
        <div className="py-6">
          <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">
            Help & Information
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-neutral-400">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="py-2 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer info strip */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-col gap-1 text-xs text-neutral-500">
          <p>Delaware entity: xPage Drop LLC</p>
          <p>Support: support@trymiroooo.com · Mon-Fri 9am-5pm EST</p>
        </div>
      </div>
    </div>
  );
}
