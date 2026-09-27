import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Miroooo Smile Coach™ | Interactive Brushing Companion",
  description: "Guided 2-minute oral hygiene companion app designed for optimal 45° Bass brushing technique with Miroooo X2.",
  alternates: { canonical: "https://miroooo.us/pages/smile-coach" },
};

export default function SmileCoachPage() {
  const content = getTemplateHtml("smile-coach.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
