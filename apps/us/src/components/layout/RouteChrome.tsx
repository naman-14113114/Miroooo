"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface RouteChromeProps {
  defaultHeader: ReactNode;
  defaultFooter: ReactNode;
  cartHeader: ReactNode;
  cartFooter: ReactNode;
  children: ReactNode;
}

export function RouteChrome({
  defaultHeader,
  defaultFooter,
  cartHeader,
  cartFooter,
  children,
}: RouteChromeProps) {
  const pathname = usePathname();
  const isCart = pathname === "/cart";

  return (
    <>
      {isCart ? cartHeader : defaultHeader}
      <main id="main">{children}</main>
      {isCart ? cartFooter : defaultFooter}
    </>
  );
}
