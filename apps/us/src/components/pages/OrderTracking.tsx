"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  Home,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  MapPin,
} from "lucide-react";
import type { TrackingData } from "@/lib/order-tracking";

export function OrderTracking() {
  const [query, setQuery] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleSearch = useCallback((searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) {
      setError("Please enter your tracking number or order number.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/order-tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });

        const json = await res.json();

        if (res.ok && json.status === "found" && json.data) {
          setTrackingData(json.data);
          setError(null);
        } else {
          setTrackingData(null);
          setError(
            json.message ||
              "No tracking record was found for this number. Please verify the code from your confirmation email.",
          );
        }
      } catch {
        setTrackingData(null);
        setError("Unable to connect to the tracking network right now. Please try again shortly.");
      }
    });
  }, []);

  // Check URL query parameter on initial load (e.g. ?tracking=... or ?number=... or ?order=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const rawQuery = params.get("tracking") || params.get("number") || params.get("order");
    if (!rawQuery) return;
    const initialQuery = rawQuery.trim();
    if (!initialQuery) return;

    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch("/api/order-tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: initialQuery }),
        });
        const json = await res.json();
        if (!ignore) {
          setQuery(initialQuery);
          if (res.ok && json.status === "found" && json.data) {
            setTrackingData(json.data);
            setError(null);
          } else {
            setTrackingData(null);
            setError(
              json.message ||
                "No Miroooo order found matching this tracking number. Please check your tracking number and try again.",
            );
          }
        }
      } catch {
        // Ignore initial load network errors
      }
    }

    void loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080909] pb-24 pt-12 md:pt-16 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Order Tracking
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Enter your tracking number or Miroooo order number below to check the real-time status of your delivery.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-8 max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="relative flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter tracking number (e.g. ZHPHD... or JJD...)"
                  className="h-14 w-full rounded-full border border-neutral-300 bg-white/95 pl-11 pr-14 text-sm font-medium text-black shadow-inner outline-none transition placeholder:text-neutral-500 focus:border-white focus:bg-white focus:text-black focus:ring-2 focus:ring-white/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500 hover:text-black transition"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="button button--primary inline-flex h-14 min-w-[160px] items-center justify-center gap-2 rounded-full px-8 text-sm font-bold shadow-xl transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-80"
                style={{ height: '56px', minWidth: '160px', borderRadius: '9999px', fontSize: '0.95rem' }}
              >
                <span className="btn-fill" data-fill />
                <span className="btn-text">
                  {isPending ? (
                    <span className="inline-flex items-center gap-2.5">
                      <span
                        className="miroooo-button-click-loader-dots buudy-button-click-loader-dots"
                        aria-hidden="true"
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      <span>Tracking...</span>
                    </span>
                  ) : (
                    <>
                      <Search size={16} />
                      <span>Track Order</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-red-500/30 bg-red-950/20 p-5 text-left shadow-lg backdrop-blur-sm sm:items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                  <AlertCircle size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-white">Order Not Found</p>
                  <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Details View */}
        {trackingData && (
          <div className="mx-auto mt-12 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Overview Card */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111213] p-6 shadow-2xl sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Order Reference
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      {trackingData.orderRef}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                    {trackingData.status}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider border ${
                      trackingData.statusCode === "DELIVERED"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                        : trackingData.statusCode === "OUT_FOR_DELIVERY"
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/25"
                          : "bg-white/10 text-white/90 border-white/15"
                    }`}
                  >
                    {trackingData.statusCode === "DELIVERED" ? (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    ) : trackingData.statusCode === "OUT_FOR_DELIVERY" ? (
                      <MapPin size={14} className="text-amber-400" />
                    ) : (
                      <Clock size={14} className="text-white/70" />
                    )}
                    {trackingData.status}
                  </span>
                </div>
              </div>

              {/* Order Metadata Grid */}
              <div
                className={`mt-6 grid grid-cols-2 gap-4 ${
                  trackingData.statusCode === "DELIVERED" ? "sm:grid-cols-4" : "sm:grid-cols-3"
                } sm:gap-6`}
              >
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                    Tracking Number
                  </span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-white sm:text-sm">
                      {trackingData.trackingNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(trackingData.trackingNumber)}
                      title="Copy Tracking Number"
                      className="rounded p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
                    >
                      {copied ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                    Destination
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">
                    {trackingData.destination}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                    Order Date
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white">
                    {trackingData.orderDate || "Verified"}
                  </span>
                </div>

                {trackingData.statusCode === "DELIVERED" && trackingData.estimatedDelivery && (
                  <div>
                    <span className="block text-xs font-medium uppercase tracking-wider text-white/50">
                      Delivered Date
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-emerald-400">
                      {trackingData.estimatedDelivery}
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Bar / Stepper */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-white/50">
                  <span>Delivery Journey</span>
                  <span className="text-white font-bold">{trackingData.progressPercentage}% Complete</span>
                </div>

                {/* Linear Bar */}
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-neutral-300 to-white shadow-sm transition-all duration-700 ease-out"
                    style={{ width: `${trackingData.progressPercentage}%` }}
                  />
                </div>

                {/* Step Icons & Labels */}
                <div className="mt-6 grid grid-cols-5 gap-1.5 sm:gap-2">
                  {[
                    {
                      label: "Order Placed",
                      desc: "Confirmed",
                      icon: CheckCircle2,
                      step: 0,
                    },
                    {
                      label: "Processing",
                      desc: "Quality Check",
                      icon: Package,
                      step: 1,
                    },
                    {
                      label: "In Transit",
                      desc: "On the way",
                      icon: Truck,
                      step: 2,
                    },
                    {
                      label: "Out for Delivery",
                      desc: "With Courier",
                      icon: MapPin,
                      step: 3,
                    },
                    {
                      label: "Delivered",
                      desc: "Arrived",
                      icon: Home,
                      step: 4,
                    },
                  ].map((s) => {
                    const isCompleted = trackingData.activeStepIndex >= s.step;
                    const isCurrent = trackingData.activeStepIndex === s.step;

                    const IconComponent = s.icon;

                    return (
                      <div key={s.label} className="flex flex-col items-center text-center">
                        <div
                          className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12 ${
                            isCompleted
                              ? "bg-white text-black shadow-md"
                              : "bg-white/10 text-white/40"
                          } ${isCurrent ? "ring-4 ring-white/30" : ""}`}
                        >
                          <IconComponent size={18} className="sm:h-5 sm:w-5" />
                          {isCurrent && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                            </span>
                          )}
                        </div>

                        <span
                          className={`mt-2 text-[11px] font-bold leading-tight sm:text-xs md:text-sm ${
                            isCompleted ? "text-white" : "text-white/40"
                          }`}
                        >
                          {s.label}
                        </span>
                        <span className="hidden text-[11px] text-white/50 sm:inline-block">
                          {s.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shipment Milestones Timeline */}
            <div className="rounded-3xl border border-white/10 bg-[#111213] p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <Truck size={20} className="text-white/80" />
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Shipment Timeline
                  </h3>
                </div>
                <span className="text-xs text-white/50">Updates in Real-Time</span>
              </div>

              <div className="relative mt-8 space-y-8 pl-6 before:absolute before:bottom-3 before:left-3 before:top-3 before:w-[2px] before:bg-white/15 sm:pl-8 sm:before:left-4">
                {trackingData.timeline.map((event, index) => {
                  return (
                    <div key={`${event.title}-${index}`} className="relative group">
                      {/* Circle Dot */}
                      <span
                        className={`absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#111213] sm:-left-[37px] sm:h-5 sm:w-5 ${
                          event.completed
                            ? "bg-white shadow-sm"
                            : "bg-white/20"
                        }`}
                      >
                        {event.completed && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#111213]" />
                        )}
                      </span>

                      {/* Content */}
                      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition group-hover:border-white/15 group-hover:bg-white/[0.06]">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <h4
                            className={`text-sm font-bold sm:text-base ${
                              event.completed ? "text-white" : "text-white/50"
                            }`}
                          >
                            {event.title}
                          </h4>
                          <span className="text-xs font-semibold text-white/60">
                            {event.date}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-light leading-relaxed text-white/60 sm:text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items & Support Box */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Order Items */}
              <div className="rounded-3xl border border-white/10 bg-[#111213] p-6 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Package size={18} className="text-white/80" />
                  <h4 className="font-bold text-white">Order Contents</h4>
                </div>
                <div className="mt-4 divide-y divide-white/10">
                  {trackingData.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        {item.variant && (
                          <p className="text-xs text-white/50">{item.variant}</p>
                        )}
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Assistance */}
              <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-[#141517] to-[#111213] p-6 shadow-2xl">
                <div>
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <HelpCircle size={18} className="text-white/80" />
                    <h4 className="font-bold text-white">Need Help With This Order?</h4>
                  </div>
                  <p className="mt-4 text-xs font-light leading-relaxed text-white/60 sm:text-sm">
                    Have questions about delivery timing or need to request assistance? Our dedicated customer care team is here to support you.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:support@miroooo.us"
                    className="button button--primary inline-flex min-h-11 items-center justify-center rounded-full px-6 text-xs font-bold shadow-lg transition-transform active:scale-95"
                    style={{ minHeight: '44px', borderRadius: '9999px', fontSize: '0.8125rem' }}
                  >
                    <span className="btn-fill" data-fill />
                    <span className="btn-text">
                      Contact Support
                    </span>
                  </a>
                  <Link
                    href="/pages/faqs"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-5 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    View Shipping FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
