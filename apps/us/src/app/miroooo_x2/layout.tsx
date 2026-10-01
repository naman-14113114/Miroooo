import type { ReactNode } from "react";

export default function MirooooX2Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/product-tokens.css" />
      <link rel="stylesheet" href="/assets_ref/theme.css" />
      <link rel="stylesheet" href="/assets_ref/apps.css" />
      <link rel="stylesheet" href="/assets/product-sticky.css" />
      <link rel="stylesheet" href="/assets/product-shell.css" />
      <link rel="stylesheet" href="/assets/gallery-motion.css" />
      <link rel="stylesheet" href="/assets_ref/miroooo-reviews.css" />
      {children}
    </>
  );
}
