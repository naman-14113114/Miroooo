import type { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets_ref/theme.css" />
      <link rel="stylesheet" href="/assets_ref/apps.css" />
      <link rel="stylesheet" href="/assets/product-shell.css" />
      <link rel="stylesheet" href="/assets_ref/miroooo-reviews.css" />
      {children}
    </>
  );
}
