import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Shipping Policy | Miroooo US",
  description: "Official Shipping Policy of Miroooo, detailing delivery times, USPS tracking, and dispatch standards.",
  alternates: { canonical: "https://miroooo.us/policies/shipping-policy" },
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
