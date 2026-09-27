import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Privacy Policy | Miroooo CA",
  description: "Official Privacy Policy of Miroooo, detailing PIPEDA compliance and data protection practices.",
  alternates: { canonical: "https://miroooo.ca/policies/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const content = getTemplateHtml("privacy.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
