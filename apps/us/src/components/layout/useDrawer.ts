"use client";
import { useEffect, useRef } from "react";

/** Keep focus and scrolling inside the active drawer, then return to its trigger. */
export function useDrawer(
  isOpen: boolean,
  onClose: () => void,
  bodyClass: string,
) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add(bodyClass, "has-modal-open");
    const controls = () =>
      Array.from(
        ref.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]',
        ) || [],
      ).filter((el) => el.getClientRects().length);
    controls()[0]?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab") return;
      const elements = controls();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.body.style.overflow = overflow;
      document.body.classList.remove(bodyClass, "has-modal-open");
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [isOpen, bodyClass]);
  return ref;
}
