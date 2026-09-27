import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import "@/styles/globals.css";

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
  metadataBase: new URL("https://www.trymiroooo.com"),
  title: {
    default: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 Canada",
    template: "%s | Miroooo",
  },
  description:
    "Meet Miroooo X1 and Miroooo X2: refined electric toothbrushes for a more considered daily routine. Free tracked Canada delivery.",
  applicationName: "Miroooo",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Miroooo",
    title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 Canada",
    description: "Precision without the noise. Discover Miroooo X1 and Miroooo X2.",
    url: "https://www.trymiroooo.com/",
    locale: "en_CA",
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
    title: "Miroooo Electric Toothbrushes | Miroooo X1 & X2 Canada",
    description: "Precision without the noise. Discover Miroooo X1 and Miroooo X2.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${didot.variable}`} style={{ backgroundColor: "#080909", colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap" />
        <link rel="stylesheet" href="/assets/site.css" />
        <link rel="stylesheet" href="/assets_ref/theme.css" />
        <link rel="stylesheet" href="/assets_ref/apps.css" />
        <link rel="stylesheet" href="/assets/product-shell.css" />
        <link rel="stylesheet" href="/assets_ref/miroooo-reviews.css" />
        <link rel="stylesheet" href="/assets/dentalcare-quiz.css" />
        <link rel="stylesheet" href="/assets/smile-coach.css" />
        <link rel="stylesheet" href="/assets/guides.css" />
        <style dangerouslySetInnerHTML={{ __html: "html, body { background-color: #080909 !important; } loading-bar, .loading-bar, [data-page-rendering] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; } #tawk-bubble-container, #tawk-chat-panel, .tawk-min-container, iframe[src*='tawk.to'], div[class*='tawk'] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }" }} />
      </head>
      <body style={{ backgroundColor: "#080909" }}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            window.Shopify = window.Shopify || { designMode: false };
            window.theme = window.theme || {};
            window.theme.settings = { themeName: 'Concept', themeVersion: '2.1.1', moneyFormat: "\${{amount}}" };
            window.theme.routes = { shop_url: '/', root_url: '/', cart_url: '/cart' };
            document.documentElement.classList.replace('no-js', 'js');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ybadbatujm");
          `}
        </Script>
        <a className="skip-link" href="#main">Skip to content</a>
        
        {children}

        <Script src="/assets_ref/vendor.js" strategy="afterInteractive" />
        <Script src="/assets_ref/theme.js" strategy="afterInteractive" />
        <Script src="/assets/lottie.min.js" strategy="afterInteractive" />
        <Script src="/assets/site.js" strategy="afterInteractive" />
        <Script src="/assets/product-shell.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
