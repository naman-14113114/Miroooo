import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Your Bag | Miroooo US",
  description: "Review your selected Miroooo electric toothbrushes and accessories.",
  alternates: { canonical: "https://miroooo.us/cart" },
};

export default function Page() {
  return <CartPageContent />;
}
