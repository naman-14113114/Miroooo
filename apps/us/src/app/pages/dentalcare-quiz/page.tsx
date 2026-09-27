import type { Metadata } from "next";
import { DentalQuiz } from "@/components/quiz/DentalQuiz";

export const metadata: Metadata = {
  title: "Dental Care Quiz | Find Your Miroooo Routine US",
  description:
    "Answer 5 quick questions to match your dental care goals, sensitivity and habits to the right Miroooo electric toothbrush.",
  alternates: { canonical: "https://miroooo.us/pages/dentalcare-quiz" },
};

export default function Page() {
  return <DentalQuiz />;
}
