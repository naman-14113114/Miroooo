import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Miroooo X1 Sonic Electric Toothbrush | Australia",
  description:
    "Meet the Miroooo X1 32,000 VPM acoustic sonic electric toothbrush with 3 brushing modes, 60+ days battery life and magnetic travel case.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x" },
  openGraph: {
    title: "Miroooo X1 Sonic Electric Toothbrush",
    description:
      "A lightweight 32,000 VPM acoustic sonic electric toothbrush with three modes and 60+ days of battery life.",
    url: "https://www.trymiroooo.com/products/miroooo-x",
    images: ["/gallery_orig/Grey-color-8.jpg"],
  },
};

export default function MirooooX1Page() {
  const content = getTemplateHtml("miroooo-x.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
