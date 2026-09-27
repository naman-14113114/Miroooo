"use client";

import { useSyncExternalStore } from "react";

const key = "miroooo_cookie_choice";
const eventName = "miroooo-cookie-choice";

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, () => !localStorage.getItem(key), () => false);
  if (!visible) return null;

  const choose = (value: "accepted" | "declined") => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event(eventName));
  };

  return (
    <aside className="cookie-banner" aria-label="Cookie preferences">
      <div><strong>Cookies, kept simple.</strong><p>We use essential storage for shopping and attribution. No analytics SDK or advertising pixel is loaded.</p></div>
      <div className="cookie-banner__actions"><button className="button button--outline" type="button" onClick={() => choose("declined")}>Decline</button><button className="button" type="button" onClick={() => choose("accepted")}>Accept</button></div>
    </aside>
  );
}
