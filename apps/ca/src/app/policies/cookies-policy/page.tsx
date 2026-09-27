import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Cookies Policy | Miroooo CA",
  description: "Official Cookies Policy of Miroooo, explaining how cookies and tracking technologies are used.",
  alternates: { canonical: "https://miroooo.ca/policies/cookies-policy" },
};

export default function CookiesPolicyPage() {
  const content = getTemplateHtml("cookies-policy.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
