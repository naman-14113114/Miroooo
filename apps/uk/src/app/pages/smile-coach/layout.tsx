import type { ReactNode } from "react";

export default function SmileCoachLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/smile-coach.css" />
      {children}
    </>
  );
}
