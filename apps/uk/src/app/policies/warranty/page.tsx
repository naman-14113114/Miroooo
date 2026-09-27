import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Warranty & Quality Guarantee | Miroooo UK",
  description: "Official warranty information and quality guarantee for Miroooo sonic electric toothbrushes.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/warranty" },
};

export default function WarrantyPolicyPage() {
  const content = getTemplateHtml("warranty.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
