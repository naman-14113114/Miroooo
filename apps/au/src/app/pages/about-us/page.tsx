import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "About Us | Miroooo AU",
  description: "Learn about Miroooo's mission to design quieter, more considered oral care essentials.",
  alternates: { canonical: "https://miroooo.com.au/pages/about-us" },
};

export default function AboutUsPage() {
  const content = getTemplateHtml("about-us.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
