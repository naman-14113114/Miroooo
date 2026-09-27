import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 UK",
  description:
    "Meet Miroooo X1 and Miroooo X2: refined electric toothbrushes for a more considered daily routine. Free tracked UK delivery.",
  alternates: { canonical: "https://www.trymiroooo.com/" },
  openGraph: {
    title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 UK",
    description: "Precision without the noise. Discover Miroooo X1 and Miroooo X2.",
    url: "https://www.trymiroooo.com/",
    images: ["/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp"],
  },
};

export default function Page() {
  return <HomePage />;
}
