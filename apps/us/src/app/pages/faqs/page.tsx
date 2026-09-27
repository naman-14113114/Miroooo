import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Miroooo US",
  description: "Find answers to frequently asked questions about Miroooo electric toothbrushes, replacement heads, and shipping.",
  alternates: { canonical: "https://miroooo.us/pages/faqs" },
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
