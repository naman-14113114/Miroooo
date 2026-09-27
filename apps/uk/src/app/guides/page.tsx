import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Oral Care Guides & Dental Wellness | Miroooo UK",
  description: "Comprehensive guides on sonic brushing techniques, brush head replacements, and daily oral hygiene.",
  alternates: { canonical: "https://www.trymiroooo.com/guides" },
};

export default function GuidesPage() {
  const content = getTemplateHtml("guides/index.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
