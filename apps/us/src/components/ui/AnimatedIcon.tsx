"use client";

import { useEffect, useRef } from "react";

type Animation = { destroy(): void; play(): void; pause(): void; goToAndStop(frame: number, isFrame: boolean): void };
type Lottie = { loadAnimation(options: { container: HTMLElement; renderer: "svg"; loop: boolean; autoplay: boolean; path: string }): Animation };
let runtime: Promise<Lottie> | undefined;

function loadRuntime() {
  if (!runtime) runtime = new Promise<Lottie>((resolve, reject) => {
    const browser = window as typeof window & { lottie?: Lottie };
    if (browser.lottie) { resolve(browser.lottie); return; }
    const script = document.createElement("script");
    script.src = "/assets/lottie.min.js";
    script.async = true;
    script.onload = () => browser.lottie ? resolve(browser.lottie) : reject(new Error("Animation runtime unavailable"));
    script.onerror = () => { runtime = undefined; script.remove(); reject(new Error("Animation runtime unavailable")); };
    document.head.appendChild(script);
  });
  return runtime;
}

/** Source icon artwork, owned and cleaned up by its React component. */
export function AnimatedIcon({ kind, className = "" }: { kind: "cart" | "truck"; className?: string }) {
  const container = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let active = true;
    let animation: Animation | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (reduced.matches) animation?.goToAndStop(0, true);
      else if (document.visibilityState === "visible") animation?.play();
      else animation?.pause();
    };
    loadRuntime().then((lottie) => {
      if (!active) return;
      animation = lottie.loadAnimation({ container: element, renderer: "svg", loop: true, autoplay: !reduced.matches, path: `/assets/lottie-${kind}.json` });
      update();
    }).catch(() => {});
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { active = false; animation?.destroy(); reduced.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, [kind]);
  return <span ref={container} className={className} aria-hidden="true" style={{ display: "inline-flex", width: kind === "truck" ? 30 : 18, height: kind === "truck" ? 24 : 18, flexShrink: 0 }} />;
}
