import type { Metadata } from "next";
import { OrderTracking } from "@/components/pages/OrderTracking";

export const metadata: Metadata = {
  title: "Order Tracking | Miroooo UK",
  description:
    "Track your Miroooo sonic electric toothbrush order in real-time. Enter your tracking number or order number for up-to-date delivery progress.",
  alternates: {
    canonical: "https://www.trymiroooo.com/pages/order-tracking",
  },
  openGraph: {
    title: "Order Tracking | Miroooo UK",
    description:
      "Track your Miroooo sonic electric toothbrush order in real-time. Enter your tracking number or order number for up-to-date delivery progress.",
    url: "https://www.trymiroooo.com/pages/order-tracking",
  },
};

export default function Page() {
  return <OrderTracking />;
}
