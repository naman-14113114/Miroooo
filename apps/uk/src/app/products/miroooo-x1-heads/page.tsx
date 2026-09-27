import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X1 Replacement Heads (2-Pack) | DuPont Bristles UK",
  description:
    "Official Miroooo X1 replacement brush heads with micro-diamond polished DuPont filaments for safe, precise plaque removal.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x1-heads" },
};

export default function Page() {
  return <ProductPage handle="miroooo-x1-heads" />;
}
