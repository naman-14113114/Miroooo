import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Shop All Miroooo Electric Toothbrushes & Accessories | Canada",
  description:
    "Explore the complete Miroooo collection: Miroooo X1 acoustic sonic toothbrush, Miroooo X2 45° Bass sweep toothbrush, and precision replacement heads.",
  alternates: { canonical: "https://www.trymiroooo.com/shop" },
};

export default function ShopPage() {
  const content = getTemplateHtml("shop.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
