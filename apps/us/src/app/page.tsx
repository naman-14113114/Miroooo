import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 US",
  description:
    "Meet Miroooo X1 and Miroooo X2: refined electric toothbrushes for a more considered daily routine. Free tracked US delivery.",
  alternates: { canonical: "https://miroooo.us/" },
  openGraph: {
    title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 US",
    description: "Precision without the noise. Discover Miroooo X1 and Miroooo X2.",
    url: "https://miroooo.us/",
    images: ["/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp"],
  },
};

export default function Page() {
  return <HomePage />;
}
