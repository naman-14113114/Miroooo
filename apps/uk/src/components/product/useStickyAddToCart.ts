import { useEffect, useRef, useState } from 'react';

export function useStickyAddToCart(enabled = true) {
  const heroCtaRef = useRef<HTMLButtonElement>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const button = heroCtaRef.current;
    if (!enabled || !button) return;

    const update = () => setIsStickyVisible(button.getBoundingClientRect().bottom <= 0);

    // Scroll also catches jumps from below the viewport directly to above it.
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new IntersectionObserver(update);
    observer.observe(button);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [enabled]);

  return { heroCtaRef, isStickyVisible: enabled && isStickyVisible };
}
