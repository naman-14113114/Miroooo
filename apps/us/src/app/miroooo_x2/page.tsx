import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";

export const metadata: Metadata = {
  title: "Miroooo X2 Flagship Sonic Toothbrush | 45° Bass Sweep & Pressure Sensor US",
  description:
    "Miroooo X2 flagship electric toothbrush features 45° Bass sweep vibration, smart red halo pressure defense, 90-day battery, and magnetic wall dock. Free US delivery.",
  alternates: { canonical: "https://miroooo.us/miroooo_x2" },
  openGraph: {
    title: "Miroooo X2 Flagship Sonic Toothbrush | 45° Bass Sweep US",
    description: "Precision without the noise. 45° Bass sweep motion & smart pressure feedback.",
    url: "https://miroooo.us/miroooo_x2",
    images: ["/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp"],
  },
};

export default async function Page(props: {
  searchParams?: Promise<{ color?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  return <ProductPage key={searchParams?.color || "default"} handle="miroooo-x2" searchParams={searchParams} isSimpleBuybox={false} />;
}
