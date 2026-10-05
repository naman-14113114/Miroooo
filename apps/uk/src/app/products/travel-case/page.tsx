import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo Luxury Travel Case | Slim Protective Hard Shell",
  description:
    "Official Miroooo slim hard shell travel case with magnetic snap closure and dual micro-airflow vents for hygienic travel.",
  alternates: { canonical: "https://www.trymiroooo.com/products/travel-case" },
};

export default function Page() {
  return <ProductPage handle="travel-case" />;
}
