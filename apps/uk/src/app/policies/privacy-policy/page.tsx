import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Miroooo UK",
  description:
    "Read the Miroooo UK Privacy Policy. Learn how we protect personal information in compliance with UK GDPR and Data Protection Act 2018.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/privacy-policy" },
};

export default function Page() {
  return <PolicyPage slug="privacy-policy" />;
}
