"use client";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatGBP } from "@/lib/cart";

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
      image: "/assets_ref/x/heads/B1.webp",
    },
  ].filter((gift) => gift.sets > 0);
  const cls = (page: string, panel: string) => (drawer ? panel : page);
  return (
    <>
      {[
        ...items.map((item) => ({
          ...item,
          comparePrice: item.productHandle.endsWith('-heads') ? 10 : item.comparePrice,
          subtitle:
            item.productHandle === "miroooo-x2"
              ? "Includes free luxury travel case, wall-mounted storage & 90-day battery life."
              : item.productHandle === "miroooo-x"
                ? "Electric Toothbrush with 32,000 VPM acoustic motor & 60-day battery."
                : `DuPont precision heads for Miroooo ${item.productHandle === "miroooo-x2-heads" ? "X2" : "X1"}.`,
          gift: false,
        })),
        ...gifts.map((gift) => ({
          id: `gift-${gift.handle}`,
          title: `${drawer ? "Free " : ""}Miroooo ${gift.model} Heads`,
          subtitle: `${gift.sets} complimentary ${gift.sets > 1 ? "sets contain" : "set contains"} ${gift.sets * 2} DuPont precision heads for Miroooo ${gift.model}.`,
          image: gift.image,
          url: `/products/${gift.handle}`,
          unitPrice: 0,
          comparePrice: gift.sets * 10,
          quantity: gift.sets,
          gift: true,
        })),
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
              <img src={item.image} alt={item.title} width={112} height={112} />
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
                  UNLOCKED {item.quantity} {item.quantity > 1 ? "SETS" : "SET"}{" "}
                  ({item.quantity * 2} BRUSH HEADS)
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
          </div>
        </div>
      ))}
    </>
  );
}
