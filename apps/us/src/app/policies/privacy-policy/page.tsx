import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Privacy Policy | Miroooo US",
  description: "Official Privacy Policy of Miroooo, detailing data protection practices and privacy rights for US customers.",
  alternates: { canonical: "https://miroooo.us/policies/privacy-policy" },
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
