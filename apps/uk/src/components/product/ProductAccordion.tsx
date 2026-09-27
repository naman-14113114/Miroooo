'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';

interface ProductAccordionProps {
  product: Product;
}

export function ProductAccordion({ product }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string>('specs');

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="product-accordion py-12 max-w-4xl mx-auto px-4 sm:px-6 text-white" aria-label="Product Details and Specifications">
      <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
        Technical Details & Box Contents
      </h2>

      <div className="space-y-3">
        {/* Accordion 1: Technical Specs */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('specs')}
            className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-[15px] hover:bg-white/[0.02] transition-colors"
            aria-expanded={openSection === 'specs'}
          >
            <span>Technical Specifications</span>
            <span className={`transform transition-transform duration-200 ${openSection === 'specs' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openSection === 'specs' && (
            <div className="px-6 pb-6 pt-2 text-[13.5px] border-t border-white/5 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-white/50 text-[11.5px] font-medium uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <strong className="text-white font-medium text-[13.5px]">
                      {spec.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: In The Box */}
        {product.boxContents && product.boxContents.length > 0 && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('box')}
              className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-[15px] hover:bg-white/[0.02] transition-colors"
              aria-expanded={openSection === 'box'}
            >
              <span>What&apos;s Included In The Box</span>
              <span className={`transform transition-transform duration-200 ${openSection === 'box' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openSection === 'box' && (
              <div className="px-6 pb-6 pt-2 text-[13.5px] border-t border-white/5">
                <ul className="space-y-2 text-white/80">
                  {product.boxContents.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Accordion 3: Warranty & Guarantee */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('warranty')}
            className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-[15px] hover:bg-white/[0.02] transition-colors"
            aria-expanded={openSection === 'warranty'}
          >
            <span>2-Year Warranty & 30-Day Defective Guarantee</span>
            <span className={`transform transition-transform duration-200 ${openSection === 'warranty' ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {openSection === 'warranty' && (
            <div className="px-6 pb-6 pt-2 text-[13.5px] text-white/80 border-t border-white/5 space-y-3 leading-relaxed">
              <p>
                Every Miroooo toothbrush handle is backed by a full <strong>2-year manufacturer warranty</strong> against acoustic linear motor failures, battery defects, and charging malfunctions.
              </p>
              <p>
                If your item arrives defective, damaged in transit, or missing parts, we provide a <strong>30-day defective return guarantee</strong> with replacement or full refund. Contact support@trymiroooo.com for authorized support.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
