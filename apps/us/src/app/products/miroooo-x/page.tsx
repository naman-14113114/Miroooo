import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X1 Sonic Electric Toothbrush | Ultralight 51g Unibody US",
  description:
    "Miroooo X1 delivers 32,000 VPM acoustic micro-vibrations, 51g aerospace aluminum body, 3 modes, and 60+ days of battery life. Free US delivery.",
  alternates: { canonical: "https://miroooo.us/products/miroooo-x" },
};

export default async function Page(props: {
  searchParams?: Promise<{ color?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  return <ProductPage handle="miroooo-x" searchParams={searchParams} />;
}
