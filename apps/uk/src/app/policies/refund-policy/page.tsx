import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Refund Policy | Miroooo UK",
  description: "Official Refund Policy of Miroooo, detailing our 30-day return window, cancellation rules, and refund processing.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/refund-policy" },
};

export default function RefundPolicyPage() {
  const content = getTemplateHtml("refund-policy.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
