"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail } from "lucide-react";
import { generalFaqs, x1Faqs, x2Faqs } from "@/data/faqs";
import { legalEntity } from "@/data/policies";

export function FaqContent() {
  const [openIdx, setOpenIdx] = useState<string | null>("gen-0");

  const categories = [
    { title: "Miroooo X2 Flagship FAQs", prefix: "x2", items: x2Faqs },
    { title: "Miroooo X1 Essential FAQs", prefix: "x1", items: x1Faqs },
    { title: "General, Shipping & Warranty FAQs", prefix: "gen", items: generalFaqs },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
          Help Center
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
          Everything you need to know about Miroooo sonic electric toothbrushes, replacement heads,
          shipping, and trial guarantees.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-neutral-200 border-b border-[rgba(255,255,255,0.08)] pb-2 mb-4">
              {cat.title}
            </h2>

            {cat.items.map((faq, idx) => {
              const key = `${cat.prefix}-${idx}`;
              const isOpen = openIdx === key;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-neutral-900/50 border border-[rgba(255,255,255,0.06)] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : key)}
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
        ))}
      </div>

      {/* Still need help box */}
      <div className="mt-14 p-8 rounded-3xl bg-neutral-900/60 border border-[rgba(255,255,255,0.08)] text-center shadow-xl">
        <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
          Our dedicated US customer support team is available Monday through Friday to assist you.
        </p>
        <Link
          href="/pages/contact-us"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition"
        >
          <Mail size={15} />
          <span>Contact Customer Support</span>
        </Link>
      </div>
    </div>
  );
}
