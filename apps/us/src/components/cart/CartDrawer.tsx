"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/cart";
import { useDrawer } from "@/components/layout/useDrawer";
import { CartLines } from "./CartLines";

export function CartDrawer() {
  const { items, isOpen, closeCart, totals } = useCart();
  const [discountOpen, setDiscountOpen] = useState(false);
  const ref = useDrawer(isOpen, closeCart, "cart-drawer-open");
  return (
    <div
      ref={ref}
      id="CartDrawer"
      className={`miroooo-cart-drawer${isOpen ? " is-open" : ""}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        className="miroooo-cart-backdrop"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className="miroooo-cart-panel"
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        <div className="miroooo-cart-header">
          <div className="miroooo-cart-header-title-wrap">
            <p className="miroooo-cart-kicker">CART</p>
            <h2 className="miroooo-cart-title">Your Miroooo bag</h2>
          </div>
          <button
            type="button"
            className="miroooo-cart-close-btn"
            aria-label="Close cart"
            onClick={closeCart}
          >
            <X size={18} />
          </button>
        </div>
        <div className="miroooo-cart-body">
          <div className="miroooo-cart-items">
            {items.length ? (
              <CartLines drawer onNavigate={closeCart} />
            ) : (
              <div className="miroooo-cart-empty">
                <h3 className="miroooo-empty-title">
                  Your shopping bag is empty.
                </h3>
                <Link
                  href="/shop"
                  className="miroooo-empty-shop-btn"
                  onClick={closeCart}
                >
                  Shop Miroooo
                </Link>
              </div>
            )}
          </div>
        </div>
        {items.length > 0 && (
          <div className="miroooo-cart-footer">
            <div
              className={`miroooo-cart-discount-row${discountOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="miroooo-discount-btn"
                aria-expanded={discountOpen}
                onClick={() => setDiscountOpen(!discountOpen)}
              >
                <span className="miroooo-discount-label">
                  Total discount
                  <ChevronDown className="miroooo-chevron-icon" size={14} />
                </span>
                <span className="miroooo-discount-amount">
                  -{formatUSD(totals.totalSavings)}
                </span>
              </button>
              {discountOpen && (
                <div
                  className="miroooo-discount-details"
                  style={{ display: "block" }}
                >
                  {[
                    ["Bundle Special Offer", totals.bundleSavings],
                    [totals.bundlePromoName, totals.bundlePromoDiscount],
                    ["Unlocked Free Gifts", totals.giftsValue],
                    ["Promo Code", totals.promoDiscount],
                  ].map(
                    ([label, amount]) =>
                      Number(amount) > 0 && (
                        <div
                          key={label}
                          className="miroooo-discount-detail-item"
                        >
                          <span>{label}</span>
                          <span>-{formatUSD(Number(amount))}</span>
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>
            <div className="miroooo-drawer-subtotal">
              <span>SUBTOTAL</span>
              <strong>{formatUSD(totals.finalSubtotal)}</strong>
            </div>
            <div className="miroooo-checkout-btn-wrap">
              <Link
                href="/cart"
                className="cart-checkout-cta-btn miroooo-checkout-btn"
                onClick={closeCart}
              >
                <span className="btn-fill" />
                <span className="btn-text">Go to cart →</span>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
