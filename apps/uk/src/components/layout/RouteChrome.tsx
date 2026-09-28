'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { ClientInitializer } from './ClientInitializer';

interface RouteChromeProps {
  cartFooter: ReactNode;
  cartHeader: ReactNode;
  children: ReactNode;
  defaultFooter: ReactNode;
}

const policyStyles: Record<string, string> = {
  '/policies/privacy-policy': '/assets/policy-privacy-policy-reference.css',
  '/policies/return-policy': '/assets/policy-return-policy-reference.css',
  '/policies/refund-policy': '/assets/policy-refund-policy-reference.css',
  '/policies/shipping-policy': '/assets/policy-shipping-policy-reference.css',
  '/policies/delivery-returns': '/assets/policy-shipping-policy-reference.css',
  '/pages/order-tracking': '/assets/policy-shipping-policy-reference.css',
  '/policies/terms-of-service': '/assets/policy-terms-of-service-reference.css',
  '/policies/cookies-policy': '/assets/policy-cookies-policy-reference.css',
};

export function RouteChrome({
  cartFooter,
  cartHeader,
  children,
  defaultFooter,
}: RouteChromeProps) {
  const pathname = usePathname();
  const isCart = pathname === '/cart';
  const isHome = pathname === '/';
  const isCoach = pathname === '/pages/smile-coach';
  const referenceStyle = isHome
    ? '/assets/home-reference.css'
    : pathname === '/about-us' || pathname === '/pages/about-us'
      ? '/assets/about-reference.css'
      : pathname === '/pages/faqs' || pathname === '/faq'
        ? '/assets/faq-reference.css'
        : policyStyles[pathname] || null;

  return (
    <>
      {!isCart && !isCoach && <link rel="stylesheet" href="/assets/site.css" />}
      {referenceStyle && <link rel="stylesheet" href={referenceStyle} />}
      <ClientInitializer />
      {isCoach ? null : isCart ? (
        cartHeader
      ) : (
        <div className={isHome ? 'header-layer--overlay' : ''}>
          <AnnouncementBar />
          <Header isTransparentHome={isHome} />
        </div>
      )}
      {children}
      {isCoach ? null : isCart ? cartFooter : defaultFooter}
    </>
  );
}
