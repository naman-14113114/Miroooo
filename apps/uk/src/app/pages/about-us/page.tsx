import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Miroooo Considered Oral Care UK",
  description:
    "At Miroooo, we believe daily care should feel considered, not complicated. We engineer quietly precise electric toothbrushes combining acoustic innovation with minimalist design.",
  alternates: { canonical: "https://www.trymiroooo.com/pages/about-us" },
};

export default function Page() {
  return <AboutPage />;
}
