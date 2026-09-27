"use client";

import { useEffect, useState } from "react";
import { Clock3, HelpCircle, Truck } from "lucide-react";

export function DeliveryTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 8, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative my-4 p-3.5 rounded-2xl bg-neutral-900/60 border border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-neutral-300">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-full bg-emerald-950 text-emerald-400">
          <Clock3 size={15} />
        </div>
        <div>
          <span className="font-semibold text-white">Order within </span>
          <span className="font-mono font-bold text-emerald-400">
            {format2(timeLeft.hours)}h {format2(timeLeft.minutes)}m {format2(timeLeft.seconds)}s
          </span>
          <span className="text-neutral-400 hidden sm:inline"> for priority same-day dispatch</span>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowTooltip((prev) => !prev)}
          className="text-neutral-400 hover:text-white p-1 transition"
          aria-label="Shipping information details"
        >
          <HelpCircle size={15} />
        </button>

        {showTooltip && (
          <div
            className="absolute right-0 bottom-full mb-2 w-64 p-3.5 rounded-xl bg-neutral-950 border border-neutral-700 text-neutral-300 text-xs shadow-2xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <Truck size={14} className="text-emerald-400" />
              US Delivery Estimates
            </p>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Orders placed today are processed in 1–3 business days. Tracked delivery across the US
              via USPS Priority / FedEx Ground takes 7–20 business days.
            </p>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="mt-2 text-[10px] uppercase font-bold text-emerald-400 hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
