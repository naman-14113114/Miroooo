import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Your Bag | Miroooo UK",
  description: "Review your selected Miroooo electric toothbrushes and accessories.",
  alternates: { canonical: "https://www.trymiroooo.com/cart" },
};

export default function CartPage() {
  const content = getTemplateHtml("cart.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
