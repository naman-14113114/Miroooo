import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo Package Protection | Complete Transit Guarantee $3",
  description:
    "Complete transit damage, loss, and theft guarantee for your Miroooo order with expedited zero-cost unit replacement.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-package-protection" },
};

export default function Page() {
  return <ProductPage handle="miroooo-package-protection" />;
}
