import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Contact Us | Miroooo US",
  description: "Get in touch with the Miroooo oral care team for order inquiries, support, and product guidance.",
  alternates: { canonical: "https://miroooo.us/pages/contact-us" },
};

export default function ContactUsPage() {
  const content = getTemplateHtml("contact.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
