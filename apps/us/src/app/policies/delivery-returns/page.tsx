import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Delivery & Returns Overview | Miroooo US",
  description:
    "Comprehensive overview of Miroooo US shipping timelines: Free tracked delivery, 1-3 business days processing, 3-10 business days transit, returns eligibility, and 2-year warranty.",
  alternates: { canonical: "https://miroooo.us/policies/delivery-returns" },
};

export default function Page() {
  return <PolicyPage slug="delivery-returns" />;
}
