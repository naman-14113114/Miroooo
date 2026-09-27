import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Miroooo X2 Replacement Heads (2-Pack) | Miroooo Australia",
  description:
    "Official Miroooo X2 replacement brush heads engineered specifically for 45° Bass sweep vibration and smart pressure defense. Free tracked Australia delivery.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x2-heads" },
};

export default function MirooooX2HeadsPage() {
  const content = getTemplateHtml("miroooo-x2-heads.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
