import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Your Bag | Miroooo UK",
  description: "Review your selected Miroooo electric toothbrushes and accessories.",
  alternates: { canonical: "https://www.trymiroooo.com/cart" },
};

export default function Page() {
  return <CartPageContent />;
}
