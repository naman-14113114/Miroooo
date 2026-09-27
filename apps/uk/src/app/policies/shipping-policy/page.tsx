import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Shipping Policy | Miroooo UK",
  description: "Official Shipping Policy of Miroooo, detailing delivery times, Royal Mail tracking, and dispatch standards.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/shipping-policy" },
};

export default function ShippingPolicyPage() {
  const content = getTemplateHtml("shipping-policy.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
