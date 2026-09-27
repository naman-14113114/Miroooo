'use client';

import React, { useState, useEffect } from 'react';

export function DeliveryTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 4,
    minutes: 32,
    seconds: 15,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [estimatedDate, setEstimatedDate] = useState<string>('');

  useEffect(() => {
    // Calculate UK estimated delivery range (today + 7 to 20 business days)
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() + 7);
    const end = new Date(now);
    end.setDate(end.getDate() + 20);

    const formatDayMonth = (d: Date) =>
      d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    setEstimatedDate(`${formatDayMonth(start)} – ${formatDayMonth(end)}`);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="delivery-timer-box p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 my-4 text-[13px] text-white/90 relative">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span>
            Order in the next{' '}
            <strong className="text-white font-mono font-bold">
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </strong>{' '}
            for dispatch today.
          </span>
        </div>

        {/* Info / Tooltip Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTooltip((prev) => !prev)}
            onBlur={() => setShowTooltip(false)}
            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-[11px] font-bold transition-colors"
            aria-label="Shipping Estimate Details"
          >
            ?
          </button>

          {showTooltip && (
            <div className="absolute right-0 bottom-full mb-2 w-64 p-3 rounded-xl bg-[#1c1d1e] text-white text-[12px] border border-white/20 shadow-2xl z-20 animate-fade-in">
              <strong className="block text-white mb-1">UK Delivery Estimate</strong>
              <p className="text-white/70 leading-relaxed">
                Orders are processed within 1–3 business days. Tracked delivery across the UK usually takes 7–20 business days.
              </p>
            </div>
          )}
        </div>
      </div>

      {estimatedDate && (
        <div className="mt-1.5 pt-1.5 border-t border-white/5 text-[12px] text-white/60 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>
            Estimated tracked arrival: <strong className="text-white font-medium">{estimatedDate}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
