'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatGBP } from '@/lib/cart';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totals,
    proceedToCheckout,
    isCheckoutLoading,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog" aria-label="Shopping Cart Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#0e0f10] text-white h-full flex flex-col shadow-2xl border-l border-white/10 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-wide">Your Cart</h2>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-bold text-white">
              {totals.itemCount}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Notification Strip */}
        <div className="px-5 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 text-[12px] text-emerald-300 font-medium flex items-center gap-2">
          <span>✓</span>
          <span>You have unlocked <strong>Free Tracked UK Delivery</strong></span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40 text-2xl">
                🛒
              </div>
              <p className="text-white/60 text-sm">Your shopping cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-block px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                Shop Toothbrushes
              </Link>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-3.5 items-start"
                >
                  {/* Item Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[13.5px] font-bold text-white truncate">
                        {item.title}
                      </h3>
                      <strong className="text-[13.5px] font-bold text-white flex-shrink-0">
                        {formatGBP(item.unitPrice * item.quantity)}
                      </strong>
                    </div>

                    <p className="text-[11.5px] text-white/50 mb-2 truncate">
                      {item.color !== 'Default' ? `Color: ${item.color}` : item.subtitle}
                    </p>

                    {/* Stepper + Remove */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-black/40">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-white/10 text-white/80 text-xs font-bold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-white/10 text-white/80 text-xs font-bold transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[11.5px] text-white/40 hover:text-rose-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Unlocked Free Gifts Display */}
              {totals.extraBrushHeadSets > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex gap-3.5 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-amber-500/30">
                    <Image
                      src="/assets_ref/x2/heads/B1.webp"
                      alt="Free X2 Replacement Heads"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Unlocked Free Gift
                    </span>
                    <strong className="text-[13px] font-bold text-white block">
                      Miroooo X2 Heads ({totals.extraBrushHeadSets} {totals.extraBrushHeadSets > 1 ? 'Sets' : 'Set'})
                    </strong>
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="text-emerald-400 font-bold">FREE</span>
                      <s className="text-white/40">£{totals.extraBrushHeadSets * 10}.00</s>
                    </div>
                  </div>
                </div>
              )}

              {totals.extraX1BrushHeadSets > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex gap-3.5 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-amber-500/30">
                    <Image
                      src="/assets_ref/x/heads/1.webp"
                      alt="Free X1 Replacement Heads"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Unlocked Free Gift
                    </span>
                    <strong className="text-[13px] font-bold text-white block">
                      Miroooo X1 Heads ({totals.extraX1BrushHeadSets} {totals.extraX1BrushHeadSets > 1 ? 'Sets' : 'Set'})
                    </strong>
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="text-emerald-400 font-bold">FREE</span>
                      <s className="text-white/40">£{totals.extraX1BrushHeadSets * 10}.00</s>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0a0b0b] space-y-3">
            <div className="space-y-1.5 text-[13px]">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>{formatGBP(totals.subtotal)}</span>
              </div>
              {totals.totalSavings > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Total Savings</span>
                  <span>-{formatGBP(totals.totalSavings)}</span>
                </div>
              )}
              {totals.promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promo Code Discount</span>
                  <span>-{formatGBP(totals.promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-white/70">
                <span>UK Tracked Shipping</span>
                <span className="text-emerald-400 font-bold uppercase text-[11px]">Free</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-[16px] font-bold text-white">
                <span>Total</span>
                <span>{formatGBP(totals.finalSubtotal)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isCheckoutLoading}
              onClick={proceedToCheckout}
              className="w-full py-3.5 rounded-full bg-white text-black font-extrabold text-[14.5px] hover:bg-neutral-200 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCheckoutLoading ? (
                <span>Securing Checkout...</span>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-[12.5px] text-white/60 hover:text-white underline"
            >
              View Full Cart Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
