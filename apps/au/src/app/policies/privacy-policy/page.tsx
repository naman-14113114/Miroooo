import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Privacy Policy | Miroooo AU",
  description: "Official Privacy Policy of Miroooo, detailing privacy compliance and data protection practices.",
  alternates: { canonical: "https://miroooo.com.au/policies/privacy-policy" },
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
