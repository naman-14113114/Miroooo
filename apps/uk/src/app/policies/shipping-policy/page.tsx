import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "UK Shipping & Delivery Policy | Miroooo",
  description:
    "Read our UK shipping policy: Free tracked delivery, 1-3 business days processing, 7-20 business days transit timeframe.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/shipping-policy" },
};

export default function Page() {
  return <PolicyPage slug="shipping-policy" />;
}
