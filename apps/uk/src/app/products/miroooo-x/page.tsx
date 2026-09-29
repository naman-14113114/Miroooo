import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X1 Sonic Electric Toothbrush | Ultralight 51g Unibody UK",
  description:
    "Miroooo X1 delivers 32,000 VPM acoustic micro-vibrations, 51g aerospace aluminium body, 3 modes, and 60+ days of battery life. Free UK delivery.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x" },
};

export default async function Page(props: {
  searchParams?: Promise<{ color?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  return <ProductPage key={searchParams?.color || "default"} handle="miroooo-x" searchParams={searchParams} />;
}
