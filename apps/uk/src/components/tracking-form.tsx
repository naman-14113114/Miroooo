"use client";

import { useRef, useState } from "react";

export function TrackingForm() {
  const [submitted, setSubmitted] = useState(false);
  const message = useRef<HTMLDivElement>(null);
  return <><form className="track-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); requestAnimationFrame(() => message.current?.focus()); }}><label><span className="sr-only">Order number</span><input className="field" name="order" autoComplete="off" placeholder="Order number" required /></label><label><span className="sr-only">Checkout email</span><input className="field" type="email" name="email" autoComplete="email" placeholder="Checkout email" required /></label><button className="button" type="submit">Find help</button></form><div ref={message} className={`form-message${submitted ? " is-visible" : ""}`} tabIndex={-1}><strong>Use the live link in your dispatch email.</strong><br />If you have not received one after the processing window, email <a href="mailto:support@trymiroooo.com?subject=Miroooo%20tracking%20help"><u>support@trymiroooo.com</u></a> with the order number and checkout email you entered.</div></>;
}
