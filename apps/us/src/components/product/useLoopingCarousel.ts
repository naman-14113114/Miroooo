"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Three copies let the visible strip wrap without scrolling back across every card. */
export function useLoopingCarousel(
  count: number,
  interval: number,
  centered = false,
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(count);
  const interacted = useRef(false);
  const frame = useRef(0);
  const selectedRef = useRef(count);

  const moveTo = useCallback(
    (index: number, animate = true) => {
      const track = trackRef.current;
      const card = track?.children[index] as HTMLElement | undefined;
      if (!track || !card) return;
      const left =
        card.offsetLeft -
        (centered
          ? (track.clientWidth - card.clientWidth) / 2
          : parseFloat(getComputedStyle(track).paddingLeft));
      cancelAnimationFrame(frame.current);
      const start = track.scrollLeft;
      const time = performance.now();
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.style.scrollSnapType = "none";
      const tick = (now: number) => {
        const p = !animate || reduced ? 1 : Math.min((now - time) / 700, 1);
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        track.scrollLeft = start + (left - start) * eased;
        if (p < 1) frame.current = requestAnimationFrame(tick);
        else track.style.scrollSnapType = "";
      };
      frame.current = requestAnimationFrame(tick);
    },
    [centered],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let settling = 0;
    const update = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const reference =
        track.scrollLeft +
        (centered
          ? track.clientWidth / 2
          : parseFloat(getComputedStyle(track).paddingLeft));
      const index = cards.reduce(
        (best, card, i) =>
          Math.abs(
            card.offsetLeft + (centered ? card.clientWidth / 2 : 0) - reference,
          ) <
          Math.abs(
            cards[best].offsetLeft +
              (centered ? cards[best].clientWidth / 2 : 0) -
              reference,
          )
            ? i
            : best,
        0,
      );
      selectedRef.current = index;
      setSelected(index);
      clearTimeout(settling);
      settling = window.setTimeout(() => {
        if (index < count || index >= count * 2)
          moveTo(count + (index % count), false);
      }, 160);
    };
    const stop = () => {
      interacted.current = true;
      cancelAnimationFrame(frame.current);
      track.style.scrollSnapType = "";
    };
    moveTo(count, false);
    const resize = new ResizeObserver(() => {
      if (track.clientWidth) moveTo(count + (selectedRef.current % count), false);
    });
    resize.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("pointerdown", stop, { passive: true });
    track.addEventListener("wheel", stop, { passive: true });
    const timer = window.setInterval(() => {
      const rect = track.getBoundingClientRect();
      if (
        !interacted.current &&
        !track.matches(":hover") &&
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        moveTo(selectedRef.current + 1);
    }, interval);
    return () => {
      clearInterval(timer);
      resize.disconnect();
      clearTimeout(settling);
      cancelAnimationFrame(frame.current);
      track.removeEventListener("scroll", update);
      track.removeEventListener("pointerdown", stop);
      track.removeEventListener("wheel", stop);
    };
  }, [count, interval, centered, moveTo]);

  const select = (index: number) => {
    interacted.current = true;
    moveTo(index);
  };
  return {
    trackRef,
    selected,
    select,
    previous: () => select(selectedRef.current - 1),
    next: () => select(selectedRef.current + 1),
  };
}
