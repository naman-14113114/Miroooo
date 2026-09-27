import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Contact Us | Miroooo CA",
  description: "Get in touch with the Miroooo oral care team for order inquiries, support, and product guidance in Canada.",
  alternates: { canonical: "https://miroooo.ca/pages/contact-us" },
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
