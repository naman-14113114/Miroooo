"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Gift,
  LockKeyhole,
  Plus,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { formatUSD } from "@/lib/cart";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { ShippingInfoTooltip } from "@/components/ui/ShippingInfoTooltip";
import { CartLines } from "./CartLines";

function DeliveryBanner() {
  const [seconds, setSeconds] = useState(593);
  const [date, setDate] = useState("");
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 5);
    setDate(
      target
        .toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
        .replace(",", ""),
    );
    const timer = setInterval(
      () => setSeconds((value) => (value <= 0 ? 599 : value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}m : ${String(seconds % 60).padStart(2, "0")}s`;
  const truck = (
    <span className="cart-delivery-icon-circle">
      <AnimatedIcon kind="truck" className="miroooo-lottie-truck" />
    </span>
  );
  const text = (
    <p className="cart-delivery-text">
      Order in next <strong>{clock}</strong> to get as early as{" "}
      <strong>{date}</strong>
    </p>
  );

  return (
    <section
      className="cart-delivery-banner"
      aria-label="Delivery timeline and shipping guarantee"
    >
      <div className="cart-delivery-banner__mobile">
        <div className="cart-delivery-banner__mobile-row">
          {truck}
          <span className="cart-delivery-badge-pill">
            FREE TRACKED SHIPPING
          </span>
          <ShippingInfoTooltip isDark={false} />
        </div>
        {text}
      </div>
      <div className="cart-delivery-banner__desktop">
        <div className="cart-delivery-banner__left">
          {truck}
          {text}
        </div>
        <div className="flex items-center gap-2">
          <span className="cart-delivery-badge-pill">
            FREE TRACKED SHIPPING
          </span>
          <ShippingInfoTooltip isDark={false} />
        </div>
      </div>
    </section>
  );
}

export function CartPageContent() {
  const {
    items,
    appliedPromoCodes,
    giftMessage,
    applyPromoCode,
    removePromoCode,
    saveGiftMessage,
    totals,
    proceedToCheckout,
    isCheckoutLoading,
    checkoutError,
    addItem,
    removeItem,
    isHydrated,
  } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [giftInput, setGiftInput] = useState<string | null>(null);
  const [giftSaved, setGiftSaved] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const draft = giftInput ?? giftMessage;
  const showUpsell =
    (totals.x2Count > 0 && totals.x2HeadsCount === 0) ||
    (totals.x1Count > 0 && totals.x2Count === 0 && totals.x1HeadsCount === 0);
  const model = totals.x2Count > 0 ? "X2" : "X1";
  const upsellHandle = model === "X2" ? "miroooo-x2-heads" : "miroooo-x1-heads";
  const upsellImage =
    model === "X2"
      ? "/assets_ref/x2/heads/B1.webp"
      : "/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp";
  const discountRows: [string, number][] = ([
    ["Bundle Special Offer", totals.bundleSavings],
    [totals.bundlePromoName, totals.bundlePromoDiscount],
    ...(totals.hasFreeGiftCard ? [["Free Miroooo Digital Gift Card", 10] as [string, number]] : []),
    ...(totals.promoDiscount > 0 && appliedPromoCodes.length > 0
      ? [[`Promo (${appliedPromoCodes.join(', ')})`, totals.promoDiscount] as [string, number]]
      : []),
  ] as [string, number][]).filter(([label, amount]) => Boolean(label) && Number(amount) > 0);
  return (
    <main id="main" className="cart-page">
      <div className="cart-page-wrapper">
        <DeliveryBanner />
        {!isHydrated ? (
          <div className="cart-empty-state" style={{ minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 28, height: 28, border: '2px solid rgba(255,255,255,0.15)', borderTopColor: '#ffffff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 14 }} />
            <p className="cart-empty-desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>Loading your cart...</p>
          </div>
        ) : items.length === 0 ? (
          <section
            id="cart-empty-container"
            className="cart-empty-state"
            aria-live="polite"
          >
            <ShoppingBag className="cart-empty-icon" strokeWidth={1.6} />
            <h1 className="cart-empty-title">Your cart is empty.</h1>
            <p className="cart-empty-desc">
              Add the Miroooo X1 or Miroooo X2 to unlock current bundle offers,
              complimentary DuPont brush heads, and free tracked US delivery.
            </p>
            <div className="cart-empty-actions">
              <Link href="/all-products" className="cart-empty-shop-btn">
                <span className="btn-fill" />
                <span className="btn-text">Shop Miroooo</span>
              </Link>
              <p className="cart-empty-quiz-hint">
                Undecided which brush is right for you?{" "}
                <Link
                  href="/pages/dentalcare-quiz"
                  className="cart-empty-quiz-link"
                >
                  Take the Dental Care Quiz →
                </Link>
              </p>
            </div>
          </section>
        ) : (
          <div id="cart-active-grid" className="cart-main-grid">
            <div className="cart-left-column">
              <div className="cart-luxury-card">
                <div
                  id="cart-line-items-wrapper"
                  className="cart-items-container"
                >
                  <CartLines />
                </div>
              </div>
              {showUpsell && (
                <div
                  className="cart-luxury-card cart-upsell-card"
                  id="cart-upsell-container"
                >
                  <div className="cart-upsell-header">
                    <div className="cart-upsell-badge">
                      <Star size={12} strokeWidth={2.5} />
                      <span>Recommended Add-On</span>
                    </div>
                  </div>
                  <div className="cart-upsell-body">
                    <div className="cart-upsell-media">
                      <Link
                        href={`/products/${upsellHandle}`}
                        className="cart-upsell-media-link"
                      >
                        <img
                          src={upsellImage}
                          width={72}
                          height={72}
                          alt={`Miroooo ${model} Precision Replacement Heads 1 Set`}
                        />
                      </Link>
                    </div>
                    <div className="cart-upsell-content">
                      <div className="cart-upsell-info">
                        <h3 className="cart-upsell-title">
                          <Link
                            href={`/products/${upsellHandle}`}
                            className="cart-upsell-title-link"
                          >
                            Miroooo {model} Heads (1 Set)
                          </Link>
                        </h3>
                        <p className="cart-upsell-subtitle">
                          DuPont precision replacement heads for Miroooo {model}
                          .
                        </p>
                      </div>
                      <div className="cart-upsell-action-row">
                        <div className="cart-upsell-price-wrap">
                          <span className="cart-upsell-price">{PRODUCTS[upsellHandle].formattedPrice}</span>
                        </div>
                        <button
                          type="button"
                          className="cart-upsell-add-btn"
                          id="cart-upsell-add-btn"
                          aria-label={`Add Miroooo ${model} Heads (1 Set) to cart`}
                          onClick={() =>
                            addItem({
                              productHandle: upsellHandle,
                              color: "Default",
                              quantity: 1,
                            })
                          }
                        >
                          <span className="btn-fill" />
                          <span className="btn-text">
                            <Plus size={13} strokeWidth={2.5} />
                            Add
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <aside className="cart-sidebar-stack">
              <div className="cart-luxury-card">
                <button
                  type="button"
                  className="cart-discount-toggle-btn"
                  id="discount-toggle-btn"
                  aria-expanded={discountOpen}
                  aria-controls="discount-details-panel"
                  onClick={() => setDiscountOpen(!discountOpen)}
                >
                  <span className="flex items-center gap-1.5 font-semibold">
                    Total discount
                    <ChevronDown
                      className="cart-discount-chevron"
                      size={14}
                      style={{
                        transform: discountOpen ? "rotate(180deg)" : undefined,
                      }}
                    />
                  </span>
                  <span className="font-extrabold">
                    -{formatUSD(totals.totalSavings)}
                  </span>
                </button>
                <div
                  className={`cart-discount-panel${discountOpen ? " is-open" : ""}`}
                  id="discount-details-panel"
                  inert={!discountOpen}
                >
                  {discountRows
                    .filter(([, amount]) => amount > 0)
                    .map(([label, amount]) => (
                      <div className="cart-discount-breakdown-row" key={label}>
                        <span className="uppercase">{label}</span>
                        <span>-{formatUSD(amount)}</span>
                      </div>
                    ))}
                  <div className="cart-discount-breakdown-row">
                    <span className="uppercase">Tracked US Shipping</span>
                    <strong>FREE</strong>
                  </div>
                </div>
                <div id="promo-code-container">
                  <form
                    className="cart-promo-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const result = applyPromoCode(promoInput);
                      setPromoStatus(result);
                      if (result.success) setPromoInput("");
                    }}
                  >
                    <input
                      className="cart-promo-input"
                      value={promoInput}
                      onChange={(event) => setPromoInput(event.target.value)}
                      placeholder="ENTER PROMO CODE"
                      aria-label="Enter promo code"
                      autoComplete="off"
                    />
                    <button type="submit" className="cart-promo-apply-btn">
                      <span className="btn-fill" />
                      <span className="btn-text">APPLY</span>
                    </button>
                  </form>
                  {promoStatus && (
                    <p
                      role="status"
                      className={`cart-promo-msg cart-promo-msg--${promoStatus.success ? "success" : "error"}`}
                    >
                      {promoStatus.message}
                    </p>
                  )}
                  {appliedPromoCodes.length > 0 && (
                    <div
                      className="cart-promo-applied-badges"
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {appliedPromoCodes.map((code) => {
                        const displayCode =
                          code.length > 4 ? `${code.slice(0, 4)}...` : code;
                        return (
                          <span
                            key={code}
                            className="cart-promo-pill inline-flex items-center gap-2 rounded-full border border-black/20 bg-white py-1 pl-3.5 pr-1.5 text-xs text-[#111111] shadow-sm"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 8px 4px 12px",
                              background: "#ffffff",
                              border: "1px solid rgba(0, 0, 0, 0.18)",
                              borderRadius: "9999px",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              color: "#111111",
                              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                fontSize: "0.8rem",
                                color: "#111111",
                                lineHeight: 1,
                              }}
                            >
                              {displayCode}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                removePromoCode(code);
                                setPromoStatus(null);
                              }}
                              aria-label={`Remove promo code ${code}`}
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[#555555] hover:bg-black/10 hover:text-[#000000] transition-colors"
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#555555",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                padding: 0,
                                lineHeight: 1,
                                transition: "all 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#000000";
                                e.currentTarget.style.backgroundColor =
                                  "rgba(0, 0, 0, 0.08)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = "#555555";
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                              }}
                            >
                              <X size={13} strokeWidth={2.5} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="cart-subtotal-section">
                  <span className="cart-subtotal-label">SUBTOTAL</span>
                  <span
                    className="cart-subtotal-amount"
                    id="summary-subtotal-price"
                  >
                    {formatUSD(totals.finalSubtotal)}
                  </span>
                </div>
                <button
                  type="button"
                  id="main-checkout-btn"
                  className="cart-checkout-cta-btn"
                  aria-label="Proceed to secure checkout"
                  onClick={proceedToCheckout}
                  disabled={isCheckoutLoading}
                >
                  <span className="btn-fill" />
                  <span className="btn-text">
                    <LockKeyhole size={17} />
                    <span>
                      {isCheckoutLoading
                        ? "PREPARING CHECKOUT…"
                        : "CHECKOUT SECURELY"}
                    </span>
                  </span>
                </button>
                {checkoutError && (
                  <p role="alert" className="cart-checkout-error">
                    {checkoutError}
                  </p>
                )}
              </div>
              <div className="cart-luxury-card">
                <button
                  type="button"
                  className="gift-msg-toggle"
                  aria-expanded={giftOpen}
                  aria-controls="gift-message-panel"
                  onClick={() => setGiftOpen(!giftOpen)}
                >
                  <span className="gift-msg-toggle__left">
                    <span className="gift-msg-toggle__icon">
                      <Gift size={17} />
                    </span>
                    <span>
                      <span className="gift-msg-toggle__title">
                        Add Gift Message
                      </span>
                      <span className="gift-msg-toggle__sub">
                        Price will be hidden on packing slip.
                      </span>
                    </span>
                  </span>
                  <span className="gift-msg-toggle__right">
                    <span className="gift-msg-toggle__counter">
                      {draft.length}/300
                    </span>
                    <ChevronDown
                      className="gift-msg-toggle__chevron"
                      size={18}
                      style={{
                        transform: giftOpen ? "rotate(180deg)" : undefined,
                      }}
                    />
                  </span>
                </button>
                <div
                  className={`gift-msg-panel${giftOpen ? " is-open" : ""}`}
                  id="gift-message-panel"
                  inert={!giftOpen}
                >
                  <textarea
                    className="gift-msg-textarea"
                    aria-label="Gift message"
                    maxLength={300}
                    placeholder="Write your warm wish..."
                    value={draft}
                    onChange={(event) => {
                      setGiftInput(event.target.value);
                      setGiftSaved(false);
                    }}
                  />
                  <button
                    type="button"
                    className="gift-msg-save-btn"
                    onClick={() => {
                      saveGiftMessage(draft);
                      setGiftSaved(true);
                    }}
                  >
                    <span role="status">
                      {giftSaved ? "Gift message saved" : "Save gift message"}
                    </span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
