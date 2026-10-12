import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo Gift Card | Official Digital Voucher £10",
  description:
    "Official Miroooo digital voucher delivered instantly via email. Never expires and valid across all Miroooo electric toothbrushes, replacement brush heads, and oral accessories.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-gift-card" },
};

export default function Page() {
  return <ProductPage handle="miroooo-gift-card" />;
}
