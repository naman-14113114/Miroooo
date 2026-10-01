import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy | Miroooo US",
  description:
    "Read processing, delivery and tracking guidance for Miroooo US orders.",
  alternates: { canonical: "https://miroooo.us/pages/order-tracking" },
};

export default function Page() {
  return <PolicyPage slug="shipping-policy" />;
}
