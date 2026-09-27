import type { Metadata } from "next";
import { DentalQuiz } from "@/components/quiz/DentalQuiz";

export const metadata: Metadata = {
  title: "Dental Care Quiz | Find Your Miroooo Routine UK",
  description:
    "Answer 5 quick questions to match your dental care goals, sensitivity and habits to the right Miroooo electric toothbrush.",
  alternates: { canonical: "https://www.trymiroooo.com/pages/dentalcare-quiz" },
};

export default function Page() {
  return <DentalQuiz />;
}
