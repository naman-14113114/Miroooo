"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { MenuDrawer, ShopDrawer } from "./MenuDrawer";

function Label({ text, chevron = false }: { text: string; chevron?: boolean }) {
  return (
    <>
      {[false, true].map((duplicate) => (
        <span
          key={String(duplicate)}
          className={`btn-text${duplicate ? " btn-duplicate" : ""}${chevron ? " flex items-center" : ""}`}
          data-text={duplicate ? undefined : text}
          aria-hidden={duplicate || undefined}
        >
          {text}
          {chevron && (
            <svg
              className="dropdown-chevron"
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          )}
        </span>
      ))}
    </>
  );
}

export function Header({
  isTransparentHome = true,
}: {
  isTransparentHome?: boolean;
}) {
  const pathname = usePathname();
  const { totals, openCart, closeCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawer, setDrawer] = useState<"menu" | "shop" | null>(null);
  useEffect(() => {
    const scroll = () => setIsScrolled(window.scrollY > 40);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const close = () => setDrawer(null);
  const links = (items: [string, string][]) =>
    items.map(([href, label]) => (
      <li key={href}>
        <Link
          href={href}
          className="menu__item nav-link text-sm-lg flex items-center font-medium z-2 relative cursor-pointer"
          aria-current={pathname === href ? "page" : undefined}
        >
          <Label text={label} />
        </Link>
      </li>
    ));
  return (
    <>
      <header
        className={`site-header ${pathname === "/" && isTransparentHome ? "site-header--overlay" : ""} ${isScrolled ? "is-scrolled" : ""}`}
      >
        <div className="site-header__inner">
          <div className="site-header__left flex items-center justify-start">
            <div className="header__icons header__icons--start lg:hidden flex items-center justify-start">
              <div className="header__buttons flex items-center gap-1d5">
                <button
                  className="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden"
                  type="button"
                  aria-expanded={drawer === "menu"}
                  aria-controls="MenuDrawer"
                  aria-label="Open menu"
                  onClick={() => {
                    closeCart();
                    setDrawer("menu");
                  }}
                >
                  <svg
                    className="icon icon-hamburger icon-lg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path strokeLinecap="round" d="M3 6H21M3 12H11M3 18H16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="header__navigation hidden lg:flex lg:gap-5 lg:justify-start">
              <nav
                className="header__menu site-nav hidden lg:flex"
                aria-label="Primary"
              >
                <ul className="flex flex-wrap list-menu with-block">
                  <li>
                    <button
                      type="button"
                      id="ShopDrawerTrigger"
                      className="menu__item nav-link header__shop-drawer-btn flex items-center font-medium z-2 relative cursor-pointer"
                      style={{
                        border: "none",
                        boxShadow: "none",
                        background: "transparent",
                      }}
                      aria-haspopup="dialog"
                      aria-expanded={drawer === "shop"}
                      aria-controls="ShopDrawer"
                      aria-label="Open Shop drawer"
                      aria-current={
                        pathname === "/shop" ||
                        pathname.startsWith("/products/")
                          ? "page"
                          : undefined
                      }
                      onClick={() => {
                        closeCart();
                        setDrawer(drawer === "shop" ? null : "shop");
                      }}
                    >
                      <Label text="Shop" chevron />
                    </button>
                  </li>
                  {links([
                    ["/pages/about-us", "About Us"],
                    ["/pages/dentalcare-quiz", "Dental Care Quiz"],
                  ])}
                </ul>
              </nav>
            </div>
          </div>
          <div className="site-header__center flex justify-center z-2">
            <Link
              className="site-logo header__logo-link flex items-center relative"
              href="/"
              style={{ textDecoration: "none" }}
              aria-label="Miroooo home"
            >
              <span
                className="miroooo-brand-logo"
                style={{
                  fontFamily:
                    "'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "clamp(1.35rem, 2vw, 1.65rem)",
                  fontWeight: 800,
                  letterSpacing: ".03em",
                  textTransform: "uppercase",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                MIROOOO
              </span>
            </Link>
          </div>
          <div className="site-header__right site-actions header__icons header__icons--end flex justify-end items-center z-2">
            <div className="header__navigation header__navigation--right hidden lg:flex items-center">
              <nav
                className="header__menu site-nav site-nav--right hidden lg:flex"
                aria-label="Secondary"
              >
                <ul className="flex flex-wrap list-menu with-block">
                  {links([
                    ["/pages/contact-us", "Contact Us"],
                    ["/pages/faqs", "FAQs"],
                  ])}
                </ul>
              </nav>
            </div>
            <div className="header__buttons flex items-center gap-1d5">
              <Link
                href="/cart"
                onClick={(event) => {
                  event.preventDefault();
                  close();
                  openCart();
                }}
                className="site-actions__bag cart-drawer-button flex items-center justify-center relative"
                aria-label={`Cart, ${totals.itemCount} items`}
              >
                <div className="relative inline-flex items-center justify-center">
                  <svg
                    className="icon icon-cart icon-lg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1 1h.5v0c.226 0 .339 0 .44.007a3 3 0 0 1 2.62 1.976c.034.095.065.204.127.42l.17.597m0 0 1.817 6.358c.475 1.664.713 2.496 1.198 3.114a4 4 0 0 0 1.633 1.231c.727.297 1.592.297 3.322.297h2.285c1.75 0 2.626 0 3.359-.302a4 4 0 0 0 1.64-1.253c.484-.627.715-1.472 1.175-3.161l.06-.221c.563-2.061.844-3.092.605-3.906a3 3 0 0 0-1.308-1.713C19.92 4 18.853 4 16.716 4H4.857ZM12 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    />
                  </svg>
                  {totals.itemCount > 0 && (
                    <span className="cart-count">
                      {totals.itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MenuDrawer isOpen={drawer === "menu"} onClose={close} />
      <ShopDrawer isOpen={drawer === "shop"} onClose={close} />
    </>
  );
}
