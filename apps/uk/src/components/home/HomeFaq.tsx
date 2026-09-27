'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQS_GENERAL } from '@/data/faqs';

export function HomeFaq() {
  const [openId, setOpenId] = useState<string>('return-policy');
  const homeFaqs = FAQS_GENERAL.slice(0, 6);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="home-faq-section py-20 bg-[#080909] text-white border-t border-white/10" aria-labelledby="home-faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-[11.5px] font-bold uppercase tracking-widest text-white/50 block mb-2">
            Help & Guidance
          </span>
          <h2 id="home-faq-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-[14.5px] text-white/70">
            Answers to common questions about free tracked UK shipping, return guarantees, and Miroooo toothbrushes.
          </p>
        </div>

        <div className="space-y-3.5">
          {homeFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#111213] border border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left font-semibold text-[15.5px] hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className={`transform transition-transform duration-200 text-white/60 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-[14px] text-white/75 leading-relaxed border-t border-white/5">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pages/faqs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13.5px] font-bold transition-all border border-white/10"
          >
            <span>View All FAQs in Help Center</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
