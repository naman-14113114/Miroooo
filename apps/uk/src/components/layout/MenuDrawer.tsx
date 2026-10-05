"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useDrawer } from "./useDrawer";

const sections = [
  {
    title: "Brushes",
    products: [
      {
        handle: "miroooo-x",
        title: "Miroooo X1",
        eyebrow: "The Essential",
        image: "/assets_ref/x/gallery/Miroooo_x_Pink-1.webp",
        price: 69,
        comparePrice: 139,
      },
      {
        handle: "miroooo-x2",
        title: "Miroooo X2",
        eyebrow: "Flagship Pro",
        image:
          "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-upright-grip.webp",
        price: 69,
        comparePrice: 139,
      },
    ],
  },
  {
    title: "Accessories",
    products: [
      {
        handle: "miroooo-x2-heads",
        title: "Miroooo X2 Heads",
        eyebrow: "Replacement",
        image: "/assets_ref/x2/heads/B1.webp",
        price: 10,
      },
      {
        handle: "miroooo-x1-heads",
        title: "Miroooo X1 Heads",
        eyebrow: "Replacement",
        image: "/assets_ref/x/heads/B1.webp",
        price: 10,
      },
      {
        handle: "travel-case",
        title: "Luxury Travel Case",
        eyebrow: "Protection",
        image:
          "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
        price: 20,
        comparePrice: 40,
      },
      {
        handle: "wall-mounted-dock",
        title: "Wall-Mounted Dock",
        eyebrow: "Storage",
        image:
          "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted.webp",
        price: 9,
        comparePrice: 18,
      },
      {
        handle: "x1-charger",
        title: "X1 Fast Charger",
        eyebrow: "Charging",
        image:
          "/assets_ref/x/gallery/MIROOOO-toothbrush-on-white-charging-dock.png",
        price: 20,
        comparePrice: 40,
      },
    ],
  },
];
type DrawerProps = { isOpen: boolean; onClose: () => void };
const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

export function ShopDrawer({ isOpen, onClose }: DrawerProps) {
  const ref = useDrawer(isOpen, onClose, "shop-drawer-open");
  return (
    <div
      ref={ref}
      id="ShopDrawer"
      className={`shop-drawer${isOpen ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Shop oral care collection"
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        className="shop-drawer__overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="shop-drawer__inner">
        <div className="shop-drawer__header">
          <h2 className="shop-drawer__title">Shop</h2>
          <button
            type="button"
            className="shop-drawer__close"
            onClick={onClose}
            aria-label="Close Shop drawer"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="shop-drawer__body">
          {sections.map((section) => (
            <div className="shop-drawer__section" key={section.title}>
              <span className="shop-drawer__section-title">
                {section.title}
              </span>
              <ul className="shop-drawer__list">
                {section.products.map((product) => (
                  <li key={product.handle}>
                    <Link
                      className="shop-drawer__card"
                      href={`/products/${product.handle}`}
                      onClick={onClose}
                    >
                      <div className="shop-drawer__thumb">
                        <img
                          src={product.image}
                          alt={product.title}
                          width="140"
                          height="140"
                        />
                      </div>
                      <div className="shop-drawer__info">
                        <span className="shop-drawer__eyebrow">
                          {product.eyebrow}
                        </span>
                        <h3 className="shop-drawer__product-title">
                          {product.title}
                        </h3>
                        <span className="shop-drawer__price">
                          £{product.price}{" "}
                          {product.comparePrice && (
                            <s className="shop-drawer__compare">
                              £{product.comparePrice}
                            </s>
                          )}
                        </span>
                      </div>
                      <svg
                        className="shop-drawer__arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export function MenuDrawer({ isOpen, onClose }: DrawerProps) {
  const ref = useDrawer(isOpen, onClose, "nav-open");
  const startY = useRef<number | null>(null);
  const offset = useRef(0);
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 1024 && isOpen) onClose();
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isOpen, onClose]);
  return (
    <div
      ref={ref}
      id="MenuDrawer"
      className="menu-drawer drawer drawer--start"
      {...(isOpen ? { open: true } : {})}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        className="overlay fixed-modal"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="drawer__inner">
        <div
          className="drawer__header"
          onTouchStart={(event) => {
            startY.current = event.touches[0].clientY;
          }}
          onTouchMove={(event) => {
            if (startY.current === null) return;
            offset.current = Math.max(
              0,
              event.touches[0].clientY - startY.current,
            );
            const inner =
              ref.current?.querySelector<HTMLElement>(".drawer__inner");
            inner?.style.setProperty(
              "transform",
              `translate3d(0, ${offset.current}px, 0)`,
              "important",
            );
            inner?.style.setProperty("transition", "none", "important");
          }}
          onTouchEnd={() => {
            const inner =
              ref.current?.querySelector<HTMLElement>(".drawer__inner");
            inner?.style.removeProperty("transform");
            inner?.style.removeProperty("transition");
            if (offset.current > 100) onClose();
            startY.current = null;
            offset.current = 0;
          }}
        >
          <span className="drawer__title" />
          <button
            className="button button--secondary button--close drawer__close mobile-panel__close"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="drawer__content flex flex-col h-full grow shrink">
          <nav
            className="relative grow overflow-hidden"
            aria-label="Mobile navigation"
          >
            <ul className="drawer__scrollable drawer__menu relative w-full h-full">
              <li className="drawer__menu-item--group">
                <div className="drawer__group-label">Shop</div>
                {sections.map((section) => (
                  <div key={section.title}>
                    <div className="drawer__subgroup-label">
                      {section.title}
                    </div>
                    <ul className="drawer__submenu">
                      {section.products.map((product) => (
                        <li key={product.handle}>
                          <Link
                            className="drawer__submenu-item flex flex-col"
                            href={`/products/${product.handle}`}
                            onClick={onClose}
                          >
                            <span className="drawer__submenu-title">
                              {product.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
              {[
                ["about-us", "About Us"],
                ["dentalcare-quiz", "Dental Care Quiz"],
                ["contact-us", "Contact Us"],
                ["faqs", "FAQs"],
              ].map(([path, label]) => (
                <li key={path}>
                  <Link
                    className="drawer__menu-item block heading text-2xl leading-none tracking-tight"
                    href={`/pages/${path}`}
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="drawer__footer grid w-full">
            <div className="drawer__footer-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}
