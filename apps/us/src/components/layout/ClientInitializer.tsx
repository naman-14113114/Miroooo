"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ClientInitializer() {
  const pathname = usePathname();
  useEffect(() => {
    const pageNames: Record<string, string> = {
      "/": "home",
      "/cart": "cart",
      "/products/miroooo-x": "product-x",
      "/products/miroooo-x2": "product-x2",
      "/products/miroooo-x1-heads": "product-x1-heads",
      "/products/miroooo-x2-heads": "product-x2-heads",
    };
    document.body.dataset.page =
      pageNames[pathname] || pathname.split("/").pop() || "";
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cleanups: (() => void)[] = [];
    const initialized = new WeakSet<Element>();
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5%" },
    );

    const initialize = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal, [data-drag-scroll]")
        .forEach((element) => {
          if (initialized.has(element)) return;
          initialized.add(element);
          if (element.matches(".reveal")) {
            if (reducedMotion) element.classList.add("is-visible");
            else revealObserver.observe(element);
          }
          if (!element.matches("[data-drag-scroll]")) return;
          let down = false;
          let start = 0;
          let scroll = 0;
          let moved = false;
          const pointerDown = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            down = true;
            moved = false;
            start = event.clientX;
            scroll = element.scrollLeft;
          };
          const pointerMove = (event: PointerEvent) => {
            if (!down) return;
            const distance = event.clientX - start;
            if (Math.abs(distance) > 6) {
              moved = true;
              element.classList.add("is-dragging");
              element.setPointerCapture(event.pointerId);
              element.scrollLeft = scroll - distance;
            }
          };
          const end = () => {
            down = false;
            element.classList.remove("is-dragging");
          };
          const click = (event: MouseEvent) => {
            if (moved) {
              event.preventDefault();
              event.stopPropagation();
              moved = false;
            }
          };
          const drag = (event: DragEvent) => event.preventDefault();
          element.addEventListener("pointerdown", pointerDown);
          element.addEventListener("pointermove", pointerMove);
          element.addEventListener("pointerup", end);
          element.addEventListener("pointercancel", end);
          element.addEventListener("click", click, true);
          element.addEventListener("dragstart", drag);
          cleanups.push(() => {
            element.removeEventListener("pointerdown", pointerDown);
            element.removeEventListener("pointermove", pointerMove);
            element.removeEventListener("pointerup", end);
            element.removeEventListener("pointercancel", end);
            element.removeEventListener("click", click, true);
            element.removeEventListener("dragstart", drag);
          });
        });
    };
    // App Router can stream page children after this persistent shell has mounted.
    const mutations = new MutationObserver(initialize);
    mutations.observe(document.body, { childList: true, subtree: true });
    initialize();
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() =>
        document.body.classList.add("is-ready"),
      );
    });
    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      mutations.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      document.body.classList.remove("is-ready");
      delete document.body.dataset.page;
    };
  }, [pathname]);
  return null;
}
