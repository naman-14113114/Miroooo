import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo Magnetic Wall Mounted Dock | Minimalist Floating Storage",
  description:
    "Official Miroooo magnetic wall mount and mirror dock for hygienic, floating toothbrush storage with zero countertop residue.",
  alternates: { canonical: "https://www.trymiroooo.com/products/wall-mounted-dock" },
};

export default function Page() {
  return <ProductPage handle="wall-mounted-dock" />;
}
