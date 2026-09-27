import type { Metadata } from "next";
import { OrderTracking } from "@/components/pages/OrderTracking";

export const metadata: Metadata = {
  title: "Track Your Order | Miroooo US Delivery Portal",
  description:
    "Track the delivery status and courier transit of your Miroooo electric toothbrush order across the US.",
  alternates: { canonical: "https://miroooo.us/pages/order-tracking" },
};

export default function Page() {
  return <OrderTracking />;
}
