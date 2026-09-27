import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Miroooo X2 Sonic Electric Toothbrush | UK",
  description:
    "Meet the Miroooo X2 sonic electric toothbrush with pressure feedback, IPX7 water resistance, up to 90 days of battery life and Smile Coach.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x2" },
  openGraph: {
    title: "Miroooo X2 Sonic Electric Toothbrush",
    description:
      "Miroooo X2 is a guided sonic electric toothbrush with pressure feedback, IPX7 water resistance and up to 90 days of battery life.",
    url: "https://www.trymiroooo.com/products/miroooo-x2",
    images: ["/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp"],
  },
};

export default function MirooooX2Page() {
  const content = getTemplateHtml("miroooo-x2.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
