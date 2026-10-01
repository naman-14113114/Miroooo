import type { ReactNode } from "react";

export default function DentalQuizLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/dentalcare-quiz.css" />
      {children}
    </>
  );
}
