"use client";

import type { AttributionKey, ProductPageContent } from "@miroooo/shared";
import { STOREFRONT_ATTRIBUTION_KEYS } from "@miroooo/shared";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type CartItem = {
  product: ProductPageContent;
  quantity: number;
  colour: string;
  checkoutUrl: string;
};

type StoreContextValue = {
  attribution: Partial<Record<AttributionKey, string>>;
  cartItem: CartItem | null;
  cartOpen: boolean;
  closeCart: () => void;
  openCart: (item?: CartItem) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const storageKey = "miroooo_attribution";
const attributionEvent = "miroooo-attribution-change";

function subscribeAttribution(callback: () => void) {
  window.addEventListener(attributionEvent, callback);
  return () => window.removeEventListener(attributionEvent, callback);
}

function subscribeLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const storedAttribution = useSyncExternalStore(
    subscribeAttribution,
    () => sessionStorage.getItem(storageKey) ?? "{}",
    () => "{}",
  );
  const locationSearch = useSyncExternalStore(
    subscribeLocation,
    () => window.location.search,
    () => "",
  );
  const captured = useMemo(() => {
    const values: Partial<Record<AttributionKey, string>> = {};
    const searchParams = new URLSearchParams(locationSearch);
    for (const key of STOREFRONT_ATTRIBUTION_KEYS) {
      const value = searchParams.get(key);
      if (value) values[key] = value;
    }
    return values;
  }, [locationSearch]);
  const attribution = useMemo(() => {
    if (Object.keys(captured).length > 0) return captured;
    try {
      return JSON.parse(storedAttribution) as Partial<Record<AttributionKey, string>>;
    } catch {
      return {};
    }
  }, [captured, storedAttribution]);

  useEffect(() => {
    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem(storageKey, JSON.stringify(captured));
      window.dispatchEvent(new Event(attributionEvent));
    }
  }, [captured]);

  useEffect(() => {
    document.body.classList.add("is-ready");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -5%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  const closeCart = useCallback(() => setCartOpen(false), []);
  const openCart = useCallback((item?: CartItem) => {
    if (item) setCartItem(item);
    setCartOpen(true);
  }, []);

  useEffect(() => {
    if (!cartOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.body.classList.add("drawer-open");
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("drawer-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [cartOpen, closeCart]);

  const value = useMemo(
    () => ({ attribution, cartItem, cartOpen, closeCart, openCart }),
    [attribution, cartItem, cartOpen, closeCart, openCart],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer />
    </StoreContext.Provider>
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

function CartDrawer() {
  const { cartItem, cartOpen, closeCart } = useStore();
  return (
    <div className={`cart-layer${cartOpen ? " is-open" : ""}`} aria-hidden={!cartOpen}>
      <button className="cart-layer__backdrop" type="button" aria-label="Close cart" onClick={closeCart} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="cart-drawer__head">
          <div><span>Your cart</span><strong>{cartItem ? "1 item" : "0 items"}</strong></div>
          <button type="button" className="button button--close" aria-label="Close cart" onClick={closeCart}>×</button>
        </div>
        {cartItem ? (
          <>
          <div className="cart-drawer__body">
            <Image src={cartItem.product.variants.find((variant) => variant.colour === cartItem.colour)?.image ?? cartItem.product.variants[0].image} alt="" width={110} height={110} />
            <div>
              <strong>{cartItem.product.name}</strong>
              <span>{cartItem.colour} · Buy {cartItem.quantity}</span>
              <span>{cartItem.product.bundles.find((bundle) => bundle.quantity === cartItem.quantity)?.price}</span>
            </div>
          </div>
          <a className="button cart-drawer__checkout" href={cartItem.checkoutUrl}>Secure checkout</a>
          </>
        ) : (
          <div className="cart-drawer__empty"><p>Your cart is empty.</p><a className="button" href="/shop" onClick={closeCart}>Shop Miroooo</a></div>
        )}
        <p className="cart-drawer__note">Purchases continue securely with Buudy.</p>
      </aside>
    </div>
  );
}
