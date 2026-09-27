import type { Metadata } from "next";
import { getTemplateHtml } from "@/lib/template";

export const metadata: Metadata = {
  title: "Dental Care Routine Quiz | Miroooo CA",
  description: "Take the 2-minute oral care assessment to discover your personalised brush recommendation.",
  alternates: { canonical: "https://miroooo.ca/pages/dentalcare-quiz" },
};

export default function DentalcareQuizPage() {
  const content = getTemplateHtml("dentalcare-quiz.html");
  return (
    <div
      id="miroooo-page-root"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning
    />
  );
}
