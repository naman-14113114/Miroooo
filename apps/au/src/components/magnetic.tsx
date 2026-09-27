"use client";

import { cloneElement, isValidElement, type MouseEvent, type ReactElement } from "react";

export function Magnetic({ children }: { children: ReactElement<{ style?: React.CSSProperties }> }) {
  if (!isValidElement(children)) return children;

  const move = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
    target.style.transform = `translate(${x}px, ${y}px)`;
  };

  return cloneElement(children, {
    onMouseMove: move,
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      event.currentTarget.style.transform = "";
    },
  } as never);
}
