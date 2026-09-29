import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X2 Flagship Sonic Toothbrush | 45° Bass Sweep & Pressure Sensor UK",
  description:
    "Miroooo X2 flagship electric toothbrush features 45° Bass sweep vibration, smart red halo pressure defense, 90-day battery, and magnetic wall dock. Free UK delivery.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x2" },
  openGraph: {
    title: "Miroooo X2 Flagship Sonic Toothbrush | 45° Bass Sweep UK",
    description: "Precision without the noise. 45° Bass sweep motion & smart pressure feedback.",
    url: "https://www.trymiroooo.com/products/miroooo-x2",
    images: ["/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp"],
  },
};

export default async function Page(props: {
  searchParams?: Promise<{ color?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  return <ProductPage key={searchParams?.color || "default"} handle="miroooo-x2" searchParams={searchParams} />;
}
