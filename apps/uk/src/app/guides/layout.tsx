import type { ReactNode } from "react";

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/guides.css" />
      {children}
    </>
  );
}
