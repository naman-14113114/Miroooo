"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PRODUCTS, ALL_PRODUCTS, type Product } from "@/data/products";
import type { CartItem } from "@/lib/cart";
import { market } from "@/lib/market";

type KlaviyoCommand = [string, ...unknown[]];

declare global {
  interface Window {
    klaviyo?: KlaviyoCommand[];
    _klOnsite?: KlaviyoCommand[];
  }
}

type ProductEventDetail = {
  product?: Product;
  currency?: string;
  unitPrice?: number;
  compareAtPrice?: number;
  quantity?: number;
  locale?: string;
  checkoutUrl?: string;
  productUrl?: string;
};

type CheckoutEventDetail = {
  lines?: CartItem[];
  items?: CartItem[];
  currency?: string;
  unitPrice?: number;
  total?: number;
  locale?: string;
  checkoutUrl?: string;
  productUrl?: string;
  totals?: {
    totalCents?: number;
    finalSubtotal?: number;
    currency?: string;
  };
};

const KLAVIYO_COMPANY_ID =
  process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID || "TQtq2j";
const KLAVIYO_POPUP_FORM_ID = "XECVNw";
const marketHost = new URL(market.siteUrl).hostname;
const klaviyoNodeSelector =
  '[aria-modal="true"], [role="dialog"], [data-testid="POPUP"], div[class*="kl-private-reset-css"], .needsclick[class*="kl-private-reset-css"]';

function isEnabledHost() {
  if (typeof window === "undefined") {
    return false;
  }

  const host = window.location.hostname;
  return (
    host === marketHost ||
    host === "miroooo.us" ||
    host === "www.miroooo.us" ||
    host.endsWith(".vercel.app") ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.includes("miroooo")
  );
}

function toAbsoluteUrl(url: string) {
  if (typeof window === "undefined") {
    return url;
  }

  try {
    return new URL(url, window.location.origin).href;
  } catch {
    return url;
  }
}

function productPayload(product: Product, detail: ProductEventDetail = {}) {
  const price = Number.isFinite(detail.unitPrice) ? detail.unitPrice : product.price;
  const compareAt = Number.isFinite(detail.compareAtPrice) ? detail.compareAtPrice : product.compareAt;
  const image = product.variants?.[0]?.image || "/favicon.png";

  return {
    ProductName: product.name,
    ProductID: product.id || product.handle,
    SKU: product.plusBaseProductId || product.handle,
    Categories: ["Oral Care", "Electric Toothbrush"],
    ImageURL: toAbsoluteUrl(image),
    URL: toAbsoluteUrl(detail.productUrl || `/products/${product.handle}`),
    Brand: "Miroooo",
    Price: price,
    $currency: detail.currency || "USD",
    CompareAtPrice: compareAt,
    Language: detail.locale || (typeof document !== "undefined" ? document.documentElement.lang : "en-US"),
    Market: "US",
    SourceSite: marketHost,
  };
}

function cartLinePayload(line: CartItem, detail: CheckoutEventDetail = {}) {
  return {
    ProductID: line.productId || line.productHandle,
    SKU: line.variantId || line.id,
    ProductName: line.title,
    Quantity: line.quantity,
    ItemPrice: line.unitPrice,
    RowTotal: line.unitPrice * line.quantity,
    ProductURL: toAbsoluteUrl(line.url || `/products/${line.productHandle}`),
    ImageURL: toAbsoluteUrl(line.image),
    ProductCategories: ["Oral Care", "Electric Toothbrush"],
  };
}

function pushKlaviyo(command: KlaviyoCommand) {
  window.klaviyo = window.klaviyo || [];
  window.klaviyo.push(command);
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
  const modalAncestor = node.closest<HTMLElement>(
    '[aria-modal="true"], [role="dialog"], [data-testid="POPUP"]'
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

  return Boolean(modalAncestor && coversModalArea) || (isFixedLayer && rect.width >= 240 && rect.height >= 160);
}

function guardKlaviyoScrollLock() {
  let raf = 0;
  let startupChecks = 0;

  const hasVisibleBlockingKlaviyoModal = () =>
    Array.from(document.querySelectorAll<HTMLElement>(klaviyoNodeSelector)).some(
      isBlockingKlaviyoModal
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
      target.closest('[aria-label*="close" i], .klaviyo-close-form')
    );
    const clickedNoThanks = (target.textContent || "")
      .trim()
      .toUpperCase()
      .includes("NO, THANKS");

    if (!clickedClose && !clickedNoThanks) {
      return;
    }

    window.setTimeout(() => {
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

function loadKlaviyoScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector("script[data-miroooo-klaviyo='true']")) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.dataset.mirooooKlaviyo = "true";
  script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${encodeURIComponent(
    KLAVIYO_COMPANY_ID
  )}`;
  document.head.appendChild(script);
}

function runAfterEngagement(callback: () => void, delay = 35000) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  let hasRun = false;
  const events = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;
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

export function KlaviyoAnalytics({
  enableExitPopup = true,
}: {
  enableExitPopup?: boolean;
} = {}) {
  const pathname = usePathname();
  const trackedProductSlugs = useRef(new Set<string>());

  useEffect(() => {
    if (!enableExitPopup) return;

    let hasTriggered = false;
    const openPopup = (event: MouseEvent) => {
      if (hasTriggered) return;
      if (event.clientY <= 12) {
        hasTriggered = true;
        window._klOnsite = window._klOnsite || [];
        window._klOnsite.push(["openForm", KLAVIYO_POPUP_FORM_ID]);
      }
    };
    document.addEventListener("mouseleave", openPopup, { capture: true });

    return () => {
      document.removeEventListener("mouseleave", openPopup, { capture: true });
    };
  }, [enableExitPopup]);

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    window.klaviyo = window.klaviyo || [];
    const cleanupScrollGuard = guardKlaviyoScrollLock();
    const cleanupKlaviyoLoad = runAfterEngagement(loadKlaviyoScript);

    return () => {
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
        Market: "US",
        Language: document.documentElement.lang || "en-US",
        SourceSite: marketHost,
      },
    ]);

    let slug = pathname?.match(/^(?:\/[A-Za-z-]+)?\/products\/([^/]+)/)?.[1];
    if (!slug) {
      if (pathname === "/miroooo_x1" || pathname === "/products/miroooo-x") slug = "miroooo-x";
      if (pathname === "/miroooo_x2" || pathname === "/products/miroooo-x2") slug = "miroooo-x2";
    }

    if (!slug || trackedProductSlugs.current.has(slug)) {
      return;
    }

    const product = PRODUCTS[slug] || ALL_PRODUCTS.find((p) => p.handle === slug);
    if (!product) {
      return;
    }

    const payload = productPayload(product, { productUrl: pathname || undefined });
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
      const detail = (event as CustomEvent<ProductEventDetail>).detail;
      const product = detail?.product;

      if (!product) {
        return;
      }

      const payload = productPayload(product, detail);
      const quantity = detail.quantity || 1;

      pushKlaviyo([
        "track",
        "Added to Cart",
        {
          ...(payload.Price !== undefined ? { $value: payload.Price * quantity, $currency: payload.$currency } : {}),
          AddedItemProductName: payload.ProductName,
          AddedItemProductID: payload.ProductID,
          AddedItemSKU: payload.SKU,
          AddedItemCategories: payload.Categories,
          AddedItemImageURL: payload.ImageURL,
          AddedItemURL: payload.URL,
          AddedItemPrice: payload.Price,
          AddedItemQuantity: quantity,
          ItemNames: [payload.ProductName],
          CheckoutURL: toAbsoluteUrl(detail.checkoutUrl || "/cart"),
          Items: [
            {
              ProductID: payload.ProductID,
              SKU: payload.SKU,
              ProductName: payload.ProductName,
              Quantity: quantity,
              ItemPrice: payload.Price,
              RowTotal: payload.Price === undefined ? undefined : payload.Price * quantity,
              ProductURL: payload.URL,
              ImageURL: payload.ImageURL,
              ProductCategories: payload.Categories,
            },
          ],
          Language: detail.locale || document.documentElement.lang || "en-US",
          Market: "US",
          SourceSite: marketHost,
        },
      ]);
    }

    function handleStartedCheckout(event: Event) {
      const detail = (event as CustomEvent<CheckoutEventDetail>).detail;
      const lines = detail?.lines || detail?.items || [];
      const items = lines.map((line) => cartLinePayload(line, detail));
      const total =
        typeof detail?.total === "number"
          ? detail.total
          : typeof detail?.totals?.finalSubtotal === "number"
          ? detail.totals.finalSubtotal
          : typeof detail?.totals?.totalCents === "number"
          ? detail.totals.totalCents / 100
          : undefined;
      const currency = detail?.currency || detail?.totals?.currency || "USD";

      if (!items.length) {
        return;
      }

      pushKlaviyo([
        "track",
        "Started Checkout",
        {
          $event_id: `miroooo-${Date.now()}`,
          ...(total !== undefined && currency ? { $value: total, $currency: currency } : {}),
          ItemNames: items.map((item) => item.ProductName),
          CheckoutURL: toAbsoluteUrl(detail?.checkoutUrl || "/cart"),
          Categories: Array.from(new Set(items.flatMap((item) => item.ProductCategories))),
          Items: items,
          Language: detail?.locale || document.documentElement.lang || "en-US",
          Market: "US",
          SourceSite: marketHost,
        },
      ]);
    }

    window.addEventListener("miroooo:added-to-cart", handleAddToCart);
    window.addEventListener("buudy:add-to-cart", handleAddToCart);
    window.addEventListener("miroooo:started-checkout", handleStartedCheckout);
    window.addEventListener("buudy:started-checkout", handleStartedCheckout);

    return () => {
      window.removeEventListener("miroooo:added-to-cart", handleAddToCart);
      window.removeEventListener("buudy:add-to-cart", handleAddToCart);
      window.removeEventListener("miroooo:started-checkout", handleStartedCheckout);
      window.removeEventListener("buudy:started-checkout", handleStartedCheckout);
    };
  }, []);

  return null;
}
