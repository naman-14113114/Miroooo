import type { Metadata } from "next";
import { ShopPage } from "@/components/pages/ShopPage";

export const metadata: Metadata = {
  title: "Shop All Miroooo Electric Toothbrushes & Accessories | UK",
  description:
    "Explore the complete Miroooo collection: Miroooo X1 acoustic sonic toothbrush, Miroooo X2 45° Bass sweep toothbrush, and precision replacement heads.",
  alternates: { canonical: "https://www.trymiroooo.com/all-products" },
};

export default function Page() {
  return <ShopPage />;
}
