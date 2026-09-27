import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Return Policy | Miroooo CA",
  description: "Official Return Policy of Miroooo, detailing our 30-day return window, cancellation policy, and return instructions.",
  alternates: { canonical: "https://miroooo.ca/policies/return-policy" },
};

export default function ReturnPolicyPage() {
  const content = getTemplateHtml("return-policy.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
