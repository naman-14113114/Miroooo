'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ClientInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Reveal Animation Observer
    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
      );
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    // 2. Drag-to-scroll horizontal containers
    const scrollers = document.querySelectorAll('[data-drag-scroll]');
    scrollers.forEach((scroller) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      const onMouseDown = (e: Event) => {
        const me = e as MouseEvent;
        isDown = true;
        scroller.classList.add('is-dragging');
        startX = me.pageX - (scroller as HTMLElement).offsetLeft;
        scrollLeft = (scroller as HTMLElement).scrollLeft;
      };

      const onMouseLeave = () => {
        isDown = false;
        scroller.classList.remove('is-dragging');
      };

      const onMouseUp = () => {
        isDown = false;
        scroller.classList.remove('is-dragging');
      };

      const onMouseMove = (e: Event) => {
        if (!isDown) return;
        const me = e as MouseEvent;
        me.preventDefault();
        const x = me.pageX - (scroller as HTMLElement).offsetLeft;
        const walk = (x - startX) * 1.5;
        (scroller as HTMLElement).scrollLeft = scrollLeft - walk;
      };

      scroller.addEventListener('mousedown', onMouseDown);
      scroller.addEventListener('mouseleave', onMouseLeave);
      scroller.addEventListener('mouseup', onMouseUp);
      scroller.addEventListener('mousemove', onMouseMove);
    });

    // 3. Mark ready
    document.body.classList.add('is-ready');
  }, [pathname]);

  return null;
}
