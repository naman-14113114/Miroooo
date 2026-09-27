"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { generalFaqs } from "@/data/faqs";

export function HomeFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-[#0a0b0b] text-white border-t border-[rgba(255,255,255,0.08)]" aria-labelledby="home-faq-title">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            Support & Clarity
          </p>
          <h2 id="home-faq-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {generalFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-neutral-900/40 border border-[rgba(255,255,255,0.06)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-white hover:bg-neutral-900/80 transition"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-neutral-400 transform transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[rgba(255,255,255,0.04)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/pages/faqs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white uppercase tracking-wider transition"
          >
            <span>Read All Frequently Asked Questions</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
