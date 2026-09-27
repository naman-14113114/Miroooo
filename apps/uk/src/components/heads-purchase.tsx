"use client";

import Image from "next/image";
import { Check, Clock3, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { useStore } from "./store-provider";

interface HeadsPurchaseProps {
  id: "miroooo-x1-heads" | "miroooo-x2-heads";
  name: string;
  priceNumber: number;
  formattedPrice: string;
  images: string[];
  specs: Array<{ label: string; value: string }>;
  compatibility: string;
  variantId: string;
}

export function HeadsPurchase({
  id,
  name,
  priceNumber,
  formattedPrice,
  images,
  specs,
  compatibility,
  variantId,
}: HeadsPurchaseProps) {
  const { openCart, attribution } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const symbol = formattedPrice.startsWith("£") ? "£" : "$";
  const totalPrice = priceNumber * quantity;
  const formattedTotal = `${symbol}${totalPrice.toFixed(2)}`;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId,
          quantity,
          productId: id,
          attribution,
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (e) {
      console.error("Failed to prepare checkout:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="product-hero" aria-labelledby="heads-title" style={{ padding: "40px 20px" }}>
      <div className="product-gallery">
        <div
          className="product-gallery__stage"
          style={{ background: "#0a0a0a", borderRadius: "16px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Image
            src={images[selectedImage] || images[0]}
            alt={name}
            width={700}
            height={700}
            priority
            style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: "560px" }}
          />
        </div>
        {images.length > 1 && (
          <div className="product-gallery__thumbs" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            {images.map((src, idx) => (
              <button
                key={src}
                type="button"
                className={idx === selectedImage ? "is-active" : undefined}
                onClick={() => setSelectedImage(idx)}
                style={{
                  width: "80px",
                  height: "80px",
                  border: idx === selectedImage ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "#111",
                }}
              >
                <Image src={src} alt={`${name} ${idx + 1}`} width={80} height={80} style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-buybox" style={{ maxWidth: "520px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#f59e0b", fontSize: "0.9rem" }}>
          <span>★★★★★</span>
          <strong style={{ color: "#fff" }}>4.9 · Verified Replacement Heads</strong>
        </div>
        <h1 id="heads-title" style={{ fontSize: "2.2rem", fontWeight: 700, margin: "0 0 12px 0", color: "#fff" }}>
          {name}
        </h1>
        <div className="product-price" style={{ display: "flex", alignItems: "baseline", gap: "12px", margin: "16px 0" }}>
          <strong style={{ fontSize: "2rem", color: "#fff" }}>{formattedTotal}</strong>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
            (2 Brush Heads per pack · {formattedPrice} / pack)
          </span>
        </div>

        <ul className="product-highlights" style={{ listStyle: "none", padding: 0, margin: "20px 0" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0", color: "rgba(255,255,255,0.85)" }}>
            <Check size={18} color="#22c55e" />
            <span>Compatibility: {compatibility}</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0", color: "rgba(255,255,255,0.85)" }}>
            <Check size={18} color="#22c55e" />
            <span>DuPont™ Tynex® 3D precision end-rounded filaments</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", margin: "8px 0", color: "rgba(255,255,255,0.85)" }}>
            <Check size={18} color="#22c55e" />
            <span>Includes 2x hygienic protective travel caps</span>
          </li>
        </ul>

        {/* Quantity Selector */}
        <div style={{ margin: "24px 0" }}>
          <label style={{ display: "block", color: "rgba(255,255,255,0.7)", marginBottom: "8px", fontSize: "0.9rem" }}>
            Select Quantity (Packs):
          </label>
          <div style={{ display: "flex", gap: "12px" }}>
            {[1, 2, 3, 4].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuantity(q)}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  borderRadius: "8px",
                  border: quantity === q ? "2px solid #ffffff" : "1px solid rgba(255,255,255,0.2)",
                  background: quantity === q ? "rgba(255,255,255,0.15)" : "transparent",
                  color: "#ffffff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {q} {q === 1 ? "Pack" : "Packs"}
              </button>
            ))}
          </div>
        </div>

        <button
          className="product-primary-cta"
          type="button"
          onClick={handleAddToCart}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "18px 24px",
            background: "#ffffff",
            color: "#000000",
            fontSize: "1.05rem",
            fontWeight: 700,
            borderRadius: "32px",
            border: "none",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          {isLoading ? "Preparing Checkout..." : `Buy Now · ${formattedTotal}`}
        </button>

        <div className="product-trust" style={{ display: "flex", justifyContent: "space-around", marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", color: "rgba(255,255,255,0.7)" }}>
          <div style={{ textAlign: "center" }}>
            <Truck size={22} style={{ margin: "0 auto 6px auto", display: "block" }} />
            <span style={{ fontSize: "0.8rem", lineHeight: 1.2 }}>Tracked UK<br />Delivery</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <Clock3 size={22} style={{ margin: "0 auto 6px auto", display: "block" }} />
            <span style={{ fontSize: "0.8rem", lineHeight: 1.2 }}>3-Month<br />Fresh Cycle</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <ShieldCheck size={22} style={{ margin: "0 auto 6px auto", display: "block" }} />
            <span style={{ fontSize: "0.8rem", lineHeight: 1.2 }}>Guaranteed<br />Original Fit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
