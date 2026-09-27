import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Miroooo CA",
  description: "Find answers to frequently asked questions about Miroooo electric toothbrushes, replacement heads, and Canada shipping.",
  alternates: { canonical: "https://miroooo.ca/pages/faqs" },
};

export default function FAQsPage() {
  const content = getTemplateHtml("faq.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
