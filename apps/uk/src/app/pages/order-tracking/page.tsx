import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy | Miroooo UK",
  description:
    "Read processing, delivery and tracking guidance for Miroooo UK orders.",
  alternates: { canonical: "https://www.trymiroooo.com/pages/order-tracking" },
};

export default function Page() {
  return <PolicyPage slug="shipping-policy" />;
}
