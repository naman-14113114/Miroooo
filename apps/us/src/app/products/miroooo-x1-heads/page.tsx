import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Miroooo X1 Replacement Heads (2-Pack) | Miroooo US",
  description:
    "Official Miroooo X1 replacement brush heads with DuPont precision acoustic bristles for everyday gum protection.",
  alternates: { canonical: "https://miroooo.us/products/miroooo-x1-heads" },
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
