"use client";

import Link from "next/link";
import { ArrowRight, Heart, Menu, ShoppingCart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Magnetic } from "./magnetic";
import { useStore } from "./store-provider";

const links = [
  ["/shop", "Shop"],
  ["/products/miroooo-x2", "Bundles"],
  ["/contact", "Contact"],
  ["/faq", "FAQ"],
] as const;

const drawerLinks = [
  ["/shop", "Shop"],
  ["/products/miroooo-x2", "Miroooo X2 (Bundles)"],
  ["/about", "Our approach"],
  ["/faq", "FAQs"],
  ["/contact", "Contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const productHeader = pathname.startsWith("/products/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openCart, cartItem } = useStore();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeMenu();
    document.addEventListener("keydown", onKey);
    document.body.classList.toggle("nav-open", menuOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [menuOpen, closeMenu]);

  return (
    <div className={overlay ? "header-layer--overlay" : undefined}>
      <div className={`announcement${productHeader ? " announcement--product" : ""}`}>
        {productHeader ? (
          <>
            <span>
              <Heart aria-hidden="true" size={15} /> Free tracked AU delivery · 90-day home trial
            </span>
            <span aria-hidden="true">
              <Heart size={15} /> Free tracked AU delivery · 90-day home trial
            </span>
          </>
        ) : (
          <>
            <span>Free tracked AU delivery</span>
            <span>90-day home trial</span>
          </>
        )}
      </div>
      <header
        className={`site-header${overlay ? " site-header--overlay" : ""}${
          productHeader ? " site-header--product" : ""
        }${scrolled ? " is-scrolled" : ""}`}
      >
        <div className="site-header__inner">
          <div className="site-header__left">
            <button
              className="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {productHeader ? (
                <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
              ) : (
                <span className="nav-toggle__label">Navigation</span>
              )}
            </button>
            <nav className="header__menu site-nav hidden lg:flex" aria-label="Main navigation">
              <ul className="flex flex-wrap list-menu with-block">
                {links.map(([href, label]) => (
                  <li key={href}>
                    <Magnetic>
                      <Link
                        href={href}
                        className="menu__item nav-link text-sm-lg flex items-center font-medium z-2 relative cursor-pointer"
                        aria-current={pathname === href ? "page" : undefined}
                      >
                        <span className="btn-text" data-text={label}>
                          {label}
                        </span>
                        <span className="btn-text btn-duplicate" aria-hidden="true">
                          {label}
                        </span>
                      </Link>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="site-header__center">
            <Link className="site-logo header__logo-link flex items-center relative" href="/" aria-label="Miroooo home">
              MIROOOO
            </Link>
          </div>
          <div className="site-header__right site-actions header__icons header__icons--end flex justify-end z-2">
            <div className="header__buttons flex items-center gap-1d5">
              <Magnetic>
                <button
                  className="site-actions__bag cart-drawer-button flex items-center justify-center relative"
                  type="button"
                  aria-label="Cart"
                  onClick={() => openCart()}
                >
                  <ShoppingCart aria-hidden="true" size={24} strokeWidth={1.4} />
                  {cartItem && <span className="count absolute top-0 right-0 text-xs">1</span>}
                </button>
              </Magnetic>
              {productHeader && (
                <Magnetic>
                  <button
                    className="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen((open) => !open)}
                  >
                    <Menu aria-hidden="true" size={24} strokeWidth={1.5} />
                  </button>
                </Magnetic>
              )}
            </div>
          </div>
        </div>
      </header>
      <nav
        className={`mobile-panel menu-drawer${menuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-panel__top">
          <span>Menu</span>
          <button
            className="mobile-panel__close button button--close"
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        <div className="mobile-panel__links">
          {drawerLinks.map(([href, label]) => (
            <Link className="drawer__menu-item" href={href} key={href} onClick={closeMenu}>
              <span>{label}</span>
              <ArrowRight aria-hidden="true" size={22} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
        <div className="mobile-panel__bottom">
          <p>Precision without the noise.</p>
          <span>support@trymiroooo.com</span>
        </div>
      </nav>
    </div>
  );
}
