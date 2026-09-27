'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { MenuDrawer } from './MenuDrawer';

export function Header({ isTransparentHome = true }: { isTransparentHome?: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { totals, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isOverlay = isHome && isTransparentHome;

  return (
    <>
      <header
        className={`site-header ${isOverlay ? 'site-header--overlay' : ''} ${isScrolled ? 'is-scrolled' : ''}`}
        style={{
          minHeight: '60px',
        }}
      >
        <div className="site-header__inner" style={{ minHeight: '60px' }}>
          {/* Left: Mobile hamburger & Desktop Nav */}
          <div className="site-header__left flex items-center justify-start">
            <div className="header__icons header__icons--start lg:hidden flex items-center justify-start">
              <div className="header__buttons flex items-center gap-1d5">
                <button
                  className="nav-toggle menu-drawer-button flex items-center justify-center lg:hidden"
                  type="button"
                  aria-expanded={isDrawerOpen}
                  aria-controls="MenuDrawer"
                  aria-label="Open navigation menu"
                  onClick={() => setIsDrawerOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    color: '#ffffff',
                  }}
                >
                  <span className="sr-only">Navigation</span>
                  <svg
                    className="icon icon-hamburger icon-lg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path strokeLinecap="round" d="M3 6H21M3 12H11M3 18H16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="header__navigation hidden lg:flex lg:gap-5 lg:justify-start">
              <nav className="header__menu site-nav hidden lg:flex" role="navigation" aria-label="Primary">
                <ul className="flex flex-wrap list-menu with-block items-center" style={{ gap: '26px' }}>
                  <li
                    className="relative"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      id="ShopDrawerTrigger"
                      className="menu__item nav-link header__shop-drawer-btn flex items-center font-medium z-2 relative cursor-pointer"
                      style={{ border: 'none', outline: 'none', background: 'transparent', color: 'inherit' }}
                      aria-haspopup="dialog"
                      aria-expanded={isShopDropdownOpen}
                      aria-label="Open Shop dropdown"
                    >
                      <span className="btn-text flex items-center gap-1.5" data-text="Shop">
                        Shop
                        <svg
                          className={`w-2.5 h-2.5 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 10 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 1l4 4 4-4" />
                        </svg>
                      </span>
                    </button>

                    {/* Shop Mega Dropdown */}
                    <div
                      className={`absolute top-full left-0 w-80 bg-[#0c0d0e]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 transition-all duration-200 origin-top-left z-50 ${
                        isShopDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                      }`}
                    >
                      <div className="mb-3">
                        <span className="block text-[10.5px] font-bold uppercase tracking-widest text-white/40 mb-2 px-2">
                          Sonic Brushes
                        </span>
                        <div className="space-y-1">
                          <Link
                            href="/products/miroooo-x"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="block p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[13.5px] font-semibold text-white">Miroooo X1</span>
                              <span className="text-[9.5px] font-bold uppercase tracking-wider bg-white/10 text-white px-2 py-0.5 rounded-full">Classic</span>
                            </div>
                            <p className="text-[11.5px] text-white/50 mt-0.5">51g ultra-lightweight linear sonic motor</p>
                          </Link>
                          <Link
                            href="/products/miroooo-x2"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="block p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[13.5px] font-semibold text-white">Miroooo X2</span>
                              <span className="text-[9.5px] font-bold uppercase tracking-wider bg-white/15 text-white px-2 py-0.5 rounded-full">Flagship</span>
                            </div>
                            <p className="text-[11.5px] text-white/50 mt-0.5">45° Bass sweep &amp; pressure defense</p>
                          </Link>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <span className="block text-[10.5px] font-bold uppercase tracking-widest text-white/40 mb-2 px-2">
                          Brush Heads &amp; Accessories
                        </span>
                        <div className="space-y-1">
                          <Link
                            href="/products/miroooo-x1-heads"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <span className="text-[13px] font-medium text-white/90">Miroooo X1 Heads (2-Pack)</span>
                          </Link>
                          <Link
                            href="/products/miroooo-x2-heads"
                            onClick={() => setIsShopDropdownOpen(false)}
                            className="block p-2 rounded-xl hover:bg-white/10 transition-colors"
                          >
                            <span className="text-[13px] font-medium text-white/90">Miroooo X2 Heads (2-Pack)</span>
                          </Link>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10">
                        <Link
                          href="/shop"
                          onClick={() => setIsShopDropdownOpen(false)}
                          className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/15 text-[12px] font-semibold text-white flex items-center justify-between transition-colors"
                        >
                          <span>Explore All Products</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link href="/pages/about-us" className="menu__item nav-link flex items-center font-medium">
                      <span className="btn-text">About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/dentalcare-quiz" className="menu__item nav-link flex items-center font-medium">
                      <span className="btn-text">Dental Care Quiz</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="site-header__center header__logo flex justify-center z-2">
            <Link
              className="site-logo header__logo-link flex items-center relative"
              href="/"
              style={{ textDecoration: 'none' }}
              aria-label="Miroooo home"
            >
              <span
                className="miroooo-brand-logo"
                style={{
                  fontFamily: "'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: 'clamp(1.35rem, 2vw, 1.65rem)',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  lineHeight: 1,
                }}
              >
                MIROOOO
              </span>
            </Link>
          </div>

          {/* Right: Secondary Nav & Cart Button */}
          <div className="site-header__right site-actions header__icons header__icons--end flex justify-end items-center z-2">
            <div className="header__navigation header__navigation--right hidden lg:flex items-center">
              <nav className="header__menu site-nav site-nav--right hidden lg:flex" role="navigation" aria-label="Secondary">
                <ul className="flex flex-wrap list-menu with-block items-center" style={{ gap: '26px' }}>
                  <li>
                    <Link href="/pages/contact-us" className="menu__item nav-link flex items-center font-medium">
                      <span className="btn-text">Contact Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/faqs" className="menu__item nav-link flex items-center font-medium">
                      <span className="btn-text">FAQs</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__buttons flex items-center gap-1d5">
              <button
                type="button"
                onClick={openCart}
                className="site-actions__bag cart-drawer-button flex items-center justify-center relative cursor-pointer"
                aria-label={`Shopping cart with ${totals.itemCount} items`}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span className="sr-only">Cart</span>
                <svg
                  className="icon icon-cart icon-lg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  style={{ width: '22px', height: '22px' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M1 1h.5v0c.226 0 .339 0 .44.007a3 3 0 0 1 2.62 1.976c.034.095.065.204.127.42l.17.597m0 0 1.817 6.358c.475 1.664.713 2.496 1.198 3.114a4 4 0 0 0 1.633 1.231c.727.297 1.592.297 3.322.297h2.285c1.75 0 2.626 0 3.359-.302a4 4 0 0 0 1.64-1.253c.484-.627.715-1.472 1.175-3.161l.06-.221c.563-2.061.844-3.092.605-3.906a3 3 0 0 0-1.308-1.713C19.92 4 18.853 4 16.716 4H4.857ZM12 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
                {totals.itemCount > 0 && (
                  <span
                    className="cart-count count absolute text-xs"
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '0px',
                      background: '#ffffff',
                      color: '#080909',
                      borderRadius: '999px',
                      minWidth: '18px',
                      height: '18px',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 4px',
                    }}
                  >
                    {totals.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MenuDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
