import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer-group block w-full">
      {/* Customer Care / Service Strip (3 Items) */}
      <aside className="service-strip" aria-label="Miroooo customer care" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="service-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="service-strip__icon" aria-hidden="true">
            <rect x="1" y="5" width="15" height="13" rx="2" />
            <polygon points="16 8 20 8 23 11 23 18 16 18 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <div>
            <strong>Tracked UK delivery</strong>
            <span>Free with every brush</span>
          </div>
        </div>

        <div className="service-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="service-strip__icon" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <div>
            <strong>2-Year Warranty</strong>
            <span>Full peace of mind</span>
          </div>
        </div>

        <div className="service-strip__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="service-strip__icon" aria-hidden="true">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
          </svg>
          <div>
            <strong>4.9/5 Rating</strong>
            <span>Rated 4.9/5 by dentists</span>
          </div>
        </div>
      </aside>

      {/* 4-Column Footer */}
      <div className="site-footer" role="contentinfo">
        <div className="site-footer__main">
          {/* Column 1: Brand Info */}
          <div className="site-footer__brand">
            <Link
              className="site-footer__logo"
              href="/"
              aria-label="Miroooo home"
              style={{
                fontFamily: "'Montserrat', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 800,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              MIROOOO
            </Link>
            <p className="site-footer__tagline">
              Quietly precise electric toothbrushes, built to make better brushing feel uncomplicated.
            </p>
            <div className="site-footer__address">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="site-footer__address-icon" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>71-75 Shelton St, London WC2H 9JQ, UK</span>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div className="site-footer__column">
            <h4 className="site-footer__heading">SHOP</h4>
            <ul className="site-footer__links">
              <li><Link href="/products/miroooo-x2">Miroooo X2</Link></li>
              <li><Link href="/products/miroooo-x">Miroooo X1</Link></li>
              <li><Link href="/products/miroooo-x2-heads">Miroooo X2 Heads</Link></li>
              <li><Link href="/products/miroooo-x1-heads">Miroooo X1 Heads</Link></li>
              <li><Link href="/shop">Shop All</Link></li>
            </ul>
          </div>

          {/* Column 3: SUPPORT */}
          <div className="site-footer__column">
            <h4 className="site-footer__heading">SUPPORT</h4>
            <ul className="site-footer__links">
              <li><Link href="/pages/contact-us">Contact Us</Link></li>
              <li><Link href="/pages/faqs">FAQs</Link></li>
              <li><Link href="/pages/dentalcare-quiz">Dental Care Quiz</Link></li>
              <li><Link href="/pages/smile-coach">Smile Coach</Link></li>
              <li><Link href="/policies/shipping-policy">Shipping Policy</Link></li>
              <li><Link href="/policies/return-policy">Returns &amp; Refund Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: GET IN TOUCH */}
          <div className="site-footer__column site-footer__column--touch">
            <h4 className="site-footer__heading">GET IN TOUCH</h4>
            <div className="site-footer__touch-content">
              <p className="site-footer__hours">
                Operating Hours<br />
                Monday - Friday - 9am - 5pm GMT
              </p>
              <p className="site-footer__email">
                <a href="mailto:support@trymiroooo.com">support@trymiroooo.com</a>
              </p>
              <div className="site-footer__socials" aria-label="Social media links">
                <a
                  href="https://www.facebook.com/profile.php?id=61593351131893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__social-btn"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/miroooo_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__social-btn"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCVMc0L8ja_3DCL_bI3dczrQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__social-btn"
                  aria-label="YouTube"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, 5 SVG Payment Badges */}
        <div className="site-footer__bottom">
          <div className="site-footer__copyright">
            &copy; 2026 Miroooo. All rights reserved.
          </div>

          <div className="site-footer__legal flex flex-wrap gap-4 text-[11px]" style={{ textTransform: 'none' }}>
            <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/policies/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/policies/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
            <Link href="/policies/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>

          <ul className="site-footer__payments" aria-label="Accepted payment methods">
            <li>
              <img src="/assets/icons/visa.svg" alt="Visa" width="38" height="24" loading="lazy" />
            </li>
            <li>
              <img src="/assets/icons/mastercard.svg" alt="Mastercard" width="38" height="24" loading="lazy" />
            </li>
            <li>
              <img src="/assets/icons/amex.svg" alt="American Express" width="38" height="24" loading="lazy" />
            </li>
            <li>
              <img src="/assets/icons/jcb.svg" alt="JCB" width="38" height="24" loading="lazy" />
            </li>
            <li>
              <img src="/assets/icons/paypal.svg" alt="PayPal" width="38" height="24" loading="lazy" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
