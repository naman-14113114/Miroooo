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

export function RouteChrome({
  cartFooter,
  cartHeader,
  children,
  defaultFooter,
}: RouteChromeProps) {
  const pathname = usePathname();
  const isCart = pathname === '/cart';
  const isHome = pathname === '/';

  return (
    <>
      <ClientInitializer />
      {isCart ? (
        cartHeader
      ) : (
        <div className={isHome ? 'header-layer--overlay' : ''}>
          <AnnouncementBar />
          <Header isTransparentHome={isHome} />
        </div>
      )}
      {children}
      {isCart ? cartFooter : defaultFooter}
    </>
  );
}
