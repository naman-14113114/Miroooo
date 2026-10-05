import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X1 Magnetic Wireless Charger | Weighted Induction Base",
  description:
    "Official Miroooo X1 magnetic induction charging dock with weighted non-slip silicone base and USB-C connectivity.",
  alternates: { canonical: "https://www.trymiroooo.com/products/x1-charger" },
};

export default function Page() {
  return <ProductPage handle="x1-charger" />;
}
