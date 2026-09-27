import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X2 Replacement Heads (2-Pack) | 45° Bass Sweep Coupling US",
  description:
    "Official Miroooo X2 replacement brush heads engineered for the dynamic 45° oscillating drive shaft with DuPont filaments.",
  alternates: { canonical: "https://miroooo.us/products/miroooo-x2-heads" },
};

export default function Page() {
  return <ProductPage handle="miroooo-x2-heads" />;
}
