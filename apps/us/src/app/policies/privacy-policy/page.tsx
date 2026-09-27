import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Miroooo US",
  description:
    "Read the Miroooo US Privacy Policy. Learn how we protect personal information.",
  alternates: { canonical: "https://miroooo.us/policies/privacy-policy" },
};

export default function Page() {
  return <PolicyPage slug="privacy-policy" />;
}
