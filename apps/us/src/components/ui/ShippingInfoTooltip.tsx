"use client";

import { useEffect, useRef, useState } from "react";

interface ShippingInfoTooltipProps {
  isDark?: boolean;
  placement?: "above" | "below";
}

export function ShippingInfoTooltip({
  isDark = false,
  placement,
}: ShippingInfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const effectivePlacement = placement ?? (isDark ? "above" : "below");

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="shipping-info-wrapper"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        className="shipping-info-btn"
        aria-label="Shipping information"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "9999px",
          background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.06)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.15)",
          color: isDark ? "rgba(255, 255, 255, 0.6)" : "#666666",
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.2s ease",
        }}
      >
        ?
      </button>

      {isOpen && (
        <div
          className="shipping-info-tooltip is-active"
          role="note"
          style={{
            display: "block",
            position: "absolute",
            right: 0,
            top: effectivePlacement === "above" ? "auto" : "calc(100% + 8px)",
            bottom: effectivePlacement === "above" ? "calc(100% + 8px)" : "auto",
            zIndex: 100,
            width: "270px",
            background: isDark ? "#18191a" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "12px",
            padding: "12px 14px",
            boxShadow: isDark ? "0 12px 30px rgba(0, 0, 0, 0.7)" : "0 12px 32px rgba(0, 0, 0, 0.18)",
            textAlign: "left",
            color: isDark ? "rgba(255, 255, 255, 0.85)" : "#333333",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "12px",
                color: isDark ? "#ffffff" : "#111111",
              }}
            >
              Delivery Estimate
            </span>
            <button
              type="button"
              className="shipping-info-close"
              aria-label="Close delivery estimate"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: isDark ? "rgba(255, 255, 255, 0.6)" : "#888888",
                fontSize: "13px",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
          <p
            style={{
              fontSize: "11.5px",
              lineHeight: 1.5,
              margin: 0,
              color: isDark ? "rgba(255, 255, 255, 0.8)" : "#555555",
            }}
          >
            This is the earliest date you can receive your order, but standard delivery transit is 7–20 business days. For more information, please visit our shipping policy page.
          </p>
        </div>
      )}
    </div>
  );
}
