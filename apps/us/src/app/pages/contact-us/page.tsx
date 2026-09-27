import type { Metadata } from "next";
import { ContactForm } from "@/components/pages/ContactForm";

export const metadata: Metadata = {
  title: "Contact Miroooo | Customer Support & Inquiries US",
  description:
    "Contact Miroooo for product guidance, order updates, delivery, returns, and customer care for your electric toothbrushes.",
  alternates: { canonical: "https://miroooo.us/pages/contact-us" },
};

export default function Page() {
  return <ContactForm />;
}
