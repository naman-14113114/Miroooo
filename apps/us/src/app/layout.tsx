import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import "@/styles/globals.css";

import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartMinimalHeader } from "@/components/layout/CartMinimalHeader";
import { CartMinimalFooter } from "@/components/layout/CartMinimalFooter";
import { RouteChrome } from "@/components/layout/RouteChrome";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../assets/fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/inter-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../assets/fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/inter-700.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/inter-700-italic.woff2", weight: "700", style: "italic" },
    { path: "../assets/fonts/inter-800.woff2", weight: "800", style: "normal" },
  ],
});

const didot = localFont({
  variable: "--font-didot",
  display: "swap",
  src: [{ path: "../assets/fonts/gfs-didot-400-latin.woff2", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miroooo.us"),
  title: {
    default: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 US",
    template: "%s | Miroooo",
  },
  description:
    "Meet Miroooo X1 and Miroooo X2: refined electric toothbrushes for a more considered daily routine. Free tracked US delivery.",
  applicationName: "Miroooo",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Miroooo",
    title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 US",
    description: "Precision without the noise. Discover Miroooo X1 and Miroooo X2.",
    url: "https://miroooo.us/",
    locale: "en_US",
    images: [
      {
        url: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp",
        width: 1200,
        height: 1200,
        alt: "Miroooo X2 sonic electric toothbrush",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 US",
    description: "Precision without the noise. Discover Miroooo X1 and Miroooo X2.",
  },
};

export const viewport: Viewport = {
  themeColor: "#080909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${didot.variable}`}
      style={{ backgroundColor: "#080909", colorScheme: "dark" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "html, body { background-color: #080909 !important; color: #ffffff; } loading-bar, .loading-bar, [data-page-rendering] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; } #tawk-bubble-container, #tawk-chat-panel, #tawk-default-container, .tawk-min-container, .widget-visible, iframe[src*='tawk.to'], iframe[title*='chat widget'], div[id*='tawk'], div[class*='tawk'] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }",
          }}
        />
      </head>
      <body style={{ backgroundColor: "#080909" }}>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ybadbatujm");
          `}
        </Script>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <CartProvider>
          <RouteChrome
            defaultHeader={<Header />}
            defaultFooter={<Footer />}
            cartHeader={<CartMinimalHeader />}
            cartFooter={<CartMinimalFooter />}
          >
            {children}
          </RouteChrome>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
