import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Delivery & Returns | Miroooo UK",
  description: "Learn about Miroooo shipping timelines, delivery options, and return procedures.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/delivery-returns" },
};

export default function DeliveryReturnsPolicyPage() {
  const content = getTemplateHtml("delivery-returns.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
