"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ALL_PRODUCTS, type Product } from "@/data/products";
import type { CartItem, CartTotals } from "@/lib/cart";
import { market } from "@/lib/market";

type KlaviyoCommand = [string, ...unknown[]];

declare global {
  interface Window {
    klaviyo?: KlaviyoCommand[];
    _klOnsite?: KlaviyoCommand[];
  }
}

type CheckoutEventDetail = {
  lines?: CartItem[];
  totals?: CartTotals | {
    finalSubtotal?: number;
    subtotal?: number;
    totalCents?: number;
  };
};

type AddToCartEventDetail = {
  product?: Product;
  item?: CartItem;
};

const KLAVIYO_COMPANY_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID || "TQtq2j";
const KLAVIYO_POPUP_FORM_ID = "XECVNw";

let marketHost = "www.trymiroooo.com";
try {
  marketHost = new URL(market.siteUrl).hostname;
} catch {
  marketHost = "www.trymiroooo.com";
}

const poundOfferLabel = `${String.fromCharCode(163)}10`;
const staleDollarOfferLabel = `${String.fromCharCode(36)}10`;
const klaviyoNodeSelector =
  '[aria-modal="true"], [role="dialog"], [data-testid="POPUP"], div[class*="kl-private-reset-css"], .needsclick[class*="kl-private-reset-css"]';

const productBySlug = new Map(
  ALL_PRODUCTS.flatMap((product) => [
    [product.handle, product],
    [product.id, product],
  ]),
);

const x1Product = ALL_PRODUCTS.find((p) => p.handle === "miroooo-x" || p.id === "miroooo-x1");
if (x1Product) {
  productBySlug.set("miroooo-x1", x1Product);
  productBySlug.set("x1", x1Product);
  productBySlug.set("miroooo-x", x1Product);
}
const x2Product = ALL_PRODUCTS.find((p) => p.handle === "miroooo-x2" || p.id === "miroooo-x2");
if (x2Product) {
  productBySlug.set("x2", x2Product);
  productBySlug.set("miroooo-x2", x2Product);
}

function isEnabledHost() {
  if (typeof window === "undefined") {
    return false;
  }

  const host = window.location.hostname;
  return (
    host === marketHost ||
    host.endsWith(".vercel.app") ||
    host.includes("trymiroooo.com") ||
    host.includes("miroooo.com") ||
    host === "localhost" ||
    host === "127.0.0.1"
  );
}

function toAbsoluteUrl(url: string) {
  if (typeof window === "undefined") {
    return url;
  }
  if (!url) return window.location.origin;

  try {
    return new URL(url, window.location.origin).href;
  } catch {
    return url;
  }
}

function productPayload(product: Product) {
  const image = product.galleryImages?.[0]?.src || product.variants?.[0]?.image || "";
  return {
    ProductName: product.name,
    ProductID: product.plusBaseProductId || product.id,
    SKU: product.id,
    Categories: [
      "Oral Care",
      product.name.toLowerCase().includes("toothbrush") ? "Electric Toothbrush" : "Accessories",
    ],
    ImageURL: toAbsoluteUrl(image),
    URL: toAbsoluteUrl(`/products/${product.handle}`),
    Brand: "Miroooo",
    Price: product.price,
    CompareAtPrice: product.compareAt,
    Market: market.country || "United Kingdom",
    SourceSite: marketHost,
  };
}

function cartLinePayload(line: CartItem) {
  return {
    ProductID: line.productId || line.productHandle,
    SKU: line.variantId || line.id,
    ProductName: line.title,
    Quantity: line.quantity,
    ItemPrice: line.unitPrice,
    RowTotal: line.unitPrice * line.quantity,
    ProductURL: toAbsoluteUrl(line.url || `/products/${line.productHandle}`),
    ImageURL: toAbsoluteUrl(line.image),
    ProductCategories: [
      "Oral Care",
      line.title.toLowerCase().includes("toothbrush") ? "Electric Toothbrush" : "Accessories",
    ],
  };
}

function pushKlaviyo(command: KlaviyoCommand) {
  window.klaviyo = window.klaviyo || [];
  window.klaviyo.push(command);
}

function loadKlaviyo() {
  if (typeof document === "undefined" || document.querySelector("script[data-miroooo-klaviyo='true']")) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.dataset.mirooooKlaviyo = "true";
  script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${encodeURIComponent(
    KLAVIYO_COMPANY_ID,
  )}`;
  document.head.appendChild(script);
}

function runAfterEngagement(callback: () => void, delay = 25000) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  let hasRun = false;
  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  const listenerOptions = { once: true, passive: true } as AddEventListenerOptions;

  function cleanupListeners() {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, run, listenerOptions);
    });
  }

  function run() {
    if (hasRun) {
      return;
    }

    hasRun = true;
    window.clearTimeout(timer);
    cleanupListeners();
    callback();
  }

  const timer = window.setTimeout(run, delay);

  events.forEach((eventName) => {
    window.addEventListener(eventName, run, listenerOptions);
  });

  return () => {
    window.clearTimeout(timer);
    cleanupListeners();
  };
}

function isVisibleElement(node: HTMLElement) {
  const style = window.getComputedStyle(node);
  const rect = node.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    Number(style.opacity) > 0 &&
    rect.width > 8 &&
    rect.height > 8
  );
}

function isBlockingKlaviyoModal(node: HTMLElement) {
  if (!isVisibleElement(node)) {
    return false;
  }

  const rect = node.getBoundingClientRect();
  const style = window.getComputedStyle(node);
  const text = (node.textContent || "").toUpperCase();
  const modalAncestor = node.closest<HTMLElement>(
    '[aria-modal="true"], [role="dialog"], [data-testid="POPUP"]',
  );
  const container = modalAncestor ?? node;
  const containerRect = container.getBoundingClientRect();
  const containerStyle = window.getComputedStyle(container);
  const isFixedLayer =
    style.position === "fixed" ||
    containerStyle.position === "fixed" ||
    style.position === "sticky" ||
    containerStyle.position === "sticky";
  const coversModalArea =
    containerRect.width >= Math.min(window.innerWidth * 0.62, 420) &&
    containerRect.height >= Math.min(window.innerHeight * 0.28, 260);
  const looksLikeOfferModal =
    (text.includes("WELCOME") ||
      text.includes("NO, THANKS") ||
      text.includes(poundOfferLabel) ||
      text.includes(staleDollarOfferLabel)) &&
    rect.width >= 240 &&
    rect.height >= 160;

  return Boolean(modalAncestor && coversModalArea) || (isFixedLayer && looksLikeOfferModal);
}

function guardKlaviyoScrollLock() {
  let raf = 0;
  let startupChecks = 0;

  const removeStaleDollarPopupNodes = () => {
    document
      .querySelectorAll<HTMLElement>(klaviyoNodeSelector)
      .forEach((node) => {
        const text = node.textContent || "";

        if (!text.includes(staleDollarOfferLabel)) {
          return;
        }

        const popup =
          node.closest<HTMLElement>('[aria-modal="true"], [role="dialog"], [data-testid="POPUP"]') ??
          node;
        popup.remove();
      });
  };

  const removeVisibleOfferPopups = () => {
    document
      .querySelectorAll<HTMLElement>(klaviyoNodeSelector)
      .forEach((node) => {
        const text = node.textContent || "";

        if (
          !text.includes(`${staleDollarOfferLabel} WELCOME`) &&
          !text.includes(`${poundOfferLabel} WELCOME`)
        ) {
          return;
        }

        const popup =
          node.closest<HTMLElement>('[aria-modal="true"], [role="dialog"], [data-testid="POPUP"]') ??
          node;
        popup.remove();
      });
  };

  const hasVisibleBlockingKlaviyoModal = () =>
    Array.from(document.querySelectorAll<HTMLElement>(klaviyoNodeSelector)).some(
      isBlockingKlaviyoModal,
    );

  const clearScrollLock = () => {
    document.documentElement.style.overflow = "";
    document.documentElement.style.overflowX = "";
    document.documentElement.style.overflowY = "";
    document.documentElement.style.position = "";
    document.documentElement.style.height = "";
    document.documentElement.classList.remove("klaviyo-prevent-body-scrolling");
    document.body.classList.remove("klaviyo-prevent-body-scrolling");
    document.body.style.overflow = "";
    document.body.style.overflowX = "";
    document.body.style.overflowY = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.height = "";
  };

  const unlockScroll = () => {
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(() => {
      removeStaleDollarPopupNodes();

      if (hasVisibleBlockingKlaviyoModal()) {
        return;
      }

      clearScrollLock();
    });
  };

  const unlockRepeatedly = () => {
    [50, 150, 350, 700, 1200].forEach((delay) => {
      window.setTimeout(unlockScroll, delay);
    });
  };

  unlockRepeatedly();

  const startupInterval = window.setInterval(() => {
    startupChecks += 1;
    unlockScroll();

    if (startupChecks >= 24) {
      window.clearInterval(startupInterval);
    }
  }, 500);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        unlockScroll();
        continue;
      }

      if (mutation.addedNodes.length || mutation.removedNodes.length) {
        unlockScroll();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
    childList: true,
    subtree: true,
  });

  const handleDismissClick = (event: MouseEvent | PointerEvent) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const clickedClose = Boolean(
      target.closest('[aria-label*="close" i], .klaviyo-close-form'),
    );
    const clickedNoThanks = (target.textContent || "")
      .trim()
      .toUpperCase()
      .includes("NO, THANKS");

    if (!clickedClose && !clickedNoThanks) {
      return;
    }

    window.setTimeout(() => {
      removeVisibleOfferPopups();
      unlockRepeatedly();
    }, 50);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      unlockRepeatedly();
    }
  };

  document.addEventListener("click", handleDismissClick, { capture: true });
  document.addEventListener("pointerdown", handleDismissClick, { capture: true });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("load", unlockRepeatedly);
  window.addEventListener("pageshow", unlockRepeatedly);

  return () => {
    observer.disconnect();
    document.removeEventListener("click", handleDismissClick, { capture: true });
    document.removeEventListener("pointerdown", handleDismissClick, { capture: true });
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("load", unlockRepeatedly);
    window.removeEventListener("pageshow", unlockRepeatedly);
    window.clearInterval(startupInterval);
    window.cancelAnimationFrame(raf);
  };
}

export function KlaviyoAnalytics() {
  const pathname = usePathname();
  const trackedProductSlugs = useRef(new Set<string>());

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    window.klaviyo = window.klaviyo || [];
    const cleanupScrollGuard = guardKlaviyoScrollLock();
    const cleanupKlaviyoLoad = runAfterEngagement(loadKlaviyo);

    let hasTriggered = false;
    const openPopup = (event: MouseEvent) => {
      if (hasTriggered) return;
      if (event.clientY <= 12) {
        hasTriggered = true;
        loadKlaviyo();
        window._klOnsite = window._klOnsite || [];
        window._klOnsite.push(["openForm", KLAVIYO_POPUP_FORM_ID]);
      }
    };
    document.addEventListener("mouseleave", openPopup, { capture: true });

    return () => {
      document.removeEventListener("mouseleave", openPopup, { capture: true });
      cleanupKlaviyoLoad();
      cleanupScrollGuard();
    };
  }, []);

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    pushKlaviyo([
      "track",
      "Viewed Page",
      {
        PageName: document.title,
        URL: window.location.href,
        Path: pathname,
        Market: market.country || "United Kingdom",
        SourceSite: marketHost,
      },
    ]);

    const slug = pathname?.match(/^\/products\/([^/]+)/)?.[1];
    if (!slug || trackedProductSlugs.current.has(slug)) {
      return;
    }

    const product = productBySlug.get(slug);
    if (!product) {
      return;
    }

    const payload = productPayload(product);
    trackedProductSlugs.current.add(slug);

    pushKlaviyo(["track", "Viewed Product", payload]);
    pushKlaviyo([
      "trackViewedItem",
      {
        Title: payload.ProductName,
        ItemId: payload.ProductID,
        Categories: payload.Categories,
        ImageUrl: payload.ImageURL,
        Url: payload.URL,
        Metadata: {
          Brand: payload.Brand,
          Price: payload.Price,
          CompareAtPrice: payload.CompareAtPrice,
          Market: payload.Market,
        },
      },
    ]);
  }, [pathname]);

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    function handleAddToCart(event: Event) {
      const detail = (event as CustomEvent<AddToCartEventDetail>).detail;
      const product = detail?.product;
      const item = detail?.item;

      if (!product && !item) {
        return;
      }

      const name = product?.name || item?.title || "Miroooo Product";
      const id = product?.plusBaseProductId || product?.id || item?.productId || item?.productHandle || "";
      const sku = product?.id || item?.variantId || item?.id || "";
      const price = product?.price ?? item?.unitPrice ?? 0;
      const image = product?.galleryImages?.[0]?.src || item?.image || "";
      const url = product?.handle ? `/products/${product.handle}` : item?.url || "/products/miroooo-x2";

      pushKlaviyo([
        "track",
        "Added to Cart",
        {
          $value: price,
          AddedItemProductName: name,
          AddedItemProductID: id,
          AddedItemSKU: sku,
          AddedItemCategories: ["Oral Care"],
          AddedItemImageURL: toAbsoluteUrl(image),
          AddedItemURL: toAbsoluteUrl(url),
          AddedItemPrice: price,
          AddedItemQuantity: item?.quantity || 1,
          ItemNames: [name],
          CheckoutURL: toAbsoluteUrl("/cart"),
          Items: [
            {
              ProductID: id,
              SKU: sku,
              ProductName: name,
              Quantity: item?.quantity || 1,
              ItemPrice: price,
              RowTotal: price * (item?.quantity || 1),
              ProductURL: toAbsoluteUrl(url),
              ImageURL: toAbsoluteUrl(image),
              ProductCategories: ["Oral Care"],
            },
          ],
          Market: market.country || "United Kingdom",
          SourceSite: marketHost,
        },
      ]);
    }

    function handleStartedCheckout(event: Event) {
      const detail = (event as CustomEvent<CheckoutEventDetail>).detail;
      const lines = detail?.lines ?? [];
      const items = lines.map(cartLinePayload);

      if (!items.length) {
        return;
      }

      const totalVal =
        typeof (detail?.totals as CartTotals)?.finalSubtotal === "number"
          ? (detail.totals as CartTotals).finalSubtotal
          : typeof (detail?.totals as { subtotal?: number })?.subtotal === "number"
          ? (detail?.totals as { subtotal?: number }).subtotal
          : items.reduce((total, item) => total + item.RowTotal, 0);

      pushKlaviyo([
        "track",
        "Started Checkout",
        {
          $event_id: `uk-miroooo-${Date.now()}`,
          $value: totalVal,
          ItemNames: items.map((item) => item.ProductName),
          CheckoutURL: toAbsoluteUrl("/cart"),
          Categories: Array.from(
            new Set(items.flatMap((item) => item.ProductCategories)),
          ),
          Items: items,
          Market: market.country || "United Kingdom",
          SourceSite: marketHost,
        },
      ]);
    }

    window.addEventListener("miroooo:added-to-cart", handleAddToCart);
    window.addEventListener("miroooo:add-to-cart", handleAddToCart);
    window.addEventListener("buudy:add-to-cart", handleAddToCart);
    window.addEventListener("miroooo:started-checkout", handleStartedCheckout);
    window.addEventListener("buudy:started-checkout", handleStartedCheckout);

    return () => {
      window.removeEventListener("miroooo:added-to-cart", handleAddToCart);
      window.removeEventListener("miroooo:add-to-cart", handleAddToCart);
      window.removeEventListener("buudy:add-to-cart", handleAddToCart);
      window.removeEventListener("miroooo:started-checkout", handleStartedCheckout);
      window.removeEventListener("buudy:started-checkout", handleStartedCheckout);
    };
  }, []);

  return null;
}
