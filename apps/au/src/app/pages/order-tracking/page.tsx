import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Track Your Order | Miroooo AU",
  description: "Track your Miroooo order shipment and delivery status using your tracking number.",
  alternates: { canonical: "https://miroooo.com.au/pages/order-tracking" },
};

export default function OrderTrackingPage() {
  const content = getTemplateHtml("order-tracking.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
