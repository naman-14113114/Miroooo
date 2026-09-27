import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy | Miroooo US",
  description:
    "Refund processing timelines, payment method credits, and return inspection policies.",
  alternates: { canonical: "https://miroooo.us/policies/refund-policy" },
};

export default function Page() {
  return <PolicyPage slug="refund-policy" />;
}
