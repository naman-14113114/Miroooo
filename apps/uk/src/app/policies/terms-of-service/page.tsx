import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Terms of Service | Miroooo UK",
  description: "Official Terms of Service of Miroooo, detailing terms of sale, website usage rules, and legal agreements.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/terms-of-service" },
};

export default function TermsOfServicePage() {
  const content = getTemplateHtml("terms.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
