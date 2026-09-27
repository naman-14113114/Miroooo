'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      setStatusMessage('Please enter both your order number and email address.');
      return;
    }
    // Simulate lookup response
    setStatusMessage(
      'Your order has been received and verified. Tracking links are updated by courier scans within 24–72 hours of dispatch. If your order was placed recently, you will receive an automated dispatch email shortly.'
    );
  };

  return (
    <div className="order-tracking-container max-w-3xl mx-auto px-4 sm:px-6 py-16 text-white">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/50 px-3 py-1 rounded-full bg-white/10 border border-white/10">
          UK Courier Status
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Track Your Order Live
        </h1>
        <p className="text-[14.5px] text-white/70 max-w-xl mx-auto">
          Enter your order number and email address to check live courier tracking and transit timelines.
        </p>
      </div>

      {/* Tracking Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl space-y-6">
        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-white/80 mb-1.5">
              Order Number (e.g. #MR10482)
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. #MR10482"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-white/80 mb-1.5">
              Email Address Used at Checkout
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[14px] focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-white text-black font-extrabold text-[14.5px] hover:bg-neutral-200 active:scale-95 transition-all shadow-xl"
          >
            Track My Order Status →
          </button>
        </form>

        {statusMessage && (
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-[13.5px] text-white/80 leading-relaxed animate-fade-in">
            <p>{statusMessage}</p>
          </div>
        )}

        {/* Shipping Schedule Details */}
        <div className="pt-4 border-t border-white/10 space-y-3 text-[13px] text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              <strong>Fulfillment:</strong> 1–3 business days standard processing time.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              <strong>Tracked Transit:</strong> 7–20 business days across the UK.
            </span>
          </div>
        </div>
      </div>

      {/* Need Help CTA */}
      <div className="text-center pt-8 space-y-2">
        <p className="text-sm text-white/60">
          Cannot locate your confirmation email or order number?
        </p>
        <Link
          href="/pages/contact-us"
          className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:underline"
        >
          <span>Contact our UK Support Desk</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
