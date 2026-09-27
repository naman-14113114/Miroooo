'use client';

import React from 'react';
import { Product } from '@/data/products';

interface VariantSelectorProps {
  product: Product;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  selectedQuantity: 1 | 2 | 3;
  onSelectQuantity: (quantity: 1 | 2 | 3) => void;
  bundleColors: string[];
  onUpdateBundleColors: (colors: string[]) => void;
}

export function VariantSelector({
  product,
  selectedColor,
  onSelectColor,
  selectedQuantity,
  onSelectQuantity,
  bundleColors,
  onUpdateBundleColors,
}: VariantSelectorProps) {
  const isBrush = product.handle === 'miroooo-x2' || product.handle === 'miroooo-x';

  const handleColorChangeForIndex = (index: number, newColor: string) => {
    const updated = [...bundleColors];
    updated[index] = newColor;
    onUpdateBundleColors(updated);
    if (index === 0) onSelectColor(newColor);
  };

  return (
    <div className="variant-selector-wrapper space-y-5">
      {/* Primary Color Swatches (if single brush or accessory) */}
      {isBrush && selectedQuantity === 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13.5px]">
            <span className="text-white/70">
              Selected Finish:{' '}
              <strong className="text-white font-semibold">{selectedColor}</strong>
            </span>
            <span className="text-emerald-400 font-medium text-[12px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> In stock, ready to ship
            </span>
          </div>

          <div className="flex items-center gap-3" role="radiogroup" aria-label="Toothbrush Finish">
            {product.variants.map((v) => {
              const isSelected = selectedColor.toLowerCase() === v.color.toLowerCase();
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    onSelectColor(v.color);
                    handleColorChangeForIndex(0, v.color);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-white bg-white/10 ring-2 ring-white/20'
                      : 'border-white/15 bg-white/[0.03] hover:border-white/40'
                  }`}
                  aria-checked={isSelected}
                  role="radio"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                    style={{ backgroundColor: v.swatch }}
                  />
                  <span className="text-[13px] font-medium text-white">{v.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bundle Selection Tiers */}
      {product.bundles.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/50">
            <span className="h-px flex-1 bg-white/10" />
            <span>Bundle & Save + Free Heads</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-2.5">
            {product.bundles.map((bundle) => {
              const isSelected = selectedQuantity === bundle.quantity;
              return (
                <div
                  key={bundle.quantity}
                  className={`relative rounded-2xl border transition-all p-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-white bg-white/[0.08] shadow-lg ring-1 ring-white/20'
                      : 'border-white/15 bg-white/[0.02] hover:border-white/30'
                  }`}
                  onClick={() => onSelectQuantity(bundle.quantity)}
                >
                  {/* Badge */}
                  {bundle.badge && (
                    <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-white text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {bundle.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    {/* Radio visual + copy */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-white bg-white' : 'border-white/30'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
                      </span>

                      <div>
                        <strong className="block text-[14.5px] font-bold text-white">
                          {bundle.name}
                        </strong>
                        <span className="text-[12px] text-white/70 block">
                          {bundle.description}
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="text-right flex-shrink-0">
                      <strong className="block text-[15px] font-extrabold text-white">
                        {bundle.formattedPrice}
                      </strong>
                      <s className="text-[12px] text-white/40 block">
                        {bundle.formattedCompareAt}
                      </s>
                    </div>
                  </div>

                  {/* Multi-Brush Color Pickers when Selected */}
                  {isSelected && bundle.quantity > 1 && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5" onClick={(e) => e.stopPropagation()}>
                      <span className="block text-[11.5px] font-semibold text-white/80 uppercase tracking-wider">
                        Select Finishes for Each Brush:
                      </span>
                      {Array.from({ length: bundle.quantity }).map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[12.5px]">
                          <span className="text-white/70">Brush #{idx + 1}:</span>
                          <div className="flex items-center gap-1.5">
                            {product.variants.map((v) => {
                              const isColorActive =
                                (bundleColors[idx] || 'Silver').toLowerCase() === v.color.toLowerCase();
                              return (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() => handleColorChangeForIndex(idx, v.color)}
                                  className={`px-2 py-1 rounded-lg border text-[11.5px] flex items-center gap-1.5 transition-all ${
                                    isColorActive
                                      ? 'border-white bg-white/20 text-white font-bold'
                                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                                  }`}
                                >
                                  <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: v.swatch }}
                                  />
                                  <span>{v.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
