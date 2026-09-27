import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Miroooo X1 Replacement Heads (2-Pack) | Miroooo Canada",
  description:
    "Official Miroooo X1 replacement brush heads with DuPont precision acoustic bristles for everyday gum protection.",
  alternates: { canonical: "https://www.trymiroooo.com/products/miroooo-x1-heads" },
};

export default function MirooooX1HeadsPage() {
  const content = getTemplateHtml("miroooo-x1-heads.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
