'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatGBP } from '@/lib/cart';

export function CartPageContent() {
  const {
    items,
    appliedPromoCodes,
    giftMessage,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
    saveGiftMessage,
    totals,
    proceedToCheckout,
    isCheckoutLoading,
    addItem,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [giftInput, setGiftInput] = useState(giftMessage);
  const [isGiftSaved, setIsGiftSaved] = useState(Boolean(giftMessage));
  const [isDiscountOpen, setIsDiscountOpen] = useState(true);
  const [isGiftAccordionOpen, setIsGiftAccordionOpen] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoStatus(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleSaveGift = () => {
    saveGiftMessage(giftInput);
    setIsGiftSaved(true);
    setTimeout(() => setIsGiftSaved(false), 3000);
  };

  // Determine recommendation upsell eligibility
  const showUpsell =
    (totals.x2Count > 0 && totals.x2HeadsCount === 0) ||
    (totals.x1Count > 0 && totals.x2Count === 0 && totals.x1HeadsCount === 0);

  const upsellHandle = totals.x2Count > 0 ? 'miroooo-x2-heads' : 'miroooo-x1-heads';
  const upsellTitle = totals.x2Count > 0 ? 'Miroooo X2 Heads (2-Pack)' : 'Miroooo X1 Heads (2-Pack)';
  const upsellImage = totals.x2Count > 0 ? '/assets_ref/x2/heads/B1.webp' : '/assets_ref/x/heads/1.webp';

  if (items.length === 0) {
    return (
      <main className="cart-page bg-[#080909] text-white min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-3xl">
            🛒
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white mb-2">Your Cart is Empty</h1>
            <p className="text-white/60 text-sm">
              You currently have no items in your shopping cart. Discover our electric toothbrushes below.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block w-full py-4 rounded-full bg-white text-black font-extrabold text-sm hover:bg-neutral-200 transition-all shadow-xl"
          >
            Explore All Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page bg-[#080909] text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Delivery Banner */}
        <div className="p-4 rounded-2xl bg-neutral-200 text-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <p className="text-[13.5px] leading-tight font-medium text-neutral-800">
              <strong className="text-black font-bold">Free Tracked UK Delivery:</strong> Orders processed in 1–3 days. Tracked courier transit is 7–20 business days.
            </p>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider flex-shrink-0">
            Complimentary
          </span>
        </div>

        {/* 2-Column Main Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Line Items + Gifts + Upsell */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl space-y-5">
              <h2 className="text-xl font-bold tracking-tight text-white border-b border-white/10 pb-4">
                Review Your Items ({totals.itemCount})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-white/5 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    {/* Media */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-[15px] font-bold text-white">
                            {item.title}
                          </h3>
                          <p className="text-[12.5px] text-white/50">
                            {item.color !== 'Default' ? `Color: ${item.color}` : item.subtitle}
                          </p>
                        </div>
                        <div className="text-right">
                          <strong className="text-[15.5px] font-extrabold text-white block">
                            {formatGBP(item.unitPrice * item.quantity)}
                          </strong>
                          {item.comparePrice > item.unitPrice && (
                            <s className="text-[12px] text-white/40 block">
                              {formatGBP(item.comparePrice * item.quantity)}
                            </s>
                          )}
                        </div>
                      </div>

                      {/* Stepper + Remove Action */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/20 rounded-xl overflow-hidden bg-black/40">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-white/10 text-white/80 text-sm font-bold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-white/10 text-white/80 text-sm font-bold transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[12px] text-white/40 hover:text-rose-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Unlocked Free Gifts */}
              {totals.extraBrushHeadSets > 0 && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-4 mt-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-amber-500/30">
                    <Image
                      src="/assets_ref/x2/heads/B1.webp"
                      alt="Unlocked X2 Heads"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-400 block">
                      Unlocked Free Gift (Pure Bundle Offer)
                    </span>
                    <strong className="text-[14px] font-bold text-white block">
                      Miroooo X2 Heads ({totals.extraBrushHeadSets} {totals.extraBrushHeadSets > 1 ? 'Sets' : 'Set'})
                    </strong>
                    <div className="flex items-center gap-2 text-[12.5px]">
                      <span className="text-emerald-400 font-bold">FREE</span>
                      <s className="text-white/40">£{totals.extraBrushHeadSets * 10}.00</s>
                    </div>
                  </div>
                </div>
              )}

              {totals.extraX1BrushHeadSets > 0 && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-4 mt-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-amber-500/30">
                    <Image
                      src="/assets_ref/x/heads/1.webp"
                      alt="Unlocked X1 Heads"
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-400 block">
                      Unlocked Free Gift (Pure Bundle Offer)
                    </span>
                    <strong className="text-[14px] font-bold text-white block">
                      Miroooo X1 Heads ({totals.extraX1BrushHeadSets} {totals.extraX1BrushHeadSets > 1 ? 'Sets' : 'Set'})
                    </strong>
                    <div className="flex items-center gap-2 text-[12.5px]">
                      <span className="text-emerald-400 font-bold">FREE</span>
                      <s className="text-white/40">£{totals.extraX1BrushHeadSets * 10}.00</s>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Upsell / Recommended Add-On Card */}
            {showUpsell && (
              <div className="p-5 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                    <Image
                      src={upsellImage}
                      alt={upsellTitle}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-white/50 block">
                      Recommended Addition
                    </span>
                    <strong className="text-[14.5px] font-bold text-white block">
                      {upsellTitle}
                    </strong>
                    <span className="text-[13px] text-white/80 font-medium">£10.00</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addItem({ productHandle: upsellHandle, quantity: 1 });
                  }}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-[12.5px] hover:bg-neutral-200 transition-colors flex-shrink-0 shadow-lg"
                >
                  + Add to Cart
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Summary Card + Promos + Checkout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#111213] border border-white/10 shadow-2xl space-y-5">
              <h2 className="text-xl font-bold tracking-tight text-white border-b border-white/10 pb-4">
                Order Summary
              </h2>

              {/* Promo Code Box */}
              <div className="space-y-3">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Discount code (e.g. MIROOOO10)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[13px] focus:outline-none focus:border-white transition-colors uppercase"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[13px] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoStatus && (
                  <p
                    className={`text-[12px] font-medium ${
                      promoStatus.success ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {promoStatus.message}
                  </p>
                )}

                {/* Applied Badges */}
                {appliedPromoCodes.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {appliedPromoCodes.map((code) => (
                      <span
                        key={code}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11.5px] font-bold"
                      >
                        <span>{code}</span>
                        <button
                          type="button"
                          onClick={() => removePromoCode(code)}
                          className="hover:text-white"
                          aria-label={`Remove ${code} code`}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Gift Message Accordion */}
              <div className="border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsGiftAccordionOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between text-left text-[13.5px] font-medium text-white/80 hover:text-white"
                  aria-expanded={isGiftAccordionOpen}
                >
                  <span>Add a Free Gift Message</span>
                  <span className={`transform transition-transform ${isGiftAccordionOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {isGiftAccordionOpen && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={giftInput}
                      onChange={(e) => setGiftInput(e.target.value.slice(0, 300))}
                      placeholder="Write your personal gift message..."
                      rows={3}
                      className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 text-[12.5px] focus:outline-none focus:border-white transition-colors"
                    />
                    <div className="flex items-center justify-between text-[11.5px] text-white/50">
                      <span>{giftInput.length}/300 characters</span>
                      <button
                        type="button"
                        onClick={handleSaveGift}
                        className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                      >
                        {isGiftSaved ? '✓ Saved' : 'Save Message'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Breakdown Accordion */}
              <div className="border-t border-white/10 pt-4 space-y-2 text-[13.5px]">
                <button
                  type="button"
                  onClick={() => setIsDiscountOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between font-bold text-white text-[14px] mb-2"
                  aria-expanded={isDiscountOpen}
                >
                  <span>Pricing & Discounts Breakdown</span>
                  <span className={`transform transition-transform ${isDiscountOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {isDiscountOpen && (
                  <div className="space-y-2 text-white/70">
                    <div className="flex justify-between">
                      <span>Full Compare Price</span>
                      <span>{formatGBP(totals.compareAt)}</span>
                    </div>

                    {totals.bundleSavings > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Base 50% Savings</span>
                        <span>-{formatGBP(totals.bundleSavings)}</span>
                      </div>
                    )}

                    {totals.bundlePromoDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>{totals.bundlePromoName}</span>
                        <span>-{formatGBP(totals.bundlePromoDiscount)}</span>
                      </div>
                    )}

                    {totals.giftsValue > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Free Replacement Heads Value</span>
                        <span>-{formatGBP(totals.giftsValue)}</span>
                      </div>
                    )}

                    {totals.promoDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Promo Code Discount (10% Brush Net)</span>
                        <span>-{formatGBP(totals.promoDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-white/70">
                      <span>Tracked UK Shipping</span>
                      <span className="text-emerald-400 font-bold uppercase text-[11px]">Free</span>
                    </div>
                  </div>
                )}

                {/* Final Total */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <strong className="text-lg font-bold text-white block">Subtotal</strong>
                    <span className="text-[12px] text-white/50">VAT included & Free shipping</span>
                  </div>
                  <strong className="text-2xl font-extrabold text-white">
                    {formatGBP(totals.finalSubtotal)}
                  </strong>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isCheckoutLoading}
                  onClick={proceedToCheckout}
                  className="w-full py-4 rounded-full bg-white text-black font-extrabold text-[15.5px] tracking-wide hover:bg-neutral-200 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isCheckoutLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                      Securing Checkout...
                    </span>
                  ) : (
                    <>
                      <span>Proceed to Secure Checkout</span>
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust assurances */}
              <div className="text-center text-[12px] text-white/40 pt-2 space-y-1">
                <p>🔒 256-Bit SSL Encrypted Checkout</p>
                <p>Protected by 30-day defective return guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
