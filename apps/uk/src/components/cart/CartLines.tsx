"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatGBP } from "@/lib/cart";

const INCLUDED_IN_BOX: Record<string, { name: string; image: string }[]> = {
  "miroooo-x2": [
    {
      name: "Luxury Travel Case",
      image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
    },
    {
      name: "Wall Mounted",
      image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted-dock-storage.webp",
    },
    {
      name: "2 Free Heads",
      image: "/assets_ref/x2/heads/B1.webp",
    },
  ],
  "miroooo-x": [
    {
      name: "Luxury Travel Case",
      image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
    },
    {
      name: "Charging Dock",
      image: "/assets_ref/x/gallery/miroooo-x1-charging-dock.webp",
    },
    {
      name: "2 Free Heads",
      image: "/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp",
    },
  ],
  "miroooo-x1": [
    {
      name: "Luxury Travel Case",
      image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
    },
    {
      name: "Charging Dock",
      image: "/assets_ref/x/gallery/miroooo-x1-charging-dock.webp",
    },
    {
      name: "2 Free Heads",
      image: "/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp",
    },
  ],
};

function IncludedInTheBox({
  items,
  drawer = false,
}: {
  items: { name: string; image: string }[];
  drawer?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const cls = (page: string, panel: string) => (drawer ? panel : page);

  return (
    <div className={cls("cart-line-included", "miroooo-cart-included")}>
      <button
        type="button"
        className={cls("cart-line-included__btn", "miroooo-cart-included__btn")}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Included in the box</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`${cls("cart-line-included__chevron", "miroooo-cart-included__chevron")}${isOpen ? " is-open" : ""}`}
        />
      </button>

      {isOpen && (
        <div className={cls("cart-line-included__grid", "miroooo-cart-included__grid")}>
          {items.map((includedItem) => (
            <div
              key={includedItem.name}
              className={cls("cart-line-included__card", "miroooo-cart-included__card")}
            >
              <div
                className={cls("cart-line-included__thumb", "miroooo-cart-included__thumb")}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "10px",
                  padding: 0,
                  overflow: "hidden",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={includedItem.image}
                  alt={includedItem.name}
                  loading="lazy"
                  width={76}
                  height={76}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "9px",
                  }}
                />
              </div>
              <span
                className={cls("cart-line-included__label", "miroooo-cart-included__label")}
              >
                {includedItem.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CartLines({
  drawer = false,
  onNavigate,
}: {
  drawer?: boolean;
  onNavigate?: () => void;
}) {
  const { items, totals, updateQuantity, removeItem } = useCart();
  const gifts = [
    {
      model: "X2",
      sets: totals.extraBrushHeadSets,
      handle: "miroooo-x2-heads",
      image: "/assets_ref/x2/heads/B1.webp",
    },
    {
      model: "X1",
      sets: totals.extraX1BrushHeadSets,
      handle: "miroooo-x1-heads",
      image: "/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp",
    },
  ].filter((gift) => gift.sets > 0);
  const toothbrushCount = totals.x2Count + totals.x1Count;
  const hasFreeGiftCard = Boolean(totals.hasFreeGiftCard || toothbrushCount > 0 || items.some((i) => i.productHandle === 'miroooo-water-flosser'));
  const cls = (page: string, panel: string) => (drawer ? panel : page);
  return (
    <>
      {[
        ...items
          .filter((item) => item.productHandle !== "miroooo-package-protection")
          .map((item) => ({
          ...item,
          comparePrice: item.productHandle.endsWith('-heads') ? 10 : item.comparePrice,
          subtitle:
            item.productHandle === "miroooo-x2"
              ? "Includes free luxury travel case, wall-mounted storage & 90-day battery life."
              : item.productHandle === "miroooo-x"
                ? "Electric Toothbrush with 32,000 VPM acoustic motor & 60-day battery."
                : item.productHandle === "miroooo-package-protection"
                  ? "Complete transit damage, loss, and doorstep theft guarantee."
                  : item.subtitle || (item.productHandle.endsWith('-heads') ? `DuPont precision heads for Miroooo ${item.productHandle === "miroooo-x2-heads" ? "X2" : "X1"}.` : ""),
          gift: false,
          badgeText: undefined as string | undefined,
          alt: item.title,
        })),
        ...gifts.map((gift) => ({
          id: `gift-${gift.handle}`,
          title: `Free Miroooo ${gift.model} Heads (2-Pack)`,
          subtitle: `${gift.sets} complimentary ${gift.sets > 1 ? "sets contain" : "set contains"} ${gift.sets * 2} DuPont precision heads for Miroooo ${gift.model}.`,
          image: gift.image,
          url: `/products/${gift.handle}`,
          productHandle: gift.handle,
          unitPrice: 0,
          comparePrice: gift.sets * 10,
          quantity: gift.sets,
          gift: true,
          badgeText: `UNLOCKED ${gift.sets} ${gift.sets > 1 ? "SETS" : "SET"} (${gift.sets * 2} BRUSH HEADS)`,
          alt: `Free Miroooo ${gift.model} Heads (2-Pack)`,
        })),
        ...(hasFreeGiftCard
          ? [
              {
                id: "gift-miroooo-gift-card",
                title: "Free Miroooo Digital Gift Card (£10)",
                subtitle:
                  "Official Miroooo digital voucher. Instant email delivery. Expires in 3 months.",
                image: "/assets_ref/gifts/miroooo-x2-silver-digital-gift-card.webp",
                url: "/products/miroooo-gift-card",
                productHandle: "miroooo-gift-card",
                unitPrice: 0,
                comparePrice: 10,
                quantity: 1,
                gift: true,
                badgeText: "UNLOCKED 1 COMPLIMENTARY VOUCHER (£10 VALUE)",
                alt: "Miroooo official digital gift card £10 complimentary voucher",
              },
            ]
          : []),
      ].map((item) => (
        <div
          className={cls("cart-line-item", "miroooo-cart-item")}
          key={item.id}
        >
          <div
            className={cls("cart-line-item__media", "miroooo-cart-item-thumb")}
          >
            <Link
              href={item.url}
              onClick={onNavigate}
              className="cart-line-item__media-link"
              aria-label={`View ${item.title}`}
            >
              <img src={item.image} alt={item.alt || item.title} width={112} height={112} />
            </Link>
          </div>
          <div
            className={cls(
              "cart-line-item__content",
              "miroooo-cart-item-content",
            )}
          >
            <div
              className={cls("cart-line-item__header", "miroooo-cart-item-top")}
            >
              <div>
                <h2
                  className={cls(
                    "cart-line-item__title",
                    "miroooo-cart-item-title",
                  )}
                >
                  <Link
                    href={item.url}
                    onClick={onNavigate}
                    className="cart-line-item__title-link"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p
                  className={cls(
                    "cart-line-item__subtitle",
                    "miroooo-cart-item-desc",
                  )}
                >
                  {item.subtitle}
                </p>
              </div>
              <div
                className={cls(
                  "cart-line-item__pricing",
                  "miroooo-cart-item-pricing",
                )}
              >
                <span
                  className={cls(
                    "cart-line-item__price",
                    "miroooo-cart-item-price",
                  )}
                >
                  {item.gift ? "Free" : formatGBP(item.unitPrice)}
                </span>
                {item.comparePrice > item.unitPrice && (
                  <s
                    className={cls(
                      "cart-line-item__compare",
                      "miroooo-cart-item-compare",
                    )}
                  >
                    {formatGBP(item.comparePrice)}
                  </s>
                )}
              </div>
            </div>
            <div
              className={cls(
                "cart-line-item__actions",
                "miroooo-cart-item-bottom",
              )}
            >
              {item.gift ? (
                <span
                  className={cls(
                    "cart-unlocked-badge",
                    "miroooo-cart-gift-badge",
                  )}
                >
                  {item.badgeText ||
                    `UNLOCKED ${item.quantity} ${item.quantity > 1 ? "SETS" : "SET"} (${item.quantity * 2} BRUSH HEADS)`}
                </span>
              ) : (
                <>
                  <div
                    className={cls("cart-stepper-pill", "miroooo-cart-stepper")}
                    aria-label={`Quantity selector for ${item.title}`}
                  >
                    <button
                      type="button"
                      className={cls("cart-stepper-btn", "miroooo-stepper-btn")}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} strokeWidth={2.5} />
                    </button>
                    <span
                      className={cls(
                        "cart-stepper-count",
                        "miroooo-stepper-val",
                      )}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className={cls("cart-stepper-btn", "miroooo-stepper-btn")}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                  <button
                    type="button"
                    className={cls(
                      "cart-remove-button",
                      "miroooo-cart-remove-btn",
                    )}
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item from cart"
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </>
              )}
            </div>
            {!item.gift && INCLUDED_IN_BOX[item.productHandle] && (
              <IncludedInTheBox
                items={INCLUDED_IN_BOX[item.productHandle]}
                drawer={drawer}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
