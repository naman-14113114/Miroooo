'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartItem, CartTotals, calculateTotals, normalizeCartItems, VALID_PROMO_CODES } from '@/lib/cart';
import { PRODUCTS } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  appliedPromoCodes: string[];
  giftMessage: string;
  isOpen: boolean;
  isCheckoutLoading: boolean;
  checkoutError: string | null;
  totals: CartTotals;
  addItem: (item: Partial<CartItem> & { productHandle: string }) => void;
  addBundle: (productHandle: string, quantity: 1 | 2 | 3, colors: string[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: (code: string) => void;
  saveGiftMessage: (msg: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  proceedToCheckout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'miroooo_cart';
const LOCAL_STORAGE_PROMOS_KEY = 'miroooo_promo_codes';
const LOCAL_STORAGE_GIFT_MSG_KEY = 'miroooo_gift_message';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromoCodes, setAppliedPromoCodes] = useState<string[]>([]);
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart state from localStorage on initial mount
  useEffect(() => {
    try {
      // 1. Promo codes
      const storedPromos = localStorage.getItem(LOCAL_STORAGE_PROMOS_KEY);
      if (storedPromos) {
        const parsed = JSON.parse(storedPromos);
        if (Array.isArray(parsed)) setAppliedPromoCodes(parsed);
      } else {
        const singlePromo = localStorage.getItem('miroooo_promo_code');
        if (singlePromo) {
          setAppliedPromoCodes([singlePromo.toUpperCase().trim()]);
        }
      }

      // 2. Gift message
      const storedGiftMsg = localStorage.getItem(LOCAL_STORAGE_GIFT_MSG_KEY);
      if (storedGiftMsg) setGiftMessage(storedGiftMsg);

      // 3. Cart Items
      const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
          setItems(normalizeCartItems(parsed.items));
        } else if (parsed && parsed.quantity > 0) {
          // Legacy format migration
          const pHandle = parsed.productId || 'miroooo-x2';
          const p = PRODUCTS[pHandle] || PRODUCTS['miroooo-x2'];
          const colors = Array.isArray(parsed.colors) && parsed.colors.length > 0 ? parsed.colors : ['Silver'];
          const newItems: CartItem[] = colors.slice(0, parsed.quantity).map((col: string, idx: number) => {
            const v = p.variants.find((vr) => vr.color.toLowerCase() === col.toLowerCase()) || p.variants[0];
            return {
              id: `${p.handle}-${col}-${idx}`,
              productHandle: p.handle,
              productId: p.plusBaseProductId,
              variantId: v.id,
              title: `${p.name} (${col})`,
              subtitle: p.subtitle,
              color: col,
              quantity: 1,
              unitPrice: p.price,
              comparePrice: p.compareAt,
              image: v.image,
              url: `/products/${p.handle}?color=${col}`,
            };
          });
          setItems(normalizeCartItems(newItems));
        }
      }
    } catch (e) {
      console.warn('Failed to load cart state from localStorage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (items.length === 0) {
        localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
        localStorage.setItem('miroooo_cart_empty', 'true');
      } else {
        const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
        const allColors = items.flatMap((i) => Array(i.quantity).fill(i.color || 'Silver'));
        const primaryItem = items[0];

        const payload = {
          version: 2,
          items,
          productId: primaryItem?.productHandle || 'miroooo-x2',
          quantity: totalQty,
          colors: allColors,
        };
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(payload));
        localStorage.removeItem('miroooo_cart_empty');
      }
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items, isHydrated]);

  // Sync promos to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_PROMOS_KEY, JSON.stringify(appliedPromoCodes));
      localStorage.setItem('miroooo_promo_code', appliedPromoCodes.join(','));
    } catch (e) {
      console.warn('Failed to save promo codes:', e);
    }
  }, [appliedPromoCodes, isHydrated]);

  const totals = useMemo(() => calculateTotals(items, appliedPromoCodes), [items, appliedPromoCodes]);

  const addItem = useCallback((itemData: Partial<CartItem> & { productHandle: string }) => {
    const product = PRODUCTS[itemData.productHandle] || PRODUCTS['miroooo-x2'];
    const color = itemData.color || 'Silver';
    const variant = product.variants.find((v) => v.color.toLowerCase() === color.toLowerCase()) || product.variants[0];
    const isBrush = itemData.productHandle === 'miroooo-x2' || itemData.productHandle === 'miroooo-x';

    setItems((currentItems) => {
      // If item with same product & color exists, increment quantity
      const existingIndex = currentItems.findIndex(
        (i) => i.productHandle === itemData.productHandle && i.color === color
      );

      if (existingIndex > -1) {
        const updated = [...currentItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (itemData.quantity || 1),
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `${itemData.productHandle}-${color}-${Date.now()}`,
        productHandle: itemData.productHandle,
        productId: product.plusBaseProductId,
        variantId: variant.id,
        title: isBrush ? `${product.name} (${color})` : product.name,
        subtitle: product.subtitle,
        color,
        quantity: itemData.quantity || 1,
        unitPrice: product.price,
        comparePrice: product.compareAt,
        image: variant.image || product.galleryImages[0]?.src || '',
        url: `/products/${product.handle}${isBrush ? `?color=${color}` : ''}`,
      };

      return [...currentItems, newItem];
    });

    setIsOpen(true);
  }, []);

  const addBundle = useCallback((productHandle: string, quantity: 1 | 2 | 3, colors: string[]) => {
    const product = PRODUCTS[productHandle] || PRODUCTS['miroooo-x2'];
    const isBrush = productHandle === 'miroooo-x2' || productHandle === 'miroooo-x';

    setItems((currentItems) => {
      // Remove previous brushes of same model if replacing bundle
      const withoutProduct = currentItems.filter((i) => i.productHandle !== productHandle);

      // Create line items for each selected brush color
      const newItems: CartItem[] = [];
      const colorCounts: Record<string, number> = {};
      colors.slice(0, quantity).forEach((c) => {
        colorCounts[c] = (colorCounts[c] || 0) + 1;
      });

      Object.entries(colorCounts).forEach(([col, count]) => {
        const variant = product.variants.find((v) => v.color.toLowerCase() === col.toLowerCase()) || product.variants[0];
        newItems.push({
          id: `${productHandle}-${col}-${Date.now()}`,
          productHandle,
          productId: product.plusBaseProductId,
          variantId: variant.id,
          title: isBrush ? `${product.name} (${col})` : product.name,
          subtitle: product.subtitle,
          color: col as 'Grey' | 'Pink' | 'Silver',
          quantity: count,
          unitPrice: product.price,
          comparePrice: product.compareAt,
          image: variant.image || product.galleryImages[0]?.src || '',
          url: `/products/${product.handle}${isBrush ? `?color=${col}` : ''}`,
        });
      });

      return [...withoutProduct, ...newItems];
    });

    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter((i) => i.id !== id);
      }
      return currentItems.map((i) => (i.id === id ? { ...i, quantity } : i));
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((i) => i.id !== id));
  }, []);

  const applyPromoCode = useCallback((code: string) => {
    const formatted = code.trim().toUpperCase();
    if (!formatted) return { success: false, message: 'Please enter a promo code.' };

    if (VALID_PROMO_CODES.includes(formatted)) {
      setAppliedPromoCodes((current) => {
        const filtered = current.filter((c) => !VALID_PROMO_CODES.includes(c));
        return [...filtered, formatted];
      });
      return { success: true, message: 'Promo code applied successfully!' };
    }

    return { success: false, message: 'Invalid promo code.' };
  }, []);

  const removePromoCode = useCallback((code: string) => {
    setAppliedPromoCodes((current) => current.filter((c) => c !== code));
  }, []);

  const saveGiftMessage = useCallback((msg: string) => {
    const trimmed = msg.trim();
    setGiftMessage(trimmed);
    try {
      localStorage.setItem(LOCAL_STORAGE_GIFT_MSG_KEY, trimmed);
    } catch (e) {
      console.warn('Failed to save gift message:', e);
    }
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const proceedToCheckout = useCallback(async () => {
    if (items.length === 0 || isCheckoutLoading) return;

    setIsCheckoutLoading(true);
    setCheckoutError(null);

    try {
      // Capture UTM & Ad Attribution
      const allowed = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'msclkid',
        'gclid',
        'fbclid',
        'source',
      ];
      let attribution: Record<string, string> = {};
      try {
        const fromSession = JSON.parse(sessionStorage.getItem('miroooo_attribution') || '{}');
        const fromLocal = JSON.parse(localStorage.getItem('miroooo_attribution') || '{}');
        attribution = { ...fromLocal, ...fromSession };
      } catch {}

      if (typeof window !== 'undefined') {
        const currentParams = new URLSearchParams(window.location.search);
        allowed.forEach((key) => {
          const val = currentParams.get(key) || attribution[key];
          if (val) attribution[key] = val;
        });
      }

      // Build items payload
      const checkoutItems = items.map((item) => ({
        id: item.id,
        productHandle: item.productHandle,
        title: item.title,
        productId: item.productId,
        variantId: item.variantId,
        color: item.color,
        quantity: item.quantity,
      }));

      // Add free gifts if pure bundle is active
      if (totals.extraBrushHeadSets > 0) {
        checkoutItems.push({
          id: 'miroooo-x2-heads:free',
          productHandle: 'miroooo-x2-heads',
          title: 'Miroooo X2 Heads',
          productId: '1000000675616058',
          variantId: '1000020718937117',
          color: 'Heads',
          quantity: totals.extraBrushHeadSets,
        });
      } else if (totals.extraX1BrushHeadSets > 0) {
        checkoutItems.push({
          id: 'miroooo-x1-heads:free',
          productHandle: 'miroooo-x1-heads',
          title: 'Miroooo X1 Heads',
          productId: '1000000675471182',
          variantId: '1000020710139724',
          color: 'Heads',
          quantity: totals.extraX1BrushHeadSets,
        });
      }

      const validDiscountCodes = appliedPromoCodes.filter((c) => VALID_PROMO_CODES.includes(c));

      const prepRes = await fetch('/api/checkout/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: checkoutItems,
          discountCode: validDiscountCodes.join(','),
          discountCodes: validDiscountCodes,
          attribution,
        }),
      });

      const data = await prepRes.json().catch(() => null);
      if (prepRes.ok && data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setCheckoutError(data?.error || 'Secure checkout is temporarily unavailable. Please try again.');
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutError('Unable to connect to checkout. Please try again.');
    } finally {
      setIsCheckoutLoading(false);
    }
  }, [items, isCheckoutLoading, totals, appliedPromoCodes]);

  return (
    <CartContext.Provider
      value={{
        items,
        appliedPromoCodes,
        giftMessage,
        isOpen,
        isCheckoutLoading,
        checkoutError,
        totals,
        addItem,
        addBundle,
        updateQuantity,
        removeItem,
        applyPromoCode,
        removePromoCode,
        saveGiftMessage,
        openCart,
        closeCart,
        toggleCart,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
